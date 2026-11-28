# SimPom — all 100 picks, animation update v2

This is a separate standalone widget mockup. Casey's Room, Start AIM, the Object Viewer, private profiles and browser game saves are not modified. The previous combined chat/laptop installer is a separate deliverable; it must still be run locally to apply those fixes.

Source: `sims1-viewer-picks/2`, ZIP SHA-256 `7d1b9cccf75650cdd96a61f30db1f6792faecf642b1cddf1cf2f72bb7fdb741a`.

## Install and update

Extract `SimPom-Animation-Fixes.zip` into the **existing SimPom folder**, replacing included code and retaining existing assets. Reopen `SimPom.html` in Firefox. Fresh installations need the original all-100-picks `SimPom-Mockup.zip` first, then this update. The update contains only changed code/documentation and 42 new immutable media files, not the original 92 MiB download.

Do not overwrite these files with another assistant's older copy. Coordinate changes to the small code/data files. Never overwrite a hash-named image or audio file: add a new hash, change its reference and update the manifest. Keep unrelated local files and media.

## Layout

```text
SimPom.html                 Markup and script loading order
style.css                   Blue/white Comic Sans widget and Buy Mode catalog
player.js                   Timer, state, selection and ordered audio/animation playback
render-model.js             Shared native sprite composition and geometry helpers
rendering.js                Fixed-body renderer, local moving regions and fixed scene fit
objects.js                  Exported frames/layers, original canvases, allowed views and sounds
behaviors.js                Editable per-GUID activity recipes and rendering rules
motion-masks.js             Compiled native motion, occlusion and fit geometry
upscales.js                 Existing enhanced atlases and registration metadata
ANIMATION-FIXES.md           Every requested correction and source limitations
OBJECT-NOTES.md              Current authored choices for all 100 objects
VERIFICATION.json           Checks performed for this update
assets/manifest.json         Media checksums and byte sizes
assets/images/<hash>.*       Original native sprites/layers + existing enhanced atlases
assets/audio/<hash>.wav      Game effects + new steady fire excerpt
```

Classic script data assignments and relative resource URLs permit offline local-file use. No fetch, external fonts, model calls or network service is used. Runtime geometry is compiled ahead of time; rendering never reads image pixels back from canvas, avoiding local-file canvas security restrictions.

## Recipes and editable timing

`window.SIMS_BEHAVIORS = { "<guid>": { ... } };` uses JSON-compatible data. The generic player contains no object-ID-specific rules. Each recipe has `idle`, `active`, and optional `start`, `click`, `stop`, `endAppearance` and `render`.

```js
{
  "idle": {"state": 0, "layers": []},
  "start": {"steps": [
    {"state": 0, "durationMs": 1050,
     "sound": {"event": "match_strike", "loop": false}},
    {"state": 1, "durationMs": 1400,
     "sound": {"event": "fireplace_on", "loop": false}}
  ]},
  "active": {
    "steps": [{"state": 1, "durationMs": 180},
              {"state": 2, "durationMs": 180},
              {"state": 3, "durationMs": 180}],
    "loop": true,
    "sound": {"event": "fire_burning", "loop": true, "gain": 0.75}
  },
  "render": {"stable": true, "base": {"state": 0, "layers": []}}
}
```

`durationMs` is positive milliseconds. **Edit durations without rebuilding media/masks.** Focus/break lengths remain editable in the widget's Durations controls and use minutes. A start sequence enters active; a non-looping active holds its final pose. Click returns to active while the timer runs, otherwise its `returnAppearance` or the earlier paused/held appearance. Stop runs on timer expiry, never on Pause/Reset. `endAppearance` retains filled basins when there is no closing/draining sequence.

Frames support `state`, `layers`, `extraStates`, `layerOffsets`, `eraseLayers`, `restoreLayers`, `appearance`, `light`, `water`, `rotation` and `sway`. `water: {from:0,to:1}` interpolates over the step duration; numeric water holds a level. `sway` defines amplitude/period/pivot for the entire single egg/cradle bitmap. Per-view `allowedViews` limits rotations; selections default SE, or the first allowed view when SE was removed (Poseidon defaults NE).

Sound specs are `{event, loop?, channel?, gain?}`. Sequence sounds start once; step sounds fire on step entry. Audio and graphic loops are independent. `preserveAmbient:true` keeps a running loop through a click instead of restarting it. Pause/Reset and object changes stop current audio. Volume changes retain per-event gain. Hidden tabs suspend audio; the timer uses a wall-clock deadline. The fireplace's new 11.5-second `fire_burning` WAV uses a steady excerpt of the supplied `clown_fire_burn_sfx.wav`, with a 500ms wrap crossfade. The original metallic `fireplace_on` clip remains a one-shot ignition only.

## Fixed bodies and native moving parts

Independent AI-generated animation poses caused texture shifts. The renderer now uses one fixed enhanced reference (when available), registered to the original silhouette. Only reviewed **original native pixels** replace the moving regions. Display/window polygons, basin clips, foreground masks and per-layer destinations prevent overlays spilling through casings, rims, taps and cart posts. Native originals remain available through the Enhanced small sprites switch.

Some dynamic layers are already baked into full exported DGRPs. Never blindly add default layers. Bubble blower states 1–10 are partial/alternate presentations, not a safe animation run; only bubble layers 4–9 animate over the whole g0 machine. Bull g3 is an empty mount. The two beds and phone booth are intentionally visually fixed, with sounds retained.

`motion-masks.js` includes per-view native differences, protected foreground pixels, source/body bounds and a fixed union of normal animation extents. Normal animation never changes object scale per frame. Oversized gnome explosions are explicitly transient. All 36 existing enhanced sets are retained; no new per-frame AI redraws were introduced.

If adding/changing frame numbers, layers, clipping geometry or body references, regenerate masks using repository tool `tools/simpom/build-motion.py <complete-SimPom-folder>` (developer Python/Playwright only, not a runtime dependency). The complete assets must be available. Merely changing step durations, sound choices or user timer preferences does not require regeneration. The same compositor is used by the builder and runtime.

## Interpretation and validation limits

Timings and click ordering are authored, not extracted BHAV script behavior. No dead/dirty aquarium states are selected. Porcina has only six supplied door states and no stocked-content layer, so its available empty interior is retained. Microwave lighting is a precisely clipped runtime effect because the exported On state aliases Closed. TVs have no supplied programme audio.

The standalone storage key remains `sims-pomodoro-mockup:v3`; there is no Casey storage access. Reload restores a paused timer. The view-default migration preserves saved durations/preferences while switching the old default once; new rotations can then be saved normally.

Browser checks run through an equivalent local HTTP server because direct file navigation is blocked in this cloud Chromium. Runtime has no HTTP dependency. Verification covers 100 objects and 3,008 configured pose/view renders; fixed scale; pixel invariance outside moving regions for screens, bath, hula, phone and beds; sink fill/pause/resume; fireplace sound order and loop; requested real audio loops; hot-tub click continuity; custom timer expiry/persistence; 320/480/920px layouts; and all 1,964 media checksums/references. Final rendered contact sheets were visually inspected for the reported problem objects. These checks verify this update, not exact historical game scripting.

## Developer checks

With Python `playwright` and `numpy` plus Chromium available, run the repository's `tools/simpom/test-playback.py`, `test-regions.py` and `test-audio.py`, passing a complete extracted SimPom folder. Each starts its own loopback-only HTTP server. `--report-dir` selects an output folder; `--chromium` can select the browser executable. Tests do not touch the actual Firefox profile or Casey's Room saves. `build-motion.py` uses the same arguments and regenerates only `motion-masks.js` in that app folder.
