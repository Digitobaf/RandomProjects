import {setTimeout as sleep} from 'node:timers/promises';
// Only allowlisted codes leave this module. Never expose SDK messages, URLs, keys, or chat.
const NETWORK=new Set(['ECONNRESET','ECONNREFUSED','EPIPE','ENOTFOUND','EAI_AGAIN','ETIMEDOUT','ENETUNREACH','EHOSTUNREACH','UND_ERR_CONNECT_TIMEOUT','UND_ERR_HEADERS_TIMEOUT','UND_ERR_BODY_TIMEOUT','UND_ERR_SOCKET']);
const TLS=new Set(['CERT_HAS_EXPIRED','DEPTH_ZERO_SELF_SIGNED_CERT','SELF_SIGNED_CERT_IN_CHAIN','UNABLE_TO_VERIFY_LEAF_SIGNATURE','UNABLE_TO_GET_ISSUER_CERT_LOCALLY','ERR_TLS_CERT_ALTNAME_INVALID']);
const TRANSIENT=new Set([408,500,502,503,504]);
export function classifyGeminiError(error){
 const chain=[],seen=new Set();let next=error;
 for(let i=0;i<8&&next&&typeof next==='object'&&!seen.has(next);i++){seen.add(next);chain.push(next);next=next.cause;}
 let status;for(const item of chain){const n=Number(item.status??item.statusCode??item.response?.status??item.error?.code);if(Number.isInteger(n)&&n>=400&&n<=599){status=n;break;}}
 if(status)return {kind:status===408||status===504?'TIMEOUT':status===429?'RATE_LIMIT':status===401||status===403?'KEY_OR_ACCESS':status===404?'MODEL_UNAVAILABLE':status===400?'REQUEST_REJECTED':status===422?'NO_REPLY':status>=500?'UPSTREAM_UNAVAILABLE':'REQUEST_REJECTED',status,retryable:TRANSIENT.has(status)};
 for(const item of chain){const code=String(item.code||'');if(TLS.has(code)||code.startsWith('ERR_SSL_'))return {kind:'TLS',retryable:false};}
 for(const item of chain)if(item.name==='TimeoutError'||item.name==='AbortError')return {kind:'TIMEOUT',retryable:true};
 for(const item of chain){const code=String(item.code||'');if(NETWORK.has(code))return {kind:code==='ENOTFOUND'||code==='EAI_AGAIN'?'DNS':code==='ENETUNREACH'||code==='EHOSTUNREACH'?'NETWORK_UNREACHABLE':'NETWORK',networkCode:code,retryable:true};}
 if(chain.some(item=>item instanceof TypeError&&/fetch failed|network error|failed to fetch/i.test(item.message||'')))return {kind:'NETWORK',retryable:true};
 return {kind:'UNKNOWN',retryable:false};
}
export async function withGeminiRecovery(operation,{wait=sleep,now=()=>performance.now(),random=Math.random,onRetry=()=>{},budgetMs=48000,attemptMs=15000,maxAttempts=3}={}){
 const started=now();let lastError;
 for(let attempt=1;attempt<=maxAttempts;attempt++){
  const remaining=budgetMs-(now()-started);if(remaining<=0)break;
  try{return await operation({timeoutMs:Math.max(1,Math.min(attemptMs,Math.floor(remaining))),attempt});}
  catch(error){lastError=error;const info=classifyGeminiError(error);if(!info.retryable||attempt===maxAttempts)throw error;
   const pause=Math.round(600*2**(attempt-1)+random()*250);
   // Leave at least one second to try again, inside the browser's 55-second request window.
   if(budgetMs-(now()-started)<pause+1000)throw error;
   onRetry({attempt,nextAttempt:attempt+1,...info});await wait(pause);
  }
 }
 if(lastError)throw lastError;const error=new Error('Gemini request timed out');error.name='TimeoutError';throw error;
}
