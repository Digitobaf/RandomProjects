(()=>{
'use strict';
const objects=window.SIMS_OBJECTS,behaviors=window.SIMS_BEHAVIORS,upscales=window.SIMS_UPSCALES||{},views=['NE','SE','SW','NW'],root=document.querySelector('#sims-pomodoro-preview'),q=s=>root.querySelector(s),key='sims-pomodoro-mockup:v3';
let state={objectId:'98e0f8bd',view:0,focus:25,break:15,long:30,every:4,done:0,mode:'focus',remaining:1500000,endAt:0,running:false,sound:true,volume:.5,enhanced:true,sharp:false,catalogOpen:true,settingsOpen:false};
let run=null,page=0,query='',drawKey='',audioEpoch=0,loadEpoch=0;const channels=new Map(),images=new Map(),composites=new Map(),prepared=new Map();
const object=()=>objects.find(o=>o.id===state.objectId)||objects[0],behavior=()=>behaviors[object().id],duration=()=>Math.round(state[state.mode]*60000),remaining=()=>state.running?Math.max(0,state.endAt-Date.now()):state.remaining;
const say=t=>q('.sp-announcement').textContent=t;
function save(){try{localStorage.setItem(key,JSON.stringify({...state,remaining:remaining(),running:false,endAt:0}));}catch{}}
try{const s=JSON.parse(localStorage.getItem(key)||'{}');for(const k of['focus','break','long'])if(Number.isFinite(s[k])&&s[k]>=.05&&s[k]<=1440)state[k]=s[k];if(objects.some(o=>o.id===s.objectId))state.objectId=s.objectId;if(Number.isInteger(s.view))state.view=((s.view%4)+4)%4;if(['focus','break','long'].includes(s.mode))state.mode=s.mode;for(const k of['sound','enhanced','sharp','catalogOpen','settingsOpen'])if(typeof s[k]==='boolean')state[k]=s[k];if(Number.isFinite(s.volume)&&s.volume>=0&&s.volume<=1)state.volume=s.volume;if(Number.isInteger(s.every)&&s.every>=1&&s.every<=12)state.every=s.every;if(Number.isInteger(s.done)&&s.done>=0)state.done=s.done;state.remaining=Number.isFinite(s.remaining)&&s.remaining>=0&&s.remaining<=duration()?s.remaining:duration();}catch{}
function stopChannel(name){const a=channels.get(name);if(a){a.pause();a.remove();channels.delete(name);}}
function silence(){audioEpoch++;for(const k of [...channels.keys()])stopChannel(k);}
function sound(spec,defaultChannel='effect'){
 if(!spec)return;const e=typeof spec==='string'?{event:spec}:spec,name=e.channel||defaultChannel;
 if(e.stop){stopChannel(name);return;}stopChannel(name);
 if(!state.sound||document.hidden)return;const s=object().sounds[e.event];if(!s?.clips.length)return;
 const clip=s.clips[Math.floor(Math.random()*s.clips.length)],a=new Audio(clip.file),epoch=audioEpoch;
 a.loop=e.loop??s.loop===true;a.volume=state.volume*(e.gain??1);a.hidden=true;a.dataset.event=e.event;a.dataset.channel=name;a.dataset.object=object().id;root.append(a);channels.set(name,a);
 const clear=()=>{if(channels.get(name)===a){channels.delete(name);a.remove();}};
 a.addEventListener('ended',clear);a.addEventListener('error',()=>{if(epoch===audioEpoch&&channels.get(name)===a){clear();say('A sound could not load. Keep the assets folder beside the mockup.');}});
 a.play().catch(err=>{if(epoch===audioEpoch&&channels.get(name)===a&&err.name!=='AbortError'){clear();say('Sound is blocked. Click Sound off, then on to try again.');}});
}
function enter(kind,{quiet=false}={}){
 const seq=behavior()[kind];if(!seq){if(kind==='start')enter('active',{quiet});else run=null;return;}
 silence();run={kind,sequence:seq,index:0,at:performance.now(),lastIndex:0};
 if(!quiet){sound(seq.sound,'ambient');sound(seq.steps[0].sound);}drawKey='';
}
function frame(now=performance.now()){
 if(!run)return behavior().idle;
 let safety=0;
 while(now-run.at>=run.sequence.steps[run.index].durationMs&&safety++<100){
  run.at+=run.sequence.steps[run.index].durationMs;run.index++;
  if(run.index>=run.sequence.steps.length){
   if(run.sequence.loop){run.index=0;}
   else{const kind=run.kind;
    if(kind==='start'){enter('active');return frame(now);}
    if(kind==='click'){if(state.running)enter('active');else{silence();run=null;}return run?frame(now):behavior().idle;}
    if(kind==='stop'){silence();run=null;return behavior().idle;}
    run.index=run.sequence.steps.length-1;run.at=now;break;
   }
  }
  sound(run.sequence.steps[run.index].sound);
 }
 if(safety>=100)run.at=now;
 return run.sequence.steps[run.index];
}
function image(src){if(!src)return null;if(!images.has(src)){const im=new Image();im.src=src;images.set(src,im);im.onload=()=>{drawKey='';};im.onerror=()=>say('An image is missing. Extract the entire ZIP, keeping its folders.');}return images.get(src);}
function specKey(s){return JSON.stringify({state:s.state,layers:s.layers||[],extraStates:s.extraStates||[],layerOffsets:s.layerOffsets||{}});}
function baseComposite(o,s,v){
 const k=o.id+':'+v+':'+specKey(s);if(composites.has(k))return composites.get(k);
 const c=o.canvas[v],canvas=document.createElement('canvas');canvas.width=c.width;canvas.height=c.height;const ctx=canvas.getContext('2d');let complete=true;
 function draw(src,dx=0,dy=0){if(!src)return;const im=image(src);if(!im.complete||!im.naturalWidth){complete=false;return;}ctx.drawImage(im,dx,dy);}
 draw(o.sprites[s.state]?.[v]);for(const n of s.extraStates||[])draw(o.sprites[n]?.[v]);for(const n of s.layers||[]){const off=s.layerOffsets?.[n]||{};draw(o.layers[n]?.views[v],off.x||0,off.y||0);}
 if(complete)composites.set(k,canvas);return complete?canvas:null;
}
function frameBounds(o,s,v){const bs=[];for(const n of[s.state,...(s.extraStates||[])]){const b=o.bboxes[n]?.[v];if(b)bs.push(b);}for(const n of s.layers||[]){const b=o.layers[n]?.bbox[v],off=s.layerOffsets?.[n]||{};if(b)bs.push({...b,x:b.x+(off.x||0),y:b.y+(off.y||0)});}if(!bs.length)return null;const x=Math.min(...bs.map(b=>b.x)),y=Math.min(...bs.map(b=>b.y)),xx=Math.max(...bs.map(b=>b.x+b.width)),yy=Math.max(...bs.map(b=>b.y+b.height));return {x,y,width:xx-x,height:yy-y};}
function enhancedComposite(o,s,v,original){
 const a=upscales[o.id];if(!a)return null;const row=a.keys.indexOf(specKey(s));if(row<0)return null;
 const im=image(a.file);if(!im?.complete||!im.naturalWidth)return null;const cacheKey=o.id+':'+row+':'+v;if(prepared.has(cacheKey))return prepared.get(cacheKey);
 const sx=im.naturalWidth/a.width,sy=im.naturalHeight/a.height,col=views.indexOf(v),c=o.canvas[v];
 const rb=a.generatedBounds?.[row]?.[v],ob=frameBounds(o,s,v);if(!rb||!ob)return null;
 // Preserve the exact source silhouette and location. Generated detail is a texture
 // inside that mask, preventing stray alpha speckles or geometry drift.
 const factor=4,output=document.createElement('canvas');output.width=c.width*factor;output.height=c.height*factor;const ctx=output.getContext('2d');ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
 ctx.drawImage(original,0,0,output.width,output.height);
 ctx.drawImage(im,rb.x,rb.y,rb.width,rb.height,ob.x*factor,ob.y*factor,ob.width*factor,ob.height*factor);
 ctx.globalCompositeOperation='destination-in';ctx.drawImage(original,0,0,output.width,output.height);
 prepared.set(cacheKey,output);return output;
}
const canvas=q('.sp-canvas'),ctx=canvas.getContext('2d');
function draw(force=false){
 const o=object(),v=views[state.view],s=frame(),rect=canvas.getBoundingClientRect(),w=rect.width,h=rect.height,dpr=Math.min(2,devicePixelRatio||1);
 if(!w||!h)return;const dk=[o.id,v,specKey(s),s.light,w,h,state.enhanced,state.sharp,run?.kind||'idle',state.running].join(':');if(!force&&dk===drawKey)return;
 const original=baseComposite(o,s,v);if(!original)return;
 const enhanced=state.enhanced?enhancedComposite(o,s,v,original):null;const art=enhanced||original;
 const maxW=Math.max(...Object.values(o.bounds).map(b=>b.width)),maxH=Math.max(...Object.values(o.bounds).map(b=>b.height)),pivot=o.pivots[v],b=frameBounds(o,s,v);let scale=Math.min((w-42)/maxW,(h-28)/maxH);
 // Oversized transient effects (e.g. gnome explosion) must fit, without moving the pivot.
 if(b){const extentX=Math.max(Math.abs(b.x-pivot.x),Math.abs(b.x+b.width-pivot.x)),extentY=Math.max(Math.abs(b.y-pivot.y),Math.abs(b.y+b.height-pivot.y));scale=Math.min(scale,(w/2-8)/extentX,(h/2-8)/extentY);}
 canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.imageSmoothingEnabled=!state.sharp;ctx.imageSmoothingQuality='high';canvas.style.imageRendering=state.sharp?'pixelated':'auto';
 const x=w/2-pivot.x*scale,y=h/2-pivot.y*scale,c=o.canvas[v];ctx.drawImage(art,x,y,c.width*scale,c.height*scale);
 if(s.light&&behavior().light?.polygons[v]){const light=behavior().light;ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);ctx.beginPath();light.polygons[v].forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.closePath();ctx.fillStyle=light.color;ctx.globalCompositeOperation='screen';ctx.globalAlpha=.65;ctx.shadowColor=light.color;ctx.shadowBlur=5;ctx.fill();ctx.restore();}
 drawKey=dk;canvas.dataset.object=o.id;canvas.dataset.graphic=s.state;canvas.dataset.layers=(s.layers||[]).join(',');canvas.dataset.activity=run?.kind||'idle';canvas.dataset.enhanced=String(!!enhanced);canvas.dataset.lit=String(!!s.light);canvas.dataset.scale=scale;canvas.dataset.pivotX=w/2;canvas.dataset.pivotY=h/2;canvas.setAttribute('aria-label',o.name+', '+v+(state.running?', active':', idle'));
}
async function prepareObject(){
 const epoch=++loadEpoch,o=object(),sources=new Set();
 const r=behavior(),specs=[r.idle,...['start','active','click','stop'].flatMap(k=>r[k]?.steps||[])];
 for(const spec of specs){for(const n of[spec.state,...(spec.extraStates||[])])for(const src of Object.values(o.sprites[n]||{}))sources.add(src);for(const n of spec.layers||[])for(const src of Object.values(o.layers[n]?.views||{}))sources.add(src);}
 for(const src of images.keys())if(!sources.has(src)&&src!==upscales[o.id]?.file)images.delete(src);
 if(upscales[o.id])sources.add(upscales[o.id].file);
 await Promise.all([...sources].map(src=>image(src).decode().catch(()=>{})));
 if(epoch===loadEpoch){drawKey='';draw(true);}
 // Keep only the current object's composites; avoid building up memory browsing all 100.
 for(const k of composites.keys())if(!k.startsWith(o.id+':'))composites.delete(k);
 for(const k of prepared.keys())if(!k.startsWith(o.id+':'))prepared.delete(k);
}
function renderClock(){q('.sp-mode-status').textContent=state.running?'Running':run?.kind==='stop'?'Finishing':'Ready';const sec=Math.ceil(remaining()/1000);q('.sp-clock').textContent=String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');}
function render(){
 const o=object();q('.sp-object-caption').textContent=o.label+'  '+views[state.view];q('.sp-selected-name').textContent=o.label;q('.sp-selected-name').style.maxWidth='255px';
 q('.sp-catalog').hidden=!state.catalogOpen;q('.sp-settings').hidden=!state.settingsOpen;root.classList.toggle('sp-catalog-hidden',!state.catalogOpen);q('.sp-buy').setAttribute('aria-expanded',state.catalogOpen);q('[data-action=settings]').setAttribute('aria-expanded',state.settingsOpen);q('.sp-disclosure-mark').textContent=state.settingsOpen?'▾':'▸';
 q('[data-action=start]').disabled=state.running;q('[data-action=start]').textContent=!state.running&&state.remaining<duration()?'Resume':'Start';q('[data-action=pause]').disabled=!state.running;q('.sp-phase').value=state.mode;
 q('.sp-sound-button').textContent='Sound: '+(state.sound?'on':'off');q('.sp-sound-button').setAttribute('aria-pressed',state.sound);q('.sp-session').textContent='Session '+(state.done%state.every+1)+' of '+state.every;
 for(const input of root.querySelectorAll('[data-duration]'))if(document.activeElement!==input)input.value=state[input.dataset.duration];q('.sp-cycles').value=state.every;q('.sp-volume').value=state.volume;q('.sp-enhanced').checked=state.enhanced;q('.sp-sharp').checked=state.sharp;
 q('.sp-mode-status').textContent=state.running?'Running':run?.kind==='stop'?'Finishing':'Ready';renderClock();draw(true);
 for(const b of root.querySelectorAll('.sp-tile'))b.setAttribute('aria-pressed',b.dataset.object===o.id);
}
function showCatalog(){
 const result=objects.filter(o=>(o.name+' '+o.pack).toLowerCase().includes(query.toLowerCase())),pages=Math.max(1,Math.ceil(result.length/8));page=Math.max(0,Math.min(page,pages-1));q('.sp-page-label').textContent=(result.length?`${page+1} / ${pages}`:'0 results');q('[data-action=prev]').disabled=page===0;q('[data-action=next]').disabled=page>=pages-1;const grid=q('.sp-catalog-grid');grid.replaceChildren();
 if(!result.length){const p=document.createElement('p');p.className='sp-empty';p.textContent='No matching objects.';grid.append(p);return;}
 for(const o of result.slice(page*8,page*8+8)){const b=document.createElement('button');b.type='button';b.className='sp-tile';b.dataset.object=o.id;b.title=o.name;b.setAttribute('aria-label','Choose '+o.name);b.setAttribute('aria-pressed',o.id===state.objectId);const img=document.createElement('img');img.src=o.sprites[behaviors[o.id].idle.state]?.NE||Object.values(o.sprites).find(v=>v.NE)?.NE;img.alt='';img.loading='lazy';const label=document.createElement('span');label.textContent=o.label;b.append(img,label);b.onclick=()=>select(o.id);grid.append(b);}
}
function select(id){state.objectId=id;silence();run=null;if(state.running)enter('start');prepareObject();render();say(behavior().hint||'Press Start to activate this object.');save();}
function finish(){silence();run=null;state.running=false;state.endAt=0;if(state.mode==='focus'){state.done++;state.mode=state.done%state.every===0?'long':'break';}else state.mode='focus';state.remaining=duration();if(behavior().stop)enter('stop');render();say((state.mode==='focus'?'Focus':state.mode==='long'?'Long break':'Break')+' is ready. Start when you’re ready.');save();}
function pause(){state.remaining=remaining();state.running=false;state.endAt=0;silence();run=null;render();say('Paused.');save();}
root.onclick=e=>{const action=e.target.closest('[data-action]')?.dataset.action;if(!action)return;
 if(action==='start'){if(state.remaining<=0)state.remaining=duration();state.running=true;state.endAt=Date.now()+state.remaining;enter('start');say(behavior().hint||'Timer started.');}
 if(action==='pause')pause();
 if(action==='reset'){state.running=false;state.endAt=0;state.remaining=duration();silence();run=null;say('Ready. Press Start.');}
 if(action==='catalog')state.catalogOpen=!state.catalogOpen;
 if(action==='settings')state.settingsOpen=!state.settingsOpen;
 if(action==='left'||action==='right')state.view=(state.view+(action==='left'?3:1))%4;
 if(action==='prev'||action==='next'){page+=action==='next'?1:-1;showCatalog();}
 if(action==='sound'){state.sound=!state.sound;silence();if(state.sound&&run){sound(run.sequence.sound,'ambient');sound(run.sequence.steps[run.index].sound);}}
 render();save();};
q('.sp-sprite-button').onclick=()=>{if(behavior().click){enter('click');say(behavior().hint||'Object interaction.');}else say(state.running?'This object is running.':'Press Start to activate this object.');drawKey='';};
q('.sp-search').oninput=e=>{query=e.target.value;page=0;showCatalog();};
q('.sp-phase').onchange=e=>{pause();state.mode=e.target.value;state.remaining=duration();render();save();};
for(const input of root.querySelectorAll('[data-duration]'))input.onchange=()=>{const n=Number(input.value);if(!Number.isFinite(n)||n<.05||n>1440){q('.sp-error').textContent='Enter 0.05 to 1440 minutes.';q('.sp-error').hidden=false;return;}q('.sp-error').hidden=true;state[input.dataset.duration]=n;if(input.dataset.duration===state.mode){state.running=false;state.endAt=0;state.remaining=duration();silence();run=null;}render();save();};
q('.sp-cycles').onchange=e=>{const n=Number(e.target.value);if(Number.isInteger(n)&&n>=1&&n<=12)state.every=n;render();save();};
q('.sp-volume').oninput=e=>{state.volume=Number(e.target.value);for(const a of channels.values())a.volume=state.volume;save();};
q('.sp-enhanced').onchange=e=>{state.enhanced=e.target.checked;drawKey='';draw(true);save();};q('.sp-sharp').onchange=e=>{state.sharp=e.target.checked;drawKey='';draw(true);save();};
document.addEventListener('visibilitychange',()=>{if(document.hidden)silence();else if(state.running){if(remaining()<=0)finish();else if(run)sound(run.sequence.sound,'ambient');}});
window.addEventListener('pagehide',()=>{save();silence();});new ResizeObserver(()=>{drawKey='';draw(true);}).observe(q('.sp-object'));
showCatalog();render();prepareObject();say(behavior().hint||'Press Start to activate this object.');
let lastSave=0;setInterval(()=>{if(state.running&&remaining()<=0)finish();draw();renderClock();if(state.running&&Date.now()-lastSave>5000){lastSave=Date.now();save();}},40);
})();
