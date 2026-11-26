import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {DEFAULT_MODEL,applyAbbyModelUpgrade} from './model.mjs';
async function fixture(fn){const dir=await mkdtemp(path.join(os.tmpdir(),'abby-model-'));try{await fn(path.join(dir,'.env'),path.join(dir,'.aim-runtime'));}finally{await rm(dir,{recursive:true,force:true});}}
test('one-time model upgrade preserves the exact key and unrelated local settings',async()=>fixture(async(file,runtime)=>{
 const original='# Local configuration\r\nGEMINI_API_KEY=AQ.TEST_ONLY_NEVER_VALID_123456789\r\nGEMINI_MODEL=gemini-3.1-flash-lite\r\nOTHER_SETTING=keep-this\r\n';await writeFile(file,original);
 assert.equal(await applyAbbyModelUpgrade(file,runtime),true);assert.equal(await readFile(file,'utf8'),original.replace('gemini-3.1-flash-lite',DEFAULT_MODEL));
 await writeFile(file,original.replace('gemini-3.1-flash-lite','custom-user-choice'));assert.equal(await applyAbbyModelUpgrade(file,runtime),false);assert((await readFile(file,'utf8')).includes('GEMINI_MODEL=custom-user-choice'));
}));
test('missing model setting is appended without changing the key or comments',async()=>fixture(async(file,runtime)=>{
 const original='GEMINI_API_KEY=AQ.TEST_ONLY_NEVER_VALID_123456789\n# Keep this comment';await writeFile(file,original);await applyAbbyModelUpgrade(file,runtime);assert.equal(await readFile(file,'utf8'),original+'\nGEMINI_MODEL='+DEFAULT_MODEL+'\n');
}));
test('already selected fast model stays unchanged and records completion of the upgrade',async()=>fixture(async(file,runtime)=>{
 const original='GEMINI_MODEL='+DEFAULT_MODEL+'\n';await writeFile(file,original);assert.equal(await applyAbbyModelUpgrade(file,runtime),false);assert.equal(await readFile(file,'utf8'),original);await writeFile(file,'GEMINI_MODEL=another-model\n');assert.equal(await applyAbbyModelUpgrade(file,runtime),false);
}));
test('environment-key users without an env file can still start with the selected model',async()=>fixture(async(file,runtime)=>{
 assert.equal(await applyAbbyModelUpgrade(file,runtime),true);assert.equal(await readFile(file,'utf8'),'GEMINI_MODEL='+DEFAULT_MODEL+'\n');
}));
