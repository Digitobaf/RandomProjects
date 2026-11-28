# Per-object animation and sound review

All 100 picks remain. These are authored, editable prototype recipes, not recovered BHAV timings. Current fixes supersede the first mockup’s provisional combinations. See ANIMATION-FIXES.md for the request-by-request changes.

## "Andersonville" Pedestal Sink

Basin-only rising water; fill sound and motion once, then water stays filled. No opaque full-sink water/suds frame.

Sounds: sink_washdishes, sink_washhands, tub1_sfaucetsqueak, sink_filling.

## Bachman Wood Beverage Bar

Open, pour, glass clink, then close; no unrelated drinking voices.

Sounds: bar_close, bar_glassclink, bar_open, bar_pourdrink.

## "Fountain of Tranquility"

One fixed fountain body with a water-only mask; no per-frame AI body textures.

Sounds: fountain_splash, fountain_tinkle.

## Gagmia Simore Espresso Machine

Lever lifts, grinder runs, steam follows, lever returns. Broken state excluded.

Sounds: coffee_expresso_steam, coffee_grind_loop.

## Moneywell Computer

Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.

Sounds: computer_boot_cheap, computer_game, computer_turn_off, computer_type.

## Poseidon's Adventure Aquarium

Only NE and NW rotations remain; NE is the starting view because SE was explicitly removed.

Sounds: aquarium_feed, aquarium_running.

## Positive Potential Microwave

Window glass uses native geometry; warm light is clipped inside the window with no shadow/glow bleed.

Sounds: microwave_sbeep, microwave_sclose, microwave_scook, microwave_sdone, microwave_sopen.

## Sani-Queen Bathtub

Only the water level/flow changes; one fill sequence with one fill clip, then a full still bath. No animated metal textures.

Sounds: tub1_sdrain, tub1_sfaucetsqueak, tub1_stubfill.

## SpaceMiser Shower

Door slides before faucet and running shower. Clothing stages are not invented as water animation.

Sounds: shower1_sdoorslide, shower1_sfaucetsqueak, shower1_swateron.

## The Brahma 2000

Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.

Sounds: computer_boot_mod, computer_game, computer_turn_off, computer_type.

## The Bostonian Fireplace

Match and metallic ignition/grate event play once each. A longer supplied burning-fire excerpt loops afterward, with a crossfaded seam.

Sounds: fireplace_off, fireplace_on, match_strike, fire_burning.

## WhirlWizard Hot Tub

Running water audio loops continuously, including clicks. No duplicated snow/decoration layer; original rim remains fixed.

Sounds: hottub_running.

## Wild Bill THX-451 Barbecue

Open lid, ignition, then hot grill and looping sizzle.

Sounds: barbecue_beinglit, barbecue_close, barbecue_open, barbecue_sizzlehot, barbecue_sizzleloop.

## Contempto Loveseat

Static sofa; a single appropriate upholstery creak only.

Sounds: sofa1_ssqueak.

## Justa Bathtub

Squeak, filling stream frames at rising water levels, then full bath. Drain descends on timer completion.

Sounds: tub1_sdrain, tub1_sfaucetsqueak, tub1_stubfill.

## NuMica Folding Card Table

Static table/display; place/get counter sounds only.

Sounds: counter_get_all, counter_put_all.

## Porcina Refrigerator Model P1g-S

All six supplied door states checked. No stocked variant or food-content layer exists in this export; retain the available interior.

Sounds: fridge_c_close, fridge_c_open, fridge_c_running.

## Sioux Sity Wicker Chair

Static chair, single sit sound, no fabricated rocking.

Sounds: chair_sit_unmovable.

## Egg Chair

Static chair, single sit sound, no fabricated rocking.

Sounds: chair_sit_unmovable.

## The Vibromatic Heart Bed

All appearances locked to the unoccupied made bed. Existing coin/motor/bed interaction sounds retained.

Sounds: bed_coindrop, bed_make, bed_vibrate.

## "Aquaqu" Inflatable Fun Chair

Static chair, single sit sound, no fabricated rocking.

Sounds: chair_sit_unmovable.

## "Biome" Inflatable Fun Chair

Static chair, single sit sound, no fabricated rocking.

Sounds: chair_sit_unmovable.

## "Magenti" Inflatable Fun Chair

