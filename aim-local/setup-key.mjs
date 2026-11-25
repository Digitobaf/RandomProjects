import { writeFile,readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { parseEnv } from 'node:util';
export async function windowsKeySetup(file,{spawnProcess=spawn}={}){
 const script=await readFile(new URL('./key-dialog.ps1',import.meta.url),'utf8');
 console.log('A key setup window is opening. Paste your key there and choose Save key.');
 const code=await new Promise(resolve=>{let child;try{child=spawnProcess('powershell.exe',['-NoProfile','-STA','-Command',script],{windowsHide:true,stdio:'ignore',env:{...process.env,AIM_ENV_PATH:file}});}catch{resolve(1);return;}child.once('error',()=>resolve(1));child.once('exit',value=>resolve(value??1));});
 if(code===2){console.log('No key was saved. Run Start AIM.cmd when you are ready.');return false;}
 if(code===0){try{const config=parseEnv(await readFile(file,'utf8'));if(/^[A-Za-z0-9_-]{20,200}$/.test(config.GEMINI_API_KEY||'')){console.log('Key saved. You can start AIM now.');return true;}}catch{}}
 // A visible editor remains available if Windows cannot display the dialog.
 console.error('The key setup window could not open. Opening the local settings in Notepad instead.');
 try{await writeFile(file,'GEMINI_API_KEY=\nGEMINI_MODEL=gemini-3.1-flash-lite\n',{flag:'wx',mode:0o600});}catch(e){if(e.code!=='EEXIST')throw e;}
 const editor=spawnProcess('notepad.exe',[file],{windowsHide:true,detached:true,stdio:'ignore'});editor.on('error',()=>console.error('Open aim-local/.env in Notepad to enter the key.'));editor.unref();
 console.log('In Notepad, paste the key after GEMINI_API_KEY=, save, then run Start AIM.cmd again.');return false;
}
export async function setupKey(){
 const file=path.join(path.dirname(fileURLToPath(import.meta.url)),'.env');
 if(process.platform==='win32')return windowsKeySetup(file);
 if(!process.stdin.isTTY){console.error('Open Set Gemini Key.cmd to enter the key privately.');process.exitCode=1;return false;}
 console.log('Paste your Gemini API key. It will not be shown or sent anywhere during setup.');process.stdout.write('Key: ');let key='';process.stdin.setRawMode(true);process.stdin.resume();process.stdin.setEncoding('utf8');
 await new Promise((resolve,reject)=>{const input=text=>{for(const c of text){if(c==='\u0003'){cleanup();reject(new Error('Cancelled'));return;}if(c==='\r'||c==='\n'){cleanup();resolve();return;}if(c==='\u007f'||c==='\b')key=key.slice(0,-1);else if(c>=' '&&c<='~')key+=c;}};const cleanup=()=>{process.stdin.off('data',input);process.stdin.setRawMode(false);process.stdin.pause();process.stdout.write('\n');};process.stdin.on('data',input);});
 key=key.trim();if(!/^[A-Za-z0-9_-]{20,200}$/.test(key)){console.error('That does not look like an API key. Nothing was saved.');return false;}
 let model='gemini-3.1-flash-lite';try{const old=await readFile(file,'utf8');model=old.match(/^GEMINI_MODEL=([a-z0-9.-]+)$/m)?.[1]||model;}catch{}
 await writeFile(file,`GEMINI_API_KEY=${key}\nGEMINI_MODEL=${model}\n`,{mode:0o600});console.log('Key saved in aim-local/.env. Restart Start AIM.cmd if it is already running.');return true;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){setupKey().then(ok=>{if(!ok)process.exitCode=1;}).catch(()=>{console.error('Key setup was cancelled or could not be saved.');process.exitCode=1;});}
