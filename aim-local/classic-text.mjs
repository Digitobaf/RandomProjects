// Abby's output uses text emoticons. Keep ordinary Unicode text and user messages intact.
export function classicAbbyText(value){
 if(typeof value!=='string')return '';
 if(!/[\p{Extended_Pictographic}\p{Regional_Indicator}\p{Emoji_Modifier}\u20E3]/u.test(value))return value;
 const groups=[['😀😃😄😊🙂☺😌🥹',':)'],['😁😆😂🤣😹😸',':D'],['😉🙃',';)'],['😛😜😝🤪',':P'],['😘😗😙😚',':*'],['😇','O:)'],['😎','8-)'],['😢😭😿',":'("],['🥺😞😔😟🙁☹😕😖😣😩😫😥😓😰',':('],['😮😯😲😳😧😦',':O'],['😱🤯',':-O'],['😅😬🤭🫣',':$'],['😐😑😒🙄🤔🤨🫤🫠',':/'],['😠😡🤬😤','>:('],['🤫🤐',':-X'],['🤓','8-|'],['❤♥🧡💛💚💙💜🖤🤍🤎🩷🩵🩶💖💗💘💝💕💞💓💟🫶','<3'],['👍','(Y)'],['👎','(N)']];
 const faces=new Map(groups.flatMap(([chars,text])=>Array.from(chars,char=>[char,text])));
 const emoji=/\p{Extended_Pictographic}(?:[\uFE0E\uFE0F]|\p{Emoji_Modifier})*(?:\u200D\p{Extended_Pictographic}(?:[\uFE0E\uFE0F]|\p{Emoji_Modifier})*)*(?:[\u{E0020}-\u{E007E}]+\u{E007F})?|\p{Regional_Indicator}{2}|[#*0-9]\uFE0F?\u20E3|\p{Emoji_Modifier}/gu;
 let output='',end=0,changed=false;
 for(const match of value.matchAll(emoji)){
  output+=value.slice(end,match.index);const raw=match[0],base=raw.replace(/[\uFE0E\uFE0F]|\p{Emoji_Modifier}/gu,'');let replacement=faces.get(base);
  if(replacement===undefined&&/\uFE0F/.test(raw)&&['©','®','™'].includes(base))replacement=base;
  if(replacement===undefined&&base.startsWith('❤\u200D'))replacement='<3';
  if(/^[#*0-9]\u20E3$/.test(base))replacement=base[0];
  const isEmoji=replacement!==undefined||!['©','®','™'].includes(base)||/\uFE0F/.test(raw);
  if(!isEmoji){output+=raw;end=match.index+raw.length;continue;}
  changed=true;const next=value.slice(match.index+raw.length);
  if(replacement){if(output&&!/\s$/.test(output))output+=' ';output+=replacement;if(next&&!/^[\s!?.,]/.test(next))output+=' ';}
  else if(/[ \t]$/.test(output)&&/^[ \t]/.test(next))output=output.slice(0,-1);
  else if(/[ \t]$/.test(output)&&(!next||/^[!?.,]/.test(next)))output=output.replace(/[ \t]+$/,'');
  else if(/[\p{L}\p{N}]$/u.test(output)&&/^[\p{L}\p{N}]/u.test(next))output+=' ';
  end=match.index+raw.length;
 }
 return changed?output+value.slice(end):value;
}
