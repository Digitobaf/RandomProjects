# Audio still needed

The original `picks-export.zip` has the TV power/switch effects but no programme tracks. Its manifest explicitly lists these events under `unmatchedSoundEvents`:

| Object | Programme | Unresolved game event |
| --- | --- | --- |
| Wall-Mounted TV | Action | `tv_action_exp` |
| Trottco 27 Color Television B94U | Cartoons | `tv_cartoon_cheap` |
| Soma Plasma TV | Romance | `tv_romance_exp` |

The selected channel images are implemented. These tracks need to be resolved/exported from the installed game by the viewer or another local tool. A differently named TV power effect or an unrelated romance sting is not the programme audio. No installed game access is available in this workspace.

The fireplace also awaits the user's replacement fire loop. The previously selected `fire_burning` track is removed from the fireplace's sound metadata and recipe. Historical hash-named files can remain unused on disk; nothing references or plays that rejected track.

For the next assistant: add each provided clip under a new SHA-256-based `assets/audio/` filename and manifest entry. Add the event/clip in that object's `sounds`, set `active.sound` to `{event, loop:true}`, and update/remove the channel's pending-audio metadata. The fire loop belongs on `active.sound` only, after ignition. Do not replay ignition in the active loop. Ship only changed code plus those new audio files.
