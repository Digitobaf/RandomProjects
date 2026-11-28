/* Fixed body, native moving parts. No independent AI redraws during animation. */
(()=>{
'use strict';
const R=window.SimPomRaster;
function create({canvas,objects,behaviors,upscales,motion,onError=()=>{},onReady=()=>{}}){
 const ctx=canvas.getContext('2d'),stage=R.canvas(1,1),stageCtx=stage.getContext('2d'),images=new Map(),nativeCache=new Map(),enhancedCache=new Map(),masterCache=new Map(),paths=new Map();
 let drawKey='',selectedId='',lastDrawnId='',epoch=0,ready=false,lastError='';
 function report(text){if(text!==lastError){lastError=text;onError(text);}}
 function image(src){
  if(!src)return null;
  if(!images.has(src)){const im=new Image();im.src=src;images.set(src,im);im.onload=()=>{drawKey='';masterCache.clear();};im.onerror=()=>report('An image is missing. Extract the entire update, including assets.');}
  return images.get(src);
 }
 function native(o,s,v){const key=o.id+':'+v+':'+R.specKey(s)+':'+(s.appearance||'');if(nativeCache.has(key))return nativeCache.get(key);const raster=R.compose(o,s,v,behaviors[o.id],image,motion[o.id]||{});if(raster)nativeCache.set(key,raster);return raster;}
 function oldSpecKey(s){return JSON.stringify({state:s.state,layers:s.layers||[],extraStates:s.extraStates||[],layerOffsets:s.layerOffsets||{}});}
 function bodyBounds(o,s,v){return motion[o.id]?.baseBounds?.[v]?.[R.specKey(s)]||o.bboxes[s.state]?.[v]||o.bounds[v];}
 function enhanced(o,s,v,original){
  const a=upscales[o.id];if(!a)return null;
  let row=a.keys.indexOf(oldSpecKey(s));
  // A corrected body may omit an already-baked layer. Reuse one fixed enhanced
  // reference with the same DGRP, registered to the corrected original silhouette.
  if(row<0)row=a.keys.findIndex(k=>{const candidate=JSON.parse(k);return candidate.state===s.state&&!Object.keys(candidate.layerOffsets||{}).length;});
  if(row<0)return null;const im=image(a.file);if(!im?.complete||!im.naturalWidth)return null;
  const rb=a.generatedBounds?.[row]?.[v],ob=bodyBounds(o,s,v);if(!rb||!ob)return null;
  const key=o.id+':'+v+':'+row+':'+R.specKey(s);if(enhancedCache.has(key))return enhancedCache.get(key);
  const c=o.canvas[v],out=R.canvas(c.width*4,c.height*4),g=out.getContext('2d');g.imageSmoothingQuality='high';g.drawImage(original,0,0,out.width,out.height);
  g.drawImage(im,rb.x,rb.y,rb.width,rb.height,ob.x*4,ob.y*4,ob.width*4,ob.height*4);g.globalCompositeOperation='destination-in';g.drawImage(original,0,0,out.width,out.height);
  enhancedCache.set(key,out);return out;
 }
 function path(o,v,name){const key=o.id+':'+v+':'+name;if(!paths.has(key))paths.set(key,R.runsPath(motion[o.id]?.[name]?.[v]));return paths.get(key);}
 function nativeUnderlay(ctx,o,s,v,current){if(!motion[o.id]?.nativeRegions?.[v]?.length)return;const c=o.canvas[v];ctx.save();ctx.clip(path(o,v,'nativeRegions'));ctx.clearRect(0,0,c.width,c.height);ctx.drawImage(current,0,0,c.width,c.height);ctx.restore();}
 function paint(o,s,v,options){
  // Assemble replacement regions on an integer pixel grid before display scaling.
  // Clearing and re-drawing a clipped edge on the scaled display canvas creates
  // double antialiasing coverage and visible dark seams, even on identical pixels.
  const ctx=stageCtx,rule=behaviors[o.id],m=motion[o.id]||{},c=o.canvas[v],current=native(o,s,v);if(!current)return null;
  const factor=rule.render?.stable&&options.enhanced&&upscales[o.id]?4:1;
  if(stage.width!==c.width*factor||stage.height!==c.height*factor){stage.width=c.width*factor;stage.height=c.height*factor;}
  ctx.setTransform(factor,0,0,factor,0,0);ctx.clearRect(0,0,c.width,c.height);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  if(rule.render?.stable){
   const b=R.baseSpec(rule,s),base=native(o,b,v);if(!base)return false;
   const bodyKey=o.id+':'+v+':'+R.specKey(b)+':'+options.enhanced;let master=masterCache.get(bodyKey);
   if(!master){master=(options.enhanced?enhanced(o,b,v,base):null)||base;masterCache.set(bodyKey,master);}
   ctx.drawImage(master,0,0,c.width,c.height);nativeUnderlay(ctx,o,s,v,current);
   if(m.masks?.[v]?.length&&(!rule.render.transientOnly||options.activity==='click')){
    ctx.save();ctx.clip(path(o,v,'masks'));ctx.clearRect(0,0,c.width,c.height);ctx.drawImage(current,0,0,c.width,c.height);ctx.restore();
   }
   R.paintFill(ctx,o,s,v,rule,m,base);R.drawLight(ctx,o,s,v,rule,m,base);
   if(m.foreground?.[v]?.length){ctx.save();ctx.clip(path(o,v,'foreground'));ctx.clearRect(0,0,c.width,c.height);ctx.drawImage(base,0,0,c.width,c.height);ctx.restore();}
   canvas.dataset.enhanced=String(master!==base);canvas.dataset.bodyReference=String(b.state);canvas.dataset.stableBody='true';
  }else{
   ctx.drawImage(current,0,0,c.width,c.height);R.drawLight(ctx,o,s,v,rule,m,current);canvas.dataset.enhanced='false';canvas.dataset.stableBody='false';canvas.dataset.bodyReference=String(s.state);
  }
  return stage;
 }
 function draw(o,s,v,options={}){
  const rect=canvas.getBoundingClientRect(),w=rect.width,h=rect.height,dpr=Math.min(2,devicePixelRatio||1);if(!w||!h)return;
  const rule=behaviors[o.id],m=motion[o.id]||{},c=o.canvas[v],b=m.fitBounds?.[v]||o.bounds[v],allowed=R.objectViews(o),all=allowed.map(v=>m.fitBounds?.[v]||o.bounds[v]);
  const maxW=Math.max(...all.map(b=>b.width)),maxH=Math.max(...all.map(b=>b.height)),pivot={x:b.x+b.width/2,y:b.y+b.height/2};
  let scale=Math.min((w-42)/maxW,(h-28)/maxH);
  if(Number.isFinite(rule.render?.nativeScale))scale=Math.min(scale,rule.render.nativeScale);
  // Only explicitly declared oversized transient effects (the gnome explosion)
  // may temporarily change fit. Normal animation never recomputes object scale.
  if(options.fit==='transient'){
   const f=m.frameBounds?.[v]?.[R.specKey(s)+':'+(s.appearance||'')];if(f){const ex=Math.max(Math.abs(f.x-pivot.x),Math.abs(f.x+f.width-pivot.x)),ey=Math.max(Math.abs(f.y-pivot.y),Math.abs(f.y+f.height-pivot.y));scale=Math.min(scale,(w/2-8)/ex,(h/2-8)/ey);}
  }
  const angle=s.rotationValue??s.rotation??0,water=s.waterValue??(typeof s.water==='number'?s.water:0),a=s.appearance||'';
  const key=[o.id,v,R.specKey(s),s.light,a,Math.round(water*200),Math.round(angle*100),w,h,dpr,options.enhanced,options.sharp,options.activity,options.running,options.fit].join(':');if(key===drawKey)return;
  if(o.id!==lastDrawnId){ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);canvas.dataset.pending='true';}
  const source=native(o,s,v);if(!source)return;
  const originalBase=rule.render?.stable?native(o,R.baseSpec(rule,s),v):source;if(!originalBase)return;
  if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);ctx.imageSmoothingEnabled=!options.sharp;ctx.imageSmoothingQuality='high';canvas.style.imageRendering=options.sharp?'pixelated':'auto';
  const x=w/2-pivot.x*scale,y=h/2-pivot.y*scale;ctx.save();
  if(angle){const anchorY=(s.sway?.anchorY??.85),cy=y+(b.y+b.height*anchorY)*scale;ctx.translate(w/2,cy);ctx.rotate(angle*Math.PI/180);ctx.translate(-w/2,-cy);}
  ctx.translate(x,y);ctx.scale(scale,scale);
  const painted=paint(o,{...s,waterValue:water},v,options);if(painted)ctx.drawImage(painted,0,0,c.width,c.height);ctx.restore();if(!painted)return;
  lastDrawnId=o.id;drawKey=key;canvas.dataset.pending='false';canvas.dataset.object=o.id;canvas.dataset.graphic=String(s.state);canvas.dataset.layers=(s.layers||[]).join(',');canvas.dataset.activity=options.activity||'idle';canvas.dataset.view=v;canvas.dataset.lit=String(!!s.light);canvas.dataset.scale=scale.toFixed(8);canvas.dataset.pivotX=(w/2).toFixed(3);canvas.dataset.pivotY=(h/2).toFixed(3);canvas.dataset.rotation=angle.toFixed(4);canvas.dataset.water=water.toFixed(4);canvas.dataset.appearance=a;canvas.setAttribute('aria-label',o.name+', '+v+(options.running?', active':', idle'));
 }
 async function prepare(o){
  const mine=++epoch;selectedId=o.id;ready=false;drawKey='';lastError='';nativeCache.clear();enhancedCache.clear();masterCache.clear();paths.clear();
  const rule=behaviors[o.id],specs=[...R.frames(rule),rule.render?.base,...Object.values(rule.render?.phaseBases||{})].filter(Boolean),sources=new Set(),allowed=R.objectViews(o);
  for(const s of specs){for(const n of[s.state,...(s.extraStates||[])])for(const v of allowed){const src=o.sprites[n]?.[v];if(src)sources.add(src);}for(const n of[...(s.layers||[]),...(s.eraseLayers||[]),...(s.restoreLayers||[])])for(const v of allowed){const src=o.layers[n]?.views[v];if(src)sources.add(src);}}
  if(upscales[o.id])sources.add(upscales[o.id].file);
  for(const src of images.keys())if(!sources.has(src))images.delete(src);
  await Promise.all([...sources].map(src=>image(src).decode().catch(()=>{})));
  if(epoch===mine){ready=true;drawKey='';masterCache.clear();onReady(o.id);}
 }
 function invalidate(){drawKey='';}
 const api={draw,prepare,invalidate,get ready(){return ready;},get selectedId(){return selectedId;},get images(){return images;},native,bodyBounds};
 return api;
}
window.SimPomRenderer={create};
})();
