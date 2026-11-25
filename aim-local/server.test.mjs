import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { GoogleGenAI } from '@google/genai';
import { createAIMServer,createGeminiResponder,ABBY_INSTRUCTION } from './server.mjs';
const token='a'.repeat(64),headers={Origin:'null',Authorization:'Bearer '+token,'Content-Type':'application/json'};
async function listen(server){await new Promise(r=>server.listen(0,'127.0.0.1',r));return server.address().port;}
async function stop(s){s.closeAllConnections();await new Promise(r=>s.close(r));}
async function local(responder,fn){const s=createAIMServer({token,responder,port:0});const port=await listen(s); // Host validation must use the actual ephemeral port.
 await stop(s);
 const actual=createAIMServer({token,responder,port});await new Promise(r=>actual.listen(port,'127.0.0.1',r));try{await fn(`http://127.0.0.1:${port}`);}finally{await stop(actual);}}
const body=(requestId='turn-12345678',messages=[{role:'user',text:'Hello, Abby.'}])=>JSON.stringify({requestId,messages});
test('official SDK sends personality separately, authenticates only upstream, and keeps history',async()=>{
 let seen;const upstream=http.createServer(async(req,res)=>{const chunks=[];for await(const c of req)chunks.push(c);seen={url:req.url,headers:req.headers,body:JSON.parse(Buffer.concat(chunks))};res.setHeader('Content-Type','application/json');res.end(JSON.stringify({candidates:[{content:{role:'model',parts:[{text:'Hi! I remember what you just told me. :)'}]},finishReason:'STOP'}]}));});const port=await listen(upstream);
 try{const client=new GoogleGenAI({apiKey:'FAKE_TEST_KEY_DO_NOT_USE',httpOptions:{baseUrl:`http://127.0.0.1:${port}`,retryOptions:{attempts:1}}});const responder=createGeminiResponder({client});await local(responder,async base=>{const messages=[{role:'user',text:'I like sunflowers.'},{role:'model',text:'They suit you.'},{role:'user',text:'What did I say I liked?'}];const r=await fetch(base+'/api/chat',{method:'POST',headers,body:body('turn-history-123',messages)});assert.equal(r.status,200);const text=await r.text();assert(!text.includes('FAKE_TEST_KEY'));assert.equal(seen.headers['x-goog-api-key'],'FAKE_TEST_KEY_DO_NOT_USE');assert(seen.url.includes('gemini-3.1-flash-lite:generateContent'));assert(seen.body.systemInstruction.parts[0].text.startsWith(ABBY_INSTRUCTION));assert(seen.body.systemInstruction.parts[0].text.includes('Current UTC date and time:'));assert.equal(seen.body.contents.length,3);assert.equal(seen.body.contents[2].parts[0].text,messages[2].text);assert.equal(r.headers.get('Access-Control-Allow-Origin'),'null');});}finally{await stop(upstream);}
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
