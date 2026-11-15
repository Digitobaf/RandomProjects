# Casey's Room

These instructions apply to Casey's Room and its downloadable ZIP in this repository.

## Source and scope

- The canonical app is `Caseys-Room-with-Mood-Ring.html` at the repository root. Keep it a complete standalone HTML file for local use, with its artwork, fonts, and sounds included.
- Preserve Lamplight Write and Diary's code, appearance, behavior, and storage unless the user explicitly requests changes to them. Keep independent programs and their storage separate.

## Revision delivery

The user confirmed that GitHub downloads work and requested this method for future revisions.

1. Make and verify the requested changes in the canonical HTML file.
2. Rebuild `Caseys-Room.zip` containing that exact HTML file. Verify the ZIP is valid and its extracted HTML matches the source bytes.
3. Commit and push the revision and updated ZIP to `main` in `Digitobaf/RandomProjects`. Preserve history; never force-push.
4. Verify the public ZIP can be fetched without login and that its extracted HTML matches the revision.
5. Give the user the direct GitHub ZIP download link. Prefer a raw URL using the pushed commit SHA when delivering a new revision, so cached branch content cannot return an older file:
   `https://raw.githubusercontent.com/Digitobaf/RandomProjects/<commit-sha>/Caseys-Room.zip`

The stable download link is:
`https://raw.githubusercontent.com/Digitobaf/RandomProjects/main/Caseys-Room.zip`

The repository is:
`https://github.com/Digitobaf/RandomProjects`

Use this GitHub delivery workflow for Casey's Room instead of chat artifact-download links, private download sites, or email setup unless the user requests another method. Tell the user to unzip the download and open the HTML locally. Confirm a push succeeded before saying the revision is available on GitHub.
