import { readFile,stat } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
const MAX_BYTES=128*1024;
function profileError(code){const error=new Error('Character profile unavailable');error.code=code;return error;}
export function createProfileLoader(file){
 return async()=>{
  for(let attempt=0;attempt<5;attempt++){
   try{const info=await stat(file);if(info.size>MAX_BYTES)throw profileError('PROFILE_TOO_LARGE');const bytes=await readFile(file);if(bytes.length>MAX_BYTES)throw profileError('PROFILE_TOO_LARGE');const text=bytes[0]===255&&bytes[1]===254?bytes.toString('utf16le'):bytes.toString('utf8');return text.replace(/^\uFEFF/,'').trim();}
   catch(error){if(error.code==='PROFILE_TOO_LARGE')throw error;if(!['ENOENT','EBUSY','EACCES','EPERM'].includes(error.code)||attempt===4)throw profileError('PROFILE_UNAVAILABLE');await delay(50);}
  }
 };
}
