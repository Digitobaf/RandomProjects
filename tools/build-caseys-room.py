"""Build the complete standalone app from source; distribute ZIPs via GitHub Releases."""
from pathlib import Path
import base64,gzip,zipfile
ROOT=Path(__file__).resolve().parents[1]
source=(ROOT/'src/TamaScape-embedded.html').read_bytes()
payload=base64.b85encode(gzip.compress(source,compresslevel=9,mtime=0)).decode()
template=(ROOT/'src/Caseys-Room.template.html').read_text()
assert template.count('__TAMASCAPE_PAYLOAD__')==1
html=template.replace('__TAMASCAPE_PAYLOAD__',payload).encode()
(ROOT/'Caseys-Room-with-Mood-Ring.html').write_bytes(html)
runtime=['package.json','package-lock.json','server.mjs','launch.mjs','profile.mjs','smileys.mjs','gemini-connection.mjs','model.mjs','setup-key.mjs','chat-scroll.mjs','classic-text.mjs','quick-lookup.mjs','.gitignore','.env.example','abby-profile.example.txt','mercer-profile.example.txt']
files=['Caseys-Room-with-Mood-Ring.html','Start AIM.cmd','Set Gemini Key.cmd','Edit Abby.cmd','Edit Mercer.cmd','AIM setup.txt']+['aim-local/'+n for n in runtime]
with zipfile.ZipFile(ROOT/'Caseys-Room.zip','w',zipfile.ZIP_DEFLATED,compresslevel=9)as z:
 for name in files:z.write(ROOT/name,name)
with zipfile.ZipFile(ROOT/'Caseys-Room.zip')as z:
 assert z.testzip()is None
 assert z.read('Caseys-Room-with-Mood-Ring.html')==html
with zipfile.ZipFile(ROOT/'TamaScape.zip','w',zipfile.ZIP_DEFLATED,compresslevel=9)as z:z.write(ROOT/'TamaScape.html','TamaScape.html')
print('Built and verified Caseys-Room.zip and TamaScape.zip.')
