import { DEFAULT_MODEL } from './model.mjs';
import { writeFile,readFile,unlink,mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { parseEnv } from 'node:util';
// Google authorization keys include periods. Do not restrict keys to the older format.
export function validKey(value){return typeof value==='string'&&/^[A-Za-z0-9._=~-]{16,512}$/.test(value)&&!['your_key_here','PASTE_YOUR_KEY_HERE'].includes(value);}
export function keyFromText(text){const value=text.replace(/^\uFEFF/,'').trim();return value.startsWith('GEMINI_API_KEY=')?parseEnv(value).GEMINI_API_KEY||'':value;}
export async function saveKey(file,key){
 if(!validKey(key))throw new Error('Invalid key text');
 let old='';try{old=await readFile(file,'utf8');}catch(e){if(e.code!=='ENOENT')throw e;}
 const kept=old.split(/\r?\n/).filter(line=>!/^\s*GEMINI_API_KEY\s*=/.test(line));while(kept.at(-1)==='')kept.pop();if(!kept.some(line=>/^\s*GEMINI_MODEL\s*=/.test(line)))kept.push('GEMINI_MODEL='+DEFAULT_MODEL);
 await writeFile(file,['GEMINI_API_KEY='+key,...kept,''].join('\r\n'),{mode:0o600});
}
export async function windowsKeySetup(file,{spawnProcess=spawn,pollMs=250,timeoutMs=600000,signal}={}){
 const entry=path.join(path.dirname(file),'.aim-runtime','Paste Gemini key here.txt');await mkdir(path.dirname(entry),{recursive:true,mode:0o700});await writeFile(entry,'',{mode:0o600});let editorError=false,cancelled=false;
 const cancel=()=>{cancelled=true;};process.once('SIGINT',cancel);process.once('SIGHUP',cancel);signal?.addEventListener('abort',cancel,{once:true});
 console.log('Notepad is opening with an EMPTY document.');console.log('Paste ONLY your new Gemini API key into Notepad, then press Ctrl+S.');console.log('The launcher will continue automatically. Close this black window to cancel.');
 try{
  // No PowerShell, hidden windows, or terminal key entry. Notepad receives only a file path.
  const editor=spawnProcess('notepad.exe',[entry],{windowsHide:false,stdio:'ignore'});editor.once('error',()=>{editorError=true;});editor.once('exit',code=>{if(code&&code!==0)editorError=true;});editor.unref?.();
  const until=Date.now()+timeoutMs;let invalidShown=false,nextNotice=Date.now()+30000;
  while(Date.now()<until&&!cancelled&&!signal?.aborted){
   if(editorError){console.error('Notepad could not open. Open Notepad once from the Windows Start menu, then run Set Gemini Key.cmd again.');return false;}
   let text='';try{text=await readFile(entry,'utf8');}catch(e){if(!['ENOENT','EBUSY','EACCES','EPERM'].includes(e.code))throw e;await delay(pollMs);continue;}let key='';try{key=keyFromText(text);}catch{}
   if(validKey(key)){await saveKey(file,key);console.log('Key saved. You can close Notepad now.');return true;}
   if(text.trim()&&!invalidShown){console.log('Replace the text in Notepad with ONLY the complete API key, then press Ctrl+S.');invalidShown=true;}
   if(Date.now()>=nextNotice){console.log('Still waiting for Ctrl+S in Notepad. Close this black window to cancel.');nextNotice=Date.now()+30000;}
   await delay(pollMs);
  }
  console.log(cancelled||signal?.aborted?'Key setup cancelled. Your existing settings were kept.':'No key was saved. Run Set Gemini Key.cmd to try again.');return false;
 }catch{console.error('Key setup could not finish. Make sure the app folder is writable.');return false;}
 finally{process.off('SIGINT',cancel);process.off('SIGHUP',cancel);signal?.removeEventListener('abort',cancel);try{await unlink(entry);}catch{}}
}
export async function setupKey(){
 const file=path.join(path.dirname(fileURLToPath(import.meta.url)),'.env');
 if(process.platform==='win32')return windowsKeySetup(file);
 console.error('Use the Windows launcher, or set GEMINI_API_KEY in aim-local/.env.');return false;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){setupKey().then(ok=>{if(!ok)process.exitCode=1;}).catch(()=>{console.error('Key setup could not finish.');process.exitCode=1;});}
