# SimPom — current follow-up v4

Standalone widget, 95 selected objects. Latest follow-up: gulp effects after both drink sequences; steamer closes before steam loops; original 2× cooking-book sprites. The 18 latest requests are recorded in `ANIMATION-FIXES.md`. This package merges the uploaded Pollux data with the previous working player/renderer rather than replacing Casey's Room or restoring the earlier broken overlays.

## Install and files

Apply `SimPom-Drink-Steam-Book-Update.zip` over the existing **v3 SimPom folder** containing `SimPom.html`; retain existing assets and replace included files. This small follow-up contains changed code/notes and four new original gulp clips only. A fresh installation needs the original all-100 `SimPom-Mockup.zip`, then `SimPom-Revisions-v3.zip`, then this update. Do not extract it into Casey's Room.

```text
SimPom.html                Markup and script order; 95-pick catalog
style.css                  Unchanged uploaded blue/white Comic Sans widget styles
player.js                  Timer, ordered activity/audio, editable durations, catalog
render-model.js            Shared original sprite/layer composition
rendering.js               Compose a complete object first, scale it once for display
motion-masks.js             Compiled movement, protection and fixed fit bounds
objects.js                 Original sprite references, allowed views, sounds
behaviors.js               Editable per-object activity recipes
upscales.js                24 retained enhanced sets; removed items/original-only items omitted
assets/manifest.json        Current referenced media checksums
assets/images/<hash>.*      Original sprites/layers and retained enhanced atlases
assets/audio/<hash>.wav     Existing selected game sound clips
ANIMATION-FIXES.md          Current 18-item request outcomes
AUDIO-NEEDED.md             Exact TV programme events and pending fire clip
OBJECT-NOTES.md             Current authored behavior of each of 95 objects
VERIFICATION.json          Current browser/media/renderer check results
```

The app remains offline-capable using local relative images/audio and classic JS data assignments. No network/API/model service is called. No runtime pixel readback or fetch is required. This cloud browser blocks file navigation, so browser tests use equivalent local HTTP. There is no dependency on Start AIM and no Casey's Room integration or icon yet.

## Reconciliation choices

Pollux's Poseidon, microwave and Redwood recipes are used directly for the requested original-frame appearances. Moneywell/Brahma/microwave use original whole sprites capped at exactly 2 CSS pixels per native pixel; narrow viewports may fit them smaller to avoid clipping. The steamer now opens, recloses, then starts its looping steam sound while closed. It no longer opens on expiry. Pollux's independent Aqua-Rich-ium correction is also retained. The other accepted fixes, timer pause/resume and continuous hot-tub audio remain.

No existing hash-named media is altered. The supplied Pollux references all resolved to already available original assets. Newly needed TV romance frames and final Boggs layer were imported from the original full export. Existing lossless WebP versions are reused; newly compacted images were checked for exact visible RGB and alpha equality. No new AI artwork or artistic upscale was generated.

The bath, fridge and steamer render complete original frames instead of mixing an enhanced body with a hard-edged native patch. That removes the stray contour/seam lines while preserving their game animation. Original-only entries have `render.native:true` and omit `render.stable`; doubled entries also declare `render.nativeScale:2`.

The Playhouse has native interior animation in its DGRP states. `render.protectLayers:[0,4,8]` compiles the already-baked door and pump silhouettes into fixed foreground masks. These layers are protection geometry, not additional sprites to draw over the object. Only the interior animates; the door never cycles. Its unchanged idle pixels match a direct original-sprite rendering exactly in all four views.

Renderer replacements are assembled at integer native pixels (or integer 4× pixels for retained enhanced bodies), then the completed sprite is drawn once at display scale. Clearing/drawing clipped edges on a fractionally scaled display canvas caused the earlier dark seams. Protected foreground is replaced rather than repeatedly alpha-composited over itself. Normal activity uses a fixed scene fit and never recomputes scale per animation frame.

## Latest follow-up: drinks, steamer and cooking book

