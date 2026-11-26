import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import path from 'node:path';
export const DEFAULT_MODEL='gemini-3.5-flash-lite';
export const AIM_REVISION='abby-sessions-2';
// One-time, user-requested model change. Later manual model choices remain respected.
export async function applyAbbyModelUpgrade(envFile,runtimeDir){
 const marker=path.join(runtimeDir,'model-choice-3-5-v1');
 try{if((await readFile(marker,'utf8')).trim()===DEFAULT_MODEL)return false;}catch(error){if(error.code!=='ENOENT')throw error;}
 let before;try{before=await readFile(envFile,'utf8');}catch(error){if(error.code!=='ENOENT')throw error;before='';}const eol=before.includes('\r\n')?'\r\n':'\n';
 let found=false;let after=before.replace(/^([ \t]*(?:export[ \t]+)?GEMINI_MODEL[ \t]*=)[^\r\n]*/gm,(_,prefix)=>{found=true;return prefix+DEFAULT_MODEL;});
 if(!found)after+=(after&&!after.endsWith('\n')?eol:'')+'GEMINI_MODEL='+DEFAULT_MODEL+eol;
 await mkdir(runtimeDir,{recursive:true,mode:0o700});
 if(after!==before){const temp=path.join(runtimeDir,'model-update.env.tmp');await writeFile(temp,after,{mode:0o600});await rename(temp,envFile);}
 await writeFile(marker,DEFAULT_MODEL+'\n',{mode:0o600});return after!==before;
}
