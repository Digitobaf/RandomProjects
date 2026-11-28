from playwright.sync_api import sync_playwright
from pathlib import Path
import json
from app_support import configure
app,root,url,chromium=configure();(root/'inspection').mkdir(exist_ok=True);errors=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=chromium,args=['--no-sandbox','--disable-dev-shm-usage'])
 page=b.new_page(viewport={'width':1000,'height':1000})
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.add_init_script('''window.__offset=0;const now=performance.now.bind(performance);performance.now=()=>now()+window.__offset;window.__sounds=[];const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){window.__sounds.push({event:this.dataset.event,loop:this.loop,object:this.dataset.object});return play.call(this);};''')
 page.goto(url+'/SimPom.html');page.wait_for_function('!document.querySelector("[data-action=start]").disabled')
 print('BOOT',page.locator('.sp-canvas').evaluate('(e)=>({...e.dataset})'))
 print('SHAPE',page.evaluate('({objects:SIMS_OBJECTS.length,motion:Object.keys(SIMPOM_MOTION).length,baseBounds:!!SIMPOM_MOTION[SIMS_OBJECTS[0].id].baseBounds})'))
 page.screenshot(path=str(root/'inspection/app-boot.png'))
 def select(oid):
  page.click('[data-action=reset]')
  name=page.evaluate('(id)=>SIMS_OBJECTS.find(o=>o.id===id).name',oid)
  page.fill('.sp-search',name)
  page.locator('[data-object="'+oid+'"]').click()
  page.wait_for_function('(id)=>document.querySelector(".sp-canvas").dataset.object===id&&!document.querySelector("[data-action=start]").disabled',arg=oid)
 def advance(ms):page.evaluate('(ms)=>window.__offset+=ms',ms);page.wait_for_timeout(80)
 select('8eaa68ad');page.evaluate('window.__sounds=[]');page.click('[data-action=start]');page.wait_for_timeout(1200);page.wait_for_timeout(1500)
 print('FIRE',page.evaluate('window.__sounds'),page.locator('audio').evaluate_all('(es)=>es.map(e=>({event:e.dataset.event,loop:e.loop,volume:e.volume,error:e.error?.code}))'))
 advance(5000);print('FIRE5',page.evaluate('window.__sounds'))
 select('34fe4e17');page.click('[data-action=start]');advance(1500);w1=float(page.locator('.sp-canvas').get_attribute('data-water'));page.click('[data-action=pause]');advance(3000);w2=float(page.locator('.sp-canvas').get_attribute('data-water'));page.click('[data-action=start]');advance(1000);w3=float(page.locator('.sp-canvas').get_attribute('data-water'));advance(6000);w4=float(page.locator('.sp-canvas').get_attribute('data-water'));print('SINK WATER',w1,w2,w3,w4)
 assert .2<w1<.8 and abs(w2-w1)<.08 and w3>w2 and w4==1
 select('4126d70f');page.evaluate('window.__sounds=[]');page.click('[data-action=start]');advance(800);page.click('[data-action=pause]');page.click('[data-action=start]');advance(3000);print('LAMP',page.evaluate('window.__sounds'))
 # Exhaustive renderer: all authored poses and all views, fixed scale/pivot + immutable body outside moving regions.
 result=page.evaluate('''async()=>{
 const c=document.createElement('canvas');c.style='width:500px;height:500px;position:fixed;left:0;top:0';document.body.append(c);
 const R=SimPomRaster,renderer=SimPomRenderer.create({canvas:c,objects:SIMS_OBJECTS,behaviors:SIMS_BEHAVIORS,upscales:SIMS_UPSCALES,motion:SIMPOM_MOTION,onError:s=>{throw Error(s)}}),report=[];
 for(const o of SIMS_OBJECTS){
  const rule=SIMS_BEHAVIORS[o.id];await renderer.prepare(o);const variants=R.frames(rule,{includeTransient:false});let draws=0,violations=0,scale=null;
  for(const v of R.objectViews(o)){
   let first=true,expectedScale;for(const f of variants){renderer.draw(o,f,v,{enhanced:true,activity:'active'});const s=c.dataset.scale;if(first){expectedScale=s;first=false;}if(s!==expectedScale)violations++;if(c.dataset.pending==='true')throw Error(o.name+' pending');draws++;}
  }
  report.push({id:o.id,name:o.name,draws,scaleViolations:violations,defaultView:R.views[R.defaultView(o)]});
 }
 c.remove();return report;
}''')
 (root/'validation-draws.json').write_text(json.dumps(result,indent=2));print('ALL DRAWS',len(result),sum(r['draws'] for r in result),'scale violations',sum(r['scaleViolations'] for r in result))
 assert all(r['defaultView']==('NE' if r['id']=='98e0f8bd' else 'SE') for r in result)
 assert sum(r['scaleViolations'] for r in result)==0
 print('ERRORS',errors);assert not errors
 b.close()
