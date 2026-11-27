import {createReadStream} from 'node:fs';
import {stat,realpath} from 'node:fs/promises';
import path from 'node:path';
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.gif':'image/gif','.mp3':'audio/mpeg','.wav':'audio/wav','.ogg':'audio/ogg','.mp4':'video/mp4','.webm':'video/webm','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf','.wasm':'application/wasm','.gz':'application/gzip','.txt':'text/plain; charset=utf-8'};
function fail(res,status){res.writeHead(status,{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(status===416?'Requested range not satisfiable.':'Asset unavailable.');}
export async function serveAsset(req,res,htmlPath){
 const raw=(req.url||'').split('?')[0];if(!raw.startsWith('/assets/'))return false;
 if(!['GET','HEAD'].includes(req.method)){fail(res,405);return true;}
 try{
  const decoded=decodeURIComponent(raw);if(/[\\\x00-\x1f]/.test(decoded)||decoded.split('/').some(s=>s==='.'||s==='..'||s.startsWith('.'))){fail(res,403);return true;}
  const base=await realpath(path.join(path.dirname(htmlPath),'assets')),file=await realpath(path.join(base,decoded.slice('/assets/'.length)));
  if(!file.startsWith(base+path.sep)){fail(res,403);return true;}const ext=path.extname(file).toLowerCase();if(!Object.hasOwn(types,ext)){fail(res,404);return true;}
  const info=await stat(file);if(!info.isFile()){fail(res,404);return true;}
  const immutable=/\/[a-f0-9]{20,64}\.[a-z0-9]+$/.test(decoded),etag='"'+info.size.toString(16)+'-'+Math.trunc(info.mtimeMs).toString(16)+'"';
  const headers={'Content-Type':types[ext],'Cache-Control':immutable?'public, max-age=31536000, immutable':'no-store','X-Content-Type-Options':'nosniff','Cross-Origin-Resource-Policy':'same-origin','Accept-Ranges':'bytes',ETag:etag};
  if(req.headers['if-none-match']===etag&&!req.headers.range){res.writeHead(304,headers);res.end();return true;}
  let start=0,end=info.size-1,status=200;
  if(req.headers.range){const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);if(!match||(!match[1]&&!match[2])){res.setHeader('Content-Range','bytes */'+info.size);fail(res,416);return true;}if(!match[1]){start=Math.max(0,info.size-Number(match[2]));}else{start=Number(match[1]);if(match[2])end=Math.min(end,Number(match[2]));}if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>end||start>=info.size){res.setHeader('Content-Range','bytes */'+info.size);fail(res,416);return true;}status=206;headers['Content-Range']=`bytes ${start}-${end}/${info.size}`;}
  headers['Content-Length']=Math.max(0,end-start+1);res.writeHead(status,headers);if(req.method==='HEAD'||!info.size){res.end();return true;}
  const stream=createReadStream(file,{start,end});res.once('close',()=>stream.destroy());stream.once('error',()=>res.destroy());stream.pipe(res);return true;
 }catch(error){if(!res.headersSent)fail(res,error?.code==='EACCES'?403:404);else res.destroy();return true;}
}
