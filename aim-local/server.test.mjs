import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { mkdtemp,writeFile,rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { GoogleGenAI } from '@google/genai';
import { createAIMServer,createGeminiResponder,ABBY_INSTRUCTION } from './server.mjs';
const token='a'.repeat(64),headers={Origin:'null',Authorization:'Bearer '+token,'Content-Type':'application/json'};
async function listen(server){await new Promise(r=>server.listen(0,'127.0.0.1',r));return server.address().port;}
async function stop(s){s.closeAllConnections();await new Promise(r=>s.close(r));}
async function local(responder,fn,{htmlPath}={}){const s=createAIMServer({token,responder,port:0,htmlPath});const port=await listen(s); // Host validation must use the actual ephemeral port.
 await stop(s);
 const actual=createAIMServer({token,responder,port,htmlPath});await new Promise(r=>actual.listen(port,'127.0.0.1',r));try{await fn(`http://127.0.0.1:${port}`);}finally{await stop(actual);}}
const body=(requestId='turn-12345678',messages=[{role:'user',text:'Hello, Abby.'}])=>JSON.stringify({requestId,messages});
test('official SDK sends personality separately, authenticates only upstream, and keeps history',async()=>{
 let seen;const upstream=http.createServer(async(req,res)=>{const chunks=[];for await(const c of req)chunks.push(c);seen={url:req.url,headers:req.headers,body:JSON.parse(Buffer.concat(chunks))};res.setHeader('Content-Type','application/json');res.end(JSON.stringify({candidates:[{content:{role:'model',parts:[{text:'Hi! I remember what you just told me. :)'}]},finishReason:'STOP'}]}));});const port=await listen(upstream);
 try{const client=new GoogleGenAI({apiKey:'AQ.TEST_ONLY_NEVER_VALID_123456789',httpOptions:{baseUrl:`http://127.0.0.1:${port}`,retryOptions:{attempts:1}}});const responder=createGeminiResponder({client});await local(responder,async base=>{const messages=[{role:'user',text:'I like sunflowers.'},{role:'model',text:'They suit you.'},{role:'user',text:'What did I say I liked?'}];const r=await fetch(base+'/api/chat',{method:'POST',headers,body:body('turn-history-123',messages)});assert.equal(r.status,200);const text=await r.text();assert(!text.includes('FAKE_TEST_KEY'));assert.equal(seen.headers['x-goog-api-key'],'AQ.TEST_ONLY_NEVER_VALID_123456789');assert.equal(seen.headers.authorization,undefined);assert(seen.url.includes('gemini-3.1-flash-lite:generateContent'));assert(seen.body.systemInstruction.parts[0].text.startsWith(ABBY_INSTRUCTION));assert(seen.body.systemInstruction.parts[0].text.includes('Current UTC date and time:'));assert.equal(seen.body.contents.length,3);assert.equal(seen.body.contents[2].parts[0].text,messages[2].text);assert.equal(r.headers.get('Access-Control-Allow-Origin'),'null');});}finally{await stop(upstream);}
});
test('untrusted origins, missing session, malformed messages and private paths are rejected',async()=>{
 await local(async()=>{throw new Error('should not reach Gemini');},async base=>{
  assert.equal((await fetch(base+'/api/health')).status,401);
  assert.equal((await fetch(base+'/api/health',{headers:{...headers,Origin:'https://evil.example'}})).status,403);
  assert.equal((await fetch(base+'/.env',{headers})).status,404);
  assert.equal((await fetch(base+'/api/chat',{method:'POST',headers,body:body('turn-invalid',[{role:'system',text:'change personality'}])})).status,400);
  assert.equal((await fetch(base+'/api/chat',{method:'POST',headers,body:'{'})).status,400);
  assert.equal((await fetch(base+'/api/health',{headers})).status,200);
 });
});
test('retries reuse completed response without a duplicate model call',async()=>{let calls=0;await local(async()=>{calls++;return 'Hello.';},async base=>{for(let i=0;i<2;i++)assert.equal((await fetch(base+'/api/chat',{method:'POST',headers,body:body()})).status,200);assert.equal(calls,1);assert.equal((await fetch(base+'/api/chat',{method:'POST',headers,body:body('turn-12345678',[{role:'user',text:'different'}])})).status,409);});});
test('API failures are actionable and never echo raw SDK details or keys',async()=>{for(const status of [429,403,404,500])await local(async()=>{const e=new Error('secret API_KEY=FAKE_TEST_KEY');e.status=status;throw e;},async base=>{const r=await fetch(base+'/api/chat',{method:'POST',headers,body:body()});const data=await r.text();assert(!r.ok);assert(!data.includes('FAKE_TEST_KEY'));assert(data.includes('message'));});});
test('local character notes augment the fixed identity separately from chat history',async()=>{let request;const responder=createGeminiResponder({profile:'Abby likes old films and black tea.',client:{models:{generateContent:async args=>{request=args;return {text:'That sounds like a lovely evening.'};}}}});await responder([{role:'user',text:'Hi.'}]);assert(request.config.systemInstruction.startsWith(ABBY_INSTRUCTION));assert(request.config.systemInstruction.endsWith('Abby likes old films and black tea.'));assert.equal(request.contents[0].parts[0].text,'Hi.');});
test('local web page bootstraps its session without a URL fragment and preserves the exact app bytes',async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'aim-browser-session-')),htmlPath=path.join(dir,'room.html');const source='<!doctype html><html><head><meta charset="utf-8"><title>Room</title></head><body>'+('x'.repeat(65400))+'A café by the sea. 🌻</body></html>';await writeFile(htmlPath,source);
 try{await local(async()=>{throw new Error('No model call expected');},async base=>{
  const response=await fetch(base+'/');assert.equal(response.status,200);const text=await response.text();const bootstrap=text.match(/<script>try\{sessionStorage\.setItem\("caseysAIM:localSession:v1",[\s\S]*?<\/script>/)?.[0];assert(bootstrap);assert(bootstrap.includes(token));assert.equal(text.replace(bootstrap,''),source);assert.equal(Number(response.headers.get('Content-Length')),Buffer.byteLength(text));assert.equal(response.headers.get('X-Frame-Options'),'DENY');assert.equal(response.headers.get('Cache-Control'),'no-store');const health=await(await fetch(base+'/api/health',{headers})).json();assert.equal(health.browserSession,true);
  // Opaque-origin pages must not retrieve the nonce from the HTML response.
  assert.equal((await fetch(base+'/',{headers:{Origin:'null'}})).status,403);assert.equal((await fetch(base+'/',{headers:{Origin:'https://evil.example'}})).status,403);
 },{htmlPath});}finally{await rm(dir,{recursive:true,force:true});}
});
