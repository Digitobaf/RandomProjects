import { writeFile,readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
export async function setupKey(){
 const file=path.join(path.dirname(fileURLToPath(import.meta.url)),'.env');
 if(!process.stdin.isTTY){console.error('Open Set Gemini Key.cmd to enter the key privately.');process.exitCode=1;return false;}
 console.log('Paste your Gemini API key. It will not be shown or sent anywhere during setup.');process.stdout.write('Key: ');let key='';process.stdin.setRawMode(true);process.stdin.resume();process.stdin.setEncoding('utf8');
 await new Promise((resolve,reject)=>{const input=text=>{for(const c of text){if(c==='\u0003'){cleanup();reject(new Error('Cancelled'));return;}if(c==='\r'||c==='\n'){cleanup();resolve();return;}if(c==='\u007f'||c==='\b')key=key.slice(0,-1);else if(c>=' '&&c<='~')key+=c;}};const cleanup=()=>{process.stdin.off('data',input);process.stdin.setRawMode(false);process.stdin.pause();process.stdout.write('\n');};process.stdin.on('data',input);});
 key=key.trim();if(!/^[A-Za-z0-9_-]{20,200}$/.test(key)){console.error('That does not look like an API key. Nothing was saved.');return false;}
 let model='gemini-3.1-flash-lite';try{const old=await readFile(file,'utf8');model=old.match(/^GEMINI_MODEL=([a-z0-9.-]+)$/m)?.[1]||model;}catch{}
 await writeFile(file,`GEMINI_API_KEY=${key}\nGEMINI_MODEL=${model}\n`,{mode:0o600});console.log('Key saved in aim-local/.env. Restart Start AIM.cmd if it is already running.');return true;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){setupKey().then(ok=>{if(!ok)process.exitCode=1;}).catch(()=>{console.error('Key setup was cancelled or could not be saved.');process.exitCode=1;});}
