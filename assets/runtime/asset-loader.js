/* Casey's Room asset loading. No save keys or storage access. */
(()=>{
 'use strict';if(window.CaseyAssets)return;
 const prefix='CASEY-ASSET:';
 function reference(input){
  if(typeof input==='string'){
   if(input.startsWith('/assets/'))return input.split('#')[0];
   if(input.startsWith('data:'))return input;
   try{const text=atob(input);if(text.startsWith(prefix)&&text.slice(prefix.length).startsWith('/assets/'))return text.slice(prefix.length);}catch{}
   return null;
  }
  try{const bytes=input instanceof ArrayBuffer?new Uint8Array(input):ArrayBuffer.isView(input)?new Uint8Array(input.buffer,input.byteOffset,input.byteLength):null;if(!bytes||bytes.length>4096)return null;const text=new TextDecoder().decode(bytes);return text.startsWith(prefix)&&text.slice(prefix.length).startsWith('/assets/')?text.slice(prefix.length):null;}catch{return null;}
 }
 async function arrayBuffer(source){const url=reference(source);if(!url)throw new Error('Unrecognized Casey asset reference');const response=await fetch(url,{credentials:'same-origin'});if(!response.ok)throw new Error('Could not load '+url+' (HTTP '+response.status+')');return response.arrayBuffer();}
 window.CaseyAssets=Object.freeze({arrayBuffer});
 // Older apps pass base64-decoded bytes to Web Audio. Recognize a short file
 // reference instead and fetch on demand; genuine audio buffers stay unchanged.
 const proto=window.BaseAudioContext?.prototype;
 if(proto){const native=proto.decodeAudioData;proto.decodeAudioData=function(input,success,failure){const url=reference(input);if(!url)return native.apply(this,arguments);return arrayBuffer(url).then(bytes=>native.call(this,bytes)).then(buffer=>{if(typeof success==='function')success(buffer);return buffer;},error=>{if(typeof failure==='function'){failure(error);return;}throw error;});};}
})();
