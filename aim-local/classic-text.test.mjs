import {test} from 'node:test';
import assert from 'node:assert/strict';
import {classicAbbyText} from './classic-text.mjs';
test('modern reactions become classic text emoticons, including the sentimental face in the report',()=>{
 for(const [input,want]of [['Those were the days. 🥹','Those were the days. :)'],['Hello😊!','Hello :)!'],['😂😉😘😭❤️',' :D ;) :* :\'( <3'.trimStart()],['👍🏽','(Y)'],['🤐',':-X'],['🥺',':(']])assert.equal(classicAbbyText(input),want);
});
test('unsupported emoji sequences disappear as a unit, without joining words or leaving controls',()=>{
 for(const [input,want]of [['Hello 🦄 there.','Hello there.'],['Hello🦄there','Hello there'],['Fine 🧑🏽‍💻!','Fine!'],['A 🇨🇳 flag.','A flag.'],['Nice 🏴\u{E0067}\u{E0062}\u{E007F}','Nice'],['1️⃣ item','1 item'],['Fine ⚠!','Fine!']])assert.equal(classicAbbyText(input),want);
});
test('ordinary Unicode, punctuation, paragraphs, and existing text smileys are preserved',()=>{
 for(const text of ['A café in 上海. © 2026 ™ ® — …','A paragraph.\n\n  Another paragraph. :)','An equation: 2 × 3 = 6.','Already :) ;) :D <3.','Text without reactions.'])assert.equal(classicAbbyText(text),text);
 const value=classicAbbyText('What a day. 🥹');assert.equal(classicAbbyText(value),value);
});
