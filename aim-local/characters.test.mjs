import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {createAIMServer,createGeminiResponder,MERCER_CHARACTER} from './server.mjs';
import {createProfileLoader} from './profile.mjs';

test('characters load independent permanent notes, current contexts and common chat features',async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'aim-characters-'));
 try{
  const files=[path.join(dir,'abby.txt'),path.join(dir,'mercer.txt')];await writeFile(files[0],'ABBY_PRIVATE_NOTE');await writeFile(files[1],'MERCER_PRIVATE_NOTE');
  const seen=[];const client={models:{generateContent:async args=>{seen.push(args);return {text:'mercer_type: Hello. :)'};}}};
  const abby=createGeminiResponder({client,profile:createProfileLoader(files[0])}),mercer=createGeminiResponder({client,profile:createProfileLoader(files[1]),character:MERCER_CHARACTER});
  await abby([{role:'user',text:'ABBY_CHAT_ONLY'}]);await mercer([{role:'user',text:'MERCER_CHAT_ONLY'}]);
  assert(seen[0].config.systemInstruction.startsWith('You are Abby'));assert(seen[1].config.systemInstruction.startsWith('You are Julian Mercer'));
  for(const [index,own,other]of [[0,'ABBY','MERCER'],[1,'MERCER','ABBY']]){const prompt=seen[index].config.systemInstruction;assert(prompt.includes(own+'_PRIVATE_NOTE'));assert(!prompt.includes(other+'_PRIVATE_NOTE'));assert(!JSON.stringify(seen[index].contents).includes(other+'_CHAT_ONLY'));assert(prompt.includes('Previous chat sessions are not available'));assert(prompt.includes('1–3 sentences'));assert(prompt.includes('Never include modern emoji'));assert(seen[index].config.tools[0].functionDeclarations.some(t=>t.name==='quick_fact_lookup'));}
  assert(!seen[1].config.systemInstruction.includes('Abby'));assert(!seen[1].config.systemInstruction.includes('China'));
  await writeFile(files[1],'MERCER_UPDATED_NOTE');await mercer([{role:'user',text:'Next reply'}]);await abby([{role:'user',text:'Next reply'}]);
  assert(seen[2].config.systemInstruction.includes('MERCER_UPDATED_NOTE'));assert(!seen[2].config.systemInstruction.includes('MERCER_PRIVATE_NOTE'));assert(seen[3].config.systemInstruction.includes('ABBY_PRIVATE_NOTE'));
 }finally{await rm(dir,{recursive:true,force:true});}
});

test('HTTP character routing and retry caches stay separate even with the same request ID',async()=>{
 const calls={abby:0,mercer:0};const responders={'abby-gemini':async()=>{calls.abby++;return 'Abby: Abby reply';},'mercer-gemini':async()=>{calls.mercer++;return 'mercer_type: Julian reply';}};
 const token='b'.repeat(64),probe=createAIMServer({token,responders,port:0,typingDelay:()=>0});await new Promise(r=>probe.listen(0,'127.0.0.1',r));const port=probe.address().port;await new Promise(r=>probe.close(r));
 const server=createAIMServer({token,responders,port,typingDelay:()=>0});await new Promise(r=>server.listen(port,'127.0.0.1',r));
 const send=buddyId=>fetch('http://127.0.0.1:'+port+'/api/chat',{method:'POST',headers:{Origin:'null',Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({buddyId,requestId:'same-turn-id-123',messages:[{role:'user',text:'Hello'}]})});
 try{for(let i=0;i<2;i++){assert.equal((await(await send('abby-gemini')).json()).text,'Abby reply');assert.equal((await(await send('mercer-gemini')).json()).text,'Julian reply');}assert.deepEqual(calls,{abby:1,mercer:1});assert.equal((await send('transcription-buddy')).status,400);assert.deepEqual(calls,{abby:1,mercer:1});}
 finally{server.closeAllConnections();await new Promise(r=>server.close(r));}
});

test('Abby uses established Chongqing context and restrained delivery after conflicting old notes',async()=>{
 let request;const notes='OLD NOTES: Location Shanghai; three hours ahead of the user. Always drinking Earl Grey. Every greeting should mention tea.';
 const responder=createGeminiResponder({profile:notes,client:{models:{generateContent:async args=>{request=args;return{text:'All right. How about you?'};}}}});
 const messages=[{role:'user',text:'Hi.'},{role:'model',text:'It is evening here. Still working with my Earl Grey.'},{role:'user',text:'It is 2 a.m. here. Why are you still at work?'}];
 await responder(messages);const prompt=request.config.systemInstruction;
 assert(prompt.startsWith('You are Abby'));assert(prompt.includes('corporate job in Chongqing, China'));assert(prompt.includes(notes));
 assert(prompt.indexOf('Established current context:')>prompt.indexOf(notes));assert(prompt.includes('share the same local time as the user'));assert(prompt.includes('Do not claim a time difference'));assert(prompt.includes('especially if the user has established that it is 2 a.m.'));
 assert(prompt.indexOf('Conversational delivery rules:')>prompt.indexOf(notes));assert(prompt.includes('not a recurring prop'));assert(prompt.includes('Discuss favorites naturally when relevant or when asked'));assert(prompt.includes('Do not infer current activities'));
 assert(prompt.includes('No current clock time is supplied.'));assert(!prompt.includes('Current UTC date and time:'));assert(!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(prompt));
 assert.equal(request.contents.at(-1).parts[0].text,messages.at(-1).text);assert.equal(request.contents[1].parts[0].text,messages[1].text);
});

test('Mercer voice guidance overrides performance cues without replacing private biography',async()=>{
 let request;const notes='PRIVATE BIO: London. Favorite restaurant St. JOHN. Sarcasm: frequent. Always use Hello, kid. Usual online hours: late evenings.';
 const responder=createGeminiResponder({character:MERCER_CHARACTER,profile:notes,client:{models:{generateContent:async args=>{request=args;return{text:"Fair point. I'll tone it down."};}}}});
 await responder([{role:'user',text:'You sound like a cartoon. Please talk normally.'}]);const prompt=request.config.systemInstruction;
 assert(prompt.includes(notes));assert(prompt.indexOf("Mercer's delivery:")>prompt.indexOf(notes));assert(prompt.includes('plain, contemporary language'));assert(prompt.includes('Dry humor is occasional'));assert(prompt.includes('without another joke'));assert(prompt.includes('not a line to repeat'));assert(prompt.includes('Do not repeatedly use signature greetings'));assert(prompt.includes('Do not volunteer clock times'));
 assert(!prompt.includes('Current UTC date and time:'));assert(!prompt.includes('use Europe/London local time'));assert(!prompt.includes('Established current context:'));assert(!prompt.includes('Chongqing'));
});
