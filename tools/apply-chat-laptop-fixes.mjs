import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { patchCharacterVoice } from './patch-character-voice.mjs';
import { patchSticker } from './hide-laptop-sticker.mjs';

const VOICE = 'aim-local/character-voice.mjs';
const PAYLOAD = 'updates/chat-laptop-fixes-v1/character-voice.mjs';

function syntaxCheck(text, label) {
  const result = spawnSync(process.execPath, ['--input-type=module', '--check'], {
    input: text, encoding: 'utf8', windowsHide: true,
  });
  if (result.error || result.status !== 0) {
    throw new Error(`The ${label} did not pass its syntax check. No files were changed.`);
  }
}

export function installFixes(folder) {
  const htmlName = 'Caseys-Room-with-Mood-Ring.html';
  const serverName = 'aim-local/server.mjs';
  const html = fs.readFileSync(path.join(folder, htmlName), 'utf8');
  const server = fs.readFileSync(path.join(folder, serverName), 'utf8');
  const voice = fs.readFileSync(path.join(folder, PAYLOAD), 'utf8');
  // Finish every preflight before changing any installed file.
  const updatedHtml = patchSticker(html);
  const updatedServer = patchCharacterVoice(server);
  syntaxCheck(updatedServer, 'patched AIM helper');
  syntaxCheck(voice, 'character voice module');
  const voicePath = path.join(folder, VOICE);
  let existingVoice = null;
  try { existingVoice = fs.readFileSync(voicePath, 'utf8'); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (existingVoice !== null && existingVoice !== voice) {
    throw new Error('A different character-voice.mjs already exists. No files were changed. Keep that file and share it for a merge.');
  }
  const candidates = [
    { name: VOICE, before: existingVoice, after: voice },
    { name: serverName, before: server, after: updatedServer },
    { name: htmlName, before: html, after: updatedHtml },
  ];
  const changed = candidates.filter(item => item.before !== item.after);
  if (!changed.length) return { alreadyApplied: true, changed: [] };

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backup = path.join(folder, '_migration-backups', `chat-laptop-${stamp}`);
  fs.mkdirSync(backup, { recursive: true });
  for (const item of changed) {
    if (item.before !== null) {
      const saved = path.join(backup, item.name);
      fs.mkdirSync(path.dirname(saved), { recursive: true });
      fs.copyFileSync(path.join(folder, item.name), saved);
    }
  }
  fs.writeFileSync(path.join(backup, 'changes.json'), JSON.stringify({
    files: changed.map(item => ({ file: item.name, created: item.before === null })),
  }, null, 2));

  const committed = [], staged = [];
  try {
    for (const item of changed) {
      const temporary = path.join(folder, item.name + '.chat-laptop.tmp');
      fs.writeFileSync(temporary, item.after, 'utf8');
      staged.push(temporary);
    }
    for (const item of changed) {
      const target = path.join(folder, item.name);
      fs.renameSync(target + '.chat-laptop.tmp', target);
      committed.push(item);
    }
  } catch (error) {
    for (const item of committed.reverse()) {
      const target = path.join(folder, item.name);
      if (item.before === null) fs.rmSync(target, { force: true });
      else fs.copyFileSync(path.join(backup, item.name), target);
    }
    throw new Error(`Update stopped; installed files were restored from the backup. ${error.message}`);
  } finally {
    for (const temporary of staged) fs.rmSync(temporary, { force: true });
  }
  return { alreadyApplied: false, changed: changed.map(item => item.name), backup };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const folder = fileURLToPath(new URL('../', import.meta.url));
    const result = installFixes(folder);
    console.log(result.alreadyApplied ? 'These fixes are already installed.' : 'Done. Abby, Mercer and the laptop sticker are updated.');
    if (result.backup) console.log('Backup: ' + result.backup);
    console.log('Launch Start AIM.cmd as usual, then reload Firefox. Your profiles, chats and saves are retained.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
