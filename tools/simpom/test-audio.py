from playwright.sync_api import sync_playwright
import json
from pathlib import Path
from app_support import configure
app,root,url,chromium=configure();result=[]
with sync_playwright()as p:
 b=p.chromium.launch(executable_path=chromium,args=['--no-sandbox','--autoplay-policy=no-user-gesture-required']);g=b.new_page();g.add_init_script('window.__offset=0;const orig=performance.now.bind(performance);performance.now=()=>orig()+window.__offset');g.goto(url+'/SimPom.html');g.wait_for_function('!document.querySelector("[data-action=start]").disabled')
 for oid in ['c7a7215c','8fed54c2','58dde126','5bfb6140','1772dd4f','645542df','eea95801']:
  g.click('[data-action=reset]');name=g.evaluate('(id)=>SIMS_OBJECTS.find(o=>o.id===id).name',oid);g.fill('.sp-search',name);g.locator(f'[data-object="{oid}"]').click();g.wait_for_function('(id)=>document.querySelector(".sp-canvas").dataset.object===id&&!document.querySelector("[data-action=start]").disabled',arg=oid);g.click('[data-action=start]');g.evaluate('(id)=>{const s=SIMS_BEHAVIORS[id].start;if(s)window.__offset+=s.steps.reduce((a,b)=>a+b.durationMs,0)+10}',oid);g.wait_for_timeout(150)
  g.wait_for_function('!!document.querySelector("audio[loop]")?.currentTime');data=g.locator('audio[loop]').evaluate('(a)=>({event:a.dataset.event,loop:a.loop,time:a.currentTime,error:a.error?.code||null,paused:a.paused})');assert data['loop'] and not data['error'] and not data['paused'];result.append({'id':oid,**data})
  if oid in ['8fed54c2','58dde126','5bfb6140','1772dd4f']:
   g.evaluate('window.ambient=document.querySelector("audio[loop]");window.audioTime=ambient.currentTime');g.click('.sp-sprite-button');g.wait_for_timeout(100);assert g.evaluate('ambient===document.querySelector("audio[loop]")&&ambient.currentTime>audioTime');g.evaluate('(id)=>window.__offset+=SIMS_BEHAVIORS[id].click.steps.reduce((a,b)=>a+b.durationMs,0)+10',oid);g.wait_for_timeout(100);assert g.evaluate('ambient===document.querySelector("audio[loop]")&&ambient.currentTime>audioTime')
  g.click('[data-action=pause]');assert g.locator('audio').count()==0
 (root/'validation-audio.json').write_text(json.dumps(result,indent=2));print('Real loop playback, reset/pause cleanup and hot-tub click continuity passed:',len(result));b.close()