Static chair, single sit sound, no fabricated rocking.

Sounds: chair_sit_unmovable.

## Super Schlooper Bubble Blower

Whole machine stays on g0. Only bubble layers 4–9 animate; baked hoses are not drawn twice. Fixed scene bounds reserve bubble headroom and prevent clipping or camera changes.

Sounds: bubblemaker_bubble.

## The Elegant Chef Buffet Table

Stocking then full buffet. Food portions are stages, never an endlessly looping animation.

Sounds: caterer_restock_pro.

## ToroTec Mechanical Bull

Use only the three poses with a bull (0,1,2,1); never the empty-mount frame 3. Smooth rhythmic loop and constant scale.

Sounds: bull_loop.

## Whether Vain Drink Dispenser

Open, pour, glass clink, then close; no unrelated drinking voices.

Sounds: bar_close, bar_glassclink, bar_open, bar_pourdrink.

## Vintage "Hula Girl" Dancing Lamp

Switch-on sound/lighting once; hula dancer loops indefinitely while the timer runs. Fixed shade and base; Pause/Resume does not replay activation.

Sounds: lamp_turnoff_click, lamp_turnon_click.

## "Manila 1000" Marine Aquarium

Running aquarium audio loops for the running timer.

Sounds: aquarium_running.

## "Toy With Me" Toy Display

Display corner graphic is a placement variant, not an animation. Shared plant/trash sounds omitted.

Sounds: none supplied/selected.

## Boggs Home Canning Center

Chop, then simmer; canning layers swap among working jar frames.

Sounds: fruit_chop, stove_bubble.

## Cheap Eats Counter

Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.

Sounds: none supplied/selected.

## Confectionomicon

Static table/display; place/get counter sounds only.

Sounds: counter_get_all, counter_put_all.

## Hot Dogz 2Go

Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.

Sounds: none supplied/selected.

## Kastle O’ Toys by Magical Mystery

Static table/display; place/get counter sounds only.

Sounds: counter_get_all, counter_put_all.

## Niagara Love Tub

Running water audio loops continuously, including clicks. No duplicated snow/decoration layer; original rim remains fixed.

Sounds: hottub_running.

## Reproduction Antique Bed

Bed gets in, holds sleeping appearance, then gets out; click makes the bed.

Sounds: bed_get_inout, bed_get_out, bed_make.

## Slush Queen Ice Cream Counter

Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.

Sounds: none supplied/selected.

## TransLight Bar Station

The second exported counter graphic is empty. Keep the visible counter while the interaction sounds play.

Sounds: counter_get_all, counter_put_all.

## AquaFluvium Shower-Tub

Squeak, filling stream frames at rising water levels, then full bath. Drain descends on timer completion.

Sounds: tub1_sdrain, tub1_sfaucetsqueak, tub1_stubfill.

## Chow Sum Phat Buffet

Stocking then full buffet. Food portions are stages, never an endlessly looping animation.

Sounds: caterer_restock_pro.

## Intui-Inuit Igloo Site

Static igloo sleep site; only get-in sound.

Sounds: bed_get_inout, bed_make.

## Redwood Hot Tub

Running water audio loops continuously, including clicks. No duplicated snow/decoration layer; original rim remains fixed.

Sounds: hottub_running.

## Sim Mars

Correct game start, screen cycle with music, hit on click, win on completion. Other arcade game sounds omitted.

Sounds: arcade_mars_music, arcade_mars_slap, arcade_mars_start, arcade_mars_win.

## Snack Stand

Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.

Sounds: none supplied/selected.

## ST2 - Barky's Revenge

Correct game start, screen cycle with music, hit on click, win on completion. Other arcade game sounds omitted.

Sounds: arcade_seal_music, arcade_seal_slap, arcade_seal_start, arcade_seal_win.

## The Wet and Twisted

Splash only on activation/click. No diving-board bounce event.

Sounds: pool_dvboard_bounce, pool_dvboard_splash.

## Whack-A-Will!

Music starts, target overlays alternate; click popup then hit, then popdown.

Sounds: waw_gameover, waw_hit_sfx, waw_music, waw_popdown, waw_popup.

## "Pasticcetera" Pastry Cart

Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.

Sounds: none supplied/selected.

## Ceti the Happy Whale

