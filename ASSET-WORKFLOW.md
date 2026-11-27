# Casey's Room: shared folder and update workflow

## One-time conversion on the Windows PC

Permanent folder: `C:\Users\ADMIN\Documents\Casey's Room\`

1. Close the black **Start AIM** launcher window.
2. Extract **Caseys-Room-Migration.zip into that permanent folder**, keeping its subfolders. This kit does **not** contain a replacement Casey's Room HTML or replacement server.mjs.
3. Double-click **Split Media.cmd**. It uses the Node.js already installed for AIM. No download, new account, or API request is needed.
4. Wait for **Done**, then launch with **Start AIM.cmd** as usual.

The converter reads **the HTML currently installed on this PC**, not a potentially older repository export. It extracts the media, patches the existing server only to add the assets route, and keeps the original HTML and server in `_migration-backups/<timestamp>/`. It does not read or change `.env`, `abby-profile.txt`, `mercer-profile.txt`, the ROM, Firefox storage, SDK dependencies, or model choices. Running it again does nothing once conversion has completed. If it cannot recognize the installed server or safely convert the document, it stops before replacing the installed HTML/server. Public asset files already extracted may remain if a conversion stops.

Keep using **http://127.0.0.1:43187/**, with the same Firefox profile. The scheme, host, port, storage keys, IndexedDB databases, and same-origin app frames remain unchanged. mGBA games and saves remain in that origin; the local `.gba` file stays private in the main folder. Do not launch the HTML directly as a file or change the port.

## Folder layout after conversion

```text
Casey's Room/
  Caseys-Room-with-Mood-Ring.html    # Main code + markup; editable, about 2.13 MiB in the tested build
  Start AIM.cmd
  Set Gemini Key.cmd
  Edit Abby.cmd
  Edit Mercer.cmd
  Split Media.cmd                  # One-time converter; safe to leave here
  ASSET-WORKFLOW.md
  AIM setup.txt
  aim-local/
    server.mjs                     # Existing local server, with an added /assets/ route
    asset-server.mjs               # Static files, MIME types, ranges and cache policy
    launch.mjs                     # Existing launcher; same localhost origin
    ...                            # Existing SDK/helper files
    .env                           # PRIVATE: existing key/config, never distribute
    abby-profile.txt               # PRIVATE: retain existing edits
    mercer-profile.txt             # PRIVATE: retain existing edits
  assets/
    manifest.json                  # Media paths, SHA-256 checksums, sizes, source/layout version
    runtime/asset-loader.js         # Small shared loader for legacy audio references
    apps/tamascape.html             # TamaScape code/config/animations; no embedded media
    images/<hash>.webp|png|svg      # Artwork for the other apps
    audio/<hash>.mp3|wav|ogg        # UI effects and loops
    video/<hash>.mp4               # Original monitor/laptop star loop
    fonts/<hash>.woff|woff2|ttf     # Embedded fonts, now external
    data/<hash>.wasm|gz             # Emulator core and packed glyph data
    tamascape/
      images/<hash>.webp           # Tama skins, scenes, animation artwork
      audio/<hash>.mp3|ogg         # Tama interface sounds and ambience
    ...                            # Any previously existing local assets remain intact
  tools/split-casey-assets.mjs
  _migration-backups/<timestamp>/   # Original HTML/server; private, excluded from Git and HTTP
  <your game>.gba                   # PRIVATE: retain locally; excluded from Git/packages
```

Names use the first 24 hexadecimal characters of SHA-256. Identical assets within a group share one file. The manifest lists current extracted assets; previous unrelated files under assets are not automatically deleted.

## Rules for all assistants

- **The installed version is authoritative.** Migration preserves the local version. Do not overwrite it with a repository HTML if another assistant has made newer changes locally.
- After the first conversion, share **the small HTML, assets/manifest.json, and assets/apps/tamascape.html** to reconcile versions. Share changed helper files too if they were edited. Never share `.env`, private profiles, ROMs, browser saves, backups, or `node_modules`.
- Edit **Caseys-Room-with-Mood-Ring.html** directly for main code, markup, and app styles. The old `src/Caseys-Room.template.html` is retired; do not recreate the embedded HTML export.
- Edit **assets/apps/tamascape.html** for TamaScape code/config. Preserve existing animation code, scene behavior, volume, and audio gain unless a change is explicitly requested. The separate legacy standalone `TamaScape.html` is not the embedded app's source.
- Put new media in the relevant assets subfolder. Keep media external. Do not paste base64 images/audio into the main HTML or child apps.
- **Never overwrite a hashed media file in place.** Write a new hash-named file and update references plus the manifest. Browsers cache hashed media as immutable. HTML, JS and the manifest use `no-store` so code edits show after reload.
- Use root-relative URLs such as `/assets/images/<hash>.webp`. They work from the main document and same-origin app frames. SVG artwork used as an image may retain its own self-contained raster layers; do not externalize those nested layers without browser testing.
- For new audio code, use `await CaseyAssets.arrayBuffer('/assets/audio/<hash>.mp3')` with Web Audio, or a normal URL with HTMLAudioElement. The migration retains a small `#,<encoded-reference>` fragment on old data-URI audio references so existing `.split(',')[1]` decoders remain compatible. The shared loader fetches the actual sound asynchronously at decode time; it does not preload all media or change sound gain/timing.
- Do not rename storage keys, clear site data, change the origin, replace profiles, include private files, or disturb mGBA persistence as part of packaging.

## Future delivery: changed files only

The one-time migration kit extracts existing media locally, so the user does not need another full 80 MB download to switch layouts.

For later updates, send only the changed HTML/helper/app-code files and any new media they reference. A code-only update needs no image/audio download if all referenced media are already present. If media changes, include just the new hash-named files. Extract updates into the existing folder and replace the included files; do not erase the folder or assets directory. Close the launcher before replacing helper/server code.

Repository packager: `python tools/build-caseys-room.py --base <last-delivered-split-commit>` creates `Caseys-Room-update.zip` containing code and media added/changed since that split-layout commit. It also validates asset checksums. `Caseys-Room-Code.zip` is a small code package requiring its matching media set, not a migration kit. `--full` is an optional new-install bundle, not the normal update workflow.

The initial tested split contains **331 extracted media files**, a **2.13 MiB main HTML**, and a **30 KiB TamaScape code file**. Counts/sizes can differ for a newer local version. The converter leaves newer local content intact rather than substituting this tested build.
