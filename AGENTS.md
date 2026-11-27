# Casey's Room

## Canonical sources and private files

- `Caseys-Room-with-Mood-Ring.html` is the editable, Git-tracked main code/markup. Keep it below 4 MiB. The old embedded template/payload build is retired.
- `assets/apps/tamascape.html` is the embedded TamaScape code/config. Keep media external. The legacy standalone `TamaScape.html` is separate; preserve its independent behavior.
- Media lives under `assets/images`, `audio`, `video`, `fonts`, `data`, and `tamascape/{images,audio}`. The manifest records checksums and paths. Never overwrite hash-named media in place; write a new hash name and update references.
- Preserve all independent programs' behavior/storage unless requested. No unrelated animation, audio-gain, save, or profile changes during packaging.
- Never commit or distribute `.env`, actual `abby-profile.txt`/`mercer-profile.txt`, `.gba` ROMs, browser save exports, `_migration-backups`, SDK dependencies, or node_modules.
- The user's actual installed HTML may contain newer changes by another assistant. Use the one-time local migration kit rather than replacing that HTML with a possibly older repository copy. Reconcile the small migrated HTML, manifest and TamaScape code before subsequent feature edits.

## Serving and save continuity

Keep `Start AIM.cmd`, `http://127.0.0.1:43187/`, and the existing Firefox profile/origin. The server only exposes explicit app/API routes and the public assets directory; preserve traversal/symlink protections and media range responses. Do not change localStorage/IndexedDB keys or clear user data. Private companions and ROM stay in the permanent folder.

## Validation and delivery

1. Read `ASSET-WORKFLOW.md`; follow its shared editing/update rules. Run tests appropriate to the change, plus `python tools/build-caseys-room.py` for checksum/package verification.
2. For the one-time transition deliver the small `Caseys-Room-Migration.zip`. It converts the installed HTML, backs up HTML/server, and preserves private companions. Do not tell the user to install the repository code ZIP over a newer local version.
3. For subsequent releases use `python tools/build-caseys-room.py --base <last-delivered-split-commit>`. Deliver only code and media added/changed since that base. Do not re-export/download full bundles for routine edits. A full new-install ZIP is optional with `--full`.
4. Commit and push to `main` without rewriting history. Publish a Release page with SHA-pinned raw download links for the small migration/update ZIP. Release asset uploads currently fail authentication on this connection; raw Git-tracked small ZIPs work.
5. Verify anonymous downloads and ZIP bytes before delivery. Explain extraction into the existing app folder, keeping the origin unchanged. Include a handoff note with the exact layout/update rules for the other assistant when requested.

Repository: https://github.com/Digitobaf/RandomProjects
