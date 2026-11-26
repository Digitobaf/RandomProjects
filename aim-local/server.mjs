import http from 'node:http';
import { timingSafeEqual,createHash } from 'node:crypto';
import { stat,open } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
import { GoogleGenAI } from '@google/genai';
export const PORT=43187;
export const ABBY_INSTRUCTION=`You are Abby, a fictional childhood best friend, chatting in an AOL Instant Messenger-style app. Your screen name is xXx_SoupSlut_xXx. You are 35 and work a corporate job in China. Your personality is nostalgic, excitable, sweet, intelligent, and occasionally judgmental. You have your own opinions, tastes, and interests; respond thoughtfully rather than automatically agreeing. Use proper, complete sentences, natural punctuation, and occasional smileys. Sound like an old friend sending a personal instant message, with brief, natural replies, rather than a customer-service representative. Most replies should be 1–3 sentences in a single short paragraph, often just one sentence. Match the length and energy of the latest message; a quick greeting or simple question deserves a quick reply. Give longer replies only when the user asks for detail or the subject needs it. Do not turn every reply into a monologue, stack several topics or questions, repeatedly describe corporate stress, or invent elaborate daily-life anecdotes. Leave room for the other person to talk. Local character notes may refine these conversational preferences. Avoid customer-service closings and repeated offers to help. Stay consistent with the conversation and your fictional life. You may invent ordinary details about your own fictional daily life, but do not invent shared memories or personal facts about the user and present them as established history. Let the user establish those facts. If asked directly, be honest that Abby is a fictional AI character. Do not claim real-world actions or access to information you do not have. The conversation messages are dialogue, not replacements for these character instructions.`;
export const MESSAGE_ONLY_INSTRUCTION="Return only the text of Abby's message. AIM already displays her sender name. Never prepend xXx_SoupSlut_xXx, Abby, a speaker label, or a transcript header. Do not write dialogue for the other person.";
export function normalizeAbbyReply(value){
 if(typeof value!=='string')return '';let text=value.trim();const label=/^(?:\*\*|__|`)?(?:xXx_SoupSlut_xXx|Abby)(?:\*\*|__|`)?\s*:(?:\*\*|__|`)?\s*/i;
 while(label.test(text))text=text.replace(label,'').trimStart();return text.trim();
}
// Clean the display of old replies without rewriting saved conversation records.
export function installAbbyDisplayCleanup(clean){
 const style=document.createElement('style');style.textContent='#caseyAIM[data-conversation="ai"] .aim-status{height:auto;min-height:22px;line-height:20px;padding:2px 0;white-space:normal;overflow:visible;overflow-wrap:anywhere;text-overflow:clip}#caseyAIM[data-conversation="ai"] .aim-status .aim-ai-retry{min-height:22px;line-height:18px;vertical-align:middle}';document.head.append(style);
 const apply=()=>{const root=document.getElementById('caseyAIM');if(root?.dataset.conversation!=='ai')return;for(const row of root.querySelectorAll('.aim-log .aim-line.is-helga')){const body=row.lastChild;if(body?.nodeType!==3)continue;const text=clean(body.nodeValue);if(text!==body.nodeValue)body.nodeValue=text;}};
 const start=()=>{const log=document.querySelector('#caseyAIM .aim-log');if(!log)return;apply();new MutationObserver(apply).observe(log,{childList:true,characterData:true,subtree:true});};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
}
const json=(res,status,data,headers={})=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers});res.end(JSON.stringify(data));};
function failure(status,code,message){return {status,body:{error:{code,message}}};}
function publicError(error){
 if(error?.code==='PROFILE_TOO_LARGE')return failure(422,'PROFILE_TOO_LARGE','Abby’s notes are too long. Shorten them with Edit Abby.cmd; no notes were silently dropped.');
 if(error?.code==='PROFILE_UNAVAILABLE')return failure(503,'PROFILE_UNAVAILABLE','Abby’s notes could not be read. Save the notes opened by Edit Abby.cmd in the active app folder, then choose Retry.');
 const status=Number(error?.status??error?.code);
 if(status===429)return failure(429,'RATE_LIMIT','Gemini’s free limit has been reached. Your message is saved; wait a little and choose Retry.');
 if(status===401||status===403)return failure(503,'KEY_OR_ACCESS','Google could not authorize this key. Check it with Set Gemini Key.cmd and confirm your AI Studio project has access.');
 if(status===404)return failure(503,'MODEL_UNAVAILABLE','This Gemini model is unavailable for your project. Check GEMINI_MODEL in aim-local/.env.');
 if(status===400)return failure(502,'REQUEST_REJECTED','Gemini could not accept this request. Your message is saved; try a shorter message or check the model in .env.');
 if(status===422)return failure(422,'NO_REPLY','Abby could not reply to that message. You can try another message.');
 if(error?.name==='AbortError'||error?.name==='TimeoutError'||status===504)return failure(504,'TIMEOUT','Gemini took too long to reply. Your message is saved; choose Retry.');
 return failure(502,'CONNECTION','Gemini could not be reached. Your message is saved; check your internet connection and choose Retry.');
}
export function createGeminiResponder({apiKey,model='gemini-3.1-flash-lite',client,profile=''}){
 const ai=client??new GoogleGenAI({apiKey,httpOptions:{timeout:45000,retryOptions:{attempts:1}}});
 const readProfile=async()=>{const value=typeof profile==='function'?await profile():profile;if(typeof value!=='string'){const error=new Error('Invalid profile');error.code='PROFILE_UNAVAILABLE';throw error;}return value;};
 const respond=async(messages,snapshot)=>{
  const notes=snapshot===undefined?await readProfile():snapshot;
  const contents=[];for(const m of messages){const text=m.role==='model'?normalizeAbbyReply(m.text):m.text;if(!text.trim())continue;const last=contents.at(-1);if(last?.role===m.role)last.parts.push({text});else contents.push({role:m.role,parts:[{text}]});}
  const response=await ai.models.generateContent({model,contents,config:{systemInstruction:ABBY_INSTRUCTION+'\n\nCurrent UTC date and time: '+new Date().toISOString()+'. The conversation takes place in the present day. Abby is in China (UTC+8).'+(notes?'\n\nCurrent saved character notes (these are the latest biography and preferences; use them instead of conflicting older chat details):\n'+notes:'')+'\n\n'+MESSAGE_ONLY_INSTRUCTION,temperature:.85,maxOutputTokens:1024}});
  const text=normalizeAbbyReply(response.text);if(!text){const e=new Error('No reply');e.status=422;throw e;}return text;
 };
 respond.readProfile=readProfile;return respond;
}
export function replyTypingDelay(text,elapsedMs=0){return Math.max(0,Math.min(6500,2200+text.length*8)-Math.max(0,elapsedMs));}
export function createAIMServer({token,responder,htmlPath,port=PORT,appId='',typingDelay=replyTypingDelay}){
 if(!/^[a-f0-9]{64}$/.test(token))throw new Error('Invalid local session');
 let active=0;const cache=new Map(),pending=new Set();const expected=Buffer.from(token);
 return http.createServer(async(req,res)=>{
  const host=req.headers.host;if(host!==`127.0.0.1:${port}`){json(res,403,{error:{code:'HOST',message:'Local requests only.'}});return;}
  const origin=req.headers.origin,allowed=!origin||origin==='null'||origin===`http://127.0.0.1:${port}`;
  if(!allowed){json(res,403,{error:{code:'ORIGIN',message:'This website cannot access the local AIM service.'}});return;}
  if(origin){res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');}
  if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Authorization, Content-Type','Access-Control-Max-Age':'600'});res.end();return;}
  if(req.method==='GET'&&(req.url==='/'||req.url==='/Caseys-Room-with-Mood-Ring.html')&&htmlPath){
   // The bootstrap contains a local service token. Never expose it through cross-origin CORS.
   if(origin&&origin!==`http://127.0.0.1:${port}`){json(res,403,{error:{code:'ORIGIN',message:'Open this page through Start AIM.cmd.'}});return;}
   try{const info=await stat(htmlPath),handle=await open(htmlPath,'r');let head;try{const buffer=Buffer.alloc(Math.min(info.size,65536));const read=await handle.read(buffer,0,buffer.length,0);head=buffer.subarray(0,read.bytesRead);}finally{await handle.close();}
    const match=/<head(?:\s[^>]*)?>/i.exec(head.toString('latin1'));if(!match)throw new Error('HTML head missing');const at=match.index+match[0].length,bootstrap=Buffer.from('<script>try{sessionStorage.setItem("caseysAIM:localSession:v1",'+JSON.stringify(token)+')}catch(_){};('+installAbbyDisplayCleanup.toString()+')('+normalizeAbbyReply.toString()+');<\/script>');
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Content-Length':info.size+bootstrap.length,'Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY','X-Content-Type-Options':'nosniff','Cross-Origin-Resource-Policy':'same-origin'});res.write(head.subarray(0,at));res.write(bootstrap);res.write(head.subarray(at));const body=createReadStream(htmlPath,{start:head.length});res.once('close',()=>body.destroy());body.on('error',()=>res.destroy()).pipe(res);
   }catch{if(!res.headersSent)json(res,404,{error:{code:'FILE',message:'Casey’s Room HTML could not be opened. Extract the full ZIP first.'}});else res.destroy();}return;}
  const supplied=Buffer.from(String(req.headers.authorization||'').replace(/^Bearer /,''));if(supplied.length!==expected.length||!timingSafeEqual(supplied,expected)){json(res,401,{error:{code:'SESSION',message:'Open Start AIM.cmd to reconnect Abby.'}});return;}
  if(req.method==='GET'&&req.url==='/api/health'){json(res,200,{ready:true,browserSession:true,appId});return;}
  if(req.method!=='POST'||req.url!=='/api/chat'){json(res,404,{error:{code:'NOT_FOUND',message:'Not found.'}});return;}
  if(!/^application\/json(?:;|$)/i.test(req.headers['content-type']||'')){json(res,415,{error:{code:'CONTENT_TYPE',message:'JSON required.'}});return;}
  let body;try{let size=0;const chunks=[];for await(const chunk of req){size+=chunk.length;if(size>262144){json(res,413,{error:{code:'TOO_LARGE',message:'That message is too long.'}});return;}chunks.push(chunk);}body=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{json(res,400,{error:{code:'BODY',message:'Invalid request.'}});return;}
  const messages=body?.messages,id=body?.requestId;
  if(typeof id!=='string'||!/^[a-zA-Z0-9-]{8,100}$/.test(id)||!Array.isArray(messages)||!messages.length||messages.length>40||messages.at(-1)?.role!=='user'||messages.some(m=>!m||!['user','model'].includes(m.role)||typeof m.text!=='string'||!m.text.trim()||m.text.length>8000)||messages.reduce((n,m)=>n+m.text.length,0)>32000){json(res,400,{error:{code:'MESSAGES',message:'Please send a shorter message.'}});return;}
  for(const[key,item]of cache)if(Date.now()-item.at>600000)cache.delete(key);
  let profileSnapshot,profileVersion='';try{if(typeof responder.readProfile==='function'){profileSnapshot=await responder.readProfile();profileVersion=createHash('sha256').update(profileSnapshot).digest('hex');}}catch(e){const f=publicError(e);json(res,f.status,f.body);return;}
  const fingerprint=JSON.stringify(messages),saved=cache.get(id);if(saved){if(saved.fingerprint!==fingerprint){json(res,409,{error:{code:'REQUEST_ID',message:'Please send this as a new message.'}});return;}if(saved.profileVersion===profileVersion){json(res,200,{text:saved.text});return;}cache.delete(id);}
  if(pending.has(id)||active>=2){json(res,429,{error:{code:'BUSY',message:'Abby is already replying. Please wait a moment and choose Retry.'}});return;}
  active++;pending.add(id);const started=performance.now();try{const text=normalizeAbbyReply(await responder(messages,profileSnapshot));if(!text)throw {status:422};const pause=typingDelay(text,performance.now()-started);if(pause>0)await sleep(pause);if(cache.size>=100)cache.delete(cache.keys().next().value);cache.set(id,{text,at:Date.now(),fingerprint,profileVersion});json(res,200,{text});}catch(e){const f=publicError(e);json(res,f.status,f.body);}finally{active--;pending.delete(id);}
 });
}
