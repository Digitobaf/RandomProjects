"""Current SimPom revision checks: native originals, copied recipes and selected channels."""
from pathlib import Path
import json,hashlib
from playwright.sync_api import sync_playwright
from app_support import configure
app,output,url,chromium=configure();errors=[]
with sync_playwright()as p:
 browser=p.chromium.launch(executable_path=chromium,args=['--no-sandbox','--disable-dev-shm-usage']);page=browser.new_page(viewport={'width':1000,'height':900})
 page.on('pageerror',lambda e:errors.append(str(e)));page.add_init_script('window.offset=0;const now=performance.now.bind(performance);performance.now=()=>now()+offset;window.soundEvents=[];const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){soundEvents.push({event:this.dataset.event,loop:this.loop});return play.call(this);}')
 page.goto(url+'/SimPom.html');page.wait_for_function('!document.querySelector("[data-action=start]").disabled')
 def select(id):
  page.click('[data-action=reset]');name=page.evaluate('id=>SIMS_OBJECTS.find(o=>o.id===id).name',id);page.fill('.sp-search',name);page.locator('[data-object="'+id+'"]').click();page.wait_for_function('id=>document.querySelector(".sp-canvas").dataset.object===id&&!document.querySelector("[data-action=start]").disabled',arg=id)
 def advance(ms):page.evaluate('ms=>offset+=ms',ms);page.wait_for_timeout(90)
 data=page.evaluate('''()=>{
 const R=SimPomRaster,ids=SIMS_OBJECTS.map(o=>o.id),missing=[],refs=new Set();
 for(const o of SIMS_OBJECTS){const b=SIMS_BEHAVIORS[o.id];for(const s of [...R.frames(b),b.render?.base,...Object.values(b.render?.phaseBases||{})].filter(Boolean))for(const v of R.objectViews(o)){for(const n of[s.state,...s.extraStates||[]]){const src=o.sprites[n]?.[v];if(!src)missing.push(o.id+' state '+n+' '+v);else refs.add(src);}for(const n of [...s.layers||[],...s.eraseLayers||[],...s.restoreLayers||[]]){const src=o.layers[n]?.views[v];if(!src)missing.push(o.id+' layer '+n+' '+v);else refs.add(src);}}for(const sound of Object.values(o.sounds))for(const clip of sound.clips)refs.add(clip.file);}
 for(const u of Object.values(SIMS_UPSCALES))refs.add(u.file);
 return {ids,missing,refs:[...refs],channels:Object.fromEntries(['1b833d24','5fa381c1','fc8d548b'].map(id=>[id,{...SIMS_BEHAVIORS[id].channel,frames:SIMS_BEHAVIORS[id].active.steps.map(s=>s.state)}])),fire:SIMS_BEHAVIORS['8eaa68ad'].active.sound||null,mudStreamLayers:['start','click'].flatMap(k=>SIMS_BEHAVIORS['52ae7a4e'][k].steps.flatMap(s=>s.layers||[])).filter(n=>n>=18&&n<=20)};
}''')
 assert len(data['ids'])==95 and not(set(data['ids'])&{'34fe4e17','17fee456','33a951ec','331f2000','3c6b497b'});assert not data['missing'],data['missing'];assert not data['mudStreamLayers'];assert data['fire']is None
 assert data['channels']['1b833d24']['frames']==[1,2,3];assert data['channels']['5fa381c1']['frames']==[10,11,12];assert data['channels']['fc8d548b']['frames']==[7,8,9]
 assert page.locator('.sp-count').inner_text()=='95 picks'
 # Exact doubled-size original rendering stays selected across power-on and programme changes.
 doubled=[]
 for id in ['d191aff7','d191ff6a','bb626ef3','2a3d8714']:
  select(id);page.click('[data-action=start]');advance(1400);d=page.locator('.sp-canvas').evaluate('e=>({...e.dataset})');assert d['enhanced']=='false' and float(d['scale'])==2,d;doubled.append(id)
 # Fire settles into a visually running but silent active state; rejected audio cannot play.
 select('8eaa68ad');page.evaluate('soundEvents=[]');page.click('[data-action=start]');advance(3000);assert page.locator('.sp-canvas').get_attribute('data-activity')=='active';assert page.locator('audio').count()==0;assert all(e['event']!='fire_burning'for e in page.evaluate('soundEvents'))
 # Boggs chops once, holds the final sliced-apple and filled pot and loops its real boiling clip.
 select('ad0b9dd6');page.click('[data-action=start]');advance(2000);page.wait_for_function('!!document.querySelector("audio[loop]")?.currentTime');assert page.locator('.sp-canvas').get_attribute('data-layers')=='3';assert page.locator('audio[loop]').get_attribute('data-event')=='stove_bubble';advance(5000);assert page.locator('.sp-canvas').get_attribute('data-layers')=='3'
 # The steamer opens and recloses before its matching audio loops.
 select('eea95801');page.click('[data-action=start]');advance(1800);assert page.locator('.sp-canvas').get_attribute('data-graphic')=='0';assert page.locator('audio[loop]').get_attribute('data-event')=='steamer_loop';advance(5000);assert page.locator('.sp-canvas').get_attribute('data-graphic')=='0'
 # Tank movement exists, but native door/pump pixels are identical in every pose.
 interior=page.evaluate('''async()=>{const R=SimPomRaster,o=SIMS_OBJECTS.find(o=>o.id==='645542df'),b=SIMS_BEHAVIORS[o.id],m=SIMPOM_MOTION[o.id],images=new Map();for(const sprites of Object.values(o.sprites))for(const src of Object.values(sprites)){const im=new Image();im.src=src;await im.decode();images.set(src,im);}const result=[];for(const v of R.objectViews(o)){const {width:w,height:h}=o.canvas[v],mask=R.canvas(w,h),x=mask.getContext('2d');x.fill(R.runsPath(m.foreground[v]));const fixed=x.getImageData(0,0,w,h).data;let prior,changes=0,protectedChanges=0;for(const s of b.active.steps){const a=R.compose(o,s,v,b,src=>images.get(src),m).getContext('2d').getImageData(0,0,w,h).data;if(prior)for(let i=0;i<w*h;i++){let changed=false;for(let k=0;k<4;k++)if(a[i*4+k]!==prior[i*4+k])changed=true;if(changed){changes++;if(fixed[i*4+3])protectedChanges++;}}prior=a;}result.push({view:v,changes,protectedChanges});}return result;}''')
 assert all(c['changes']>0 and c['protectedChanges']==0 for c in interior),interior
 # A fixed tank's idle image must remain the original image after patching. This
 # catches the old clipped-edge dark lines even when no sprite pixels change.
 seamCheck=page.evaluate('''async()=>{const c=document.createElement('canvas');c.style='width:500px;height:500px;position:fixed;left:0;top:0';document.body.append(c);const rr=SimPomRenderer.create({canvas:c,objects:SIMS_OBJECTS,behaviors:SIMS_BEHAVIORS,upscales:SIMS_UPSCALES,motion:SIMPOM_MOTION}),result=[];for(const id of ['645542df','dbeb6614','42c078b3','eea95801']){const o=SIMS_OBJECTS.find(o=>o.id===id),r=SIMS_BEHAVIORS[id];await rr.prepare(o);for(const v of SimPomRaster.objectViews(o)){rr.draw(o,r.idle,v,{enhanced:false,activity:'idle'});const source=rr.native(o,r.idle,v),box=SIMPOM_MOTION[id].fitBounds[v],allowed=SimPomRaster.objectViews(o).map(v=>SIMPOM_MOTION[id].fitBounds[v]),scale=Math.min(458/Math.max(...allowed.map(b=>b.width)),472/Math.max(...allowed.map(b=>b.height))),expected=SimPomRaster.canvas(500,500),x=expected.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.translate(250-(box.x+box.width/2)*scale,250-(box.y+box.height/2)*scale);x.scale(scale,scale);x.drawImage(source,0,0,o.canvas[v].width,o.canvas[v].height);const a=c.getContext('2d').getImageData(0,0,500,500).data,b=x.getImageData(0,0,500,500).data;let bad=0,max=0;for(let i=0;i<a.length;i++){const delta=Math.abs(a[i]-b[i]);if(delta>3)bad++;max=Math.max(max,delta);}result.push({id,view:v,changedChannels:bad,maxDifference:max});}}c.remove();return result;}''')
 assert all(r['changedChannels']==0 for r in seamCheck),seamCheck
 # All remaining authored pose/view combinations load with fixed animation scale.
 draws=page.evaluate('''async()=>{const c=document.createElement('canvas');c.style='position:fixed;left:0;top:0;width:420px;height:330px';document.body.append(c);const rr=SimPomRenderer.create({canvas:c,objects:SIMS_OBJECTS,behaviors:SIMS_BEHAVIORS,upscales:SIMS_UPSCALES,motion:SIMPOM_MOTION,onError:s=>{throw Error(s)}}),result=[];for(const o of SIMS_OBJECTS){await rr.prepare(o);let count=0;for(const v of SimPomRaster.objectViews(o)){let scale;for(const s of SimPomRaster.frames(SIMS_BEHAVIORS[o.id],{includeTransient:false})){rr.draw(o,s,v,{enhanced:true,activity:'active'});if(scale&&scale!==c.dataset.scale)throw Error(o.name+' scale changed');scale=c.dataset.scale;count++;}}result.push({id:o.id,draws:count});}c.remove();return result;}''')
 # User timer preferences and phase completion survive the revision.
 select('bb626ef3');page.click('[data-action=settings]');page.fill('[data-duration=focus]','.05');page.locator('[data-duration=focus]').dispatch_event('change');page.fill('[data-duration=break]','19');page.locator('[data-duration=break]').dispatch_event('change');page.click('[data-action=start]');page.wait_for_timeout(3300);assert page.locator('.sp-phase').input_value()=='break';page.reload();page.wait_for_function('!document.querySelector("[data-action=start]").disabled');assert page.locator('[data-duration=break]').input_value()=='19'
 for width in [320,480,920]:page.set_viewport_size({'width':width,'height':1000});page.wait_for_timeout(60);assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
 assert not errors,errors;browser.close()
manifest=json.loads((app/'assets/manifest.json').read_text())['assets']
for src in data['refs']:assert src in manifest,src
for name,record in manifest.items():
 content=(app/name).read_bytes();assert len(content)==record['bytes']and hashlib.sha256(content).hexdigest()==record['sha256'],name
report={'version':'pollux-review-v3','objects':95,'removedObjectsAbsent':True,'catalogCount':95,'doubledOriginals':doubled,'channelImages':data['channels'],'pendingAudio':['user-supplied fireplace loop','TV Action programme','TV Cartoons programme','TV Romance programme'],'rejectedFireAudioUnreachable':True,'mudPourStreamOmitted':True,'boggsHoldsChoppedApplesAndFilledPot':True,'boggsBoilingAudioPlaysAndLoops':True,'steamerStaysClosedAndLoopsAudio':True,'playhouseInterior':interior,'poseViewDraws':sum(x['draws']for x in draws),'scaleChanges':0,'mediaChecksums':len(manifest),'allReferencedMediaPresent':True,'customDurationsPersistAfterTimerExpiry':True,'responsiveWidths':[320,480,920],'seamChecks':seamCheck,'pageErrors':errors}
(output/'VERIFICATION-v3.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
