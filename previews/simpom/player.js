(()=>{
'use strict';
const objects=window.SIMS_OBJECTS,behaviors=window.SIMS_BEHAVIORS,upscales=window.SIMS_UPSCALES||{},motion=window.SIMPOM_MOTION||{},R=window.SimPomRaster,views=R.views;
const root=document.querySelector('#sims-pomodoro-preview'),q=s=>root.querySelector(s),storageKey='sims-pomodoro-mockup:v3';
let state={objectId:'98e0f8bd',view:1,viewDefaultVersion:2,focus:25,break:15,long:30,every:4,done:0,mode:'focus',remaining:1500000,endAt:0,running:false,sound:true,volume:.5,enhanced:true,sharp:false,catalogOpen:true,settingsOpen:false};
let run=null,pausedRun=null,heldFrame=null,previewReturn=null,needsActivation=false,page=0,query='';const channels=new Map();
const object=()=>objects.find(o=>o.id===state.objectId)||objects[0],behavior=()=>behaviors[object().id],duration=()=>Math.round(state[state.mode]*60000),remaining=()=>state.running?Math.max(0,state.endAt-Date.now()):state.remaining;
const say=text=>q('.sp-announcement').textContent=text;
function persist(){try{localStorage.setItem(storageKey,JSON.stringify({...state,remaining:remaining(),running:false,endAt:0,viewDefaultVersion:2}));}catch{}}
try{
 const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');
 for(const k of['focus','break','long'])if(Number.isFinite(saved[k])&&saved[k]>=.05&&saved[k]<=1440)state[k]=saved[k];
 if(objects.some(o=>o.id===saved.objectId))state.objectId=saved.objectId;
 if(saved.viewDefaultVersion===2&&Number.isInteger(saved.view))state.view=((saved.view%4)+4)%4;else state.view=R.defaultView(object());
 if(!R.objectViews(object()).includes(views[state.view]))state.view=R.defaultView(object());
 if(['focus','break','long'].includes(saved.mode))state.mode=saved.mode;
 for(const k of['sound','enhanced','sharp','catalogOpen','settingsOpen'])if(typeof saved[k]==='boolean')state[k]=saved[k];
 if(Number.isFinite(saved.volume)&&saved.volume>=0&&saved.volume<=1)state.volume=saved.volume;
 if(Number.isInteger(saved.every)&&saved.every>=1&&saved.every<=12)state.every=saved.every;
 if(Number.isInteger(saved.done)&&saved.done>=0)state.done=saved.done;
 state.remaining=Number.isFinite(saved.remaining)&&saved.remaining>=0&&saved.remaining<=duration()?saved.remaining:duration();
}catch{}
if(!R.objectViews(object()).includes(views[state.view]))state.view=R.defaultView(object());
function stopChannel(name){const a=channels.get(name);if(a){a.pause();a.remove();channels.delete(name);}}
function silence({keepAmbient=false}={}){for(const k of[...channels.keys()])if(!(keepAmbient&&k==='ambient'&&channels.get(k)?.dataset.object===object().id))stopChannel(k);}
function sound(spec,defaultChannel='effect',keepExisting=false){
 if(!spec)return;const e=typeof spec==='string'?{event:spec}:spec,name=e.channel||defaultChannel;
 if(e.stop){stopChannel(name);return;}
 if(keepExisting&&channels.get(name)?.dataset.event===e.event&&channels.get(name)?.dataset.object===object().id)return;
 stopChannel(name);if(!state.sound||document.hidden)return;
 const s=object().sounds[e.event];if(!s?.clips.length)return;
 const clip=s.clips[Math.floor(Math.random()*s.clips.length)],a=new Audio(clip.file);a.loop=e.loop??s.loop===true;a.dataset.gain=String(e.gain??1);a.volume=Math.max(0,Math.min(1,state.volume*(e.gain??1)));
 a.hidden=true;a.dataset.event=e.event;a.dataset.channel=name;a.dataset.object=object().id;root.append(a);channels.set(name,a);
 const clear=()=>{if(channels.get(name)===a){channels.delete(name);a.remove();}};
 a.addEventListener('ended',clear);a.addEventListener('error',()=>{if(channels.get(name)===a){clear();say('A sound could not load. Keep the assets folder beside SimPom.');}});
 a.play().catch(error=>{if(channels.get(name)===a&&error.name!=='AbortError'){clear();say('Sound is blocked. Turn Sound off, then on to try again.');}});
}
const canvas=q('.sp-canvas');
const renderer=SimPomRenderer.create({canvas,objects,behaviors,upscales,motion,onError:say,onReady:id=>{
 if(id!==state.objectId)return;
 if(needsActivation&&state.running){needsActivation=false;enter('start');}
 render();
}});
function enter(kind,{quiet=false,keepAmbient=false,at=performance.now()}={}){
 const sequence=behavior()[kind];
 if(!sequence){if(kind==='start')enter('active',{quiet,keepAmbient,at});else run=null;return;}
 const preserve=keepAmbient||sequence.preserveAmbient===true;
 silence({keepAmbient:preserve});
 run={kind,sequence,index:0,at,sequenceStart:at,holding:false,lastTick:performance.now()};heldFrame=null;
 if(!quiet){sound(sequence.sound,'ambient',preserve);sound(sequence.steps[0].sound);}
 renderer.invalidate();
}
function decorate(s,clock=run,now=performance.now()){
 const out={...s};
 if(typeof s.water==='number')out.waterValue=s.water;
 else if(s.water){const progress=clock?Math.max(0,Math.min(1,(now-clock.at)/(s.durationMs||1))):1;out.waterValue=s.water.from+(s.water.to-s.water.from)*progress;}
 const elapsed=clock?now-clock.sequenceStart:0;
 out.rotationValue=Number.isFinite(s.rotation)?s.rotation:0;
 if(s.sway)out.rotationValue=Math.sin(elapsed/s.sway.periodMs*Math.PI*2)*s.sway.amplitudeDeg;
 return out;
}
function settleSequence(previous,now){
 if(previous.kind==='start'){enter('active',{at:previous.at});return;}
 if(previous.kind==='click'){
  const preserve=previous.sequence.preserveAmbient===true;
  if(state.running){enter('active',{keepAmbient:preserve,at:previous.at});previewReturn=null;}
  else{
   const restore=previewReturn;
   heldFrame=previous.sequence.returnAppearance?decorate(previous.sequence.returnAppearance,null,now):restore?.held||null;
   pausedRun=restore?.pausedRun||pausedRun;
   // An explicit fill preview finishes at the filled appearance. If the timer
   // was already paused, resume the steady activity rather than refilling again.
   if(previous.sequence.returnAppearance&&state.remaining<duration()){
    const sequence=behavior().active;pausedRun={kind:'active',sequence,index:0,elapsed:0,sequenceElapsed:0,holding:false};
   }
   previewReturn=null;run=null;silence();
  }
  return;
 }
 if(previous.kind==='stop'){
  silence();run=null;heldFrame=previous.sequence.returnAppearance?decorate(previous.sequence.returnAppearance,null,now):null;return;
 }
 previous.index=previous.sequence.steps.length-1;previous.at-=previous.sequence.steps.at(-1).durationMs;previous.holding=true;run=previous;
}
function frame(now=performance.now()){
 if(!run){const s=heldFrame||behavior().idle;return heldFrame?{...s}:decorate(s,null,now);}
 if(run.holding)return decorate(run.sequence.steps[run.index],run,now);
 let safety=0;const gap=now-run.lastTick;run.lastTick=now;const playTransitions=!document.hidden&&gap<1000;
 while(run&&now-run.at>=run.sequence.steps[run.index].durationMs&&safety++<128){
  const current=run;current.at+=current.sequence.steps[current.index].durationMs;current.index++;
  if(current.index>=current.sequence.steps.length){
   if(current.sequence.loop)current.index=0;
   else{settleSequence(current,now);if(!run)return heldFrame?{...heldFrame}:decorate(behavior().idle,null,now);if(run.holding)break;continue;}
  }
  if(playTransitions)sound(current.sequence.steps[current.index].sound);
 }
 // Skip stale cycles after a long background suspension without firing a burst
 // of old per-step effects. The timer itself always uses the wall-clock deadline.
 if(run&&safety>=128){
  const total=run.sequence.steps.reduce((n,s)=>n+s.durationMs,0),elapsed=Math.max(0,now-run.sequenceStart);let t=run.sequence.loop?elapsed%total:Math.min(elapsed,total-1);run.index=0;
  while(run.index<run.sequence.steps.length-1&&t>=run.sequence.steps[run.index].durationMs){t-=run.sequence.steps[run.index].durationMs;run.index++;}
  run.at=now-t;
 }
 return run?decorate(run.sequence.steps[run.index],run,now):(heldFrame||decorate(behavior().idle,null,now));
}
function draw(){
 const s=frame(),activity=run?.kind||(pausedRun?'paused':'idle'),fit=run?.sequence.fit;
 renderer.draw(object(),s,views[state.view],{enhanced:state.enhanced,sharp:state.sharp,activity,running:state.running,fit});
}
function resetActivity({clearHeld=true}={}){silence();run=null;pausedRun=null;previewReturn=null;needsActivation=false;if(clearHeld)heldFrame=null;renderer.invalidate();}
function renderClock(){
 const status=!renderer.ready?'Loading…':state.running?'Running':run?.kind==='stop'?'Finishing':pausedRun?'Paused':'Ready';q('.sp-mode-status').textContent=status;
 const seconds=Math.ceil(remaining()/1000);q('.sp-clock').textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
}
function render(){
 const o=object();q('.sp-object-caption').textContent=o.label+'  '+views[state.view];q('.sp-selected-name').textContent=o.label;q('.sp-selected-name').style.maxWidth='255px';
 q('.sp-catalog').hidden=!state.catalogOpen;q('.sp-settings').hidden=!state.settingsOpen;root.classList.toggle('sp-catalog-hidden',!state.catalogOpen);q('.sp-buy').setAttribute('aria-expanded',String(state.catalogOpen));q('[data-action=settings]').setAttribute('aria-expanded',String(state.settingsOpen));q('.sp-disclosure-mark').textContent=state.settingsOpen?'▾':'▸';
 q('[data-action=start]').disabled=state.running||!renderer.ready;q('[data-action=start]').textContent=!state.running&&(pausedRun||state.remaining<duration())?'Resume':'Start';q('[data-action=pause]').disabled=!state.running;
 q('.sp-phase').value=state.mode;q('.sp-sound-button').textContent='Sound: '+(state.sound?'on':'off');q('.sp-sound-button').setAttribute('aria-pressed',String(state.sound));q('.sp-session').textContent='Session '+(state.done%state.every+1)+' of '+state.every;
 for(const input of root.querySelectorAll('[data-duration]'))if(document.activeElement!==input)input.value=state[input.dataset.duration];q('.sp-cycles').value=state.every;q('.sp-volume').value=state.volume;q('.sp-enhanced').checked=state.enhanced;q('.sp-sharp').checked=state.sharp;
 for(const b of root.querySelectorAll('.sp-tile'))b.setAttribute('aria-pressed',String(b.dataset.object===o.id));renderClock();draw();
}
function catalog(){
 const found=objects.filter(o=>(o.name+' '+o.pack).toLowerCase().includes(query.toLowerCase())),pages=Math.max(1,Math.ceil(found.length/8));page=Math.max(0,Math.min(page,pages-1));q('.sp-page-label').textContent=found.length?`${page+1} / ${pages}`:'0 results';q('[data-action=prev]').disabled=page===0;q('[data-action=next]').disabled=page>=pages-1;
 const grid=q('.sp-catalog-grid');grid.replaceChildren();if(!found.length){const p=document.createElement('p');p.className='sp-empty';p.textContent='No matching objects.';grid.append(p);return;}
 for(const o of found.slice(page*8,page*8+8)){
  const b=document.createElement('button');b.type='button';b.className='sp-tile';b.dataset.object=o.id;b.title=o.name;b.setAttribute('aria-label','Choose '+o.name);b.setAttribute('aria-pressed',String(o.id===state.objectId));
  const img=document.createElement('img'),v=views[R.defaultView(o)];img.src=o.sprites[behaviors[o.id].idle.state]?.[v]||Object.values(o.sprites).find(s=>s[v])?.[v];img.alt='';img.loading='lazy';
  const label=document.createElement('span');label.textContent=o.label;b.append(img,label);b.onclick=()=>select(o.id);grid.append(b);
 }
}
function select(id){
 if(id===state.objectId){state.view=R.defaultView(object());renderer.invalidate();render();persist();return;}
 const wasRunning=state.running;resetActivity();state.objectId=id;state.view=R.defaultView(object());needsActivation=wasRunning;
 renderer.prepare(object());render();say(behavior().hint||'Press Start to activate this object.');persist();
}
function start(){
 if(!renderer.ready||state.running)return;
 const saved=pausedRun;const hasPausedTimer=!!saved;const now=performance.now();
 if(!hasPausedTimer)resetActivity();else{silence();run=null;heldFrame=null;pausedRun=null;previewReturn=null;}
 if(state.remaining<=0)state.remaining=duration();state.running=true;state.endAt=Date.now()+state.remaining;
 if(saved&&saved.sequence===behavior()[saved.kind]){
  run={kind:saved.kind,sequence:saved.sequence,index:saved.index,at:now-saved.elapsed,sequenceStart:now-saved.sequenceElapsed,holding:saved.holding,lastTick:now};
  sound(run.sequence.sound,'ambient');sound(run.sequence.steps[run.index].sound);
 }else enter('start');
 say(behavior().hint||'Timer started.');render();persist();
}
function pause(){
 const now=performance.now(),s=frame(now);heldFrame={...s};
 if(run){pausedRun={kind:run.kind,sequence:run.sequence,index:run.index,elapsed:Math.min(now-run.at,run.sequence.steps[run.index].durationMs),sequenceElapsed:now-run.sequenceStart,holding:run.holding};}
 state.remaining=remaining();state.running=false;state.endAt=0;run=null;needsActivation=false;silence();renderer.invalidate();render();say('Paused.');persist();
}
function finish(){
 resetActivity();state.running=false;state.endAt=0;
 if(state.mode==='focus'){state.done++;state.mode=state.done%state.every===0?'long':'break';}else state.mode='focus';state.remaining=duration();
 if(behavior().stop)enter('stop');else if(behavior().endAppearance)heldFrame=decorate(behavior().endAppearance,null);
 render();say((state.mode==='focus'?'Focus':state.mode==='long'?'Long break':'Break')+' is ready. Start when you’re ready.');persist();
}
function turn(direction){
 const allowed=R.objectViews(object()),at=allowed.indexOf(views[state.view]),next=allowed[(Math.max(0,at)+direction+allowed.length)%allowed.length];state.view=views.indexOf(next);renderer.invalidate();
}
root.onclick=event=>{
 const action=event.target.closest('[data-action]')?.dataset.action;if(!action)return;
 if(action==='start')start();
 if(action==='pause'&&state.running)pause();
 if(action==='reset'){state.running=false;state.endAt=0;state.remaining=duration();resetActivity();say('Ready. Press Start.');}
 if(action==='catalog')state.catalogOpen=!state.catalogOpen;
 if(action==='settings')state.settingsOpen=!state.settingsOpen;
 if(action==='left'||action==='right')turn(action==='left'?-1:1);
 if(action==='prev'||action==='next'){page+=action==='next'?1:-1;catalog();}
 if(action==='sound'){
  state.sound=!state.sound;silence();if(state.sound&&run){sound(run.sequence.sound,'ambient');sound(run.sequence.steps[run.index].sound);}
 }
 render();persist();
};
q('.sp-sprite-button').onclick=()=>{
 if(!renderer.ready)return;
 if(behavior().click){previewReturn={held:heldFrame?{...heldFrame}:null,pausedRun};enter('click');say(behavior().hint||'Object interaction.');}
 else say(state.running?'This object is running.':'Press Start to activate this object.');renderer.invalidate();draw();
};
q('.sp-search').oninput=event=>{query=event.target.value;page=0;catalog();};
q('.sp-phase').onchange=event=>{if(state.running)pause();state.mode=event.target.value;state.running=false;state.endAt=0;state.remaining=duration();resetActivity();render();persist();};
for(const input of root.querySelectorAll('[data-duration]'))input.onchange=()=>{
 const n=Number(input.value);if(!Number.isFinite(n)||n<.05||n>1440){q('.sp-error').textContent='Enter 0.05 to 1440 minutes.';q('.sp-error').hidden=false;return;}
 q('.sp-error').hidden=true;state[input.dataset.duration]=n;if(input.dataset.duration===state.mode){state.running=false;state.endAt=0;state.remaining=duration();resetActivity();}render();persist();
};
q('.sp-cycles').onchange=event=>{const n=Number(event.target.value);if(Number.isInteger(n)&&n>=1&&n<=12)state.every=n;render();persist();};
q('.sp-volume').oninput=event=>{state.volume=Number(event.target.value);for(const a of channels.values())a.volume=Math.max(0,Math.min(1,state.volume*Number(a.dataset.gain||1)));persist();};
q('.sp-enhanced').onchange=event=>{state.enhanced=event.target.checked;renderer.invalidate();draw();persist();};
q('.sp-sharp').onchange=event=>{state.sharp=event.target.checked;renderer.invalidate();draw();persist();};
document.addEventListener('visibilitychange',()=>{
 if(document.hidden){silence();return;}
 if(state.running){if(remaining()<=0)finish();else{frame();if(run){sound(run.sequence.sound,'ambient');const current=run.sequence.steps[run.index];if(!run.sequence.sound)sound(current.sound);}}}
});
window.addEventListener('pagehide',()=>{persist();silence();});new ResizeObserver(()=>{renderer.invalidate();draw();}).observe(q('.sp-object'));
catalog();render();renderer.prepare(object());say(behavior().hint||'Press Start to activate this object.');
let lastSave=0;setInterval(()=>{if(state.running&&remaining()<=0)finish();draw();renderClock();if(state.running&&Date.now()-lastSave>5000){lastSave=Date.now();persist();}},40);
})();
