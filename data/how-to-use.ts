/** Section within a how-to guide article. */
export type HowToGuideSection = {
  heading: string;
  paragraphs: string[];
};

/** Shared hero art paths for `/support/guides/[id]` (see `public/images/hero/`). */
export const guideHeroImages = {
  main: "/images/hero/hero-main.jpeg",
  adhesive: "/images/hero/Tiles-adhesive-heroimage.jpeg",
  epoxy: "/images/hero/Epoxy grouting-heroimage.jpeg",
  block: "/images/hero/block-joining-montar-heroimage.jpeg",
  cleaner: "/images/hero/tileCleaner-heroImage.jpeg",
  spacer: "/images/hero/tilesSpacer-heroImage.jpeg",
  pu: "/images/hero/pu-fixo-999-heroimage.png",
} as const;

/** Article-style how-to entries used on Support (written help; optional media can be added later per guide). */
export interface HowToGuideEntry {
  id: string;
  title: string;
  description: string;
  category:
    | "adhesives"
    | "grout"
    | "cleaning"
    | "safety"
    | "stone"
    | "glass-block";
  /** Hero background for the guide detail page. */
  heroImage: string;
  /** Full article body for `/support/guides/[id]`. */
  sections: HowToGuideSection[];
  /** Optional closing bullets. */
  takeaways?: string[];
}

