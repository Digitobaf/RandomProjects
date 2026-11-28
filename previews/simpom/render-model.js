/* Generic source-sprite composition. Object-specific choices live in behaviors.js. */
(()=>{
'use strict';
const views=['NE','SE','SW','NW'];
const canvas=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;};
function specKey(s){return JSON.stringify({state:s.state,layers:s.layers||[],extraStates:s.extraStates||[],layerOffsets:s.layerOffsets||{},eraseLayers:s.eraseLayers||[],restoreLayers:s.restoreLayers||[]});}
function polygon(points){const p=new Path2D();if(points?.length){points.forEach(([x,y],i)=>i?p.lineTo(x,y):p.moveTo(x,y));p.closePath();}return p;}
function runsPath(runs){const p=new Path2D();for(const [x,y,w,h]of runs||[])p.rect(x,y,w,h);return p;}
function objectViews(o){return o.allowedViews?.length?o.allowedViews:views;}
function defaultView(o){const allowed=objectViews(o);return views.indexOf(allowed.includes('SE')?'SE':allowed[0]);}
function baseSpec(rule,s){return rule.render?.phaseBases?.[s.appearance]||rule.render?.base||rule.idle;}
function frames(rule,{includeTransient=true}={}){return [rule.idle,...(rule.endAppearance?[rule.endAppearance]:[]),...(rule.click?.returnAppearance?[rule.click.returnAppearance]:[]),...['start','active','click','stop'].flatMap(k=>(!includeTransient&&rule[k]?.fit==='transient')?[]:(rule[k]?.steps||[]))];}
function compose(o,s,v,rule,loader,motion={}){
 const c=o.canvas[v],out=canvas(c.width,c.height),ctx=out.getContext('2d');let ready=true;
 function source(src){if(!src)return null;const im=loader(src);if(!im?.complete||!im.naturalWidth){ready=false;return null;}return im;}
 function full(src,dx=0,dy=0){const im=source(src);if(im)ctx.drawImage(im,dx,dy);}
 full(o.sprites[s.state]?.[v]);for(const n of s.extraStates||[])full(o.sprites[n]?.[v]);
 for(const n of s.eraseLayers||[]){ctx.save();const clip=rule.render?.eraseClip?.[v];if(clip)ctx.clip(polygon(clip));ctx.globalCompositeOperation='destination-out';full(o.layers[n]?.views[v]);ctx.restore();}
 for(const n of s.restoreLayers||[])full(o.layers[n]?.views[v]);
 for(const n of s.layers||[]){
  const im=source(o.layers[n]?.views[v]);if(!im)continue;const render=rule.render||{},off=s.layerOffsets?.[n]||{};ctx.save();
  if(render.layerClip?.indices.includes(n)){ctx.clip(polygon(render.layerClip.regions[v]));}
  const target=render.layerTargets?.indices.includes(n)?render.layerTargets.views[v]:null;
  if(target){const b=o.layers[n].bbox[v];ctx.drawImage(im,b.x,b.y,b.width,b.height,target.x+(off.x||0),target.y+(off.y||0),target.width,target.height);}
  else ctx.drawImage(im,off.x||0,off.y||0);
  ctx.restore();
 }
 // Foreground masks restore already-baked taps, towels and support posts after overlays.
 if(motion.foreground?.[v]?.length){const b=baseSpec(rule,s);ctx.save();ctx.clip(runsPath(motion.foreground[v]));ctx.clearRect(0,0,c.width,c.height);full(o.sprites[b.state]?.[v]);ctx.restore();}
 return ready?out:null;
}
function bounds(raster){const w=raster.width,h=raster.height,a=raster.getContext('2d',{willReadFrequently:true}).getImageData(0,0,w,h).data;let x=w,y=h,xx=0,yy=0;for(let j=0;j<h;j++)for(let i=0;i<w;i++)if(a[(j*w+i)*4+3]>12){x=Math.min(x,i);y=Math.min(y,j);xx=Math.max(xx,i+1);yy=Math.max(yy,j+1);}return xx>x&&yy>y?{x,y,width:xx-x,height:yy-y}:null;}
function runs(mask,w,h){
 const result=[],open=new Map();
 for(let y=0;y<h;y++){
  const current=new Map();let x=0;
  while(x<w){while(x<w&&!mask[y*w+x])x++;if(x>=w)break;const start=x;while(x<w&&mask[y*w+x])x++;const width=x-start,key=start+':'+width,prior=open.get(key);
   if(prior){prior[3]++;current.set(key,prior);}else{const r=[start,y,width,1];result.push(r);current.set(key,r);}
  }
  open.clear();for(const [k,v]of current)open.set(k,v);
 }
 return result;
}
function paintFill(ctx,o,s,v,rule,motion,baseNative){
 const fill=rule.render?.fill,level=Math.max(0,Math.min(1,s.waterValue??(typeof s.water==='number'?s.water:0)));
 if(!fill||!level)return;
 const points=fill.regions[v];if(!points?.length)return;const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),top=Math.min(...ys),bottom=Math.max(...ys),left=Math.min(...xs),right=Math.max(...xs),surface=bottom-(bottom-top)*level;
 ctx.save();ctx.clip(polygon(points));
 // Reestablish the original basin geometry below the water, never a shifting AI basin.
 ctx.drawImage(baseNative,0,0,o.canvas[v].width,o.canvas[v].height);
 ctx.beginPath();ctx.rect(left,surface,right-left,bottom-surface+1);ctx.clip();
 const gradient=ctx.createLinearGradient(0,surface,0,bottom);gradient.addColorStop(0,'#c2e2ea');gradient.addColorStop(1,fill.color);ctx.globalAlpha=fill.opacity??.64;ctx.fillStyle=gradient;ctx.fillRect(left,top,right-left,bottom-top+1);
 ctx.globalAlpha=.55;ctx.strokeStyle='#e0f4f6';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(left,surface+.4);ctx.lineTo(right,surface+.4);ctx.stroke();ctx.restore();
 if(motion.foreground?.[v]?.length){ctx.save();ctx.clip(runsPath(motion.foreground[v]));ctx.drawImage(baseNative,0,0,o.canvas[v].width,o.canvas[v].height);ctx.restore();}
}
function drawLight(ctx,o,s,v,rule,motion,baseNative){
 if(!s.light)return;const light=rule.light,points=light?.polygons[v];if(!points?.length)return;
 ctx.save();ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.clip();
 // The same native glass pixels are present while off and on. This is a light
 // inside that exact pane, never a blurred filter over an independently redrawn door.
 ctx.drawImage(baseNative,0,0,o.canvas[v].width,o.canvas[v].height);ctx.globalCompositeOperation='screen';ctx.globalAlpha=light.opacity??.5;ctx.fillStyle=light.color;ctx.shadowBlur=0;ctx.fill();ctx.restore();
}
window.SimPomRaster={canvas,specKey,polygon,runsPath,objectViews,defaultView,baseSpec,frames,compose,bounds,runs,paintFill,drawLight,views};
})();
