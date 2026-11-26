# Casey's Room

These instructions apply to Casey's Room and its downloadable ZIP in this repository.

## Source and scope

- Editable sources are `src/Caseys-Room.template.html` and `src/TamaScape-embedded.html`. `TamaScape.html` is the separate standalone app and may have different animation code; preserve each version. Build with `python tools/build-caseys-room.py`. The generated canonical app is `Caseys-Room-with-Mood-Ring.html`, a complete standalone HTML with its artwork, fonts, and sounds included. Generated HTML/ZIP files are excluded from Git because the app now exceeds the 100 MiB per-file limit.
- Preserve Lamplight Write and Diary's code, appearance, behavior, and storage unless the user explicitly requests changes to them. Keep independent programs and their storage separate.

## Revision delivery

The user confirmed that GitHub downloads work and requested this method for future revisions.

1. Edit and verify the source files. Keep animation code unchanged for skin-only changes; only edit skin assets/configuration.
2. Run `python tools/build-caseys-room.py`. Verify ZIP contents exactly match the generated canonical HTML.
3. Commit and push source changes to `main` without rewriting history.
4. Publish generated ZIPs as GitHub Release assets attached to that commit. Verify anonymous downloads and extracted HTML bytes.
5. Deliver the version-specific GitHub Release asset link. Historical SHA-pinned raw links remain available for older revisions.

The repository is:
`https://github.com/Digitobaf/RandomProjects`

Use GitHub Releases for new downloads. Tell the user to extract into the existing app folder and use Start AIM.cmd for connected Abby. Preserve local keys, profiles, browser origin, and save data. Confirm the release is published and anonymously downloadable before delivering it.
