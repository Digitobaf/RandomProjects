# Casey's Room

These instructions apply to Casey's Room and its downloadable ZIP in this repository.

## Source and scope

- Editable sources are `src/Caseys-Room.template.html` and `src/TamaScape-embedded.html`. `TamaScape.html` is the separate standalone app and may have different animation code; preserve each version. Build with `python tools/build-caseys-room.py`. The generated canonical app is `Caseys-Room-with-Mood-Ring.html`, a complete standalone HTML with its artwork, fonts, and sounds included. The generated HTML is excluded from Git because it exceeds the 100 MiB per-file limit. The compressed ZIPs are still below that limit and remain tracked for direct downloads.
- Preserve Lamplight Write and Diary's code, appearance, behavior, and storage unless the user explicitly requests changes to them. Keep independent programs and their storage separate.

## Revision delivery

The user confirmed that GitHub downloads work and requested this method for future revisions.

1. Edit and verify the source files. Keep animation code unchanged for skin-only changes; only edit skin assets/configuration.
2. Run `python tools/build-caseys-room.py`. Verify ZIP contents exactly match the generated canonical HTML.
3. Commit and push source changes to `main` without rewriting history.
4. Commit the generated ZIPs while each is below 100 MiB. Publish a Release page linking the SHA-pinned ZIP downloads. Release asset uploads currently return an authentication error on this connection; if uploads become available, assets can replace Git-tracked ZIPs. Verify anonymous downloads and extracted HTML bytes.
5. Deliver the version-specific raw GitHub ZIP link. Never commit the oversized generated HTML.

The repository is:
`https://github.com/Digitobaf/RandomProjects`

Use the SHA-pinned ZIP download links; Release pages can link those downloads. Tell the user to extract into the existing app folder and use Start AIM.cmd for connected Abby. Preserve local keys, profiles, browser origin, and save data. Confirm the release is published and anonymously downloadable before delivering it.
