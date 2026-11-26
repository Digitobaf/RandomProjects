import { readFile,writeFile,mkdir,unlink,access,copyFile } from 'node:fs/promises';
import { randomBytes,createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { PORT,createAIMServer,createGeminiResponder } from './server.mjs';
import { createProfileLoader } from './profile.mjs';
import { DEFAULT_MODEL,AIM_REVISION,applyAbbyModelUpgrade } from './model.mjs';
import { setupKey,validKey } from './setup-key.mjs';
const dir=path.dirname(fileURLToPath(import.meta.url)),html=path.resolve(dir,'..','Caseys-Room-with-Mood-Ring.html'),runtime=path.join(dir,'.aim-runtime'),session=path.join(runtime,'session.json'),appId=createHash('sha256').update(process.platform==='win32'?dir.toLowerCase():dir).digest('hex');
function openRoom(){const url=`http://127.0.0.1:${PORT}/`;console.log('Open Casey’s Room here: '+url);if(process.platform==='win32'){const child=spawn('rundll32.exe',['url.dll,FileProtocolHandler',url],{detached:true,stdio:'ignore'});child.on('error',()=>console.log('Copy the local web address above into your browser.'));child.unref();}}
async function main(){
 try{await access(html);}catch{console.error('Extract the whole Casey’s Room ZIP before opening Start AIM.cmd.');process.exitCode=1;return;}
 try{const old=JSON.parse(await readFile(session,'utf8'));if(/^[a-f0-9]{64}$/.test(old.token)){const response=await fetch(`http://127.0.0.1:${PORT}/api/health`,{headers:{Authorization:'Bearer '+old.token},signal:AbortSignal.timeout(1000)});if(response.ok){const health=await response.json();if(health.browserSession!==true||health.appId!==appId||health.revision!==AIM_REVISION){console.error('An older AIM service, or a copy in another folder, is still running. Close all old black launcher windows, then run Start AIM.cmd again.');process.exitCode=1;return;}openRoom();console.log('AIM is already running. The existing service was reused.');return;}}}catch{}
 try{process.loadEnvFile(path.join(dir,'.env'));}catch(e){if(e.code!=='ENOENT')throw e;}
 if(!validKey(process.env.GEMINI_API_KEY)){if(!await setupKey()){process.exitCode=1;return;}const {parseEnv}=await import('node:util');process.env.GEMINI_API_KEY=parseEnv(await readFile(path.join(dir,'.env'),'utf8')).GEMINI_API_KEY;}
 if(await applyAbbyModelUpgrade(path.join(dir,'.env'),runtime)){process.env.GEMINI_MODEL=DEFAULT_MODEL;console.log('Updated Abby to Gemini 3.5 Flash-Lite. Your key was kept.');}
 const model=process.env.GEMINI_MODEL||DEFAULT_MODEL;if(!/^[a-z0-9.-]+$/.test(model))throw new Error('Invalid model');
 const profilePath=path.join(dir,'abby-profile.txt');try{await copyFile(path.join(dir,'abby-profile.example.txt'),profilePath,1);}catch(e){if(e.code!=='EEXIST')throw e;}const profile=createProfileLoader(profilePath);
 const diagnostic=info=>{console.log('[AIM '+new Date().toISOString()+'] '+(info.event==='retry'?'Temporary error; retry '+info.nextAttempt+'/3':'Reply failed')+': '+info.kind+(info.status?' HTTP '+info.status:'')+(info.networkCode?' '+info.networkCode:''));};
 const token=randomBytes(32).toString('hex'),server=createAIMServer({token,responder:createGeminiResponder({apiKey:process.env.GEMINI_API_KEY,model,profile,recovery:{onRetry:info=>diagnostic({event:'retry',...info})}}),htmlPath:html,appId,onDiagnostic:diagnostic});
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(PORT,'127.0.0.1',resolve);});await mkdir(runtime,{recursive:true,mode:0o700});await writeFile(session,JSON.stringify({token,pid:process.pid}),{mode:0o600});
 console.log('Abby’s local connection is ready. Keep this window open while you chat.');console.log('Gemini model: '+model);console.log('Abby profile: '+profilePath);console.log('Saved profile edits apply to the next message automatically.');console.log('In AIM, sign on and select xXx_SoupSlut_xXx. Cancel skips the connecting animation.');console.log('Close this window to stop the connection. Your conversations stay saved in the browser.');openRoom();
 async function shutdown(){try{const saved=JSON.parse(await readFile(session,'utf8'));if(saved.token===token)await unlink(session);}catch{}server.close();setTimeout(()=>process.exit(0),250).unref();}
 process.on('SIGINT',shutdown);process.on('SIGTERM',shutdown);
}
main().catch(e=>{console.error(e?.code==='EADDRINUSE'?'The local AIM port is in use. Close the other AIM service window and try again.':'AIM could not start. Check Node.js, your .env file, and that the full ZIP was extracted.');process.exitCode=1;});
