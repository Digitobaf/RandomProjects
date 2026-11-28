from playwright.sync_api import sync_playwright
from pathlib import Path
import json, hashlib, wave, numpy as np
from app_support import configure
app,root,url,chromium=configure();out={};errors=[]
with sync_playwright()as p:
 b=p.chromium.launch(executable_path=chromium,args=['--no-sandbox','--disable-dev-shm-usage']);g=b.new_page(viewport={'width':1000,'height':1000});g.on('pageerror',lambda e:errors.append(str(e)));g.goto(url+'/SimPom.html');g.wait_for_function('!document.querySelector("[data-action=start]").disabled')
 out['data']=g.evaluate('''()=>{const R=SimPomRaster,errors=[],references=new Set();for(const o of SIMS_OBJECTS){const b=SIMS_BEHAVIORS[o.id];for(const s of [...R.frames(b),b.render?.base,...Object.values(b.render?.phaseBases||{})].filter(Boolean))for(const v of R.objectViews(o)){for(const n of [s.state,...(s.extraStates||[])]){if(!o.sprites[n]?.[v])errors.push(o.name+' missing state '+n+' '+v);else references.add(o.sprites[n][v]);}for(const n of [...(s.layers||[]),...(s.eraseLayers||[]),...(s.restoreLayers||[])]){if(!o.layers[n]?.views[v])errors.push(o.name+' missing layer '+n+' '+v);else references.add(o.layers[n].views[v]);}}for(const s of Object.values(o.sounds))for(const c of s.clips)references.add(c.file);}for(const a of Object.values(SIMS_UPSCALES))references.add(a.file);return {errors,references:[...references]};}''')
 assert not out['data']['errors'],out['data']['errors']
 out['pixels']=g.evaluate('''async()=>{
 const R=SimPomRaster,c=document.createElement('canvas');c.style='width:500px;height:500px;position:fixed;left:0;top:0';document.body.append(c);const rr=SimPomRenderer.create({canvas:c,objects:SIMS_OBJECTS,behaviors:SIMS_BEHAVIORS,upscales:SIMS_UPSCALES,motion:SIMPOM_MOTION}),checks=[];
 for(const id of ['d191aff7','d191ff6a','1b833d24','5fa381c1','fc8d548b','dbeb6614','4126d70f','8613a26a','663eaffc','f784f104']){
 const o=SIMS_OBJECTS.find(o=>o.id===id),rule=SIMS_BEHAVIORS[id];await rr.prepare(o);for(const v of R.objectViews(o)){
 const m=SIMPOM_MOTION[id],box=m.fitBounds[v],allowed=R.objectViews(o).map(v=>m.fitBounds[v]),scale=Math.min(458/Math.max(...allowed.map(b=>b.width)),472/Math.max(...allowed.map(b=>b.height))),x=250-(box.x+box.width/2)*scale,y=250-(box.y+box.height/2)*scale;
 const mask=document.createElement('canvas');mask.width=c.width||500;mask.height=c.height||500;const k=mask.getContext('2d');k.translate(x,y);k.scale(scale,scale);const regions=rule.render?.regions?.[v];if(regions?.length)k.fill(R.polygon(regions));else if(rule.render?.lockBody){}else k.fill(R.runsPath(m.masks[v]));
 // Exclude one rendered pixel around ROI edges for interpolation.
 k.setTransform(1,0,0,1,0,0);k.globalCompositeOperation='source-over';k.filter='blur(2px)';k.drawImage(mask,0,0);const region=k.getImageData(0,0,500,500).data;
 const variants=rule.active.steps;let previous,changes=0,outside=0;
 for(const s of variants){rr.invalidate();rr.draw(o,s,v,{enhanced:true,activity:'active'});const pix=c.getContext('2d').getImageData(0,0,500,500).data;if(previous)for(let i=0;i<500*500;i++){let delta=0;for(let j=0;j<4;j++)delta=Math.max(delta,Math.abs(pix[i*4+j]-previous[i*4+j]));if(delta>3){changes++;if(!region[i*4+3])outside++;}}previous=pix;}
 checks.push({id,view:v,changes,outside});
 }}c.remove();return checks;
}''')
 assert all(c['outside']==0 for c in out['pixels']),[c for c in out['pixels'] if c['outside']]
 # Loop declarations and forbidden poses are user requirements, not inferred names.
 out['recipes']=g.evaluate('''()=>{const b=SIMS_BEHAVIORS,results={};for(const id of ['c7a7215c','8fed54c2','58dde126','5bfb6140','1772dd4f','645542df','eea95801','8eaa68ad'])results[id]=b[id].active.sound;results.poseidon=SIMS_OBJECTS.find(o=>o.id==='98e0f8bd').allowedViews;results.bull=b['5e8b157a'].active.steps.map(s=>s.state);results.bubble=b['f718d902'].active.steps.map(s=>({state:s.state,layers:s.layers}));results.slide=[...SimPomRaster.frames(b['77d26881']).flatMap(s=>s.sound?[s.sound.event]:[]),...['start','active','click','stop'].flatMap(k=>b['77d26881'][k]?.sound?[b['77d26881'][k].sound.event]:[])].filter(Boolean);return results;}''')
 for id in ['c7a7215c','8fed54c2','58dde126','5bfb6140','1772dd4f','645542df','eea95801','8eaa68ad']:assert out['recipes'][id]['loop'] is True
 assert 3 not in out['recipes']['bull'];assert out['recipes']['poseidon']==['NE','NW'];assert all(s['state']==0 for s in out['recipes']['bubble']);assert out['recipes']['slide'] and all('splash' in s for s in out['recipes']['slide'])
 # A short actual wall-clock timer must finish, advance phase and retain custom durations.
 g.click('[data-action=settings]');g.fill('[data-duration=focus]','.05');g.locator('[data-duration=focus]').dispatch_event('change');g.fill('[data-duration=break]','22');g.locator('[data-duration=break]').dispatch_event('change');g.click('[data-action=start]');g.wait_for_timeout(3300)
 assert g.locator('.sp-phase').input_value()=='break';assert g.locator('.sp-clock').inner_text()=='22:00'
 g.reload();g.wait_for_function('!document.querySelector("[data-action=start]").disabled');assert g.locator('[data-duration=break]').input_value()=='22';out['timer']='3-second focus completed to 22-minute break; custom durations retained after reload'
 for w in [320,480,920]:g.set_viewport_size({'width':w,'height':1000});g.wait_for_timeout(70);assert g.evaluate('document.documentElement.scrollWidth<=innerWidth');out['widths']=[320,480,920]
 assert not errors,errors;out['pageErrors']=errors
 b.close()
