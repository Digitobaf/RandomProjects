"""Verify complete gulp playback after service, closed-door steam and native book art."""
import json
from playwright.sync_api import sync_playwright
from app_support import configure
app,out,url,chromium=configure();errors=[];report={'version':'drink-steam-book-v4','drinks':[]}
with sync_playwright()as p:
 browser=p.chromium.launch(executable_path=chromium,args=['--no-sandbox','--disable-dev-shm-usage']);page=browser.new_page(viewport={'width':1000,'height':900});page.on('pageerror',lambda e:errors.append(str(e)))
 page.add_init_script('''window.audioLog=[];const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){const event=this.dataset.event;audioLog.push({type:'play',event,loop:this.loop,at:performance.now(),graphic:document.querySelector('.sp-canvas')?.dataset.graphic});this.addEventListener('ended',()=>audioLog.push({type:'ended',event,at:performance.now(),duration:this.duration}),{once:true});return play.call(this);};''')
 page.goto(url+'/SimPom.html');page.wait_for_function('!document.querySelector("[data-action=start]").disabled')
 def select(id):
  page.click('[data-action=reset]');name=page.evaluate('id=>SIMS_OBJECTS.find(o=>o.id===id).name',id);page.fill('.sp-search',name);page.locator('[data-object="'+id+'"]').click();page.wait_for_function('id=>document.querySelector(".sp-canvas").dataset.object===id&&!document.querySelector("[data-action=start]").disabled',arg=id)
 for id in ['c2a91fd0','da2b8f79']:
  select(id)
  for action in ['start','click']:
   page.click('[data-action=reset]');page.evaluate('audioLog=[]');page.click('[data-action=start]'if action=='start'else'.sp-sprite-button');page.wait_for_function('audioLog.some(e=>e.event==="bar_drink_gulp_vox"&&e.type==="ended")',timeout=6000);page.wait_for_timeout(300);log=page.evaluate('audioLog');events=[e for e in log if e['type']=='play'];names=[e['event']for e in events]
   assert names==['bar_open','bar_pourdrink','bar_glassclink','bar_close','bar_drink_gulp_vox'],names
   close=next(e for e in log if e['type']=='ended'and e['event']=='bar_close');gulp=events[-1];end=next(e for e in log if e['type']=='ended'and e['event']=='bar_drink_gulp_vox');assert gulp['at']>=close['at']-35;assert not gulp['loop'];assert .6<end['duration']<.8
   report['drinks'].append({'id':id,'action':action,'playOrder':names,'gulpFinishes':True,'gulpDurationSec':end['duration'],'startsAfterCloseFinishes':True})
 select('eea95801');page.evaluate('audioLog=[]');page.click('[data-action=start]');seen=[]
 for _ in range(25):
  value=page.locator('.sp-canvas').get_attribute('data-graphic')
  if not seen or seen[-1]!=value:seen.append(value)
  page.wait_for_timeout(80)
 assert seen==['1','2','3','2','1','0'],seen
 page.wait_for_function('!!document.querySelector("audio[loop]")?.currentTime');assert page.locator('audio[loop]').get_attribute('data-event')=='steamer_loop';assert page.locator('.sp-canvas').get_attribute('data-activity')=='active';assert page.locator('.sp-canvas').get_attribute('data-graphic')=='0'
 log=page.evaluate('audioLog');steam=next(e for e in log if e['type']=='play'and e['event']=='steamer_loop');assert steam['graphic']=='0'and steam['loop'];page.wait_for_timeout(3100);assert page.locator('.sp-canvas').get_attribute('data-graphic')=='0';assert page.locator('audio[loop]').evaluate('a=>!a.paused&&!a.error')
 report['steamer']={'poses':seen,'steamStartsWithClosedDoors':True,'realLoopPlayback':True,'staysClosedWhileLooping':True}
 select('2a3d8714');page.click('[data-action=start]');page.wait_for_timeout(1000);views=[]
 for _ in range(4):
  canvas=page.locator('.sp-canvas').evaluate('e=>({...e.dataset})');assert canvas['enhanced']=='false'and float(canvas['scale'])==2;views.append(canvas['view']);page.click('[data-action=right]')
 assert set(views)=={'NE','SE','SW','NW'};assert page.evaluate('!SIMS_UPSCALES["2a3d8714"]');report['book']={'usesOriginalFrames':True,'scale':2,'views':views,'AIAtlasAbsent':True}
 assert not errors,errors;report['pageErrors']=errors;browser.close()
(out/'VERIFICATION-v4.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
