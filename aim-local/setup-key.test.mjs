import { test,mock } from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { mkdtemp,readFile,writeFile,rm,stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { windowsKeySetup } from './setup-key.mjs';
const fakeKey='TEST_ONLY_NOT_A_REAL_API_KEY_123456';
async function fixture(run){const dir=await mkdtemp(path.join(os.tmpdir(),'aim-visible-key-'));try{await run(path.join(dir,'.env'));}finally{await rm(dir,{recursive:true,force:true});}}
function quiet(){const output=[];const logs=mock.method(console,'log',(...a)=>output.push(a.join(' '))),errors=mock.method(console,'error',(...a)=>output.push(a.join(' ')));return {output,restore(){logs.mock.restore();errors.mock.restore();}};}
test('Windows opens visible native key dialog, verifies Save, and never puts the key in commands or logs',async()=>fixture(async file=>{
 const q=quiet();try{const result=await windowsKeySetup(file,{spawnProcess:(command,args,options)=>{assert.equal(command,'powershell.exe');assert.deepEqual(args.slice(0,3),['-NoProfile','-STA','-Command']);assert(args[3].includes('System.Windows.Forms.TextBox'));assert(args[3].includes('$field.ShortcutsEnabled = $true'));assert(args[3].includes('$field.UseSystemPasswordChar = $false'));assert(!args.join(' ').includes(fakeKey));assert.equal(options.env.AIM_ENV_PATH,file);const child=new EventEmitter();queueMicrotask(async()=>{await writeFile(file,'GEMINI_API_KEY='+fakeKey+'\nGEMINI_MODEL=gemini-3.1-flash-lite\n');child.emit('exit',0);});return child;}});assert.equal(result,true);assert(!q.output.join('\n').includes(fakeKey));}finally{q.restore();}
}));
test('Cancel leaves the existing key and model untouched',async()=>fixture(async file=>{
 const contents='GEMINI_API_KEY='+fakeKey+'\nGEMINI_MODEL=custom-model\n';await writeFile(file,contents);const q=quiet();try{let count=0;const result=await windowsKeySetup(file,{spawnProcess:()=>{count++;const child=new EventEmitter();queueMicrotask(()=>child.emit('exit',2));return child;}});assert.equal(result,false);assert.equal(count,1);assert.equal(await readFile(file,'utf8'),contents);}finally{q.restore();}
}));
test('Unavailable Windows dialog opens Notepad without erasing existing settings',async()=>fixture(async file=>{
 const contents='GEMINI_API_KEY='+fakeKey+'\nGEMINI_MODEL=custom-model\n';await writeFile(file,contents);const q=quiet();try{const programs=[];const result=await windowsKeySetup(file,{spawnProcess:(program,args)=>{programs.push(program);const child=new EventEmitter();child.unref=()=>{};if(program==='powershell.exe')queueMicrotask(()=>child.emit('error',new Error('Unavailable')));else{assert.equal(program,'notepad.exe');assert.deepEqual(args,[file]);}return child;}});assert.equal(result,false);assert.deepEqual(programs,['powershell.exe','notepad.exe']);assert.equal(await readFile(file,'utf8'),contents);assert(!q.output.join('\n').includes(fakeKey));}finally{q.restore();}
}));
test('Notepad fallback creates a private, visible blank key field on first setup',async()=>fixture(async file=>{
 const q=quiet();try{const result=await windowsKeySetup(file,{spawnProcess:program=>{const child=new EventEmitter();child.unref=()=>{};if(program==='powershell.exe')queueMicrotask(()=>child.emit('exit',1));return child;}});assert.equal(result,false);assert.equal(await readFile(file,'utf8'),'GEMINI_API_KEY=\nGEMINI_MODEL=gemini-3.1-flash-lite\n');if(process.platform!=='win32')assert.equal((await stat(file)).mode&0o777,0o600);}finally{q.restore();}
}));
