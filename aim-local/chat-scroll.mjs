// Follow new chat messages after text, smileys, and flex layout have settled.
export function installAIMAutoScroll(){
 const start=()=>{
  const root=document.getElementById('caseyAIM'),log=root?.querySelector('.aim-log');if(!log||log.dataset.autoScroll==='true')return;log.dataset.autoScroll='true';
  let following=true,frame=0,settle=0,lastRow=null;
  const cancel=()=>{cancelAnimationFrame(frame);cancelAnimationFrame(settle);frame=settle=0;};
  const bottom=()=>{if(root.hidden||!log.getClientRects().length)return;log.scrollTop=log.scrollHeight;};
  const schedule=()=>{cancel();frame=requestAnimationFrame(()=>{frame=0;bottom();settle=requestAnimationFrame(()=>{settle=0;bottom();});});};
  const resize=window.ResizeObserver?new ResizeObserver(()=>{if(following)schedule();}):null;resize?.observe(log,{box:'border-box'});
  const content=()=>{following=true;const row=log.lastElementChild;if(lastRow!==row){if(lastRow)resize?.unobserve(lastRow);lastRow=row;if(row)resize?.observe(row,{box:'border-box'});}schedule();};
  new MutationObserver(content).observe(log,{childList:true,characterData:true,subtree:true});
  log.addEventListener('scroll',()=>{following=log.scrollHeight-log.clientHeight-log.scrollTop<=2;},{passive:true});
  const pause=()=>{following=false;cancel();};log.addEventListener('wheel',e=>{if(e.deltaY<0)pause();},{passive:true});log.addEventListener('pointerdown',pause,{passive:true});
  log.addEventListener('load',()=>{if(following)schedule();},true);document.fonts?.addEventListener('loadingdone',()=>{if(following)schedule();});
  content();
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
}
