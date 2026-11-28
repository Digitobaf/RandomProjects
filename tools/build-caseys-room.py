"""Validate the split app and package small migration/code updates.
Use --base COMMIT to include changed media; --full is an optional new-install ZIP.
"""
from pathlib import Path
import argparse,hashlib,json,subprocess,zipfile
ROOT=Path(__file__).resolve().parents[1]
RUNTIME=['package.json','package-lock.json','server.mjs','asset-server.mjs','launch.mjs','profile.mjs','character-voice.mjs','smileys.mjs','gemini-connection.mjs','model.mjs','setup-key.mjs','chat-scroll.mjs','classic-text.mjs','quick-lookup.mjs','.gitignore','.env.example','abby-profile.example.txt','mercer-profile.example.txt']
CODE=['Caseys-Room-with-Mood-Ring.html','Start AIM.cmd','Set Gemini Key.cmd','Edit Abby.cmd','Edit Mercer.cmd','AIM setup.txt','ASSET-WORKFLOW.md','assets/runtime/asset-loader.js','assets/apps/tamascape.html','assets/manifest.json']+['aim-local/'+n for n in RUNTIME]
MIGRATION=['Split Media.cmd','tools/split-casey-assets.mjs','assets/runtime/asset-loader.js','aim-local/asset-server.mjs','ASSET-WORKFLOW.md']
def digest(p):
 with p.open('rb')as f:return hashlib.file_digest(f,'sha256').hexdigest()
def write_zip(name,files):
 with zipfile.ZipFile(ROOT/name,'w',zipfile.ZIP_DEFLATED,compresslevel=9)as z:
  for n in sorted(set(files)):
   assert not n.lower().endswith(('.gba','.gbc','.gb','.sav'))and n not in ['aim-local/.env','aim-local/abby-profile.txt','aim-local/mercer-profile.txt']
   entry=zipfile.ZipInfo(n,date_time=(1980,1,1,0,0,0));entry.external_attr=0o100644<<16
   z.writestr(entry,(ROOT/n).read_bytes(),compress_type=zipfile.ZIP_DEFLATED,compresslevel=9)
 with zipfile.ZipFile(ROOT/name)as z:
  assert z.testzip()is None
  for n in z.namelist():assert hashlib.sha256(z.read(n)).hexdigest()==digest(ROOT/n)
 print(name,round((ROOT/name).stat().st_size/1024,1),'KiB; verified')
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--base',help='Last delivered split-layout Git commit; include all media added/changed since it.');parser.add_argument('--full',action='store_true');args=parser.parse_args()
 html=ROOT/'Caseys-Room-with-Mood-Ring.html';assert html.stat().st_size<4*1024*1024,'HTML must remain below 4 MiB'
 manifest=json.loads((ROOT/'assets/manifest.json').read_text());assert manifest['format']=='caseys-assets-v1'
 for a in manifest['assets']:assert digest(ROOT/a['path'])==a['sha256'],a['path']
 manifest['htmlSha256']=digest(html);manifest['htmlBytes']=html.stat().st_size;(ROOT/'assets/manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
 write_zip('Caseys-Room-Migration.zip',MIGRATION)
 write_zip('Caseys-Room-Code.zip',CODE)
 if args.base:
  previous=json.loads(subprocess.check_output(['git','show',args.base+':assets/manifest.json'],cwd=ROOT,text=True))
  known={a['path']:a['sha256']for a in previous['assets']}
  changed=[a['path']for a in manifest['assets']if known.get(a['path'])!=a['sha256']]
  changed_code=[]
  for n in CODE:
   baseline=subprocess.run(['git','show',args.base+':'+n],cwd=ROOT,stdout=subprocess.PIPE,stderr=subprocess.DEVNULL)
   if baseline.returncode or hashlib.sha256(baseline.stdout).hexdigest()!=digest(ROOT/n):changed_code.append(n)
  write_zip('Caseys-Room-update.zip',changed_code+changed)
 if args.full:write_zip('Caseys-Room-full.zip',CODE+[a['path']for a in manifest['assets']])
 print('Use the migration ZIP for an existing embedded installation. Code ZIP requires its matching media set. Never replace a newer local HTML with an older code ZIP.')
if __name__=='__main__':main()
