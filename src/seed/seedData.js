export const seedCategories = [
  {
    slug: 'cookware',
    name: 'Cookware',
    description:
      'Heirloom-grade cast iron, multi-clad stainless steel, and enameled braisers built for lifetime durability and daily kitchen rigor.',
    heroIllustration: '/img/categories/cookware.svg'
  },
  {
    slug: 'tableware',
    name: 'Tableware',
    description:
      'Hand-thrown stoneware plates, fluted pasta bowls, Belgian linen linens, and mouth-blown glassware designed for everyday gatherings.',
    heroIllustration: '/img/categories/tableware.svg'
  },
  {
    slug: 'coffee-tea',
    name: 'Coffee & Tea',
    description:
      'Precision ceramic pour-over drippers, balanced gooseneck kettles, double-walled carafes, and substantial handcrafted mugs.',
    heroIllustration: '/img/categories/coffee-tea.svg'
  },
  {
    slug: 'pantry',
    name: 'Pantry',
    description:
      'Wood-smoked sea salt flakes, single-estate cold pressed oils, raw wildflower honeys, and stone-ground artisanal staples.',
    heroIllustration: '/img/categories/pantry.svg'
  }
];

export const seedProducts = [
  // Cookware (6 items)
  {
    sku: 'KC-CW-001',
    name: 'Cast Iron Dutch Oven, 5.5 qt',
    slug: 'cast-iron-dutch-oven-5-5-qt',
    category: 'cookware',
    price: 13800,
    compareAt: 16500,
    stock: 14,
    active: true,
    featured: true,
    color: '#C8553D',
    image: '/img/products/dutch-oven.svg',
    description:
      'Forged from heavy-gauge virgin iron and finished with a durable multi-coat porcelain enamel. Exceptional heat retention and radiant interior geometry make it the centerpiece of slow braises, hearth breads, and simmered stews.',
    details: {
      material: 'Enameled cast iron with solid brass lid knob',
      dimensions: '11.2 in diameter, 6.4 in height with lid, 5.5 qt volume',
      care: 'Hand wash with warm water and soft sponge; oven safe up to 500°F',
      origin: 'Designed in Portland, crafted in Alsace'
    },
    rating: 4.9,
    reviewCount: 3,
    reviews: [
      {
        author: 'Eleanor Vance',
        rating: 5,
        title: 'Bakes sourdough boules with gorgeous crust',
        body: 'The thermal mass produces an incredible rise for my weekend sourdough. Cleans up effortlessly with warm water.',
        createdAt: '2026-08-14T11:20:00.000Z'
      },
      {
        author: 'Julian Reed',
        rating: 5,
        title: 'Indispensable piece for Sunday braises',
        body: 'The terracotta enamel has held up to months of heavy braising and roasting. The weight feels reassuring and balanced.',
        createdAt: '2026-08-22T15:45:00.000Z'
      },
      {
        author: 'Sarah Lin',
        rating: 4,
        title: 'Substantial and beautiful',
        body: 'Slightly heavy when full, but the braising results and moisture retention are completely unmatched.',
        createdAt: '2026-09-02T19:10:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-CW-002',
    name: 'Tri-Ply Stainless Sauté Pan, 3.5 qt',
    slug: 'tri-ply-stainless-saute-pan-3-5-qt',
    category: 'cookware',
    price: 11200,
    compareAt: null,
    stock: 22,
    active: true,
    featured: true,
    color: '#717D7E',
    image: '/img/products/saute-pan.svg',
    description:
      'Constructed with an aluminum core bounded by two layers of surgical-grade stainless steel for lightning-fast heat diffusion. Vertical walls maximize cooking surface area while minimizing oil spatter during high-heat searing.',
    details: {
      material: '18/10 tri-ply stainless steel with riveted hollow handle',
      dimensions: '10.5 in cooking diameter, 3.2 in wall depth',
      care: 'Dishwasher safe; compatible with induction, gas, and electric ranges',
      origin: 'Hand-finished in Nashville, Tennessee'
    },
    rating: 4.8,
    reviewCount: 2,
    reviews: [
      {
        author: 'Dr. Arthur Pendelton',
        rating: 5,
        title: 'Even browning with zero hot spots',
        body: 'Reduces pan sauces and crisps poultry skins evenly across the entire surface. Ergonomic handle stays cool.',
        createdAt: '2026-08-19T09:30:00.000Z'
      },
      {
        author: 'Maya Chen',
        rating: 4,
        title: 'Workhorse pan for everyday dinners',
        body: 'Substantial heft without being unwieldy. The flat bottom sits flush on our induction cooktop.',
        createdAt: '2026-08-28T18:05:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-CW-003',
    name: 'Hand-Forged Carbon Steel Skillet, 10 in',
    slug: 'hand-forged-carbon-steel-skillet-10-in',
    category: 'cookware',
    price: 9400,
    compareAt: null,
    stock: 16,
    active: true,
    featured: false,
    color: '#2E3033',
    image: '/img/products/carbon-skillet.svg',
    description:
      'Lighter and more responsive than cast iron, this hand-forged carbon steel skillet develops an obsidian, naturally slick patina with every use. Beveled sidewalls let spatulas slide underneath delicate fried eggs and seared scallops.',
    details: {
      material: 'Heavy-gauge forged carbon steel with wax protective seal',
      dimensions: '10.0 in top diameter, 8.0 in cooking surface, 2.0 mm thickness',
      care: 'Rinse with hot water, dry thoroughly, and apply light oil film',
      origin: 'Forged in small batches in Asturias, Spain'
    },
    rating: 5.0,
    reviewCount: 2,
    reviews: [
      {
        author: 'Mateo Morales',
        rating: 5,
        title: 'Quickly became my favorite pan',
        body: 'Pre-seasoned easily and after three uses nothing sticks. Incredibly responsive to heat adjustments.',
        createdAt: '2026-08-11T13:40:00.000Z'
      },
      {
        author: 'Chloe Dupont',
        rating: 5,
        title: 'Restaurant grade durability',
        body: 'Light enough to flip ingredients effortlessly yet holds enough heat to sear ribeyes perfectly.',
        createdAt: '2026-08-30T10:15:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-CW-004',
    name: 'Enameled Cast Iron Braiser, 3.8 qt',
    slug: 'enameled-cast-iron-braiser-3-8-qt',
    category: 'cookware',
    price: 14500,
    compareAt: 17500,
    stock: 11,
    active: true,
    featured: false,
    color: '#8A9A5B',
    image: '/img/products/cast-braiser.svg',
    description:
      'Shallow profile with sloping sides engineered for shallow-liquid braises, meatballs in rich marinara, and crisp-topped gratins. Transitions directly from stove to tabletop for warm family-style presentation.',
    details: {
      material: 'Sand-cast iron, sage green porcelain enamel glaze',
      dimensions: '11.8 in diameter, 4.8 in total height with lid',
      care: 'Hand wash with mild detergent; safe to 500°F',
      origin: 'Crafted in Alsace, France'
    },
    rating: 4.9,
    reviewCount: 3,
    reviews: [
      {
        author: 'Beatrice Ward',
        rating: 5,
        title: 'Stunning on the table and stove',
        body: 'The sage color is even richer in person. Fits four large chicken thighs with plenty of room for root vegetables.',
        createdAt: '2026-08-05T17:25:00.000Z'
      },
      {
        author: 'Daniel Cooper',
        rating: 5,
        title: 'Versatile one-pot cooker',
        body: 'We use this three nights a week for curries, risottos, and shakshuka. Heat distribution is wonderfully consistent.',
        createdAt: '2026-08-26T20:30:00.000Z'
      },
      {
        author: 'Hannah Price',
        rating: 4,
        title: 'Generous shallow capacity',
        body: 'The lid seals snugly and collects condensation effectively. Handles are roomy enough for thick oven mitts.',
        createdAt: '2026-09-04T12:00:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-CW-005',
    name: 'Copper Core Saucepan with Lid, 2 qt',
    slug: 'copper-core-saucepan-with-lid-2-qt',
    category: 'cookware',
    price: 12400,
    compareAt: null,
    stock: 19,
    active: true,
    featured: false,
    color: '#B85D36',
    image: '/img/products/copper-saucepan.svg',
    description:
      'A dense copper core ensures instant thermal conductivity, flanked by stainless steel layers for durability and zero reactivity with acidic foods. Designed for delicate custards, caramel reductions, and grains.',
    details: {
      material: '5-ply construction with thick pure copper core and 18/10 steel exterior',
      dimensions: '7.2 in diameter, 4.5 in depth, 2.0 qt volume',
      care: 'Hand washing recommended to preserve polished copper accent rings',
      origin: 'Crafted in Piedmont, Italy'
    },
    rating: 4.7,
    reviewCount: 2,
    reviews: [
      {
        author: 'Simon Gallagher',
        rating: 5,
        title: 'Mastery over low temperatures',
        body: 'Making pastry creams and hollandaise without breaking is so much easier with this rapid thermal response.',
        createdAt: '2026-08-16T14:10:00.000Z'
      },
      {
        author: 'Rachel Adams',
        rating: 4,
        title: 'Heavy and solidly constructed',
        body: 'The lid fits like a glove and the flared pouring rim prevents messy drips down the pan exterior.',
        createdAt: '2026-08-29T16:45:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-CW-006',
    name: 'Seasoned Cast Iron Griddle Press',
    slug: 'seasoned-cast-iron-griddle-press',
    category: 'cookware',
    price: 3600,
    compareAt: null,
    stock: 28,
    active: true,
    featured: false,
    color: '#343A40',
    image: '/img/products/griddle-press.svg',
    description:
      'Heavy flat cast iron press fitted with a turned walnut handle. Ideal for keeping bacon flat, pressing smash burgers to crisp lacy edges, and creating deeply scored panini on the stovetop.',
    details: {
      material: 'Virgin pre-seasoned cast iron with hand-turned oiled walnut handle',
      dimensions: '8.5 in length, 4.5 in width, 2.7 lbs weight',
      care: 'Wipe clean with a warm damp cloth; oil occasionally',
      origin: 'Cast in Milwaukee, Wisconsin'
    },
    rating: 4.8,
    reviewCount: 2,
    reviews: [
      {
        author: 'Tyler Brooks',
        rating: 5,
        title: 'Transforms smash burger nights',
        body: 'Heats up right on the griddle and produces restaurant-quality crusts in sixty seconds flat.',
        createdAt: '2026-08-10T12:00:00.000Z'
      },
      {
        author: 'Megan Walsh',
        rating: 4,
        title: 'Solid wooden grip',
        body: 'The wood handle stays cool to the touch while the iron plate does its heavy lifting.',
        createdAt: '2026-08-25T11:15:00.000Z'
      }
    ]
  },

  // Tableware (6 items)
  {
    sku: 'KC-TW-001',
    name: 'Hand-Thrown Stoneware Dinner Plate',
    slug: 'hand-thrown-stoneware-dinner-plate',
    category: 'tableware',
    price: 3200,
    compareAt: null,
    stock: 35,
    active: true,
    featured: true,
    color: '#D8CEBF',
    image: '/img/products/stoneware-plate.svg',
    description:
      'Wheel-thrown with local Oregon clay and finished in our signature satin birch reactive glaze. An organic, gently upturned rim holds rich reductions and dressings while stacking compactly in cupboards.',
    details: {
      material: 'High-fire stoneware clay, lead-free food-safe matte glaze',
      dimensions: '10.5 in diameter, 0.8 in rim height',
      care: 'Dishwasher and microwave safe; avoid sudden thermal shock',
      origin: 'Studio thrown in Hood River, Oregon'
    },
    rating: 4.9,
    reviewCount: 3,
    reviews: [
      {
        author: 'Claire Montgomery',
        rating: 5,
        title: 'Each piece has organic character',
        body: 'The subtle variation in glaze pooling makes every dinner plate feel uniquely handmade yet cohesive.',
        createdAt: '2026-08-08T18:40:00.000Z'
      },
      {
        author: 'Harrison Forde',
        rating: 5,
        title: 'Substantial feel in the hand',
        body: 'Durable enough for our bustling weekday household yet refined enough for Saturday dinner parties.',
        createdAt: '2026-08-24T19:20:00.000Z'
      },
      {
        author: 'Gemma Rossi',
        rating: 4,
        title: 'Gorgeous satin texture',
        body: 'Cutlery does not mark or scratch the surface glaze. Beautiful oatmeal undertones.',
        createdAt: '2026-09-01T14:35:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-TW-002',
    name: 'Fluted Ceramic Pasta Bowls, Set of 4',
    slug: 'fluted-ceramic-pasta-bowls-set-of-4',
    category: 'tableware',
    price: 7800,
    compareAt: 9200,
    stock: 18,
    active: true,
    featured: true,
    color: '#8A9A5B',
    image: '/img/products/pasta-bowls.svg',
    description:
      'Broad, shallow silhouettes with delicate exterior vertical fluting glazed in a tranquil sage undertone. The wide basin lets freshly tossed pasta breathe while the rim supports crusty sourdough slices.',
    details: {
      material: 'Durable vitrified ceramic with semi-matte sage glaze',
      dimensions: '8.8 in diameter, 2.2 in wall depth, 28 oz capacity',
      care: 'Dishwasher and microwave safe',
      origin: 'Crafted in Coimbra, Portugal'
    },
    rating: 5.0,
    reviewCount: 2,
    reviews: [
      {
        author: 'Lydia Scott',
        rating: 5,
        title: 'The bowl everyone reaches for first',
        body: 'These have replaced our standard dinner plates for curries, grain bowls, and tagliatelle. Perfect proportion.',
        createdAt: '2026-08-15T20:10:00.000Z'
      },
      {
        author: 'Brendan Hayes',
        rating: 5,
        title: 'Outstanding quality and weight',
        body: 'Packaged with zero plastic and arrived in pristine condition. The fluting gives pleasant tactile grip.',
        createdAt: '2026-08-31T17:00:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-TW-003',
    name: 'Belgian Linen Napkins, Set of 4',
    slug: 'belgian-linen-napkins-set-of-4',
    category: 'tableware',
    price: 4200,
    compareAt: null,
    stock: 32,
    active: true,
    featured: false,
    color: '#C8553D',
    image: '/img/products/linen-napkins.svg',
    description:
      'Woven from 100% certified European flax and pre-washed with pumice stones for immediate relaxed drape and tactile softness. Generous square dimensions finished with a subtle mitered hem.',
    details: {
      material: '100% Belgian flax linen, 185 gsm garment-washed',
      dimensions: '18 in x 18 in square',
      care: 'Machine wash cold on gentle; tumble dry low or line dry',
      origin: 'Woven in Flanders, Belgium'
    },
    rating: 4.8,
    reviewCount: 2,
    reviews: [
      {
        author: 'Theresa Meyer',
        rating: 5,
        title: 'Grows softer with every laundry cycle',
        body: 'The terracotta dye has rich depth and has not faded after dozens of washes. Looks effortless unironed.',
        createdAt: '2026-08-12T10:45:00.000Z'
      },
      {
        author: 'Kenji Sato',
        rating: 4,
        title: 'Substantial weave',
        body: 'Much more absorbent than conventional cotton napkins and dries remarkably quickly.',
        createdAt: '2026-08-27T12:30:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-TW-004',
    name: 'Hand-Blown Fluted Tumblers, Set of 4',
    slug: 'hand-blown-fluted-tumblers-set-of-4',
    category: 'tableware',
    price: 5400,
    compareAt: null,
    stock: 24,
    active: true,
    featured: false,
    color: '#A9C4C9',
    image: '/img/products/fluted-tumblers.svg',
    description:
      'Individually mouth-blown by skilled artisans from lead-free crystal with delicate linear fluting. Weighted base provides reassuring stability on wooden tables while catching ambient dining light.',
    details: {
      material: 'Lead-free mouth-blown soda lime crystal glass',
      dimensions: '3.2 in diameter, 4.2 in height, 12 oz capacity',
      care: 'Top-rack dishwasher safe; hand wash preserves optic clarity',
      origin: 'Blown in Jablonec, Czech Republic'
    },
    rating: 4.9,
    reviewCount: 2,
    reviews: [
      {
        author: 'Valerie Stone',
        rating: 5,
        title: 'Feels like drinking in a boutique bistro',
        body: 'Light refracting through the vertical flutes is mesmerizing. The lip is thin, polished, and pleasant to drink from.',
        createdAt: '2026-08-18T16:15:00.000Z'
      },
      {
        author: 'Lucas Bennett',
        rating: 4,
        title: 'Elegant everyday glassware',
        body: 'Holds iced tea or evening negronis with equal grace. Sturdy base prevents accidental tipping.',
        createdAt: '2026-09-03T11:40:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-TW-005',
    name: 'Matte Brass Flatware Set, 5-Piece',
    slug: 'matte-brass-flatware-set-5-piece',
    category: 'tableware',
    price: 6800,
    compareAt: null,
    stock: 15,
    active: true,
    featured: false,
    color: '#D4AF37',
    image: '/img/products/brass-flatware.svg',
    description:
      'Forged from heavy 18/10 stainless steel and treated with a titanium nitride electroplate in brushed warm brass. Balanced silhouettes with comfortable round bolster necks and tapered tines.',
    details: {
      material: '18/10 stainless steel core with brushed matte PVD gold brass finish',
      dimensions: 'Includes dinner fork, salad fork, dinner knife, soup spoon, dessert spoon',
      care: 'Hand wash with mild detergent; dry promptly to prevent water spotting',
      origin: 'Forged in Guimarães, Portugal'
    },
    rating: 4.8,
    reviewCount: 2,
    reviews: [
      {
        author: 'Siddharth Rao',
        rating: 5,
        title: 'Striking balance of modern and classic',
        body: 'The matte finish eliminates fingerprints while providing a warm glow next to white ceramic plates.',
        createdAt: '2026-08-07T13:20:00.000Z'
      },
      {
        author: 'Elena Rostova',
        rating: 4,
        title: 'Very satisfying balance',
        body: 'The knife cuts cleanly and the forks have substantial weight without feeling clumsy in the palm.',
        createdAt: '2026-08-23T15:50:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-TW-006',
    name: 'Organic Linen Table Runner, Oatmeal',
    slug: 'organic-linen-table-runner-oatmeal',
    category: 'tableware',
    price: 4800,
    compareAt: null,
    stock: 20,
    active: true,
    featured: false,
    color: '#D4A373',
    image: '/img/products/linen-runner.svg',
    description:
      'Woven on traditional shuttle looms from unbleached organic flax fibers. Raw fringed ends and natural tonal slubs lend warmth and unhurried ease to rustic oak or marble dining tables.',
    details: {
      material: '100% certified organic unbleached flax linen',
      dimensions: '16 in width, 72 in length with 0.75 in raw fringe edges',
      care: 'Machine wash cold on delicate; lay flat or line dry',
      origin: 'Loomed in Vilnius, Lithuania'
    },
    rating: 4.7,
    reviewCount: 2,
    reviews: [
      {
        author: 'Patricia Kelly',
        rating: 5,
        title: 'Brings our wooden dining table to life',
        body: 'The unbleached oatmeal hue matches everything from dark earthenware to bright summer salads.',
        createdAt: '2026-08-14T09:10:00.000Z'
      },
      {
        author: 'Derrick Hunt',
        rating: 4,
        title: 'Authentic texture',
        body: 'Natural flax slubs give it real character. Ironing is unnecessary; the relaxed wrinkles look intentional.',
        createdAt: '2026-08-29T19:05:00.000Z'
      }
    ]
  },

  // Coffee & Tea (6 items)
  {
    sku: 'KC-CT-001',
    name: 'Stoneware Pour-Over Dripper',
    slug: 'stoneware-pour-over-dripper',
    category: 'coffee-tea',
    price: 4200,
    compareAt: null,
    stock: 26,
    active: true,
    featured: true,
    color: '#C8553D',
    image: '/img/products/pourover-dripper.svg',
    description:
      'Engineered with internal spiral extraction ribs and an optimized single flow orifice for clean, repeatable manual brew extractions. Dense stoneware walls conserve brew temperature throughout pouring.',
    details: {
      material: 'High-fire ceramic with terracotta satin glaze exterior',
      dimensions: '4.6 in top diameter, 3.8 in height; compatible with size 02 cone filters',
      care: 'Dishwasher safe or rinse immediately under hot running water',
      origin: 'Cast in Mino Province, Japan'
    },
    rating: 5.0,
    reviewCount: 3,
    reviews: [
      {
        author: 'Jonathan Cole',
        rating: 5,
        title: 'Thermal stability makes a tangible difference',
        body: 'My Ethiopian light roasts yield noticeably cleaner clarity and floral brightness compared to plastic drippers.',
        createdAt: '2026-08-09T08:15:00.000Z'
      },
      {
        author: 'Astrid Lind',
        rating: 5,
        title: 'A morning ritual essential',
        body: 'The single hole and internal spiral flutes control flow rate predictably. Sits level on every mug we own.',
        createdAt: '2026-08-21T07:45:00.000Z'
      },
      {
        author: 'Gavin O’Connor',
        rating: 5,
        title: 'Flawless construction',
        body: 'Glaze is silky smooth and the base flange sits secure on carafes. Daily companion for morning brews.',
        createdAt: '2026-09-01T08:30:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-CT-002',
    name: 'Hand-Thrown Ceramic Mug, Birch White',
    slug: 'hand-thrown-ceramic-mug-birch-white',
    category: 'coffee-tea',
    price: 3400,
    compareAt: null,
    stock: 30,
    active: true,
    featured: true,
    color: '#EAE5DB',
    image: '/img/products/ceramic-mug.svg',
    description:
      'Thrown on the wheel with a generous three-finger handle pulled for ergonomic morning comfort. The bottom exterior is left unglazed to expose raw clay tooth while the interior is sealed in smooth creamy gloss.',
    details: {
      material: 'Iron-speckled local stoneware with dipped birch reactive glaze',
      dimensions: '3.6 in diameter, 4.0 in height, 14 oz capacity',
      care: 'Microwave and dishwasher safe',
      origin: 'Hand-thrown in Portland, Oregon'
    },
    rating: 4.9,
    reviewCount: 3,
    reviews: [
      {
        author: 'Chloe Simmons',
        rating: 5,
        title: 'Feels like a warm hug in your hands',
        body: 'The handle curve fits naturally and the exposed clay bottom provides a grounded tactile warmth.',
        createdAt: '2026-08-06T09:20:00.000Z'
      },
      {
        author: 'Liam Vance',
        rating: 5,
        title: 'Perfect 14 oz portion',
        body: 'Leaves plenty of room for microfoam without risk of spilling during the walk to my home desk.',
        createdAt: '2026-08-25T08:10:00.000Z'
      },
      {
        author: 'Sarah Lin',
        rating: 4,
        title: 'Pleasing speckled glaze',
        body: 'Retains coffee heat longer than thin ceramic mugs. Highly recommended.',
        createdAt: '2026-09-03T10:00:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-CT-003',
    name: 'Precision Gooseneck Pouring Kettle, 1.0 L',
    slug: 'precision-gooseneck-pouring-kettle-1-0-l',
    category: 'coffee-tea',
    price: 8200,
    compareAt: null,
    stock: 12,
    active: true,
    featured: true,
    color: '#343A40',
    image: '/img/products/gooseneck-kettle.svg',
    description:
      'Crafted with an elongated swan-neck spout balanced for steady laminar water flow. Includes a solid American walnut handle and lid knob that never absorbs heat during stovetop heating.',
    details: {
      material: '304 stainless steel with matte charcoal heat-resistant powder coat and oiled walnut',
      dimensions: '11.5 in width handle to spout, 6.0 in base diameter, 1.0 L capacity',
      care: 'Hand wash exterior; descale interior periodically with lemon juice or vinegar',
      origin: 'Manufactured in Tsubame-Sanjo, Japan'
    },
    rating: 4.8,
    reviewCount: 2,
    reviews: [
      {
        author: 'Felix Martin',
        rating: 5,
        title: 'Pinpoint pour control',
        body: 'You can pour a slow, pencil-thin stream without any dribbling or turbulence. Indispensable for pour-over.',
        createdAt: '2026-08-17T07:30:00.000Z'
      },
      {
        author: 'Amara Jackson',
        rating: 4,
        title: 'Beautiful matte finish',
        body: 'Looks handsome sitting on our stove all day. Water balance feels natural when tilting.',
        createdAt: '2026-08-30T08:50:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-CT-004',
    name: 'Double-Wall Borosilicate Glass Server, 600 ml',
    slug: 'double-wall-borosilicate-glass-server-600-ml',
    category: 'coffee-tea',
    price: 3800,
    compareAt: null,
    stock: 25,
    active: true,
    featured: false,
    color: '#B0BEC5',
    image: '/img/products/glass-server.svg',
    description:
      'Thermal insulating double-wall construction keeps brewed specialty coffee piping hot while the exterior remains cool to the touch. Features an anti-drip precision spout and embossed volumetric cup indicators.',
    details: {
      material: 'Laboratory-grade thermal shock resistant borosilicate glass',
      dimensions: '4.8 in diameter, 5.5 in height, 600 ml (20 oz) maximum capacity',
      care: 'Dishwasher safe; avoid harsh scouring pads',
      origin: 'Blown in Jena, Germany'
    },
    rating: 4.9,
    reviewCount: 2,
    reviews: [
      {
        author: 'Willem de Boer',
        rating: 5,
        title: 'Thermal insulation really works',
        body: 'The second cup tastes just as hot as the first without requiring a reheating plate that burns coffee oils.',
        createdAt: '2026-08-13T11:00:00.000Z'
      },
      {
        author: 'Natasha Romanova',
        rating: 4,
        title: 'Drips zero drops when pouring',
        body: 'The pour spout cuts off cleanly every time. Pairs seamlessly with the stoneware dripper.',
        createdAt: '2026-08-28T09:15:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-CT-005',
    name: 'Cast Iron Kyusu Teapot with Infuser',
    slug: 'cast-iron-kyusu-teapot-with-infuser',
    category: 'coffee-tea',
    price: 7600,
    compareAt: 8800,
    stock: 14,
    active: true,
    featured: false,
    color: '#3F4E4F',
    image: '/img/products/kyusu-teapot.svg',
    description:
      'Modeled after traditional Japanese Nanbu ironware with a non-reactive porcelain enameled interior. Includes a micro-mesh stainless steel brewing basket that gives whole-leaf teas ample room to unfurl.',
    details: {
      material: 'Porous iron shell with food-safe enameled interior and 304 steel basket',
      dimensions: '6.5 in width including spout, 4.2 in height, 22 oz volume',
      care: 'Rinse with clean hot water and wipe exterior dry immediately with cloth',
      origin: 'Cast in Morioka, Iwate Prefecture'
    },
    rating: 5.0,
    reviewCount: 2,
    reviews: [
      {
        author: 'Takeshi Yamada',
        rating: 5,
        title: 'Brews exceptional sencha and hojicha',
        body: 'Thermal retention keeps tea hot through multiple infusions. The enamel interior prevents any metallic taste.',
        createdAt: '2026-08-11T14:40:00.000Z'
      },
      {
        author: 'Emma Watson',
        rating: 5,
        title: 'Heirloom quality artifact',
        body: 'Weighty and exquisitely textured with traditional dot relief. A joyful centerpiece for afternoon reading.',
        createdAt: '2026-08-26T16:00:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-CT-006',
    name: 'Hammered Brass Coffee Scoop',
    slug: 'hammered-brass-coffee-scoop',
    category: 'coffee-tea',
    price: 2400,
    compareAt: null,
    stock: 36,
    active: true,
    featured: false,
    color: '#D4AF37',
    image: '/img/products/brass-scoop.svg',
    description:
      'Forged from solid jeweler-grade brass with subtle dimpled hand-hammered facets. Measures exactly 10 grams of whole bean coffee to streamline your morning dial-in routine.',
    details: {
      material: 'Solid uncoated natural brass with hand-planished bowl',
      dimensions: '6.2 in total length, 1.8 in bowl diameter, 10g bean capacity',
      care: 'Wipe dry after handling; natural patina develops with age and use',
      origin: 'Handcrafted in Jaipur, India'
    },
    rating: 4.8,
    reviewCount: 2,
    reviews: [
      {
        author: 'Oliver Bennett',
        rating: 5,
        title: 'Small luxury for the coffee bar',
        body: 'Solid brass with honest heft. The hand-hammered facets reflect the light beautifully.',
        createdAt: '2026-08-15T09:30:00.000Z'
      },
      {
        author: 'Zoe Kravitz',
        rating: 4,
        title: 'Accurate 10g measurement',
        body: 'Matches my scale readings within a fraction of a gram. Delightful tool to reach for every sunrise.',
        createdAt: '2026-08-29T11:20:00.000Z'
      }
    ]
  },

  // Pantry (6 items)
  {
    sku: 'KC-PT-001',
    name: 'Smoked Sea Salt Flakes, 8 oz',
    slug: 'smoked-sea-salt-flakes-8-oz',
    category: 'pantry',
    price: 1400,
    compareAt: null,
    stock: 38,
    active: true,
    featured: true,
    color: '#8A9A5B',
    image: '/img/products/sea-salt.svg',
    description:
      'Delicate hollow pyramid crystals slowly cold-smoked over aged Pacific Northwest alderwood and applewood shavings. Adds crisp mineral crunch and mellow campfire aroma to grilled steaks, ripe heirloom tomatoes, and dark chocolate.',
    details: {
      material: '100% natural solar evaporated sea salt flakes, natural hardwood smoke',
      dimensions: '8 oz (227g) net weight in reusable amber glass jar',
      care: 'Store in a cool dry pantry away from direct heat and moisture',
      origin: 'Harvested on the Oregon coast'
    },
    rating: 4.9,
    reviewCount: 3,
    reviews: [
      {
        author: 'Chef Douglas Green',
        rating: 5,
        title: 'Remarkable aroma without acrid bitterness',
        body: 'Cold-smoking over applewood gives delicate sweet smoke rather than harsh liquid-smoke flavor. Delicate crunch.',
        createdAt: '2026-08-10T15:20:00.000Z'
      },
      {
        author: 'Miranda Bailey',
        rating: 5,
        title: 'Elevates fresh garden tomatoes to perfection',
        body: 'A pinch on ripe summer tomatoes with olive oil is pure bliss. The pyramid flakes melt cleanly on the tongue.',
        createdAt: '2026-08-24T18:15:00.000Z'
      },
      {
        author: 'Gregory House',
        rating: 4,
        title: 'Subtle and well balanced',
        body: 'Very clean salt profile. Great finishing touch on grilled flat irons.',
        createdAt: '2026-09-02T13:40:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-PT-002',
    name: 'Single-Estate Cold Pressed Olive Oil, 500 ml',
    slug: 'single-estate-cold-pressed-olive-oil-500-ml',
    category: 'pantry',
    price: 3200,
    compareAt: null,
    stock: 20,
    active: true,
    featured: true,
    color: '#556B2F',
    image: '/img/products/olive-oil.svg',
    description:
      'Harvested early from organic Koroneiki olives cold-pressed within four hours of picking. Delivers vivid notes of fresh-cut meadow grass, artichoke heart, and a brisk peppery polyphenol finish.',
    details: {
      material: '100% extra virgin monovarietal olive oil, acidity under 0.2%',
      dimensions: '500 ml UV-shielding dark green glass bottle with pour regulator',
      care: 'Keep capped in a cool dark pantry; best consumed within 18 months of harvest',
      origin: 'Single grove in Messinia, Peloponnese, Greece'
    },
    rating: 5.0,
    reviewCount: 2,
    reviews: [
      {
        author: 'Constantine K.',
        rating: 5,
        title: 'Authentic harvest freshness',
        body: 'Bright, herbaceous, and that peppery catch at the back of the throat confirms the exceptional polyphenol count.',
        createdAt: '2026-08-16T12:00:00.000Z'
      },
      {
        author: 'Harriet Thorne',
        rating: 5,
        title: 'Finishing oil of dreams',
        body: 'Drizzled over warm burrata or fresh crusty sourdough, this oil is a revelation.',
        createdAt: '2026-08-31T14:30:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-PT-003',
    name: 'Aged Wildflower Raw Honey, 12 oz',
    slug: 'aged-wildflower-raw-honey-12-oz',
    category: 'pantry',
    price: 1800,
    compareAt: null,
    stock: 25,
    active: true,
    featured: false,
    color: '#D4A373',
    image: '/img/products/wildflower-honey.svg',
    description:
      'Unpasteurized raw honey harvested from high alpine meadows and aged in toasted French oak barrels for subtle vanilla depth. Naturally crystallization-prone with a thick, spreadable texture.',
    details: {
      material: '100% raw unheated wildflower honey with living floral enzymes',
      dimensions: '12 oz (340g) faceted hexagon glass jar with gold twist lid',
      care: 'Store at room temperature; place jar in warm water if crystallization occurs',
      origin: 'Apiary in Cascade Mountain Foothills, Washington'
    },
    rating: 4.8,
    reviewCount: 2,
    reviews: [
      {
        author: 'Sylvia Plath',
        rating: 5,
        title: 'Complex floral and oak notes',
        body: 'Unlike grocery store honeys, this has rich herbal complexity and subtle butterscotch undertones.',
        createdAt: '2026-08-12T16:50:00.000Z'
      },
      {
        author: 'Henry Foster',
        rating: 4,
        title: 'Wonderful on sharp cheddar',
        body: 'Thick spreadable consistency makes it fantastic for cheese boards and morning yogurt bowls.',
        createdAt: '2026-08-27T10:15:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-PT-004',
    name: 'Whole Tellicherry Black Peppercorns, 6 oz',
    slug: 'whole-tellicherry-black-peppercorns-6-oz',
    category: 'pantry',
    price: 1600,
    compareAt: null,
    stock: 30,
    active: true,
    featured: false,
    color: '#212529',
    image: '/img/products/peppercorns.svg',
    description:
      'Hand-picked mature TGSEB (Tellicherry Garbled Special Extra Bold) berries from the Malabar coast. Sun-dried to develop pungent essential oils, bright citrus top notes, and deep warming heat.',
    details: {
      material: '100% whole black peppercorns (grade TGSEB, size 4.75mm+)',
      dimensions: '6 oz (170g) resealable kraft pouch with aroma valve',
      care: 'Store in airtight grinder or ceramic cellar away from moisture',
      origin: 'Malabar Coast, Kerala, India'
    },
    rating: 4.9,
    reviewCount: 2,
    reviews: [
      {
        author: 'Chef Raymond Blanc',
        rating: 5,
        title: 'Huge berries with tremendous aromatic punch',
        body: 'Cracking these in a mortar releases extraordinary cedar and citrus aromas before the heat kicks in.',
        createdAt: '2026-08-19T14:10:00.000Z'
      },
      {
        author: 'Leona Lewis',
        rating: 4,
        title: 'Essential upgrade for peppermill',
        body: 'You will never return to generic black pepper after grinding these onto pasta cacio e pepe.',
        createdAt: '2026-09-01T15:00:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-PT-005',
    name: 'Stone-Ground Whole Grain Mustard, 9 oz',
    slug: 'stone-ground-whole-grain-mustard-9-oz',
    category: 'pantry',
    price: 1200,
    compareAt: null,
    stock: 24,
    active: true,
    featured: false,
    color: '#C69E2E',
    image: '/img/products/grain-mustard.svg',
    description:
      'Coarsely crushed brown and yellow mustard seeds steeped in organic Willamette Valley cider vinegar and wildflower honey. Offers hearty textural pop, vibrant acidity, and pleasant sinus-clearing warmth.',
    details: {
      material: 'Brown and yellow mustard seeds, organic cider vinegar, honey, sea salt, spices',
      dimensions: '9 oz (255g) heritage stoneware crock with wire clamp lid',
      care: 'Refrigerate after opening to preserve punchy seed crispness',
      origin: 'Prepared in Salem, Oregon'
    },
    rating: 4.8,
    reviewCount: 2,
    reviews: [
      {
        author: 'Marcus Vance',
        rating: 5,
        title: 'The perfect charcuterie condiment',
        body: 'The seeds pop with great texture and the cider vinegar gives it rounded, mellow acidity.',
        createdAt: '2026-08-08T17:30:00.000Z'
      },
      {
        author: 'Clara Oswald',
        rating: 4,
        title: 'Robust roast beef accompaniment',
        body: 'Made vinaigrettes and pork roast glazes sing. The stoneware jar is charming on the table.',
        createdAt: '2026-08-26T18:40:00.000Z'
      }
    ]
  },
  {
    sku: 'KC-PT-006',
    name: 'Organic Lavender Blossom Syrup, 250 ml',
    slug: 'organic-lavender-blossom-syrup-250-ml',
    category: 'pantry',
    price: 1800,
    compareAt: null,
    stock: 22,
    active: true,
    featured: false,
    color: '#7D6B91',
    image: '/img/products/lavender-syrup.svg',
    description:
      'Slow-infused from hand-harvested culinary English lavender blossoms, pure cane sugar, and lemon peel. Imparts delicate floral perfume and soothing sweetness to cold brew iced lattes, spritzes, and fresh lemonade.',
    details: {
      material: 'Filtered water, organic cane sugar, organic English lavender flowers, organic lemon juice',
      dimensions: '250 ml (8.5 fl oz) apothecary glass bottle with wooden pour topper',
      care: 'Refrigerate after opening; use within three months',
      origin: 'Bottled in Sequim, Washington'
    },
    rating: 4.9,
    reviewCount: 2,
    reviews: [
      {
        author: 'Genevieve Roy',
        rating: 5,
        title: 'Delicate and never soapy',
        body: 'Finding lavender syrups that do not taste like perfume is rare. This has natural botanical grace.',
        createdAt: '2026-08-17T15:00:00.000Z'
      },
      {
        author: 'Tobias Fünke',
        rating: 4,
        title: 'Elevates morning iced lattes',
        body: 'A single tablespoon in oat milk iced lattes feels like a ten dollar coffee shop indulgence.',
        createdAt: '2026-08-30T16:20:00.000Z'
      }
    ]
  }
];
