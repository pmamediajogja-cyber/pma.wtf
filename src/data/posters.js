// Brand poster concepts for men's hobby brands — auto-published by the
// @tugelanboto_ poster cron. Newest first.
// Images are hosted on Google Drive (public thumbnails); the cron uploads each
// new poster to the 'PMA.WTF - Brand Posters' folder and prepends an entry here.
const posters = [
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
