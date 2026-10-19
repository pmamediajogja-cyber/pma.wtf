// Brand poster concepts for men's hobby brands — auto-published by the
// @tugelanboto_ poster cron. Newest first.
// Images are hosted on Google Drive (public thumbnails); the cron uploads each
// new poster to the 'PMA.WTF - Brand Posters' folder and prepends an entry here.
const posters = [
  {
    id: 'neon-pulse',
    brand: 'NEON PULSE',
    niche: 'minimalist geometric monogram brand logo',
    tagline: 'WEAR THE CURRENT.',
    signs:
      'Angular cyan N = neon energy and precision; white pulse waveform = always-on creative current; black ground = nightlife tech aesthetic',
    image: 'https://drive.google.com/thumbnail?id=19MAYkEPyxyuIHmO9n5VV7Y0jyzc_-pVV&sz=w1080',
    date: '19 Oct 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'street-script',
    brand: 'STREET SCRIPT',
    niche: 'graffiti wildstyle brand logo',
    tagline: 'Paint it loud. Wear it proud.',
    signs:
      'SS wildstyle monogram = double-signature tag, chrome cyan fill = night-city spray chrome, gold hand-style wordmark = wall-piece authority, paint drips = wet-can rawness',
    image: 'https://drive.google.com/thumbnail?id=1-v7eGb8z02FrWAriIj9ukJI7mQBtSbTB&sz=w1080',
    date: '18 Oct 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'riot-stitch',
    brand: 'RIOT STITCH',
    niche: 'punk cut-and-paste brand logo',
    tagline: 'WEAR THE RIOT.',
    signs:
      'Safety pin = punk rebellion; torn stitched denim = DIY hand-made ethos; cut-paper wordmark = anti-establishment voice',
    image: 'https://drive.google.com/thumbnail?id=1vGJtVoLVNKEFbjilRvHf2cYz0C1Gg1gY&sz=w1080',
    date: '18 Oct 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'aurum-noir',
    brand: 'AURUM NOIR',
    niche: 'art-deco luxury brand logo',
    tagline: 'Wear The Golden Hour.',
    signs:
      'Golden sunburst = wealth and radiance; Symmetrical fan lines = art-deco order and discipline; Central star = the guiding north star of ambition; Deep black field = mystery and exclusivity; Serif wordmark = old-money authority',
    image: 'https://drive.google.com/thumbnail?id=1fE7SkiHpdITmp0-ZM4tlb-wd6qSQJFOq&sz=w1080',
    date: '18 Oct 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'neon-ronin',
    brand: 'NEON RONIN',
    niche: 'cyberpunk brand logo',
    tagline: 'wear the night.',
    signs:
      'ronin helmet = lone warrior discipline; neon circuitry = future-tech street culture',
    image: 'https://drive.google.com/thumbnail?id=1BdSN1ZOZCqwUXDfdBWkqHlo82xefsavN&sz=w1080',
    date: '17 Oct 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'tidebreak',
    brand: 'TIDEBREAK',
    niche: 'retro surf/skate brand logo',
    tagline: 'Ride the ordinary.',
    signs:
      'curling wave + sunburst = freedom and slow living; hand-drawn surf wordmark = 70s skate culture; sunset palette = warmth and optimism',
    image: 'https://drive.google.com/thumbnail?id=1QS3wTwauwwdOPdsuJ7pjt2PzLKrrXrd2&sz=w1080',
    date: '17 Oct 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'longhorn',
    brand: 'LONGHORN',
    niche: 'western rodeo brand logo',
    tagline: 'RIDE FREE.',
    signs:
      'engraved longhorn skull badge = rugged frontier spirit; vintage western typography = heritage rodeo culture',
    image: 'https://drive.google.com/thumbnail?id=1T2EP4VT7o5FO7b116h52uz1Wb6gbBCFI&sz=w1080',
    date: '16 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'voidborn',
    brand: 'VOIDBORN',
    niche: 'streetwear brand logo',
    tagline: 'DARK WEAR DIVISION.',
    signs:
      'cracked void-ring emblem = born from nothing/emptiness as identity; distressed gothic wordmark = dark underground attitude; bone-white on black = stark streetwear contrast',
    image: 'https://drive.google.com/thumbnail?id=1BViEdxw7IT6AssHwd27_chyHwbQ8xjiJ&sz=w1080',
    date: '16 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'last-bell',
    brand: 'LAST BELL',
    niche: 'boxing gym',
    tagline: 'EARN EVERY ROUND.',
    signs:
      'cracked leather heavy bag = rounds endured/the grind; hand-wrapped fist gripping chain = discipline & preparation/sacrifice; chalk dust + dawn light shafts = lonely early work before applause; sweat droplets = honest earned effort',
    image: 'https://drive.google.com/thumbnail?id=1IAO4SLrYhd7SwfRD1R96FZ9g87KCTH7Y&sz=w1080',
    date: '15 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'gridborn',
    brand: 'GRIDBORN',
    niche: 'sim racing rigs',
    tagline: 'CHASE THE LINE.',
    signs:
      'Triple glowing wraparound screens = total immersion, the line between real and virtual blurred; gloved hands on force-feedback wheel = earned skill, discipline of practice; dark room lit only by screen glow = night-racer sanctuary culture; steel rig frame and pedal set = engineered dedication; motion-blurred race car on the center screen = speed, the chase.',
    image: 'https://drive.google.com/thumbnail?id=15z63p-aCHROy2UYmJ6eOCGZgocUKJEsN&sz=w1080',
    date: '14 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'headfirst',
    brand: 'HEADFIRST',
    niche: 'motorcycle helmets',
    tagline: 'FEARLESS INSIDE.',
    signs:
      'battle-scarred shell = survived the road/proven protection; storm-reflecting visor = calm under pressure; carbon weave chin bar = engineered armor; rain droplets = defies the elements',
    image: 'https://drive.google.com/thumbnail?id=14jmHBXXfypx8IskzlNn-31ijOOHD27Qs&sz=w1080',
    date: '14 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'slowfire',
    brand: 'SLOWFIRE',
    niche: 'custom offset smokers & BBQ pits',
    tagline: 'PATIENCE HAS A FLAVOR.',
    signs:
      'blue smoke over glowing coals = patience as a craft; heat-worn gloved hand lifting glistening pepper-crusted brisket = earned mastery; macro pepper bark crust = reward of hours; offset smoker silhouette at pre-dawn = primal fire & self-reliance',
    image: 'https://drive.google.com/thumbnail?id=1_PaXRb_Aq90GbJn3FdXYr7o4vBj9MXiO&sz=w1080',
    date: '14 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'true-edge',
    brand: 'TRUE EDGE',
    niche: 'custom knives / bladesmith',
    tagline: 'SHARPENED BY PATIENCE.',
    signs:
      'damascus steel macro pattern, glowing forge fire, calloused hands honing the edge, walnut handle = layered craft & patience/tamed transformation/honest discipline/honest materials',
    image: 'https://drive.google.com/thumbnail?id=17RHjPeUNfft_YY5YrliwOb-yYdVpmdlx&sz=w1080',
    date: '13 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'firethroat',
    brand: 'FIRETHROAT',
    niche: 'racing exhaust systems',
    tagline: 'BREATHE FIRE.',
    signs:
      'heat-tempered titanium exhaust tip macro, flame burst from the mouth, heat shimmer, dark night pit-lane glow = metallurgy craft/engineered fire/tamed aggression/racing brotherhood',
    image: 'https://drive.google.com/thumbnail?id=1CvIBYNgjqaDZoT0T7iHOHQcx5iBHa2Tv&sz=w1080',
    date: '13 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'blackgold',
    brand: 'BLACKGOLD',
    niche: 'premium motorcycle engine oil',
    tagline: 'RUNS THROUGH FIRE.',
    signs:
      'macro golden oil pour = engineered purity & viscosity, glowing hot piston crown = tamed combustion fire, dark void = raw power, suspended droplets = molecular precision',
    image: 'https://drive.google.com/thumbnail?id=1ifezKNjXieeFQz89j-MsHLbn4jckDIpe&sz=w1080',
    date: '13 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'ferrobite',
    brand: 'FERROBITE',
    niche: 'performance brake systems',
    tagline: 'CONTROL IS SPEED.',
    signs:
      'glowing red-hot drilled brake disc = tamed raw power; macro forged caliper gripping slotted rotor = precision engineering; night circuit light trails = discipline under pressure; heat shimmer + motion blur = speed and adrenaline',
    image: 'https://drive.google.com/thumbnail?id=1cg232uCW7ExleJm8vf6LxWL4Lg7yMZFb&sz=w1080',
    date: '13 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'duskmud',
    brand: 'DUSKMUD',
    niche: 'overland adventure gear',
    tagline: 'OWN THE DUST.',
    signs:
      'mud-caked 4x4 on dusk desert trail, glowing rooftop tent, trailing dust plume = grit/terrain mastery/freedom/self-reliance/home anywhere',
    image: 'https://drive.google.com/thumbnail?id=1CD8u_lE0vr-snUIA0Hv8JBLaSredzN9U&sz=w1080',
    date: '12 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'steel-blade',
    brand: 'STEEL & BLADE',
    niche: "gentlemen's barbershop",
    tagline: 'SHARP NEVER RUSHES.',
    signs:
      'straight razor on leather strop, steam off folded towel, vintage barber chair, monochrome steel tones',
    image: 'https://drive.google.com/thumbnail?id=1S95r5mXIxgFL-PQaQtHofKQw437h-eIo&sz=w1080',
    date: '12 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'ironhide',
    brand: 'IRONHIDE',
    niche: 'motorcycle leather apparel',
    tagline: 'WEAR THE MILES.',
    signs:
      'cracked weathered leather = battle scars/years of road, brass zippers & rivets = rugged durability, storm-lit highway at dusk = lone freedom/call of the road, road-worn gloves gripping handlebar = mastery & control',
    image: 'https://drive.google.com/thumbnail?id=1QavsXfVGmfe9uKBKhEbrHPzhuHO-rNTP&sz=w1080',
    date: '12 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'chalkline',
    brand: 'CHALKLINE',
    niche: 'Strength Training Equipment',
    tagline: 'HEAVY IS HONEST.',
    signs:
      'Chalk dust in dawn light = raw honest effort; knurled chalk-caked barbell = grip & discipline; grimy garage window at dawn = early-grind brotherhood; weathered hands dusting chalk = blue-collar honesty.',
    image: 'https://drive.google.com/thumbnail?id=1i_UF8_4tOYhho03pQGtob98fZsxueeGa&sz=w1080',
    date: '12 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'deep-pull',
    brand: 'DEEP PULL',
    niche: 'Fishing Gear',
    tagline: "PULL ONLY WHAT'S WORTH IT.",
    signs:
      'Pre-dawn mist over dark emerald water = patience & stillness; weathered hand gripping a bent rod = seasoned experience; taut line at breaking tension = discipline & control.',
    image: 'https://drive.google.com/thumbnail?id=1CPHxUPbx5HSPG2RwcEJpZfe870_BKWdV&sz=w1080',
    date: '12 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'ironhour',
    brand: 'IRONHOUR',
    niche: 'Mechanical Watches',
    tagline: 'TIME, EARNED.',
    signs:
      'Macro exposed movement gears = precision; brass & oil tones = honest craft; brushed steel case = endurance; red jewel bearings = serious focus.',
    image: 'https://drive.google.com/thumbnail?id=1TYXhZgJJ92g_qyfoBa6XBznoSRP0V5oM&sz=w1080',
    date: '12 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'ember-and-oak',
    brand: 'EMBER & OAK',
    niche: 'Specialty Coffee Roasters',
    tagline: 'BURN BRIGHT, SIP SLOW.',
    signs:
      'Swirling espresso steam = ritual discipline; glowing embers + charred oak barrel = intensity of the roast; warm amber tungsten light = honest craft warmth.',
    image: 'https://drive.google.com/thumbnail?id=1Ep716Mc3jgNXr5xJTXdJl2wTJT8I8ocv&sz=w1080',
    date: '11 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'obsidian-detail',
    brand: 'OBSIDIAN DETAIL',
    niche: 'Auto Detailing Studio',
    tagline: 'MIRROR OR NOTHING.',
    signs:
      'Water beads on mirror-gloss black paint = pursuit of perfection; studio strip-light reflections = obsessive craft; dark void background = confidence.',
    image: 'https://drive.google.com/thumbnail?id=1omK5NyeVhxDt-RLJig_ObugIxF-5lYSu&sz=w1080',
    date: '11 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'forged',
    brand: 'FORGED',
    niche: 'Performance Spareparts',
    tagline: 'PRECISION IS POWER.',
    signs:
      'Macro forged piston = engineering; blueprint grid = precision; steel blue palette = cold industrial focus.',
    image: 'https://drive.google.com/thumbnail?id=1cC2JoLbPJVqez-n9_ezZzKViMUL0kxqK&sz=w1080',
    date: '11 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'wrench-and-brother',
    brand: 'WRENCH & BROTHER',
    niche: 'Motorcycle Workshop',
    tagline: 'BUILT BY HANDS YOU TRUST.',
    signs:
      'Grease-stained hands gripping a wrench = honest craft; warm tungsten lamp = trust; mechanics working together = brotherhood.',
    image: 'https://drive.google.com/thumbnail?id=1n1f4KkQI15ugnCYBuJhJAvy75XIMcPxX&sz=w1080',
    date: '11 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
  {
    id: 'apex-garage',
    brand: 'APEX GARAGE',
    niche: 'Performance Car Tuning',
    tagline: 'UNLEASH THE BEAST.',
    signs:
      'Night drift & tire smoke = freedom & rebellion; neon district = underground culture; light trails & sparks = speed & power.',
    image: 'https://drive.google.com/thumbnail?id=1zmJfnAE9rjJwKAplYuiQ7kImX1nuBqu8&sz=w1080',
    date: '11 OCT 2026',
    instagram: 'https://www.instagram.com/tugelanboto_/',
  },
];

export default posters;
