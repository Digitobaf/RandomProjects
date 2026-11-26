import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {createProfileLoader} from './profile.mjs';
test('profile reloads saved edits, retains long notes, and supports Notepad encodings',async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'abby-profile-')),file=path.join(dir,'profile.txt'),load=createProfileLoader(file);
 try{
  await writeFile(file,'First notes.');assert.equal(await load(),'First notes.');
  const long='a'.repeat(26000)+' Appended preference.';await writeFile(file,long);assert.equal(await load(),long);
  await writeFile(file,'\uFEFFNew UTF-8 notes.');assert.equal(await load(),'New UTF-8 notes.');
  await writeFile(file,Buffer.from('\uFEFFUTF-16 tea and café.','utf16le'));assert.equal(await load(),'UTF-16 tea and café.');
  await writeFile(file,'a'.repeat(128*1024+1));await assert.rejects(load,{code:'PROFILE_TOO_LARGE'});
  await rm(file);await assert.rejects(load,{code:'PROFILE_UNAVAILABLE'});
 }finally{await rm(dir,{recursive:true,force:true});}
});
