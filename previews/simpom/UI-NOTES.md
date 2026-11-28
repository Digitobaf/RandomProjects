# SimPom — game UI v5

The timer is a Sims-style curved blue console with a green countdown and icon controls for Play, Pause and Reset. The existing game rotation arrows and Buy Mode chair icon remain. Focus/break/long-break choices, custom durations, volume and session count still work; there are no decorative speed buttons that alter the timer.

Buy Mode now shows sixteen image-only picks per page, eight columns by two rows on desktop. Very narrow screens reflow to four by four. All 95 picks remain available through paging and search. Names are not printed beneath thumbnails or in the catalog footer.

Hovering an item opens a navy game-style panel with its original picture, full name, Simoleon price and original game description. All descriptions/prices come from the user's original picks export. No catalog text or stats were invented. Keyboard focus reveals the same information; Escape dismisses it without clearing a search. The panel stays inside the viewport and can be hovered/scrolled. Touch selection and outside-tap dismissal also work.

The supplied purchase MP3 plays when a catalog item is selected. While it plays, the chosen object stays on its idle appearance. With a running timer, activation starts only once both the purchase cue has ended and images are ready. While paused, the cue plays on selection and the object continues waiting for Start. Reselecting an active item starts that item's activity again after the cue.

The cue uses the existing Sound switch and Volume control. Sound off skips the cue and its delay. Rapid picks cancel the old cue and activation; Reset/Pause, timer expiry and page changes cannot leave an old purchase callback starting the wrong item. A failed or blocked cue releases the controls instead of leaving the widget stuck. Hovering, searching, paging and opening Buy Mode do not play the purchase sound.

No item animation recipes, sprite media, gains or original activity sounds were changed in this UI update. The previous drink gulps, closed-door steam and native cooking book remain. Pending fire and TV programme tracks remain pending the user's files.

## Install

Close SimPom, extract `SimPom-Game-UI-Update.zip` into the existing v4 SimPom folder, replace included files, retain assets and reopen `SimPom.html` in Firefox. It is a small follow-up requiring the existing v3/v4 media set. It contains changed code/notes and only one new MP3; no existing image/audio file is overwritten. The app remains separate from Casey's Room and needs no Start AIM launcher.

## Shared code notes

`objects.js` adds only `description` and `price` to each existing object. `SimPom.html`, `style.css` and `player.js` must be updated together: the new markup contains the hover panel and icon-control labels. The selection cue URL is the root `data-select-sound` attribute. It points to an immutable SHA-256-named MP3 recorded in the manifest. The original upload is preserved byte-for-byte, with no conversion or trimming.

The player waits for the cue's actual `ended` event and renderer readiness, rather than guessing the delay from a frame duration. Selection audio shares the existing volume mixer on its own channel. Selection tokens invalidate stale completion callbacks. Countdown deadlines and storage key `sims-pomodoro-mockup:v3` are unchanged. Hover previews update presentation only and never select an item or start its activity.

Developer check: `python tools/simpom/test-buy-mode.py <complete-SimPom-folder> --report-dir <output>`. This covers all 95 paged picks, no visible thumbnail names, original descriptions/prices, mouse/keyboard/touch previews and dismissal, narrow/short viewports, real cue-before-activity playback, rapid switching, reset, mute, backgrounding, expiry, timer controls, rotation and saved custom durations. The earlier drink/steam/book playback check was also rerun. No Casey files, save origins, profiles or launcher code changed.
