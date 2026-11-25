import { readFile,writeFile,mkdir,unlink,access,copyFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { pathToFileURL,fileURLToPath } from 'node:url';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { PORT,createAIMServer,createGeminiResponder } from './server.mjs';
import { setupKey } from './setup-key.mjs';
const dir=path.dirname(fileURLToPath(import.meta.url)),html=path.resolve(dir,'..','Caseys-Room-with-Mood-Ring.html'),runtime=path.join(dir,'.aim-runtime'),session=path.join(runtime,'session.json');
function openRoom(token){const url=pathToFileURL(html);url.hash=new URLSearchParams({aim_session:token}).toString();if(process.platform==='win32'){const child=spawn('rundll32.exe',['url.dll,FileProtocolHandler',url.href],{detached:true,stdio:'ignore'});child.on('error',()=>console.log('The browser could not be opened automatically. Restart Start AIM.cmd after choosing a default browser.'));child.unref();}else if(!process.env.AIM_NO_BROWSER){console.log('This launcher is intended for Windows.');}}
async function main(){
 try{await access(html);}catch{console.error('Extract the whole Casey’s Room ZIP before opening Start AIM.cmd.');process.exitCode=1;return;}
 try{const old=JSON.parse(await readFile(session,'utf8'));if(/^[a-f0-9]{64}$/.test(old.token)){const response=await fetch(`http://127.0.0.1:${PORT}/api/health`,{headers:{Authorization:'Bearer '+old.token},signal:AbortSignal.timeout(1000)});if(response.ok){openRoom(old.token);console.log('AIM is already running. The existing service was reused.');return;}}}catch{}
 try{process.loadEnvFile(path.join(dir,'.env'));}catch(e){if(e.code!=='ENOENT')throw e;}
 if(!process.env.GEMINI_API_KEY||process.env.GEMINI_API_KEY==='your_key_here'){if(!await setupKey()){process.exitCode=1;return;}const {parseEnv}=await import('node:util');process.env.GEMINI_API_KEY=parseEnv(await readFile(path.join(dir,'.env'),'utf8')).GEMINI_API_KEY;}
 const model=process.env.GEMINI_MODEL||'gemini-3.1-flash-lite';if(!/^[a-z0-9.-]+$/.test(model))throw new Error('Invalid model');
 const profilePath=path.join(dir,'abby-profile.txt');try{await copyFile(path.join(dir,'abby-profile.example.txt'),profilePath,1);}catch(e){if(e.code!=='EEXIST')throw e;}const profile=(await readFile(profilePath,'utf8')).slice(0,24000);
 const token=randomBytes(32).toString('hex'),server=createAIMServer({token,responder:createGeminiResponder({apiKey:process.env.GEMINI_API_KEY,model,profile}),htmlPath:html});
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(PORT,'127.0.0.1',resolve);});await mkdir(runtime,{recursive:true,mode:0o700});await writeFile(session,JSON.stringify({token,pid:process.pid}),{mode:0o600});
 console.log('Abby’s local connection is ready. Keep this window open while you chat.');console.log('In AIM, sign on and select xXx_SoupSlut_xXx. Cancel skips the connecting animation.');console.log('Close this window to stop the connection. Your conversations stay saved in the browser.');openRoom(token);
 async function shutdown(){try{const saved=JSON.parse(await readFile(session,'utf8'));if(saved.token===token)await unlink(session);}catch{}server.close();setTimeout(()=>process.exit(0),250).unref();}
 process.on('SIGINT',shutdown);process.on('SIGTERM',shutdown);
}
main().catch(e=>{console.error(e?.code==='EADDRINUSE'?'The local AIM port is in use. Close the other AIM service window and try again.':'AIM could not start. Check Node.js, your .env file, and that the full ZIP was extracted.');process.exitCode=1;});
