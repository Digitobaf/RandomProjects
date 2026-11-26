import {test} from 'node:test';
import assert from 'node:assert/strict';
import {classifyGeminiError,withGeminiRecovery} from './gemini-connection.mjs';
const statusError=status=>Object.assign(new Error('private response: API_KEY=FAKE_TEST_KEY'),{status});
test('temporary Google failures and wrapped network errors recover with bounded backoff',async()=>{
 let calls=0,clock=0;const waits=[],notices=[];
 const result=await withGeminiRecovery(async({attempt,timeoutMs})=>{calls++;assert.equal(attempt,calls);assert.equal(timeoutMs,15000);if(calls===1)throw statusError(503);if(calls===2)throw new TypeError('fetch failed',{cause:Object.assign(new Error('private URL'),{code:'ECONNRESET'})});return 'One reply.';},{now:()=>clock,wait:async ms=>{waits.push(ms);clock+=ms;},random:()=>0,onRetry:info=>notices.push(info)});
 assert.equal(result,'One reply.');assert.equal(calls,3);assert.deepEqual(waits,[600,1200]);assert.equal(notices[0].kind,'UPSTREAM_UNAVAILABLE');assert.equal(notices[1].networkCode,'ECONNRESET');assert(!JSON.stringify(notices).includes('private'));assert(!JSON.stringify(notices).includes('FAKE_TEST_KEY'));
});
test('quota, key, model, request, and unknown errors are never automatically retried',async()=>{
 for(const error of [statusError(429),statusError(401),statusError(403),statusError(404),statusError(400),statusError(422),new Error('internal error')]){
  let calls=0;await assert.rejects(withGeminiRecovery(async()=>{calls++;throw error;},{wait:async()=>{throw new Error('unexpected wait');}}),e=>e===error);assert.equal(calls,1);
 }
});
test('retries stop after three attempts and stay within the browser time budget',async()=>{
 let clock=0;const timeouts=[];const error=Object.assign(new Error('Timeout'),{name:'TimeoutError'});
 await assert.rejects(withGeminiRecovery(async({timeoutMs})=>{timeouts.push(timeoutMs);clock+=timeoutMs;throw error;},{now:()=>clock,wait:async ms=>{clock+=ms;},random:()=>0}),e=>e===error);
 assert.deepEqual(timeouts,[15000,15000,15000]);assert(clock<48000);
 let calls=0;clock=0;await assert.rejects(withGeminiRecovery(async()=>{calls++;clock+=47500;throw error;},{now:()=>clock,wait:async()=>{throw new Error('No budget to retry');},random:()=>0}),e=>e===error);assert.equal(calls,1);
});
test('a late retry receives only the remaining total timeout',async()=>{
 let clock=0,calls=0;const timeouts=[];
 await assert.rejects(withGeminiRecovery(async({timeoutMs})=>{timeouts.push(timeoutMs);calls++;clock+=calls===1?30000:14000;throw statusError(503);},{now:()=>clock,wait:async ms=>{clock+=ms;},random:()=>0}));
 assert.deepEqual(timeouts,[15000,15000,2200]);
});
test('diagnoses distinguish Google status, DNS, TLS, timeout, and unknown without raw details',()=>{
 assert.deepEqual(classifyGeminiError(statusError(503)),{kind:'UPSTREAM_UNAVAILABLE',status:503,retryable:true});
 assert.equal(classifyGeminiError({cause:{response:{status:429}}}).kind,'RATE_LIMIT');
 assert.equal(classifyGeminiError({cause:{code:'ENOTFOUND'}}).kind,'DNS');
 assert.equal(classifyGeminiError({cause:{code:'ENETUNREACH'}}).kind,'NETWORK_UNREACHABLE');
 assert.deepEqual(classifyGeminiError({cause:{code:'SELF_SIGNED_CERT_IN_CHAIN'}}),{kind:'TLS',retryable:false});
 assert.equal(classifyGeminiError({cause:{name:'TimeoutError'}}).kind,'TIMEOUT');
 const circular={};circular.cause=circular;assert.equal(classifyGeminiError(circular).kind,'UNKNOWN');
 assert.equal(classifyGeminiError(new Error('private response')).kind,'UNKNOWN');
});