Whale body and base are components, not consecutive animation frames; both are composited.

Sounds: none supplied/selected.

## Fancee Phone

The phone booth stays on one fixed base pose while ringing/answering audio plays. No second booth layer, stretching roof or lifted duplicate.

Sounds: phone1_spickup, phone_dial, phone_hangup, phone_ring_pay, phone_ring_receiver.

## Fontleroy Shower Tub

Squeak, filling stream frames at rising water levels, then full bath. Drain descends on timer completion.

Sounds: tub1_sdrain, tub1_sfaucetsqueak, tub1_stubfill.

## Squeak-EE-Clean Pet Tub

Squeak, filling stream frames at rising water levels, then full bath. Drain descends on timer completion.

Sounds: tub1_sdrain, tub1_sfaucetsqueak, tub1_stubfill.

## Travelin' Joe's Espresso Bar

Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.

Sounds: none supplied/selected.

## Vegano Market Cart

Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.

Sounds: none supplied/selected.

## Aqua-Rich-ium

Six marine-aquarium frames. Running clip uses exported non-loop flag.

Sounds: aquarium_running.

## Aquatic Playhouse

Cabin and door stay fixed on state 0, with no duplicate default parts. Scuba machinery audio loops.

Sounds: scuba_loop.

## Galileo's Free-for-All

Fan rotor layers; motor starts, runs, then winds down on completion.

Sounds: skydive_loop_end, skydive_loop_lp, skydive_loop_start.

## Fruitally Perfect Smoothie Stand

Smoothie machine graphic sequence, no matching machine sound in export.

Sounds: none supplied/selected.

## Jewel in the Crown Spa Tub

Running water audio loops continuously, including clicks. No duplicated snow/decoration layer; original rim remains fixed.

Sounds: hottub_running.

## Petra Pietra Memorial Fountain

Only night states 4–7 are used, including idle and coin interaction. Water moves without switching day/night lighting.

Sounds: fountainhd_coin, fountainhd_loop.

## Semi-Seedy Lounge Table

Static table/display; place/get counter sounds only.

Sounds: counter_get_all, counter_put_all.

## Sushi Yatai

Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.

Sounds: none supplied/selected.

## WhisperSteam Personal Steamer

Only native door geometry replaces the moving area; the body never morphs. Steam audio loops after the door sequence.

Sounds: chair_recline, steamer_loop.

## Energize! Oxygen Bar

Keep structural/default stool layers; animate only oxygen tubing layer variants.

Sounds: oxybar_loop.

## Ponce de Leon Tub

Mud layers 0–5 rise from low to high; brown fill stream only during startup. Mud is clipped to the inside opening and behind the native tap/towel. Mud sounds replace the milky-water clips.

Sounds: mudbath_milsul_drain, mudbath_milsul_fill, mudbath_milsul_swish_a, mudbath_glubglop_a, mudbath_fill, mudbath_drain.

## Strangled Ebullience Wall

Five water-wall bubble frames; generic kinetic sculpture sound omitted.

Sounds: none supplied/selected.

## Wall-Mounted TV

Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.

Sounds: tv_exp_switch, tv_exp_turnoff, tv_exp_turnon.

## Trottco 27" Color Television B94U

Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.

Sounds: tv_c_switch, tv_c_turnoff, tv_c_turnon.

## Soma Plasma TV

Fixed casing/stand/keyboard; original native screen frames clipped to the display only, including power-on. Back views stay still.

Sounds: tv_exp_switch, tv_exp_turnoff, tv_exp_turnon.

## A Pressing Feeling

Press color/magic graphics with production layers and magic effect; no unrelated counter sounds.

Sounds: ch_shedskin_suc.

## Blind the Cyclops

Coin precedes cyclops game cycle. Hit on click, end sound on completion.

Sounds: cyclops_coin, cyclops_end, cyclops_hit, cyclops_loop.

## Deluxe "Air-Puft" Candy Floss Cart

Solid cylinder/dome layers 1 and 2 removed. Thin floss layers spin, fitted and clipped inside the bowl behind the support post.

Sounds: none supplied/selected.

## EverAfter Crafter

Fixed machine/table and constant scene scale. Only the small blue rotor component cycles; no full-frame zoom from changing overlay bounds.

Sounds: none supplied/selected.

