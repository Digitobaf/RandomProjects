import { test,mock } from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { mkdtemp,readFile,writeFile,rm,access } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { windowsKeySetup,validKey,keyFromText,saveKey } from './setup-key.mjs';
const key='AQ.TEST_ONLY_NEVER_VALID_123456789';
async function fixture(run){const dir=await mkdtemp(path.join(os.tmpdir(),'aim-notepad-key-'));try{await run(path.join(dir,'.env'));}finally{await rm(dir,{recursive:true,force:true});}}
function quiet(){const output=[];const logs=mock.method(console,'log',(...a)=>output.push(a.join(' '))),errors=mock.method(console,'error',(...a)=>output.push(a.join(' ')));return {output,restore(){logs.mock.restore();errors.mock.restore();}};}
test('current dotted authorization keys and legacy keys are accepted without accepting pasted paragraphs',()=>{assert(validKey(key));assert(validKey('AIza_TEST_ONLY_NOT_A_REAL_KEY_123456789'));assert(!validKey(''));assert(!validKey('your_key_here'));assert(!validKey('this is a paragraph, not a key'));assert.equal(keyFromText('\uFEFF'+key+'\r\n'),key);assert.equal(keyFromText('GEMINI_API_KEY='+key+'\n'),key);});
test('Ctrl+S in visible Notepad is detected even when modern Notepad hands off and exits early',async()=>fixture(async file=>{
 const q=quiet();let entry;try{const result=await windowsKeySetup(file,{pollMs:5,timeoutMs:2000,spawnProcess:(program,args,options)=>{assert.equal(program,'notepad.exe');assert.equal(options.windowsHide,false);entry=args[0];assert.equal(path.basename(entry),'Paste Gemini key here.txt');assert(!args.join(' ').includes(key));const child=new EventEmitter();child.unref=()=>{};queueMicrotask(()=>child.emit('exit',0));setTimeout(()=>writeFile(entry,key+'\r\n'),30);return child;}});assert.equal(result,true);assert((await readFile(file,'utf8')).includes('GEMINI_API_KEY='+key));await assert.rejects(access(entry));assert(!q.output.join('\n').includes(key));}finally{q.restore();}
}));
test('key changes preserve model and unrelated local settings',async()=>fixture(async file=>{await writeFile(file,'GEMINI_API_KEY=old_key\nGEMINI_MODEL=custom-model\nOTHER_SETTING=keep-me\n');await saveKey(file,key);const text=await readFile(file,'utf8');assert(text.includes('GEMINI_MODEL=custom-model'));assert(text.includes('OTHER_SETTING=keep-me'));assert.equal(text.match(/GEMINI_API_KEY=/g).length,1);assert(!text.includes('old_key'));}));
test('cancelling the setup preserves existing credentials and removes the temporary entry',async()=>fixture(async file=>{
 const old='GEMINI_API_KEY=old_key\nGEMINI_MODEL=custom-model\n';await writeFile(file,old);const q=quiet(),controller=new AbortController();let entry;try{const result=await windowsKeySetup(file,{pollMs:5,timeoutMs:1000,signal:controller.signal,spawnProcess:(program,args)=>{entry=args[0];setTimeout(()=>controller.abort(),20);const child=new EventEmitter();child.unref=()=>{};return child;}});assert.equal(result,false);assert.equal(await readFile(file,'utf8'),old);await assert.rejects(access(entry));}finally{q.restore();}
}));
test('editor failure reports the problem without erasing the existing key',async()=>fixture(async file=>{
 const old='GEMINI_API_KEY=old_key\n';await writeFile(file,old);const q=quiet();try{const result=await windowsKeySetup(file,{pollMs:5,timeoutMs:500,spawnProcess:()=>{const child=new EventEmitter();child.unref=()=>{};queueMicrotask(()=>child.emit('error',new Error('No editor')));return child;}});assert.equal(result,false);assert.equal(await readFile(file,'utf8'),old);}finally{q.restore();}
}));
