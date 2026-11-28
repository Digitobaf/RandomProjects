const IMPORT = "import * as CharacterVoice from './character-voice.mjs';";
const NAMES = ['CHAT_STYLE_INSTRUCTION', 'ABBY_INSTRUCTION', 'NATURAL_CHAT_INSTRUCTION', 'MERCER_VOICE_INSTRUCTION', 'ABBY_CONTEXT_INSTRUCTION'];

function replaceOnce(source, oldText, replacement, label) {
  if (source.includes(replacement)) return source;
  if (source.split(oldText).length !== 2) {
    throw new Error(`The installed ${label} was not recognized. No files were changed.`);
  }
  return source.replace(oldText, replacement);
}

export function patchCharacterVoice(source) {
  let output = source;
  for (const name of NAMES) {
    const pattern = new RegExp(`^export[ \\t]+const[ \\t]+${name}[ \\t]*=[^\\r\\n]+`, 'gm');
    const matches = [...output.matchAll(pattern)];
    if (matches.length !== 1 || !matches[0][0].trimEnd().endsWith(';')) {
      throw new Error(`The installed ${name} declaration was not recognized. No files were changed.`);
    }
    output = output.replace(pattern, `export const ${name}=CharacterVoice.${name};`);
  }

  output = replaceOnce(output,
    '(character?MERCER_VOICE_INSTRUCTION:ABBY_CONTEXT_INSTRUCTION)',
    "(character?MERCER_VOICE_INSTRUCTION:ABBY_CONTEXT_INSTRUCTION+'\\n\\n'+CharacterVoice.ABBY_VOICE_INSTRUCTION)",
    'character voice selection');
  output = replaceOnce(output,
    "+'\\n\\n'+MESSAGE_ONLY_INSTRUCTION;",
    "+'\\n\\n'+CharacterVoice.ATTENTIVE_REPLY_INSTRUCTION+'\\n\\n'+MESSAGE_ONLY_INSTRUCTION;",
    'final message instructions');

  if (!output.includes('maxOutputTokens:CharacterVoice.REPLY_TOKEN_BUDGET')) {
    const pattern = /maxOutputTokens\s*:\s*(\d+)/g;
    const matches = [...output.matchAll(pattern)];
    if (matches.length !== 1) {
      throw new Error('The installed reply token limit was not recognized. No files were changed.');
    }
    // Keep a higher limit if another assistant already increased it.
    if (Number(matches[0][1]) < 2048) {
      output = output.replace(pattern, 'maxOutputTokens:CharacterVoice.REPLY_TOKEN_BUDGET');
    }
  }

  if (!output.includes(IMPORT)) {
    if (/\bCharacterVoice\b/.test(source)) {
      throw new Error('A different CharacterVoice integration already exists. No files were changed.');
    }
    const bom = output.startsWith('\uFEFF') ? '\uFEFF' : '';
    const newline = output.includes('\r\n') ? '\r\n' : '\n';
    output = bom + IMPORT + newline + output.slice(bom.length);
  }
  return output;
}
