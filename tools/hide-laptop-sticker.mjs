import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function patchSticker(html) {
  const oldSelector = /body\.bezel\s+#nickSticker\s*\{/g;
  const newSelector = 'body.bezel:not(.laptop-mode) #nickSticker{';
  const matches = [...html.matchAll(oldSelector)];
  if (!matches.length && html.includes(newSelector)) return html;
  if (matches.length !== 1 || !html.includes('laptop-mode')) {
    throw new Error('The installed sticker rule was not recognized. No files were changed.');
  }
  return html.replace(oldSelector, newSelector);
}

export function applyFix(folder) {
  const target = path.join(folder, 'Caseys-Room-with-Mood-Ring.html');
  const original = fs.readFileSync(target, 'utf8');
  const updated = patchSticker(original);
  if (updated === original) return 'Already fixed. Launch Casey\'s Room as usual.';
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backup = path.join(folder, '_migration-backups', `laptop-sticker-${stamp}`);
  fs.mkdirSync(backup, { recursive: true });
  fs.copyFileSync(target, path.join(backup, path.basename(target)));
  const temporary = `${target}.sticker-fix.tmp`;
  fs.writeFileSync(temporary, updated, 'utf8');
  fs.renameSync(temporary, target);
  return 'Done. The sticker now appears only in monitor mode. Launch Casey\'s Room as usual and reload the page.';
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const folder = fileURLToPath(new URL('../', import.meta.url));
    console.log(applyFix(folder));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