## Faerie Mara's Odds and Ends

Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.

Sounds: none supplied/selected.

## Eyrie Dragon Egg

A single baked egg and cradle sway gently as one rigid bitmap. No duplicate shell, headphones or broken-shell overlay.

Sounds: asp_egg_loop, dragon_nest_hatch.

## Ghoulish Graveyard Gumbo

Serving pot overlay frames; no matching cooking clip exported.

Sounds: none supplied/selected.

## Madame Magyar's Gulyás Goulash

Serving pot overlay frames; no matching cooking clip exported.

Sounds: none supplied/selected.

## Midnight Mystery Canopy Bed

All appearances locked to the unoccupied made bed. Existing coin/motor/bed interaction sounds retained.

Sounds: bed_get_inout, bed_get_out, bed_make.

## Old-Fashioned Butter Churn

Barrel, lid, table and cup stay fixed. Only one visible dasher moves down/up, clipped at the lid so its hidden shaft cannot draw over the barrel.

Sounds: ex_machine_bar_down, ex_machine_bar_up.

## Pops O' Corn Deluxe Stand

Only popcorn heap layers 0–2 animate inside the glass. Burst/ring layers 3–4 and already-baked serving cups 5 are not added.

Sounds: fridge_get_snack, popcorn_make.

## Thermacotta Dual-Fuel Range

Gas ignition precedes simmer. Export has no lit graphic or separate flame layer.

Sounds: stove_bubble, stove_expensive_gason, stove_sstir.

## Wagon O' Wares

Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.

Sounds: none supplied/selected.

## A Sim's Guide to Cooking

Book opens in thirds, holds open. No page-turn sound was exported; counter events omitted.

Sounds: none supplied/selected.

## All Things Draconic

Static vendor/cart. No matching mechanical or ambience clip exported; unrelated/shared voices omitted.

Sounds: none supplied/selected.

## Awfully Fun House Coaster

Coaster base stays fixed; moving car/effect layers cycle. Generic sculpture and clown-fire events are unrelated and omitted.

Sounds: none supplied/selected.

## Clowning Around Mayhem Coaster

Coaster base stays fixed; moving car/effect layers cycle. Generic sculpture and clown-fire events are unrelated and omitted.

Sounds: none supplied/selected.

## The Mind of a Cereal Killer Coaster

Coaster base stays fixed; moving car/effect layers cycle. Generic sculpture and clown-fire events are unrelated and omitted.

Sounds: none supplied/selected.

## Private Villa Fountain

Five named villa water frames; fountain sound uses exported non-loop flag.

Sounds: fountain_tinkle.

## Thermae Caldarium

Squeak, filling stream frames at rising water levels, then full bath. Drain descends on timer completion.

Sounds: tub1_sdrain, tub1_sfaucetsqueak, tub1_stubfill.

## Miss Memo Sleeper

Bed gets in, holds sleeping appearance, then gets out; click makes the bed.

Sounds: bed_get_inout, bed_get_out, bed_make.

## The "Bunda"

Static chair, single sit sound, no fabricated rocking.

Sounds: chair_sit_unmovable.

## Garden Gnome

Gnome rests normally during the timer. Click triggers explosion frames and sound, then returns to intact gnome.

Sounds: gnome_explosion.

## Meal

Food remains a held meal, not a loop through portions/dirt levels. Eating sound on click only.

Sounds: meal_utinsels.

## Hamburger

Food remains a held meal, not a loop through portions/dirt levels. Eating sound on click only.

Sounds: food_snack_eat.

## Pizza Box

Closed, half open, open. Pizza portions never autoplay in a loop. Opening sound is a provisional association.

Sounds: pizza_gooey.

## Dolce Tutti Frutti Sofa

Static sofa; a single appropriate upholstery creak only.

Sounds: sofa1_ssqueak.

## Diving Board

Static exported board/slide; bounce precedes splash, no invented bend frames.

Sounds: pool_dvboard_bounce, pool_dvboard_splash.

## Doll House

Dollhouse has one static graphic. Repo/cop effects belong to shared NPC code and are omitted.

Sounds: none supplied/selected.

## Tyke Nyte Bed

Bed gets in, holds sleeping appearance, then gets out; click makes the bed.

Sounds: bed_get_inout, bed_get_out, bed_make.