manifest=json.loads((app/'assets/manifest.json').read_text());verified=0
for path,entry in manifest['assets'].items():
 data=(app/path).read_bytes();assert len(data)==entry['bytes'] and hashlib.sha256(data).hexdigest()==entry['sha256'],path;verified+=1
for ref in out['data']['references']:assert ref in manifest['assets'],ref
out['mediaChecksums']=verified
# Inspect the new steady fire clip for nonzero audio, clipping and its PCM loop boundary.
def assignment(path):
 t=path.read_text();return json.loads(t[t.index('=')+1:].strip().rstrip(';'))
objects=assignment(app/'objects.js');fire=next(o for o in objects if o['id']=='8eaa68ad')['sounds']['fire_burning']['clips'][0]['file']
with wave.open(str(app/fire),'rb')as w:
 samples=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').reshape(-1,w.getnchannels()).astype(float)/32768;rate=w.getframerate()
 out['fireAudio']={'file':fire,'seconds':len(samples)/rate,'peak':float(np.max(np.abs(samples))),'rms':float(np.sqrt(np.mean(samples**2))),'boundaryJump':float(np.max(np.abs(samples[-1]-samples[0])))}
 assert out['fireAudio']['seconds']>10 and .01<out['fireAudio']['rms']<.2 and out['fireAudio']['peak']<.99
(root/'validation-regressions.json').write_text(json.dumps(out,indent=2));print(json.dumps({k:v for k,v in out.items() if k not in ['data','pixels']},indent=2));print('Pixel region checks:',len(out['pixels']),'outside changes:',sum(c['outside'] for c in out['pixels']))
