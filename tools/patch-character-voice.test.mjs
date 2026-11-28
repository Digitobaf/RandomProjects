import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { patchCharacterVoice } from './patch-character-voice.mjs';
import { installFixes } from './apply-chat-laptop-fixes.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const POLICY=read('aim-local/character-voice.mjs');
const PATCHED_SERVER=read('aim-local/server.mjs');

function oldServer(){
 let text=PATCHED_SERVER.replace("import * as CharacterVoice from './character-voice.mjs';\n",'');
 for(const name of ['CHAT_STYLE_INSTRUCTION','ABBY_INSTRUCTION','NATURAL_CHAT_INSTRUCTION','MERCER_VOICE_INSTRUCTION','ABBY_CONTEXT_INSTRUCTION']){
  text=text.replace(`export const ${name}=CharacterVoice.${name};`,`export const ${name}='OLD ${name}';`);
 }
 text=text.replace("+'\\n\\n'+CharacterVoice.ABBY_VOICE_INSTRUCTION",'');
 text=text.replace("+'\\n\\n'+CharacterVoice.ATTENTIVE_REPLY_INSTRUCTION",'');
 text=text.replace('maxOutputTokens:CharacterVoice.REPLY_TOKEN_BUDGET','maxOutputTokens:1024');
 return text+'\n// Newer local feature: keep this custom code.\nexport const localCustomFeature=42;\n';
}

function fixture({fixedSticker=false,server=oldServer()}={}){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'chat-laptop-fixes-'));
 fs.mkdirSync(path.join(dir,'aim-local'));
 fs.mkdirSync(path.join(dir,'updates/chat-laptop-fixes-v1'),{recursive:true});
 const html='<html><head><style>#nickSticker{display:none}body.bezel'+(fixedSticker?':not(.laptop-mode)':'')+' #nickSticker{display:block}</style></head><body><!-- laptop-mode and newer local HTML retained --></body></html>';
 fs.writeFileSync(path.join(dir,'Caseys-Room-with-Mood-Ring.html'),html);
 fs.writeFileSync(path.join(dir,'aim-local/server.mjs'),server);
 fs.writeFileSync(path.join(dir,'updates/chat-laptop-fixes-v1/character-voice.mjs'),POLICY);
 const privateFiles={'aim-local/.env':'FAKE_TEST_KEY_PRIVATE\nGEMINI_MODEL=custom-user-model','aim-local/abby-profile.txt':Buffer.from('\uFEFFPRIVATE ABBY NOTES','utf16le'),'aim-local/mercer-profile.txt':'PRIVATE MERCER NOTES','Start AIM.cmd':'@echo off\nREM keep launcher and port 43187','my-game.gba':Buffer.from([7,8,9]),'saved-progress.json':'PRIVATE SAVE'};
 for(const [name,bytes]of Object.entries(privateFiles))fs.writeFileSync(path.join(dir,name),bytes);
 return {dir,html,server,privateFiles};
}
function cleanup(dir){fs.rmSync(dir,{recursive:true,force:true});}

test('installed-server patch is targeted and preserves unrelated local code and higher custom limits',()=>{
 const before=oldServer(),after=patchCharacterVoice(before);
 assert(after.includes('export const localCustomFeature=42;'));
 assert(after.endsWith(before.slice(before.indexOf('// Newer local feature:'))));
 assert(after.includes("from './quick-lookup.mjs'"));assert(after.includes('export const PORT=43187'));
 assert(after.includes('profileSnapshot'));assert(after.includes('selectedResponder.readProfile'));
 assert(after.includes('CharacterVoice.REPLY_TOKEN_BUDGET'));
 assert.equal(patchCharacterVoice(after),after);
 const higher=before.replace('maxOutputTokens:1024','maxOutputTokens:4096');
 assert(patchCharacterVoice(higher).includes('maxOutputTokens:4096'));
 assert.throws(()=>patchCharacterVoice(before.replace("export const CHAT_STYLE_INSTRUCTION='OLD CHAT_STYLE_INSTRUCTION';",'')),/not recognized/);
});

test('one installer applies voices and sticker together, backs up the actual installed files, and preserves private data',()=>{
 const f=fixture();
 try{
  const result=installFixes(f.dir);assert(!result.alreadyApplied);
  assert.deepEqual(result.changed,['aim-local/character-voice.mjs','aim-local/server.mjs','Caseys-Room-with-Mood-Ring.html']);
  assert.equal(fs.readFileSync(path.join(result.backup,'aim-local/server.mjs'),'utf8'),f.server);
  assert.equal(fs.readFileSync(path.join(result.backup,'Caseys-Room-with-Mood-Ring.html'),'utf8'),f.html);
  assert.equal(fs.readFileSync(path.join(f.dir,'aim-local/character-voice.mjs'),'utf8'),POLICY);
  assert.equal(fs.readFileSync(path.join(f.dir,'aim-local/server.mjs'),'utf8'),patchCharacterVoice(f.server));
  const html=fs.readFileSync(path.join(f.dir,'Caseys-Room-with-Mood-Ring.html'),'utf8');
  assert.equal(html,f.html.replace('body.bezel #nickSticker','body.bezel:not(.laptop-mode) #nickSticker'));
  for(const [name,bytes]of Object.entries(f.privateFiles))assert.deepEqual(fs.readFileSync(path.join(f.dir,name)),Buffer.from(bytes));
  assert(installFixes(f.dir).alreadyApplied);
  assert.equal(fs.readdirSync(path.join(f.dir,'_migration-backups')).length,1);
 }finally{cleanup(f.dir);}
});

test('already-fixed sticker is accepted without rewriting HTML',()=>{
 const f=fixture({fixedSticker:true});try{
  const result=installFixes(f.dir);assert(!result.changed.includes('Caseys-Room-with-Mood-Ring.html'));
  assert.equal(fs.readFileSync(path.join(f.dir,'Caseys-Room-with-Mood-Ring.html'),'utf8'),f.html);
 }finally{cleanup(f.dir);}
});

test('unknown helper, conflicting voice module or invalid payload stops before modifying installed code',()=>{
 for(const kind of ['helper','voice','payload']){
  const f=fixture({server:kind==='helper'?'// Unknown future helper':oldServer()});
  try{
   if(kind==='voice')fs.writeFileSync(path.join(f.dir,'aim-local/character-voice.mjs'),'// A newer local voice module');
   if(kind==='payload')fs.writeFileSync(path.join(f.dir,'updates/chat-laptop-fixes-v1/character-voice.mjs'),'invalid JavaScript {');
   assert.throws(()=>installFixes(f.dir),/No files were changed/);
   assert.equal(fs.readFileSync(path.join(f.dir,'aim-local/server.mjs'),'utf8'),f.server);
   assert.equal(fs.readFileSync(path.join(f.dir,'Caseys-Room-with-Mood-Ring.html'),'utf8'),f.html);
   assert(!fs.existsSync(path.join(f.dir,'_migration-backups')));
   if(kind!=='voice')assert(!fs.existsSync(path.join(f.dir,'aim-local/character-voice.mjs')));
  }finally{cleanup(f.dir);}
 }
});
