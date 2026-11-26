import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createFreeQuickLookup} from './quick-lookup.mjs';
import {createGeminiResponder} from './server.mjs';
test('free lookup uses only Wikipedia, sends no key, bounds results, and caches',async()=>{
 let calls=0;const lookup=createFreeQuickLookup({fetchImpl:async(url,options)=>{calls++;assert.equal(url.hostname,'en.wikipedia.org');assert(!JSON.stringify(options.headers).includes('Authorization'));assert.equal(url.searchParams.get('gsrlimit'),'1');return new Response(JSON.stringify({query:{pages:[{title:'Patrick Stewart',extract:'Patrick Stewart (1940–2026) was an actor.'}]}}));}});
 const result=await lookup('Patrick Stewart');assert.equal(result.status,'found');assert.equal(result.results[0].url,'https://en.wikipedia.org/wiki/Patrick_Stewart');await lookup('Patrick Stewart');assert.equal(calls,1);
});
test('lookup failures and empty results are explicit, not fabricated facts',async()=>{
 assert.equal((await createFreeQuickLookup({fetchImpl:async()=>{throw new Error('private error');}})('A topic')).status,'unavailable');
 assert.equal((await createFreeQuickLookup({fetchImpl:async()=>new Response('{}')})('A topic')).status,'not_found');
});
test('one tool round preserves signatures, disables further calls, and keeps lookup results behind the scenes',async()=>{
 let calls=0,lookups=0;const modelTurn={role:'model',parts:[{functionCall:{name:'quick_fact_lookup',args:{query:'Patrick Stewart'},id:'call-1'},thoughtSignature:'test-signature'}]};
 const responder=createGeminiResponder({lookup:async()=>{lookups++;return {status:'found',results:[{title:'Patrick Stewart',url:'https://en.wikipedia.org/wiki/Patrick_Stewart',summary:'Actor, died 2026.'}]};},client:{models:{generateContent:async args=>{
 calls++;assert(!JSON.stringify(args.config.tools).includes('googleSearch'));
 if(calls===1)return {functionCalls:[modelTurn.parts[0].functionCall],candidates:[{content:modelTurn}]};
 assert.equal(args.config.toolConfig.functionCallingConfig.mode,'NONE');assert.deepEqual(args.contents.at(-2),modelTurn);assert.equal(args.contents.at(-1).parts[0].functionResponse.id,'call-1');return {text:'I checked—he died in 2026.'};
 }}}});
 const text=await responder([{role:'user',text:'Did Patrick Stewart die?'}]);assert.equal(calls,2);assert.equal(lookups,1);assert.equal(text,'I checked—he died in 2026.');assert(!text.includes('https://'));
});
