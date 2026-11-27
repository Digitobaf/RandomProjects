import {readFile,writeFile,mkdir,rename,copyFile,stat,access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import net from 'node:net';
import {spawnSync} from 'node:child_process';
const SCRIPT=path.dirname(fileURLToPath(import.meta.url)),PREFIX='CASEY-ASSET:',FORMAT='caseys-assets-v1';
const specs={'image/webp':['images','webp'],'image/png':['images','png'],'image/jpeg':['images','jpg'],'image/gif':['images','gif'],'image/svg+xml':['images','svg'],'audio/mpeg':['audio','mp3'],'audio/mp3':['audio','mp3'],'audio/wav':['audio','wav'],'audio/x-wav':['audio','wav'],'audio/ogg':['audio','ogg'],'video/mp4':['video','mp4'],'video/webm':['video','webm'],'font/woff2':['fonts','woff2'],'font/woff':['fonts','woff'],'font/ttf':['fonts','ttf'],'application/font-woff':['fonts','woff'],'application/wasm':['data','wasm'],'application/gzip':['data','gz']};
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
function marker(url){return Buffer.from(PREFIX+url).toString('base64');}
function decode85(text){const alphabet='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~',lookup=new Map([...alphabet].map((c,i)=>[c,i])),out=Buffer.alloc(Math.floor(text.length*4/5));let at=0;for(let i=0;i<text.length;i+=5){const count=Math.min(5,text.length-i);let value=0;for(let j=0;j<5;j++){const digit=j<count?lookup.get(text[i+j]):84;if(digit===undefined)throw Error('Invalid TamaScape bundle');value=value*85+digit;}if(value>0xffffffff)throw Error('Invalid TamaScape bundle');for(let j=0;j<count-1;j++)out[at++]=Math.floor(value/256**(3-j))%256;}return out.subarray(0,at);}
export function patchServer(source){if(source.includes("from './asset-server.mjs'"))return source;const anchor='  const supplied=Buffer.from';if(source.split(anchor).length!==2)throw Error('Your server version needs a manual assets-route merge; no installed files were replaced.');return "import { serveAsset } from './asset-server.mjs';\n"+source.replace(anchor,"  if(htmlPath&&await serveAsset(req,res,htmlPath))return;\n"+anchor);}
export async function splitDocument(input,output){
 const records=new Map(),pending=new Map();let references=0;await mkdir(output,{recursive:true});
 function put(bytes,mime,owner=''){const spec=specs[mime];if(!spec)throw Error('Unsupported media type: '+mime);const hash=sha(bytes),rel='assets/'+(owner?owner+'/':'')+spec[0]+'/'+hash.slice(0,24)+'.'+spec[1];if(!records.has(rel)){records.set(rel,{path:rel,mime,bytes:bytes.length,sha256:hash});pending.set(rel,bytes);}references++;return '/'+rel;}
 function rewriteAudio(code){
  code=code.replaceAll('WebAssembly.compile(decode64(MEDIA.wasm,16777216))','CaseyAssets.arrayBuffer(MEDIA.wasm).then(data=>WebAssembly.compile(data))');
  code=code.replaceAll('const bytes=Uint8Array.from(atob(packed),c=>c.charCodeAt(0)),stream=','const bytes=new Uint8Array(await CaseyAssets.arrayBuffer(packed)),stream=');
  return code;
 }
 function processDocument(text,owner=''){
  // Child srcdoc documents retain their same origin and their original scripts.
  const children=[],declaration=/\bconst\s+PROGRAM\s*=\s*"/g;let match;
  while((match=declaration.exec(text))){const begin=declaration.lastIndex-1;let end=begin+1;for(;end<text.length;end++){if(text[end]==='\\'){end++;continue;}if(text[end]==='"')break;}if(end>=text.length)throw Error('Unterminated embedded app document');const child=JSON.parse(text.slice(begin,end+1));if(/^\s*(?:<!doctype|<html)/i.test(child))children.push([begin,end+1,JSON.stringify(processDocument(child,owner)).replaceAll('<','\\u003c')]);declaration.lastIndex=end+1;}
  for(let i=children.length-1;i>=0;i--){const [begin,end,value]=children[i];text=text.slice(0,begin)+value+text.slice(end);}

  text=text.replace(/data:([a-z0-9.+-]+\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=]+)/gi,(all,type,data)=>{const mime=type.toLowerCase();if(!specs[mime]||data.length<512)return all;const bytes=Buffer.from(data,'base64'),url=put(bytes,mime,owner);return mime.startsWith('audio/')?url+'#,'+marker(url):url;});
  text=text.replace(/(["'])([A-Za-z0-9+/=]{2048,})\1/g,(all,q,data)=>{const bytes=Buffer.from(data,'base64');let mime=null;if(bytes.subarray(0,4).toString()==='RIFF'&&bytes.subarray(8,12).toString()==='WAVE')mime='audio/wav';else if(bytes.subarray(0,3).toString()==='ID3'||bytes[0]===255&&(bytes[1]&224)===224)mime='audio/mpeg';else if(bytes.subarray(0,4).equals(Buffer.from([0,97,115,109]))&&text.includes('WebAssembly.compile(decode64(MEDIA.wasm,16777216))'))mime='application/wasm';else if(bytes[0]===31&&bytes[1]===139&&text.includes('const bytes=Uint8Array.from(atob(packed),c=>c.charCodeAt(0)),stream='))mime='application/gzip';if(!mime)return all;return q+marker(put(bytes,mime,owner))+q;});
  text=rewriteAudio(text);
  if(!text.includes('src="/assets/runtime/asset-loader.js"'))text=text.replace(/<head(?:\s[^>]*)?>/i,head=>head+'\n<script src="/assets/runtime/asset-loader.js"></script>');
  return text;
 }
 let main=input;const tag=/<script id="caseyTamaScapePayload"[^>]*>([\s\S]*?)<\/script>/.exec(main);
 if(tag&&tag[1].trim()&&!tag[1].includes('__TAMASCAPE_PAYLOAD__')){
  const tama=gunzipSync(decode85(tag[1].trim())).toString('utf8'),child=processDocument(tama,'tamascape');pending.set('assets/apps/tamascape.html',Buffer.from(child));
  main=main.replace(tag[0],'<script id="caseyTamaScapePayload" type="application/octet-stream" data-src="/assets/apps/tamascape.html"></script>');
  const start=main.indexOf('async function program(){',main.indexOf('id="caseyTamaScapePayload"')),end=main.indexOf('\nfunction shape()',start);if(start<0||end<0)throw Error('Unrecognized TamaScape loader; no installed files were replaced.');
  main=main.slice(0,start)+"async function program(){if(!loading)loading=(async()=>{const response=await fetch(document.getElementById('caseyTamaScapePayload').dataset.src);if(!response.ok)throw new Error('TamaScape files could not be opened. Check assets/apps/tamascape.html.');return response.text();})();return loading;}"+main.slice(end);
 }
 main=processDocument(main);main=main.replace(/<head(?:\s[^>]*)?>/i,head=>head+'\n<meta name="caseys-assets" content="'+FORMAT+'">');
 if(Buffer.byteLength(main)>4*1024*1024)throw Error('The converted HTML is still over 4 MiB. This version needs an additional extractor; no installed files were replaced.');
 if(!main.includes('src="/assets/runtime/asset-loader.js"'))throw Error('HTML head not recognized');
 for(const [rel,bytes]of pending){const target=path.join(output,rel);await mkdir(path.dirname(target),{recursive:true});try{const existing=await readFile(target);if(sha(existing)!==sha(bytes))throw Error('An asset name collision was found; no installed files were replaced.');}catch(e){if(e.code!=='ENOENT')throw e;await writeFile(target,bytes,{flag:'wx'});}}
 const manifest={format:FORMAT,sourceHtmlSha256:sha(input),sourceHtmlBytes:Buffer.byteLength(input),htmlSha256:sha(main),htmlBytes:Buffer.byteLength(main),references,assets:[...records.values()].sort((a,b)=>a.path.localeCompare(b.path)),apps:pending.has('assets/apps/tamascape.html')?['assets/apps/tamascape.html']:[]};
 return {html:main,manifest};
}
async function portInUse(){return new Promise(resolve=>{const s=net.connect({host:'127.0.0.1',port:43187});s.setTimeout(800);s.once('connect',()=>{s.destroy();resolve(true);});s.once('error',()=>resolve(false));s.once('timeout',()=>{s.destroy();resolve(false);});});}
export async function migrate(root,{allowRunning=false}={}){
 const htmlPath=path.join(root,'Caseys-Room-with-Mood-Ring.html'),serverPath=path.join(root,'aim-local/server.mjs'),before=await readFile(htmlPath,'utf8');
 if(before.includes('name="caseys-assets"')){console.log('This folder is already split. Nothing was replaced.');return;}
 if(!allowRunning&&await portInUse())throw Error('Close the black Start AIM launcher window first, then run Split Media.cmd again.');
 const server=await readFile(serverPath,'utf8'),nextServer=patchServer(server);
 const assetModule=path.join(root,'aim-local/asset-server.mjs'),moduleSource=path.join(SCRIPT,'../aim-local/asset-server.mjs');if(path.resolve(assetModule)!==path.resolve(moduleSource))await copyFile(moduleSource,assetModule);
 const checkPath=path.join(root,'aim-local/.asset-migration-check.mjs');await writeFile(checkPath,nextServer);const syntax=spawnSync(process.execPath,['--check',checkPath],{encoding:'utf8'});const {unlink}=await import('node:fs/promises');await unlink(checkPath);if(syntax.status!==0)throw Error('The assets route could not be checked; no installed files were replaced.');
 const result=await splitDocument(before,root),loaderTarget=path.join(root,'assets/runtime/asset-loader.js'),loaderSource=path.join(SCRIPT,'../assets/runtime/asset-loader.js');await mkdir(path.dirname(loaderTarget),{recursive:true});if(path.resolve(loaderTarget)!==path.resolve(loaderSource))await copyFile(loaderSource,loaderTarget);
 const stamp=new Date().toISOString().replace(/[:.]/g,'-'),backup=path.join(root,'_migration-backups',stamp);await mkdir(backup,{recursive:true});
 const tmpHtml=htmlPath+'.split.tmp',tmpServer=serverPath+'.split.tmp';await writeFile(tmpHtml,result.html);await writeFile(tmpServer,nextServer);let movedHtml=false,movedServer=false;
 try{await rename(htmlPath,path.join(backup,'Caseys-Room-with-Mood-Ring.html'));movedHtml=true;await rename(tmpHtml,htmlPath);await rename(serverPath,path.join(backup,'server.mjs'));movedServer=true;await rename(tmpServer,serverPath);await writeFile(path.join(root,'assets/manifest.json'),JSON.stringify(result.manifest,null,2)+'\n');}
 catch(error){if(movedHtml)await copyFile(path.join(backup,'Caseys-Room-with-Mood-Ring.html'),htmlPath);if(movedServer)await copyFile(path.join(backup,'server.mjs'),serverPath);throw error;}
 console.log('Done. HTML: '+(result.manifest.sourceHtmlBytes/1048576).toFixed(2)+' MiB -> '+(result.manifest.htmlBytes/1048576).toFixed(2)+' MiB.');console.log('External media files: '+result.manifest.assets.length+'. Backups: '+backup);console.log('Run Start AIM.cmd as usual. Address and browser saves are unchanged.');
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const args=process.argv.slice(2),at=args.indexOf('--root'),root=path.resolve(at>=0?args[at+1]:path.join(SCRIPT,'..'));
 migrate(root,{allowRunning:args.includes('--allow-running')}).catch(e=>{console.error('Migration stopped: '+e.message);process.exitCode=1;});
}