export const howToGuides: HowToGuideEntry[] = [
  {
    id: "v1",
    title: "Mixing FIXONEX adhesive for a strong, even bed",
    description:
      "How to achieve a homogeneous mix, manage open time on warm days, and avoid over-retempering on site.",
    category: "adhesives",
    heroImage: guideHeroImages.adhesive,
    sections: [
      {
        heading: "Why the first mix sets the tone",
        paragraphs: [
          "Tile adhesive is only as trustworthy as the bed you place. A streaky mix, the wrong water ratio, or a batch that sat too long before trowelling shows up as hollow sound, poor transfer, or callbacks after traffic starts.",
          "FIXONEX lines ship with declared usage — start from the bag label and the product page for your range. This guide is about discipline on the bucket, not replacing that sheet.",
        ],
      },
      {
        heading: "Ratios, sequence, and avoiding dry clumps",
        paragraphs: [
          "Add powder to clean water (unless the label specifies otherwise) in the order and ratio written for that SKU. Under-watering leaves dry pockets; over-watering weakens the matrix and steals open time.",
          "Mix mechanically for the time the sheet suggests — usually until the mass is uniform, creamy, and free of lumps. Scrape the sides and bottom of the pail once; a second short mix after a short stand-in period is fine only if the system allows slake.",
        ],
      },
      {
        heading: "Open time on warm days and in sunlight",
        paragraphs: [
          "Temperature and draught accelerate skinning. Use smaller batches when the slab or the air is hot; keep mixed material shaded and close to the lay zone.",
          "If the surface starts to film or the rake drags, do not splash water or fold dry powder on top — discard and remix. Retempering past what the manufacturer allows is a common source of erratic set and weak bond.",
        ],
      },
      {
        heading: "What good looks like before you trowel",
        paragraphs: [
          "The mix should move cleanly off the trowel without separating or slumping. If you are spreading large-format tile, transfer checks on the back of the tile will tell you more than the bucket ever could — plan those early in the day.",
        ],
      },
    ],
    takeaways: [
      "One reliable batch beats three rushed ones.",
      "Skin in the pail means a new batch — not more water.",
      "Match batch size to temperature and crew speed.",
    ],
  },
  {
    id: "v2",
    title: "Choosing trowel size and checking coverage",
    description:
      "Why notch size matters for large-format tile and how to verify transfer to the back of the tile.",
    category: "adhesives",
    heroImage: guideHeroImages.adhesive,
    sections: [
      {
        heading: "Notch depth and tile geometry",
        paragraphs: [
          "The trowel leaves ridges that collapse when you beat the tile in. Larger, heavier, or more cupped tiles need deeper notches and often a different spread pattern — sometimes back-buttering is part of the system, not an optional extra.",
          "If the product page or specifier calls for a minimum bed thickness, the trowel choice has to deliver that after compression, not before.",
        ],
      },
      {
        heading: "Direction and air relief",
        paragraphs: [
          "Comb ridges in straight passes so air has a path out. Random swirling looks fine until you lift a test tile and see voids at the corners.",
          "For big panels, work to the manufacturer’s direction on short vs long side first — the goal is full support without trapped air.",
        ],
      },
      {
        heading: "Lift-and-check on real tile",
        paragraphs: [
          "Periodically lift a freshly bedded tile before the material skins. You want coherent transfer across the back — cold spots mean more beat-in, more adhesive, or a change in notch geometry.",
          "Log the combination that worked (substrate, trowel, beating method) when the room conditions repeat — crews move faster with a recipe than with guesswork.",
        ],
      },
    ],
    takeaways: [
      "The right notch is the one that fills the back after beat-in.",
      "Lift-and-check beats arguing after the grout goes in.",
      "Large format rewards systematic spreading, not speed alone.",
    ],
  },
  {
    id: "v3",
    title: "Grouting commercial floors without panic",
    description:
      "Joint packing, wash timing, and protection of adjacent trades during grout cure windows.",
    category: "grout",
    heroImage: guideHeroImages.epoxy,
    sections: [
      {
        heading: "Staging before you open the pail",
        paragraphs: [
          "Commercial floors mean traffic pressure, parallel trades, and tight windows. Walk the route: lighting, power for wash water, and who owns the corridor while grout is fresh.",
          "Confirm grout colour, joint width, and that the adhesive cure stage matches what the grout manufacturer expects for that system.",
        ],
      },
      {
        heading: "Packing joints for uniformity",
        paragraphs: [
          "Work diagonal to joints where you can, and pack fully — partially filled joints show under light and grind on durability.",
          "On long runs, divide the floor into working lengths you can wash inside the product’s working time. Nothing hurts finish quality like grout that stiffened before the sponge pass.",
        ],
      },
      {
        heading: "Wash discipline and haze control",
        paragraphs: [
          "Use clean water and frequent sponge rinses; dirty water drags fines back into the joint face. Angle the sponge to pull residue off the tile without digging grout out of the joint.",
          "If the site demands multiple stages, label edges where wet grout is still curing — tape and signage save shoes and reputations.",
        ],
      },
      {
        heading: "Protecting cure from other trades",
        paragraphs: [
          "Document when grout can take light foot traffic and when waterproofing or sealers may begin. Most arguments on site start when those two calendars overlap without a written handoff.",
        ],
      },
    ],
    takeaways: [
      "Match working section size to wash speed.",
      "Clean water is cheaper than re-wash or acid calls.",
      "Post cure timing where everyone can see it.",
    ],
  },
  {
    id: "v4",
    title: "Epoxy grout: teamwork and cleanup",
    description:
      "Working in teams, pot life awareness, and safe handling during application.",
    category: "grout",
    heroImage: guideHeroImages.epoxy,
    sections: [
      {
        heading: "Epoxy is a system, not a hurry-up cement grout",
        paragraphs: [
          "Two-part kits have a mix sequence, a working time, and a cleanup window that do not forgive improvisation. Read the card for the exact line you opened — part ratios vary by SKU.",
          "Assign roles before the first mix: one person mixing and feeding material, another packing and tooling — solo work on long epoxy runs almost always crosses pot life.",
        ],
      },
      {
        heading: "Mixing and pot life",
        paragraphs: [
          "Scrape sides and floors of the pail; incomplete incorporation leaves soft spots that never harden properly. In warm rooms, use shallow trays and smaller batches so the mass does not flash-cure in the bucket.",
          "When the product starts to drag or heats up uncomfortably, stop spreading — fresh batch, new timing.",
        ],
      },
      {
        heading: "Cleanup and skin protection",
        paragraphs: [
          "Epoxy residues bond aggressively. Keep compatible cleaners on hand and protect polished stone or sensitive metals the sheet warns about. Gloves and eye protection are baseline — set the example for helpers.",
          "Ventilate as required; reactive chemistry in a closed stairwell is a bad trade-off for ten minutes saved.",
        ],
      },
    ],
    takeaways: [
      "Team size matches the pot life, not the ego.",
      "Incomplete mix shows up as soft joints — not always immediately.",
      "Cleanup inside the window beats mechanical removal later.",
    ],
  },
  {
    id: "v5",
    title: "Cleaning after install without bringing haze back",
    description:
      "Balancing grout cure protection with timely haze removal using FIXONEX cleaners.",
    category: "cleaning",
    heroImage: guideHeroImages.cleaner,
    sections: [
      {
        heading: "Haze is timing as much as chemistry",
        paragraphs: [
          "Some haze lifts with a light damp pass once grout has gained strength; other films need a dedicated cleaner after the joint is hard enough to defend. The wrong early aggression loosens joints; waiting too long bonds haze like varnish.",
          "Always align with the grout and tile manufacturer’s guidance for that surface — sensitive stone and honed finishes have narrower windows than glazed porcelain.",
        ],
      },
      {
        heading: "Working clean during the job",
        paragraphs: [
          "Change wash water before it turns muddy. Flip sponges and dump buckets on a rhythm — tired water redeposits fines that become tomorrow’s complaint.",
          "Keep foot traffic off routes until you are satisfied with the first-pass clean; grinding grit into fresh joints makes haze removal feel endless.",
        ],
      },
      {
        heading: "Using FIXONEX cleaners responsibly",
        paragraphs: [
          "Choose the cleaner matched to your residue: cement, epoxy, or general post-install film. Pre-wet when the label says so; dwell times exist for a reason.",
          "Test a sacrificial corner or loose tile when aesthetics are unforgiving. Document what worked — future phases on the same stone species should repeat that protocol.",
        ],
      },
    ],
    takeaways: [
      "Dirty water is a haze factory.",
      "Match cleaner chemistry to residue type.",
      "When unsure, test small before you commit the floor.",
    ],
  },
  {
    id: "v6",
    title: "Safety basics on site",
    description:
      "Baseline site safety expectations when mixing powders, using epoxies, or applying PU systems.",
    category: "safety",
    heroImage: guideHeroImages.main,
    sections: [
      {
        heading: "PPE and posture",
        paragraphs: [
          "Powders irritate eyes and lungs; epoxies and PU components irritate skin. Minimum baseline: gloves, eye protection, and footwear that belongs on a wet site — not office trainers borrowed for a photo.",
          "Train helpers before the bucket spins: where wash water is, where the SDS pack lives, and who calls for medical help if someone reacts.",
        ],
      },
      {
        heading: "Ventilation and storage",
        paragraphs: [
          "Open bags and mix downwind of occupied spaces when you can. In basements and service shafts, mechanical airflow beats hope.",
          "Stack bags off damp slabs; seal partials as the label dictates. Chemical kits belong closed, labelled, and away from sun and confusion.",
        ],
      },
      {
        heading: "Waste and housekeeping",
        paragraphs: [
          "Empty packs go to site waste rules — never into domestic bins if the SDS says otherwise. Mop spills before they become slip films; label buckets so “water” is never ambiguous.",
        ],
      },
    ],
    takeaways: [
      "SDS and label win over habit.",
      "Ventilation is part of the install, not an afterthought.",
      "Neat sites make fewer emergency calls.",
    ],
  },
  {
    id: "v7",
    title: "Screeds and substrates: when the floor is ready to tile",
    description:
      "Moisture, strength, flatness, and cure stage — the checks that stop tile from bonding to a slab that is still busy drying or moving.",
    category: "adhesives",
    heroImage: guideHeroImages.adhesive,
    sections: [
      {
        heading: "Strength, cure, and a surface that accepts bond",
        paragraphs: [
          "Tile adhesive bonds to what is in front of it. A friable skim, dusty power-float, or weak repair patch will fail even when the notching looks perfect.",
          "Confirm the structural slab or screed met its design strength and that any topping has cured per the producer — green screeds trap moisture and alkalis under the assembly.",
        ],
      },
      {
        heading: "Flatness versus tile size",
        paragraphs: [
          "Large-format tile amplifies uneven backgrounds: you will chase hollow spots or excess adhesive just to get a flush face. Flatten to the tolerance the tile producer states before you commit adhesive.",
          "Do not rely on thick buttering to correct a bowl in the floor unless the system explicitly allows it — that is a specification decision, not a field shortcut.",
        ],
      },
      {
        heading: "Moisture and commissioning",
        paragraphs: [
          "New construction often schedules tiling before the building has reached equilibrium. RH tests and manufacturer commissioning steps exist so you do not seal damp into a sand-cement bed.",
          "If radiant heat is involved, commission heating cycles per guidance before adhesive goes down; rushing temperature ramps stresses both slab and set.",
        ],
      },
    ],
    takeaways: [
      "Bond to a clean, strong, dimensionally stable plane.",
      "Flatness is part of the tile scope, not only the screed scope.",
      "Measure moisture — argue with numbers, not guesswork.",
    ],
  },
  {
    id: "v8",
    title: "Tile-on-tile: when it works and how to prep",
    description:
      "Sound existing tile, keyed surfaces, interface with drains, and adhesive choice for overlays — without pretending every old floor is a suitable substrate.",
    category: "adhesives",
    heroImage: guideHeroImages.adhesive,
    sections: [
      {
        heading: "Survey the existing assembly",
        paragraphs: [
          "Tap for drummy spots, scan for cracked or debonded modules, and look at movement history — if the old installation failed, an overlay inherits that story.",
          "Identify epoxy vs cement grout and any membranes already present; your new system has to respect what is trapped underneath.",
        ],
      },
      {
        heading: "Surface prep that earns adhesive",
        paragraphs: [
          "Degrease, remove wax or sealers, and abrade glazed faces enough that scratch tests show mechanical tooth without shattering old joints.",
          "Feather height changes at thresholds; long transitions beat abrupt steps that telegraph through thin tile.",
        ],
      },
      {
        heading: "Product and trowel strategy",
        paragraphs: [
          "Choose an adhesive class rated for tile-on-tile in your exposure; back-buttering may be required when the overlay is heavy or the old grid is irregular.",
          "Plan movement accommodation early — overlays still need sensible joints and perimeters even when the field looks continuous.",
        ],
      },
    ],
    takeaways: [
      "No overlay on a failed under-layer.",
      "Gloss without scratch is not a bond surface.",
      "Class and exposure come from data sheets, not habit.",
    ],
  },
  {
    id: "v9",
    title: "Movement joints, perimeters, and field pattern",
    description:
      "Where soft joints belong, how they relate to big rooms and facades, and why grout colour never replaces structural accommodation.",
    category: "adhesives",
    heroImage: guideHeroImages.spacer,
    sections: [
      {
        heading: "What movement joints are for",
        paragraphs: [
          "Buildings flex, shrink, and expand. Rigid tile fields without planned breaks translate that strain into cracked glaze, sheared beds, or tenting at corners.",
          "Your detail set should line up with structural joints in the slab or wall — cosmetic caulk cannot carry that duty if alignment is ignored.",
        ],
      },
      {
        heading: "Perimeter and service penetrations",
        paragraphs: [
          "Leave consistent perimeter softness where tile meets restraining elements — tubs, frames, columns, and parapets all deserve a break compatible with sealant spec.",
          "Pipe and inspection covers should not lock rigid 600×1200 panels into unforgiving crosses without a relief strategy.",
        ],
      },
      {
        heading: "Field layout versus joint spacing",
        paragraphs: [
          "Stagger patterns do not replace engineered movement spacing; they only change where the eye reads the grid.",
          "Document joint locations for maintenance — future trades need to know where silicone transitions live before they drill or anchor.",
        ],
      },
    ],
    takeaways: [
      "Align tile joints with real building joints.",
      "Perimeter restraint equals perimeter relief.",
      "Layout drawings should show movement, not only beauty.",
    ],
  },
  {
    id: "v10",
    title: "Waterproofing and cementitious adhesive: sequencing",
    description:
      "Cure windows, compatibility, flood testing, and not turning a membrane into a confused sandwich of half-dry layers.",
    category: "adhesives",
    heroImage: guideHeroImages.adhesive,
    sections: [
      {
        heading: "System not coincidence",
        paragraphs: [
          "Liquid or sheet membranes, shower niches, and horizontal decks each have cure, lap, and reinforcement rules. Tile adhesive is the next layer, not a substitute for missing laps.",
          "Verify that your chosen FIXONEX adhesive is listed compatible with the membrane chemistry you installed — cross out risky pairings before tiling starts.",
        ],
      },
      {
        heading: "Flood tests and dry film",
        paragraphs: [
          "Hold flood duration where the waterproofing producer requires it; photograph plugs and drains before you cover them.",
          "Tiling on tacky films or while solvents flash off invites bond uncertainty — respect open time and recoat rules on both sides of the membrane.",
        ],
      },
      {
        heading: "Penetrations and upturns",
        paragraphs: [
          "Sequencing clips, bonding flanges, and curb upturns before large field tile reduces the chance of puncture during beat-in.",
          "Keep repair kits from the membrane producer on site until final sign-off — small nicks caught late are expensive drama.",
        ],
      },
    ],
    takeaways: [
      "Membrane curing is part of the critical path.",
      "Compatibility is written — not assumed.",
      "Test before tile whenever the spec demands it.",
    ],
  },
  {
    id: "v11",
    title: "Heat, cold, and storage: keeping powder honest",
    description:
      "Bag storage, winter pours, summer open time — environmental discipline so the product in the wall matches the product in the lab test.",
    category: "adhesives",
    heroImage: guideHeroImages.adhesive,
    sections: [
      {
        heading: "Warehouse to truck to site",
        paragraphs: [
          "Elevate pallets off damp slabs, keep roofs weather-tight, and rotate stock so older batch codes leave first — segregated QCs matter on demanding jobs.",
          "A bag that saw monsoon humidity followed by oven heat can lump-clog; if texture feels wrong, do not bet the floor on it.",
        ],
      },
      {
        heading: "Working temperature bands",
        paragraphs: [
          "Every line sets minimum substrate and ambient limits; below that, cure chemistry and bond development drift. Use approved heaters or shift work windows instead of hoping.",
          "In extreme heat, smaller mixes and shaded staging beat one heroic bucket that skins while someone hunts a missing wedge.",
        ],
      },
      {
        heading: "Rain, wind, and facades",
        paragraphs: [
          "Facades combine wind-blown dust and rapid surface drying — pre-wetting rules exist so thirsty backgrounds do not steal water from fresh bed.",
          "Protect open lifts overnight; dew on uncured beds can surprise you with mottled cure if drainage is poor.",
        ],
      },
    ],
    takeaways: [
      "Store like food you care about — dry, cool, rotated.",
      "Environmental limits are stop signs, not suggestions.",
      "Adjust batch size to the weather you actually have.",
    ],
  },
  {
    id: "v12",
    title: "PU systems: metering, temperature, and honest open time",
    description:
      "Two-part FIXONEX PU needs exact metering — especially on walls and detail lines where rework hurts.",
    category: "adhesives",
    heroImage: guideHeroImages.pu,
    sections: [
      {
        heading: "Ratio and mix integrity",
        paragraphs: [
          "Meter base and hardener exactly; partial kits invite proportion drift that shows up as uneven cure or surface tack days later.",
          "Use the mixing paddle, speed, and time the technical data sheet states — folded streaks mean weak lanes in the bead.",
        ],
      },
      {
        heading: "Surface contact and priming",
        paragraphs: [
          "Bond breakers like dust, release agents, or incompatible sealers must be stripped per compatibility tables. PU is tenacious when it finds clean mechanical contact.",
          "Primers exist to normalize porosity — skipping them on marginal backgrounds is betting against the odds.",
        ],
      },
      {
        heading: "Guns, nozzles, and waste discipline",
        paragraphs: [
          "Nozzle geometry sets bead shape; swap tips rather than fighting profile with hand tooling unless the detail permits it.",
          "Plan purge waste and empty cartridges — let hardened tips become someone else’s blockage.",
        ],
      },
    ],
    takeaways: [
      "Measure parts like a pharmacist, not a cook.",
      "Incomplete mix fails quietly first, loudly later.",
      "Substrate prep is cheaper than cartridge archaeology.",
    ],
  },
  {
    id: "v13",
    title: "Block joining mortar: courses, joints, and protection",
    description:
      "Consistent bed thickness, perpend alignment, and protecting fresh work from weather so walls read plumb when finishes arrive.",
    category: "adhesives",
    heroImage: guideHeroImages.block,
    sections: [
      {
        heading: "Mix and staging on vertical work",
        paragraphs: [
          "Block joining benefits from mixes that are stiff enough to support the unit but wet enough to wet the webs — follow the listed water band.",
          "Stage platforms so you are not reaching across fresh beds; vibration travels through hollow block in ways flat-floor crews forget.",
        ],
      },
      {
        heading: "Course rhythm and tooling",
        paragraphs: [
          "Tool joints while the mortar is thumb-print firm if you need a profile; raking too early pulls fines and weakens the joint face.",
          "Align perpends as you rise — small cumulative drift becomes expensive veneer correction.",
        ],
      },
      {
        heading: "Weather protection",
        paragraphs: [
          "Sheeting that diverts driving rain beats hoping cement hydrates fairly through a storm.",
          "Hot wind strips moisture from beds on exposed elevations — consider timing pours or light misting only if the system allows.",
        ],
      },
    ],
    takeaways: [
      "Vertical beds punish sloppy water discipline.",
      "Protect fresh work from weather you cannot control.",
      "Alignment is cumulative — check every lift.",
    ],
  },
  {
    id: "v14",
    title: "Joint width, spacers, and controlling lippage",
    description:
      "Why nominal joint width matters for large tile, grout performance, and how wedges interact with flatness tolerances.",
    category: "adhesives",
    heroImage: guideHeroImages.spacer,
    sections: [
      {
        heading: "Joint width is a system input",
        paragraphs: [
          "Grout manufacturers specify minimum widths for a reason — too narrow a joint invites cracking, pinholes, and difficult packing on fast-setting grouts.",
          "Tile curvature interacts with narrow joints; two inflated units meeting edge-on telegraph as lippage even when flatness looked fine on paper.",
        ],
      },
      {
        heading: "Spacers versus wedges",
        paragraphs: [
          "Cross spacers suit many wall grids; clip-and-wedge systems help manage bow across large faces — choose what the tile producer endorses.",
          "Pull spacers on schedule so grout does not key around plastic that should have left the joint.",
        ],
      },
      {
        heading: "Checking plane as you go",
        paragraphs: [
          "Straightedges and readable lighting catch lippage before grout locks it in. Agree tolerances with the client early so subjective arguments do not arrive at handover.",
        ],
      },
    ],
    takeaways: [
      "Respect minimum joint width from grout guidance.",
      "Spacers are disposable — schedule removal.",
      "Flatness plus bow control beats hope alone.",
    ],
  },
  {
    id: "v15",
    title: "Natural stone: white bed, moisture, and mock-ups",
    description:
      "Why translucent stone punishes grey cement, how moisture transport shows as staining, and when a wall sample saves a contract.",
    category: "stone",
    heroImage: guideHeroImages.adhesive,
    sections: [
      {
        heading: "Colour of the adhesive matters",
        paragraphs: [
          "Light marbles and limestones can telegraph cement tone or transport alkalis that shift appearance — use white or specialist stone adhesives the stone supplier blesses.",
          "Grey beds under light stone are not automatically wrong, but they are never casual — document acceptance if anyone insists.",
        ],
      },
      {
        heading: "Moisture paths",
        paragraphs: [
          "Some stones arrive resin-reinforced or waxed; others drink water from the bed. Understand what you are fixing before you flood a mock-up panel.",
          "Exterior or continual wet service amplifies risk — match adhesive class, membrane, and grout as a trio, not isolated SKUs.",
        ],
      },
      {
        heading: "Mock-up discipline",
        paragraphs: [
          "Install a representative panel with final lighting, clean it as you will in service, and photograph baseline gloss before occupancy abuse begins.",
          "Sign-off protects everyone — especially when aesthetics are the currency of payment.",
        ],
      },
    ],
    takeaways: [
      "Stone supplier + adhesive sheet + mock-up = one decision.",
      "White bed for cautious aesthetics is cheaper than lawyers.",
      "Photograph the mock-up — memory fades.",
    ],
  },
  {
    id: "v16",
    title: "Aggressive cleaning: choosing grout and seal that survive chemistry",
    description:
      "Kitchens, healthcare, and industrial floors where daily chemistry is harsher than household detergent — plan grout class and maintenance together.",
    category: "grout",
    heroImage: guideHeroImages.epoxy,
    sections: [
      {
        heading: "List the actual cleaners in use",
        paragraphs: [
          "Marketing words like “heavy duty” do not substitute for pH ranges and dwell times your client will run nightly.",
          "Epoxy and specialist cementitious grouts exist for different chemical signatures — match the tested system, not the colour chip alone.",
        ],
      },
      {
        heading: "Adhesive compatibility",
        paragraphs: [
          "Repeated flooding at perimeters can challenge adhesive toes even when grout holds — detail coves and sealant transitions with maintenance in mind.",
          "Transition strips and drain grates see concentrated scrubbing — expect wear there first.",
        ],
      },
      {
        heading: "Training cleaners, not only installers",
        paragraphs: [
          "Turnover on night crews means written wall charts beat tribal knowledge. List dwell limits so enthusiastic brushing does not become abrasive damage.",
        ],
      },
    ],
    takeaways: [
      "Specify for the chemistry that will exist in service.",
      "Grout and adhesive are a maintenance pair.",
      "Write cleaning limits where night staff can see them.",
    ],
  },
  {
    id: "v17",
    title: "Pools, tanks long immersion: cure choreograph",
    description:
      "Sequence adhesive cure, grout cure, flood scheduling, and chemical startup so the tank does not earn its water prematurely.",
    category: "grout",
    heroImage: guideHeroImages.epoxy,
    sections: [
      {
        heading: "Documentation stack",
        paragraphs: [
          "Collect adhesive class, grout type, membrane approvals, and tile producer limits in one submittal — immersion jobs fail at interfaces, not in the middle of a field tile.",
          "Flood startup chemistry (chlorination, pH targets) interacts with young cementitious materials — follow commissioning tables.",
        ],
      },
      {
        heading: "Cure before water",
        paragraphs: [
          "Rushing flood tests or early filling traps incomplete hydration in beds and can bloom salts at joints.",
          "Temperature swings in empty shells stress green assemblies — ventilate and shade on schedule.",
        ],
      },
      {
        heading: "Access for future maintenance",
        paragraphs: [
          "Detail sumps, lights, and penetrations so a maintenance diver or tech is not chiseling blind. Immersion environments reward forethought.",
        ],
      },
    ],
    takeaways: [
      "Immersion is a commissioning job, not only a tiling job.",
      "Water waits on cure evidence, not calendar guesswork.",
      "Interfaces drown first — detail them obsessively.",
    ],
  },
  {
    id: "v18",
    title: "Tenders, batches, and data packs that specifiers actually use",
    description:
      "How to request declarations, lot tracking, and coherent submittals so site receives what the design assumed.",
    category: "safety",
    heroImage: guideHeroImages.main,
    sections: [
      {
        heading: "What belongs in a submittal",
        paragraphs: [
          "Product name, declared standard, colour/variant, mix ratio reference, and limitations — if it is not in the PDF, the reviewer assumes optimism.",
          "Link each SKU to a drawing zone or room type so substitution debates have addresses.",
        ],
      },
      {
        heading: "Batch and shelf life on serious jobs",
        paragraphs: [
          "Large pours sometimes warrant sequential batch planning; note production dates on delivery dockets and align with manufacturer retention samples if the contract requires.",
          "Partial bags should not re-enter critical path work unless the system explicitly allows repack stability.",
        ],
      },
      {
        heading: "Channels and accountability",
        paragraphs: [
          "Authorized dealers simplify traceability — grey market wins on price and loses on paperwork exactly when an auditor appears.",
          "When something drifts (colour, set time), the trail from batch to bag speeds root cause — protect the trail.",
        ],
      },
    ],
    takeaways: [
      "Submittals sell reality — fluff invites RFIs.",
      "Batch discipline is risk management.",
      "Buy through channels that answer the phone at 7 p.m.",
    ],
  },
];

export const usageSteps = [
  {
    step: 1,
    title: "Read the sheet before the bucket",
    body: "Know your surface limits, mix ratio, and temperature window—so the first batch is not a gamble.",
  },
  {
    step: 2,
    title: "Prep like you mean it",
    body: "Clean, sound, and flat enough for the tile size. Prime only when the system says so.",
  },
  {
    step: 3,
    title: "Mix and stage sensibly",
    body: "Full-bag discipline where required, steady water, and materials close enough that mixed product does not sit idle.",
  },
  {
    step: 4,
    title: "Protect fresh work",
    body: "Traffic, water, and other trades should wait their turn—rushing cure stages invites callbacks.",
  },
];

export const safetyNotes = [
  "Wear gloves and eye protection when handling powders and chemical kits.",
  "Ventilate enclosed rooms—especially with reactive products.",
  "Keep bags and pails off damp floors; seal part-used packs as the label says.",
  "Keep children and untrained people away from mixing areas.",
  "Dispose of empty packs responsibly; never repurpose food containers.",
];
