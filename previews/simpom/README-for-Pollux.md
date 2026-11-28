# SimPom — all 100 picks

This prototype uses the user's full `sims1-viewer-picks/2` export, rejoined from ten volumes. The source ZIP SHA-256 was verified as `7d1b9cccf75650cdd96a61f30db1f6792faecf642b1cddf1cf2f72bb7fdb741a`.

It is **not integrated into Casey's Room**. No launcher, localhost origin, profile, storage key, game save, or Object Viewer file has been changed. The Abby/Mercer requests remain queued in the repository laundry list.

## Layout

```text
SimPom.html   UI markup, opened directly in Firefox
style.css                 Sims blue/white UI and fallback font
player.js                 Generic renderer, timer and audio sequencer
objects.js                Used exported states/layers, views, bounds and curated sounds
behaviors.js              Per-GUID object recipes; edit timing/ordering here
upscales.js               Enhanced atlas cells and registration metadata
OBJECT-NOTES.md           Specific review of every pick
assets/manifest.json      SHA-256 and byte counts for shipped media
assets/images/<hash>.*    Original sprites/layers and enhanced sprite atlases
assets/audio/<hash>.wav   Selected original sound clips
```

Media remains external and hash-named. Never edit a hash-named file in place. New media needs a new hash, updated references and checksum. Future updates should ship only changed code and new media. The original source export stays with the user; no private installed paths or files are needed by this player. Only states/layers used by the configured recipes are shipped: unused dirt, death, broken/catalog appearances and unrelated components are omitted. To author a new step that needs an unshipped state, import that state from the original export as new hash-named media first.

Classic JS data assignments, rather than fetched JSON, allow direct local HTML use without a server. JSON syntax can be used inside each assignment, retaining `window.SIMS_BEHAVIORS = ...;`.

## Recipe schema

Each GUID has an `idle` frame and an `active` sequence. Optional `start`, `click`, and `stop` sequences provide ordered actions.

```js
{
  "idle": { "state": 0, "layers": [] },
  "start": {
    "steps": [
      { "state": 0, "durationMs": 200,
        "sound": { "event": "microwave_sbeep", "loop": false } }
    ]
  },
  "active": {
    "steps": [ { "state": 5, "durationMs": 1000, "light": true } ],
    "loop": true,
    "sound": { "event": "microwave_scook" }
  }
}
```

`durationMs` must be positive milliseconds. Sequence `loop` repeats graphics, independently of audio. A non-looping active sequence holds its last frame. A start sequence enters active when finished. A click sequence returns to active if the timer is running, otherwise idle. A stop sequence runs only when the timer expires. Pause/Reset cancels everything immediately, without a closing/draining tail.

Frame fields are `state`, `layers` (an explicit array of exported dynamic-layer indices), optional `extraStates`, `layerOffsets` keyed by layer index, optional `light`, and optional `sound`. Layers share the original per-view canvas and retain their offsets. `extraStates` handles component graphics such as the whale body/base. Layer offsets are used for the butter-churn dasher, keeping the barrel stationary.

A sound reference is `{event, loop?, channel?, gain?}`. Events resolve only within that object's curated `sounds` in objects.js. Without an override, the exported loop flag is honored; unknown loop flags do not force looping. Overrides are explicit in the recipe, e.g. a one-shot match strike and limited filling/draining water. Sound variants are randomly selected. Channels prevent duplicates: entering a new sequence cancels the preceding sequence's sounds. Timeline step sounds fire on step entry, in order. Background sounds are suspended when the browser tab is hidden.

## Interpretation limits

These are authored prototype recipes, not recovered BHAV script timing. Graphic numbers alone do not establish animation: portions, dirt, broken states, catalogs and placement variants are not autoplayed as animation frames. No dead or dirty aquarium frames are used. Repair/failure effects and unrelated voices from shared IFF files are filtered out. Objects with no suitable exported sound remain silent.

`OBJECT-NOTES.md` records each pick's choice, including provisional layer combinations that need visual review against the game. The microwave's On graphic aliases Closed; its front-facing SE/SW window uses a provisional runtime light. No matching programme audio was included for TVs. Static pieces remain static unless a separate moving layer is available.

## Size and enhanced art

All objects fit a similar approximately 300-pixel display footprint while preserving aspect ratio. Source anchors are retained as metadata, but rotation uses fixed per-view visual pivots instead of orbiting around tile-zero anchors. Oversized temporary effects fit within the object area.

36 small-object sets were AI enhanced as matched sheets containing their used views and activity frames. The renderer registers the enhanced detail to the unchanged native bounds and alpha silhouette. This prevents new edge speckles or altered dimensions from moving the object. Original art is always available via the Enhanced small sprites switch; newly authored frames without an enhanced cell use the original automatically. Some transient gnome explosion frames intentionally retain original art. Lossless WebP conversion is packaging only, not another artistic edit.

## Persistence and validation

This mockup alone uses localStorage key `sims-pomodoro-mockup:v3`. It does not access Casey's Room storage. Reload restores paused. The running timer uses a wall-clock deadline; animation uses monotonic time. Image caches keep only the selected object's rendered frames.

Checks cover all 100 picks' views, Start/Pause/Reset and configured clicks, sound-event selection, all 36 enhanced sets, real audio playback, mute/unmute, timer expiry, editable saved durations and narrow layouts. A source/asset checksum audit accompanies delivery. Direct file navigation is restricted in this cloud browser; browser interaction was tested through an equivalent local HTTP server, and the package uses local relative resources without fetch or external dependencies.
