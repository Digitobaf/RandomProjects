import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm,symlink} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import {serveAsset} from './asset-server.mjs';
test('assets serve correct MIME, ranges, caching and reject paths outside public assets',async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'caseys-assets-'));await mkdir(path.join(dir,'assets/audio'),{recursive:true});await mkdir(path.join(dir,'assets/apps'),{recursive:true});await writeFile(path.join(dir,'.env'),'PRIVATE');await writeFile(path.join(dir,'assets/audio','a'.repeat(24)+'.ogg'),'0123456789');await writeFile(path.join(dir,'assets/apps/app.html'),'<html>code</html>');await writeFile(path.join(dir,'assets/private.gba'),'ROM');await symlink(path.join(dir,'.env'),path.join(dir,'assets/leak.txt'));
 const s=http.createServer(async(req,res)=>{if(!await serveAsset(req,res,path.join(dir,'Caseys-Room-with-Mood-Ring.html'))){res.writeHead(404);res.end();}});await new Promise(r=>s.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+s.address().port,asset='/assets/audio/'+'a'.repeat(24)+'.ogg';
 try{let r=await fetch(base+asset);assert.equal(r.status,200);assert.equal(r.headers.get('content-type'),'audio/ogg');assert(r.headers.get('cache-control').includes('immutable'));assert.equal(await r.text(),'0123456789');const etag=r.headers.get('etag');r=await fetch(base+asset,{headers:{Range:'bytes=2-5'}});assert.equal(r.status,206);assert.equal(r.headers.get('content-range'),'bytes 2-5/10');assert.equal(await r.text(),'2345');r=await fetch(base+asset,{headers:{Range:'bytes=-3'}});assert.equal(await r.text(),'789');assert.equal((await fetch(base+asset,{headers:{Range:'bytes=99-100'}})).status,416);assert.equal((await fetch(base+asset,{headers:{'If-None-Match':etag}})).status,304);assert.equal((await fetch(base+asset,{method:'HEAD'})).headers.get('content-length'),'10');r=await fetch(base+'/assets/apps/app.html');assert.equal(r.headers.get('cache-control'),'no-store');assert(r.headers.get('content-type').includes('text/html'));for(const url of ['/assets/leak.txt','/assets/private.gba','/assets/%2e%2e%5c.env','/assets/.env'])assert([403,404].includes((await fetch(base+url)).status));}
 finally{s.closeAllConnections();await new Promise(r=>s.close(r));await rm(dir,{recursive:true,force:true});}
});
