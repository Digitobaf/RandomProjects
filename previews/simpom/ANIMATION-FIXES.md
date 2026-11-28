# SimPom — current requested revisions (v4)

The current follow-up applies over SimPom v3. It adds four original gulp-effect variants and the requested data changes. Earlier revision notes below remain relevant except where the latest follow-up supersedes them.

## Latest follow-up: drinks, steamer and cooking book

- Bachman Wood Beverage Bar and Whether Vain Drink Dispenser now end both their Start and click interactions with the original `bar_drink_gulp_vox` sound. Existing open/pour/clink/close order is retained. A short pause after closing lets its sound finish; one gulp variant then plays fully, without looping or an extra end-voice tag.
- WhisperSteam opens, briefly holds, closes, then starts its steam loop with the doors shut. It stays closed while running. Timer expiry stops the sound without reopening the door. The clean original sprites are unchanged.
- A Sim's Guide to Cooking uses original whole sprites at twice native size, with its existing open/close behavior. Its AI atlas reference is removed. There are 24 other enhanced sets remaining.

**1. Andersonville Pedestal Sink** — Removed from the catalog, recipes and active media inventory.

**2. Moneywell Computer** — Original complete sprites at 2× native size; AI atlas removed. No separate screen-edge patch.

**3. Poseidon’s Adventure Aquarium** — Pollux live-fish and feeding sequence, complete original frames, NE/NW views only. No mixed AI body.

**4. Positive Potential Microwave** — Pollux door/cook/light sequence with complete original sprites at 2× native size. AI atlas removed.

**5. Sani-Queen Bathtub** — Empty, filling and full appearances use complete original sprites, without the cut-out basin boundary. One fill, then holds full.

**6. The Brahma 2000** — Original complete sprites at 2× native size; AI atlas removed. No separate screen-edge patch.

**7. Fireplace** — The rejected burning-Sim audio is no longer referenced or played. Ignition remains one-shot; active flame is silent until the user supplies the replacement loop.

**8. Porcina Refrigerator Model P1g-S** — Complete original door sprites, without an outside differential-matte line. Supplied empty interior retained.

**9. Boggs Home Canning Center** — Chops through working layers 0–3 once, then holds layer 3: sliced apples on the board and water in the pot. Boiling sound loops.

**10. Redwood Hot Tub** — Pollux original bubbling frames, without the extra dynamic snow-ring layer. Native baked snow remains as drawn in the game. Pump sound loops and survives clicks.

**11. Aquatic Playhouse** — Subtle native interior animation restored using states 0–7. Already-baked pump and door pixels are protected from the animation, with no duplicated overlays. Machinery sound loops.

**12. WhisperSteam Personal Steamer** — Complete original sprites clean up the outline. Latest behavior: open, briefly hold, close, then loop steam with the doors shut. No opening on timer expiry.

**13. Ponce de Leon Tub** — Accepted mud filling/holding behavior retained. All pouring-stream layers 18–20 omitted; the mud rises without a visible source.

**14. Wall-Mounted TV** — Action channel images 1–3 selected. Power/control sounds retained. Actual Action programme audio was not exported; pending source track tv_action_exp.

**15. Trottco 27 Color Television B94U** — Cartoons channel images 10–12 selected. Power/control sounds retained. Actual Cartoons programme audio was not exported; pending source track tv_cartoon_cheap.

**16. Soma Plasma TV** — Romance channel images 7–9 selected. Power/control sounds retained. Actual Romance programme audio was not exported; pending source track tv_romance_exp.

**17. Eyrie Dragon Egg** — Removed from the catalog, recipes and active media inventory.

**18. Meal, Hamburger and Pizza Box** — All three removed. The catalog now contains 95 objects.

The renderer now assembles native-pixel replacement regions before enlarging the finished object. This avoids the old dark jagged seams from clearing and re-drawing antialiased edges directly on the scaled display canvas. Native originals keep their original outlines.

Pending audio is recorded honestly: the three TV programme events are listed as unresolved in the original picks manifest, and no unrelated audio is substituted. The user will provide the fire loop separately.
