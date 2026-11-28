# SimPom animation and sound update

Apply over the original all-100-picks mockup. All requested changes are recorded below; the conditional stocked-fridge variant was not present in the supplied export.

- **1. "Andersonville" Pedestal Sink** — Basin-only rising water; fill sound and motion once, then water stays filled. No opaque full-sink water/suds frame.
- **3. Moneywell Computer** — Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.
- **7. The Brahma 2000** — Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.
- **22. Wall-Mounted TV** — Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.
- **22. Trottco 27" Color Television B94U** — Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.
- **22. Soma Plasma TV** — Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.
- **2. "Fountain of Tranquility"** — One fixed fountain body with a water-only mask; no per-frame AI body textures.
- **4. Poseidon's Adventure Aquarium** — Only NE and NW rotations remain; NE is the starting view because SE was explicitly removed.
- **12. All objects** — Each selection starts in SE. Poseidon aquarium is the explicit NE/NW-only exception and starts NE. Saved timers/settings are retained.
- **5. Positive Potential Microwave** — Window glass uses native geometry; warm light is clipped inside the window with no shadow/glow bleed.
- **6. Sani-Queen Bathtub** — Only the water level/flow changes; one fill sequence with one fill clip, then a full still bath. No animated metal textures.
- **8. Porcina Refrigerator Model P1g-S** — All six supplied door states checked. No stocked variant or food-content layer exists in this export; retain the available interior.
- **9. The Vibromatic Heart Bed** — All appearances locked to the unoccupied made bed. Existing coin/motor/bed interaction sounds retained.
- **26. Midnight Mystery Canopy Bed** — All appearances locked to the unoccupied made bed. Existing coin/motor/bed interaction sounds retained.
- **10. Super Schlooper Bubble Blower** — Whole machine stays on g0. Only bubble layers 4–9 animate; baked hoses are not drawn twice. Fixed scene bounds reserve bubble headroom and prevent clipping or camera changes.
- **11. ToroTec Mechanical Bull** — Use only the three poses with a bull (0,1,2,1); never the empty-mount frame 3. Smooth rhythmic loop and constant scale.
- **13. Vintage "Hula Girl" Dancing Lamp** — Switch-on sound/lighting once; hula dancer loops indefinitely while the timer runs. Fixed shade and base; Pause/Resume does not replay activation.
- **14. "Manila 1000" Marine Aquarium** — Running aquarium audio loops for the running timer.
- **15. WhirlWizard Hot Tub** — Running water audio loops continuously, including clicks. No duplicated snow/decoration layer; original rim remains fixed.
- **15. Niagara Love Tub** — Running water audio loops continuously, including clicks. No duplicated snow/decoration layer; original rim remains fixed.
- **15. Redwood Hot Tub** — Running water audio loops continuously, including clicks. No duplicated snow/decoration layer; original rim remains fixed.
- **15. Jewel in the Crown Spa Tub** — Running water audio loops continuously, including clicks. No duplicated snow/decoration layer; original rim remains fixed.
- **16. The Wet and Twisted** — Splash only on activation/click. No diving-board bounce event.
- **17. Fancee Phone** — The phone booth stays on one fixed base pose while ringing/answering audio plays. No second booth layer, stretching roof or lifted duplicate.
- **18. Aquatic Playhouse** — Cabin and door stay fixed on state 0, with no duplicate default parts. Scuba machinery audio loops.
- **19. Petra Pietra Memorial Fountain** — Only night states 4–7 are used, including idle and coin interaction. Water moves without switching day/night lighting.
- **20. WhisperSteam Personal Steamer** — Only native door geometry replaces the moving area; the body never morphs. Steam audio loops after the door sequence.
- **21. Ponce de Leon Tub** — Mud layers 0–5 rise from low to high; brown fill stream only during startup. Mud is clipped to the inside opening and behind the native tap/towel. Mud sounds replace the milky-water clips.
- **23. Deluxe "Air-Puft" Candy Floss Cart** — Solid cylinder/dome layers 1 and 2 removed. Thin floss layers spin, fitted and clipped inside the bowl behind the support post.
- **24. EverAfter Crafter** — Fixed machine/table and constant scene scale. Only the small blue rotor component cycles; no full-frame zoom from changing overlay bounds.
- **25. Eyrie Dragon Egg** — A single baked egg and cradle sway gently as one rigid bitmap. No duplicate shell, headphones or broken-shell overlay.
- **27. Old-Fashioned Butter Churn** — Barrel, lid, table and cup stay fixed. Only one visible dasher moves down/up, clipped at the lid so its hidden shaft cannot draw over the barrel.
- **28. Pops O' Corn Deluxe Stand** — Only popcorn heap layers 0–2 animate inside the glass. Burst/ring layers 3–4 and already-baked serving cups 5 are not added.
- **29. The Bostonian Fireplace** — Match and metallic ignition/grate event play once each. A longer supplied burning-fire excerpt loops afterward, with a crossfaded seam.

The TransLight Bar Station also keeps its visible counter on click: its second exported graphic is empty.

These are authored prototype sequences, not recovered game script timings. Durations remain editable.