- Bachman Wood Beverage Bar and Whether Vain Drink Dispenser now end both their Start and click interactions with the original `bar_drink_gulp_vox` sound. Existing open/pour/clink/close order is retained. A short pause after closing lets its sound finish; one gulp variant then plays fully, without looping or an extra end-voice tag.
- WhisperSteam opens, briefly holds, closes, then starts its steam loop with the doors shut. It stays closed while running. Timer expiry stops the sound without reopening the door. The clean original sprites are unchanged.
- A Sim's Guide to Cooking uses original whole sprites at twice native size, with its existing open/close behavior. Its AI atlas reference is removed. There are 24 other enhanced sets remaining.

## Authoring data

`window.SIMS_BEHAVIORS = {guid: recipe, ...}` remains JSON-compatible data. Every recipe has `idle` and `active`; optional `start`, `click`, `stop`, `endAppearance`, `render`, `light` and `channel` add behavior. `durationMs` is positive milliseconds. User focus/break lengths are editable minutes in the widget. Timing-only changes need no media/mask rebuild.

A start sequence enters active; a non-looping active sequence holds its final pose. Click returns to active while the timer runs, otherwise its `returnAppearance` or prior held/paused appearance. Stop runs on timer expiry, not Pause/Reset. `endAppearance` can retain a filled tub. Per-view `allowedViews` limits rotation; new selections default SE when available, otherwise the first allowed view (Poseidon NE).

Frames use `state`, explicit `layers`, optional `extraStates`, `layerOffsets`, `eraseLayers`, `restoreLayers`, `appearance`, `light` and other existing renderer fields. Dynamic layers are often already baked into the full DGRP: never blindly add default layers. The generic player contains no GUID-specific hardcoding. Frame timing and ordering are authored interpretations, not recovered BHAV script behavior.

Sound specs are `{event, loop?, channel?, gain?}`. Sequence and graphic loops are independent. `preserveAmbient:true` lets a hot-tub click keep its existing continuous sound node. Pause/Reset/object changes stop current audio. Volume retains per-event gain. The timer uses a wall-clock deadline; animation uses monotonic time. Hidden tabs suspend audio. The storage key stays `sims-pomodoro-mockup:v3`; reload restores paused. Removing an object does not clear existing saved durations/preferences.

TV programme audio is genuinely missing from the source export; only controls are available. `channel.audioStatus:'awaiting-export'` and `missingSoundEvent` document this, and `active.sound` remains absent. Do not substitute unrelated effects. The wrong fire loop is unreachable; user will provide the replacement. See `AUDIO-NEEDED.md` for the next small audio-only update.

## Shared asset workflow and checks

Keep media external under `assets/` with immutable hash names. New content means a new filename/reference/checksum. The manifest lists media referenced by the current code; old unreferenced files may remain on disk. Never delete the user's whole assets folder or touch their other programs, private profiles, ROMs or browser saves. Future updates contain changed code and new media only. Coordinate newer local edits before replacing files.

Source ZIP schema: `sims1-viewer-picks/2`; SHA-256 `7d1b9cccf75650cdd96a61f30db1f6792faecf642b1cddf1cf2f72bb7fdb741a`.

Developer checks use Python Playwright/NumPy and Chromium, not runtime dependencies. Run `python tools/simpom/test-revisions.py <complete-SimPom-folder> --report-dir <output>`. It serves a temporary loopback-only test origin, never the user's Firefox profile. `build-motion.py` regenerates masks after changing graphic/layer selections or protection geometry; timing-only changes do not need it. Older v2 tests describe the earlier 100-object build and its now-removed fire/sink assumptions; the revision suite is the current entry point.

Checks cover 95 objects, configured pose/view renders with fixed scale, exact original-sprite idle comparisons across four views for tank/bath/fridge/steamer, protected Playhouse pixels with actual moving interior, doubled originals, removed-item absence, selected TV channel images, missing-audio honesty, real looping boil/steam audio, silent active fire, mud-source omission, timer expiry/persistence, 320/480/920px layouts and current media checksums. Representative final renders were visually inspected. Programme audio remains unimplemented until the missing tracks arrive.

Current targeted browser check: `python tools/simpom/test-drink-steam-book.py <complete-SimPom-folder> --report-dir <output>`. It verifies complete real-time gulp playback after closing in Start and click, all six steamer door poses before looping steam, and the original cooking book at 2× in all four views. The broader `test-revisions.py` suite now expects the closed-door steam state and original cooking-book artwork.
