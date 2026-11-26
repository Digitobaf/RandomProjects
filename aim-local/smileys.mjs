// Installed only in the connected AIM page; stored chat and Gemini context remain plain text.
export function installAIMSmileys(){
 const start=()=>{
  const root=document.getElementById('caseyAIM'),trigger=root?.querySelector('button[aria-label="Insert smiley"]'),compose=root?.querySelector('.aim-compose textarea'),log=root?.querySelector('.aim-log');if(!trigger||!compose||!log)return;
  const faces=[['Happy',':)','smile'],['Sad',':(','sad'],['Wink',';)','wink'],['Tongue',':P','tongue'],['Surprised',':O','open'],['Kiss',':*','kiss'],['Shocked',':-O','shocked'],['Cool','8-)','cool'],['Big grin',':D','grin'],['Embarrassed',':$','blush'],['Confused',':/','confused'],['Angel','O:)','angel'],['Thinking',':-?','thinking'],['Crying',":'(",'cry'],['Sealed lips',':-X','sealed'],['Nerd','8-|','nerd']];
  const pixels=(kind)=>{
   const normal='<path d="M5 6h2v3H5zm8 0h2v3h-2z"/>';
   let eyes=normal,mouth='<path d="M5 11h2v2h6v-2h2v3h-2v1H7v-1H5z"/>';
   if(kind==='sad'||kind==='cry')mouth='<path d="M5 14v-2h2v-1h6v1h2v2h-2v-1H7v1z"/>';
   if(kind==='wink')eyes='<path d="M4 7h4v1H4zm9-1h2v3h-2z"/>';
   if(kind==='tongue')mouth='<path d="M5 11h10v2H5z"/><path fill="#ed4444" d="M10 12h4v4h-3v-1h-1z"/>';
   if(kind==='open'||kind==='shocked')mouth='<path d="M8 11h4v1h1v4h-1v1H8v-1H7v-4h1z"/>';
   if(kind==='shocked')eyes='<path d="M4 4h4v1H4zm8 0h4v1h-4zM5 6h2v3H5zm8 0h2v3h-2z"/>';
   if(kind==='kiss')mouth='<path d="M9 11h2v1h2v1h-2v1h2v1H9v-1H7v-1h2z"/>';
   if(kind==='cool')eyes='<path d="M2 6h16v2h-1v3h-5V8H8v3H3V8H2z"/>';
   if(kind==='grin')mouth='<path d="M4 10h12v4h-2v2H6v-2H4z"/><path fill="white" d="M5 11h10v2H5z"/><path d="M7 11h1v2H7zm5 0h1v2h-1z"/>';
   if(kind==='blush')mouth='<path d="M7 13h6v1H7z"/><path fill="#ee6f54" d="M3 10h4v2H3zm10 0h4v2h-4z"/>';
   if(kind==='confused'||kind==='thinking')mouth='<path d="M6 14h3v-1h3v-1h3v2h-3v1H9v1H6z"/>';
   if(kind==='cry')eyes=normal+'<path fill="#398bd2" d="M4 9h2v4H3v-2h1z"/>';
   if(kind==='sealed')mouth='<path d="M7 11h2v2h2v-2h2v2h-2v2h2v1h-2v-1H9v1H7v-1h2v-2H7z"/>';
   if(kind==='nerd')eyes='<path d="M2 5h6v1h4V5h6v6h-6V8H8v3H2zm1 1v4h4V6zm10 0v4h4V6z"/>';
   return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" shape-rendering="crispEdges"><path fill="#151515" d="M6 1h8v1h3v2h1v2h1v8h-1v2h-1v2h-3v1H6v-1H3v-2H2v-2H1V6h1V4h1V2h3z"/><path fill="#ffff24" d="M6 2h8v1h2v2h1v2h1v6h-1v2h-1v2h-3v1H7v-1H4v-2H3v-2H2V7h1V5h1V3h2z"/>'+ (kind==='angel'?'<path fill="#6395dc" d="M5 1h10v1H5z"/>':'')+'<g fill="#111">'+eyes+mouth+'</g></svg>';
  };
  const source=kind=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(pixels(kind));
  const makeImage=(face,inline=false)=>{const img=document.createElement('img');img.src=source(face[2]);img.alt=inline?face[1]:'';img.title=face[0]+' '+face[1];if(inline)img.className='aim-inline-smiley';return img;};
  const style=document.createElement('style');style.textContent='.casey-aim-smiley-picker{position:fixed;inset:auto;margin:0;padding:4px;display:grid;grid-template-columns:repeat(4,32px);gap:1px;background:#c0c0c0;border:0;box-shadow:inset 1px 1px #fff,inset -1px -1px #000,inset 2px 2px #dfdfdf,inset -2px -2px #808080;z-index:2147483647;pointer-events:auto}.casey-aim-smiley-picker[hidden]{display:none!important}.casey-aim-smiley-picker button{display:grid;place-items:center;width:32px;height:32px;padding:3px;border:0;border-radius:0;background:#c0c0c0;box-shadow:inset 1px 1px #fff,inset -1px -1px #808080;cursor:default}.casey-aim-smiley-picker button:focus-visible{outline:1px dotted #000;outline-offset:-3px}.casey-aim-smiley-picker button:hover{background:#dfdfdf}.casey-aim-smiley-picker img{width:24px;height:24px;image-rendering:pixelated}#caseyAIM .aim-inline-smiley{display:inline-block;width:18px;height:18px;vertical-align:-3px;image-rendering:pixelated}';document.head.append(style);
  const picker=document.createElement('div');picker.className='casey-aim-smiley-picker';picker.id='casey-aim-smileys';picker.role='dialog';picker.setAttribute('aria-label','Smileys');picker.hidden=true;document.body.append(picker);
  trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-controls',picker.id);trigger.setAttribute('aria-expanded','false');let selection=[0,0];
  const hide=(focus=false)=>{picker.hidden=true;trigger.setAttribute('aria-expanded','false');if(focus)trigger.focus();};
  faces.forEach(face=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Insert smiley: '+face[0]);b.title=face[0]+' '+face[1];b.append(makeImage(face));b.addEventListener('click',()=>{if(compose.disabled||root.dataset.conversation!=='ai'){hide();return;}const [a,z]=selection,prefix=a>0&&!/\s/.test(compose.value[a-1])?' ':'';compose.setRangeText(prefix+face[1]+' ',a,z,'end');compose.dispatchEvent(new Event('input',{bubbles:true}));hide();compose.focus();});picker.append(b);});
  trigger.addEventListener('pointerdown',()=>{selection=[compose.selectionStart,compose.selectionEnd];});
  trigger.addEventListener('click',()=>{if(root.dataset.conversation!=='ai'||compose.disabled)return;if(!picker.hidden){hide();return;}selection=[compose.selectionStart,compose.selectionEnd];picker.hidden=false;trigger.setAttribute('aria-expanded','true');const r=trigger.getBoundingClientRect();picker.style.left=Math.max(4,Math.min(r.left,innerWidth-picker.offsetWidth-4))+'px';picker.style.top=Math.max(4,Math.min(r.bottom+3,innerHeight-picker.offsetHeight-4))+'px';picker.querySelector('button').focus();});
  picker.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();hide(true);return;}const shifts={ArrowLeft:-1,ArrowRight:1,ArrowUp:-4,ArrowDown:4};if(!(e.key in shifts))return;e.preventDefault();const items=[...picker.children],at=items.indexOf(document.activeElement);items[(at+shifts[e.key]+items.length)%items.length].focus();});
  document.addEventListener('pointerdown',e=>{if(!picker.hidden&&!picker.contains(e.target)&&!trigger.contains(e.target))hide();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!picker.hidden){e.preventDefault();e.stopPropagation();hide(true);}},true);window.addEventListener('resize',()=>hide());
  const escaped=faces.map(f=>f[1]).sort((a,b)=>b.length-a.length).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),pattern=new RegExp('(^|\\s)('+escaped+')(?=$|\\s|[!?.,])','g');
  const render=()=>{const enabled=root.dataset.conversation==='ai'&&!compose.disabled;if(trigger.disabled===enabled)trigger.disabled=!enabled;if(!enabled)hide();if(root.hidden)hide();if(root.dataset.conversation!=='ai')return;
   for(const row of log.querySelectorAll('.aim-line'))for(const node of [...row.childNodes]){if(node.nodeType!==3)continue;const text=node.nodeValue;pattern.lastIndex=0;const matches=[...text.matchAll(pattern)];if(!matches.length)continue;const fragment=document.createDocumentFragment();let end=0;for(const m of matches){fragment.append(document.createTextNode(text.slice(end,m.index)+m[1]),makeImage(faces.find(f=>f[1]===m[2]),true));end=m.index+m[0].length;}fragment.append(document.createTextNode(text.slice(end)));node.replaceWith(fragment);}
  };
  new MutationObserver(render).observe(root,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['data-conversation','disabled','hidden']});render();
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
}
