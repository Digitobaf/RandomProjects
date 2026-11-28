from pathlib import Path
from playwright.sync_api import sync_playwright
import json
from app_support import configure
app,root,url,chromium=configure()
diagnostics={}
with sync_playwright()as p:
 browser=p.chromium.launch(executable_path=chromium,args=['--no-sandbox','--disable-dev-shm-usage']);page=browser.new_page();page.goto(url+'/')
 for name in ['objects.js','behaviors.js','upscales.js','render-model.js']:page.add_script_tag(url=url+'/'+name)
 result=page.evaluate('''async()=>{
 const R=SimPomRaster,result={},views=R.views;
 const alphaBounds=(data,w,h)=>{let x=w,y=h,xx=0,yy=0;for(let j=0;j<h;j++)for(let i=0;i<w;i++)if(data[(j*w+i)*4+3]>12){x=Math.min(x,i);y=Math.min(y,j);xx=Math.max(xx,i+1);yy=Math.max(yy,j+1);}return xx>x&&yy>y?{x,y,width:xx-x,height:yy-y}:null;};
 const regionPixels=(points,w,h)=>{const c=R.canvas(w,h),x=c.getContext('2d');if(points?.length){x.fillStyle='white';x.fill(R.polygon(points));}return x.getImageData(0,0,w,h).data;};
 function dilate(mask,w,h){const out=new Uint8Array(mask.length);for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(mask[y*w+x])for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=x+dx,ny=y+dy;if(nx>=0&&nx<w&&ny>=0&&ny<h)out[ny*w+nx]=1;}return out;}
 for(const o of SIMS_OBJECTS){
  const rule=SIMS_BEHAVIORS[o.id],needsStable=rule.render?.stable,images=new Map(),sources=new Set();
  for(const sprites of Object.values(o.sprites))for(const src of Object.values(sprites))sources.add(src);
  for(const layer of Object.values(o.layers))for(const src of Object.values(layer.views))sources.add(src);
  await Promise.all([...sources].map(async src=>{const im=new Image();im.src=src;await im.decode();images.set(src,im);}));
  const loader=src=>images.get(src);const data={masks:{},foreground:{},nativeRegions:{},fitBounds:{},maskBounds:{},baseBounds:{},frameBounds:{},samples:{}};
  const variants=R.frames(rule),fitVariants=R.frames(rule,{includeTransient:false});
  const unique=[];const uniqueKeys=new Set();
  for(const s of variants){const k=R.specKey(s)+':'+s.appearance;if(!uniqueKeys.has(k)){uniqueKeys.add(k);unique.push(s);}}
  for(const v of views){
   const c=o.canvas[v],w=c.width,h=c.height,N=w*h;let foreground=new Uint8Array(N);
   const base=R.baseSpec(rule,rule.idle),baseRaster=R.compose(o,base,v,rule,loader,{});const basePixels=baseRaster.getContext('2d').getImageData(0,0,w,h).data;
   for(let i=0;i<N;i++){const r=basePixels[i*4],g=basePixels[i*4+1],b=basePixels[i*4+2],a=basePixels[i*4+3],flags=rule.render?.protect||[];if(a>80&&((flags.includes('gold')&&r>g*1.10&&g>b*1.24&&r>45)||(flags.includes('blue')&&b>r+20&&b>g+12)))foreground[i]=1;}
   data.foreground[v]=R.runs(foreground,w,h);
   let mask=new Uint8Array(N),fitAlpha=new Uint8Array(N),baselineCache=new Map();data.baseBounds[v]={};data.frameBounds[v]={};
   const render=s=>R.compose(o,s,v,rule,loader,data);
   const keyFits=new Set(fitVariants.map(s=>R.specKey(s)+':'+s.appearance));
   for(const s of unique){
    const raster=render(s);if(!raster)throw Error(o.name+' assets not ready');const pixels=raster.getContext('2d').getImageData(0,0,w,h).data;data.frameBounds[v][R.specKey(s)+':'+(s.appearance||'')]=alphaBounds(pixels,w,h);
    if(keyFits.has(R.specKey(s)+':'+s.appearance))for(let i=0;i<N;i++)if(pixels[i*4+3]>12)fitAlpha[i]=1;
    if(needsStable){const b=R.baseSpec(rule,s),bk=R.specKey(b);if(!baselineCache.has(bk)){const raster=render(b);const pixels=raster.getContext('2d').getImageData(0,0,w,h).data;baselineCache.set(bk,pixels);data.baseBounds[v][bk]=alphaBounds(pixels,w,h);}const reference=baselineCache.get(bk);
     for(let i=0;i<N;i++){const a=pixels[i*4+3]/255,ba=reference[i*4+3]/255;let delta=Math.abs(a-ba)*255;for(let channel=0;channel<3;channel++)delta=Math.max(delta,Math.abs(pixels[i*4+channel]*a-reference[i*4+channel]*ba));if(delta>12)mask[i]=1;}
    }
   }
   mask=dilate(mask,w,h);
   const regions=rule.render?.regions;if(regions&&Object.hasOwn(regions,v)){const allowed=regionPixels(regions[v],w,h);for(let i=0;i<N;i++)if(allowed[i*4+3]<128)mask[i]=0;}
   if(rule.render?.lockBody)mask.fill(0);
   data.masks[v]=R.runs(mask,w,h);const asRGBA=new Uint8ClampedArray(N*4);for(let i=0;i<N;i++)asRGBA[i*4+3]=mask[i]?255:0;
   data.maskBounds[v]=alphaBounds(asRGBA,w,h);for(let i=0;i<N;i++)asRGBA[i*4+3]=fitAlpha[i]?255:0;
   data.fitBounds[v]=alphaBounds(asRGBA,w,h)||o.bounds[v];
   data.samples[v]={variants:unique.length,maskPixels:mask.reduce((a,b)=>a+b,0),stable:!!needsStable};
   if(rule.render?.nativeRegions?.[v]?.length){const native=regionPixels(rule.render.nativeRegions[v],w,h),bits=new Uint8Array(N);for(let i=0;i<N;i++)bits[i]=native[i*4+3]>128?1:0;data.nativeRegions[v]=R.runs(bits,w,h);}else data.nativeRegions[v]=[];
  }
  result[o.id]=data;images.clear();
 }
 return result;
}''')
 (app/'motion-masks.js').write_text('/* Native-pixel animation regions; generated from the reviewed original poses/layers. */\nwindow.SIMPOM_MOTION = '+json.dumps(result,separators=(',',':'))+';\n')
 (root/'motion-diagnostics.json').write_text(json.dumps({k:{'maskBounds':v['maskBounds'],'fitBounds':v['fitBounds'],'samples':v['samples']}for k,v in result.items()},indent=2))
 browser.close()
print('Compiled stable native motion/foreground masks and fixed bounds for',len(result),'objects.')
print('Mask data bytes',(app/'motion-masks.js').stat().st_size)
