export const RESTAURANT_INFO = {
  name: "Tofu Chon",
  koreanName: "두부촌",
  tagline: "Authentic Korean Soon Tofu & Sizzling KBBQ in Koreatown",
  address: "3526 W 8th St, Los Angeles, CA 90005",
  neighborhood: "Koreatown, Los Angeles",
  phone: "(213) 505-9577",
  phoneRaw: "+12135059577",
  instagram: "@tofuchonla",
  instagramUrl: "https://www.instagram.com/tofuchonla/",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tofu+Chon+3526+W+8th+St+Los+Angeles+CA",
  hours: [
    { days: "Monday – Saturday", time: "10:30 AM – 10:00 PM" },
    { days: "Sunday", time: "11:00 AM – 9:30 PM" }
  ],
  features: [
    "0% Fee Direct Online Ordering",
    "Curbside Pickup & Fast Local Delivery",
    "Fresh Silken Tofu Made Daily",
    "Generous House Banchan Included"
  ]
};

export const SPICE_LEVELS = [
  { id: "mild", name: "Mild (순한맛)", desc: "Gentle warming flavor, subtle chili essence", color: "#48bb78" },
  { id: "medium", name: "Medium (보통맛)", desc: "Traditional balance of savory broth and kick", color: "#ed8936" },
  { id: "spicy", name: "Spicy (매운맛)", desc: "Authentic Korean heat, aromatic red chili oil", color: "#e53e3e" },
  { id: "danger", name: "Extra Spicy / Danger (아주 매운맛)", desc: "For true spice enthusiasts with bird's eye chili", color: "#9b2c2c" }
];

export const CATEGORIES = [
  { id: "all", label: "All Items (전체)" },
  { id: "combos", label: "Combos (콤보)" },
  { id: "tofu", label: "Soon Tofu (순두부)" },
  { id: "specials", label: "House Specials (특선요리)" },
  { id: "drinks", label: "Drinks (주류/음료)" }
];

export const MENU_ITEMS = [
  // COMBOS
  {
    id: "combo-galbi",
    name: "Galbi + Soon Tofu Combo",
    koreanName: "갈비 + 순두부 콤보",
    price: 32.99,
    category: "combos",
    image: "/images/galbi-sizzling.png",
    description: "Our signature flame-grilled Korean BBQ short ribs glazed in sweet soy garlic marinade, paired with your choice of bubbling Soon Tofu stew, purple/white rice, and assortment of banchan.",
    isPopular: true,
    isCombo: true,
    hasSpiceLevel: true,
    badge: "Most Popular"
  },
  {
    id: "combo-bulgogi",
    name: "Bulgogi + Soon Tofu Combo",
    koreanName: "소불고기 + 순두부 콤보",
    price: 28.99,
    category: "combos",
    image: "/images/hero-feast.jpg",
    description: "Tender thinly-sliced prime ribeye marinated in fruit-infused savory soy sauce, served sizzling with your personal hot stone Soon Tofu stew.",
    isPopular: true,
    isCombo: true,
    hasSpiceLevel: true
  },
  {
    id: "combo-yellow-croaker",
    name: "Deep Fried Yellow Croaker + Soon Tofu Combo",
    koreanName: "조기구이 + 순두부 콤보",
    price: 27.99,
    category: "combos",
    image: "/images/yellow-croaker-combo.png",
    description: "Whole fresh yellow croaker pan-fried until crackling crisp outside with tender sweet flaky meat, served with bubbling Soon Tofu and lemon wedges.",
    isPopular: true,
    isCombo: true,
    hasSpiceLevel: true,
    badge: "Chef's Choice"
  },
  {
    id: "combo-spicy-pork",
    name: "Spicy Pork + Soon Tofu Combo",
    koreanName: "돼지불고기 + 순두부 콤보",
    price: 27.99,
    category: "combos",
    image: "/images/hero-feast.jpg",
    description: "Thinly sliced pork belly wok-charred with scallions, onions, and spicy Korean chili paste (Jeyuk Bokkeum), served with soothing Soon Tofu.",
    isCombo: true,
    hasSpiceLevel: true
  },
  {
    id: "combo-bibimbob",
    name: "Bibimbob + Soon Tofu Combo",
    koreanName: "비빔밥 + 순두부 콤보",
    price: 27.99,
    category: "combos",
    image: "/images/bibimbap.png",
    description: "Traditional brass bowl Bibimbap with seasoned mountain greens, fried egg, and savory beef, accompanied by hot Soon Tofu stew.",
    isCombo: true,
    hasSpiceLevel: true
  },
  {
    id: "combo-spicy-chicken",
    name: "Spicy Chicken + Soon Tofu Combo",
    koreanName: "매운닭불고기 + 순두부 콤보",
    price: 26.99,
    category: "combos",
    image: "/images/hero-feast.jpg",
    description: "Boneless tender chicken marinated in smoky gochujang chili glaze, served with bubbling stone pot Soon Tofu.",
    isCombo: true,
    hasSpiceLevel: true
  },
  {
    id: "combo-soy-chicken",
    name: "Soy Sauce Chicken + Soon Tofu Combo",
    koreanName: "간장닭불고기 + 순두부 콤보",
    price: 26.99,
    category: "combos",
    image: "/images/hero-feast.jpg",
    description: "Tender chicken thigh glazed in sweet caramelized garlic soy reduction, paired with aromatic Soon Tofu stew.",
    isCombo: true,
    hasSpiceLevel: true
  },

  // SOON TOFU STEWS (All $17.49)
  {
    id: "tofu-mix",
    name: "Mix Soon Tofu",
    koreanName: "섞어 순두부",
    price: 17.49,
    category: "tofu",
    image: "/images/mix-soon-tofu.png",
    description: "The classic Koreatown crowd favorite. Silken organic soft tofu bubbling in an earthenware ttukbaegi with tender beef, ocean shrimp, and whole clams.",
    isPopular: true,
    hasSpiceLevel: true,
    badge: "House Specialty"
  },
  {
    id: "tofu-beef",
    name: "Beef Soon Tofu",
    koreanName: "소고기 순두부",
    price: 17.49,
    category: "tofu",
    image: "/images/mix-soon-tofu.png",
    description: "Simmered in rich 24-hour slow-simmered beef broth loaded with generous cuts of tender beef brisket and silken tofu curds.",
    isPopular: true,
    hasSpiceLevel: true
  },
  {
    id: "tofu-seafood",
    name: "Seafood Soon Tofu",
    koreanName: "해물 순두부",
    price: 17.49,
    category: "tofu",
    image: "/images/mix-soon-tofu.png",
    description: "Fresh Manila clams, succulent prawns, and baby squid gently cooked in our fragrant, briny seafood chili broth.",
    isPopular: true,
    hasSpiceLevel: true
  },
  {
    id: "tofu-pork-kimchi",
    name: "Pork Kimchi Soon Tofu",
    koreanName: "돼지 김치 순두부",
    price: 17.49,
    category: "tofu",
    image: "/images/mix-soon-tofu.png",
    description: "Aged ripe artisanal kimchi sautéed with savory pork belly slices, stewed with silky tofu for a deeply flavorful, tangy kick.",
    hasSpiceLevel: true
  },
  {
    id: "tofu-pork",
    name: "Pork Soon Tofu",
    koreanName: "돼지고기 순두부",
    price: 17.49,
    category: "tofu",
    image: "/images/mix-soon-tofu.png",
    description: "Tender slices of savory pork stewed with velvety soft tofu in our piping hot stone bowl.",
    hasSpiceLevel: true
  },
  {
    id: "tofu-oyster",
    name: "Oyster Soon Tofu",
    koreanName: "굴 순두부",
    price: 17.49,
    category: "tofu",
    image: "/images/mix-soon-tofu.png",
    description: "Plump, fresh coastal oysters poached gently with silken tofu in a delicate, briny broth.",
    hasSpiceLevel: true
  },
  {
    id: "tofu-intestine",
    name: "Beef Intestine Soon Tofu",
    koreanName: "곱창 순두부",
    price: 17.49,
    category: "tofu",
    image: "/images/mix-soon-tofu.png",
    description: "Savory, chewy Gopchang (tender beef small intestines) stewed in robust spicy pepper broth with silken tofu curds.",
    hasSpiceLevel: true,
    badge: "Authentic"
  },

  // HOUSE SPECIALS
  {
    id: "special-galbi-jjim",
    name: "Spicy Galbi Jjim (Braised Beef Short Ribs)",
    koreanName: "매운갈비찜",
    price: 79.99,
    category: "specials",
    image: "/images/galbi-jjim.jpg",
    description: "Grand festive centerpiece for 2-3 guests! Fall-off-the-bone prime beef short ribs slow-braised in a rich, glossy spicy chili pepper sauce with tender radish, shiitake, and carrots.",
    isPopular: true,
    badge: "Grand Feast"
  },
  {
    id: "special-galbi",
    name: "Galbi (Grilled KBBQ Short Ribs)",
    koreanName: "갈비",
    price: 32.99,
    category: "specials",
    image: "/images/galbi-sizzling.png",
    description: "Generous sizzling cast iron platter of premium Korean BBQ beef short ribs charred to perfection over flame with caramelized sweet onions.",
    isPopular: true,
    badge: "Sizzling Plate"
  },
  {
    id: "special-marinated-crab",
    name: "Spicy Marinated Crab",
    koreanName: "양념게장",
    price: 32.99,
    category: "specials",
    image: "/images/hero-feast.jpg",
    description: "Fresh raw blue crab marinated in a vibrant sweet-and-spicy chili pepper garlic sauce (Yangnyeom Gejang). A beloved Koreatown 'rice thief'.",
    badge: "Koreatown Legend"
  },
  {
    id: "special-bulgogi",
    name: "Bulgogi (Marinated Beef)",
    koreanName: "불고기",
    price: 28.99,
    category: "specials",
    image: "/images/hero-feast.jpg",
    description: "Classic marinated ribeye beef slices sautéed with sweet onions, scallions, and toasted sesame seeds on a hot platter."
  },
  {
    id: "special-spicy-pork",
    name: "Spicy Pork (Jeyuk Bokkeum)",
    koreanName: "돼지불고기",
    price: 27.99,
    category: "specials",
    image: "/images/hero-feast.jpg",
    description: "Spicy gochujang marinated pork belly slices seared over high heat with roasted garlic and scallions."
  },
  {
    id: "special-seafood-pancake",
    name: "Seafood Pancake (Haemul Pajeon)",
    koreanName: "해물파전",
    price: 26.99,
    category: "specials",
    image: "/images/seafood-pancake.png",
    description: "Extra crispy, oversized golden pancake loaded with whole scallions, tender squid, and plump shrimp, served with seasoned soy-chili dipping sauce.",
    isPopular: true,
    badge: "Crispy Delight"
  },
  {
    id: "special-yellow-croaker",
    name: "Deep Fried Yellow Croaker",
    koreanName: "조기구이",
    price: 26.99,
    category: "specials",
    image: "/images/yellow-croaker.png",
    description: "Two whole yellow croakers deep-fried until shatteringly crispy outside, tender and juicy inside, seasoned with sea salt.",
    isPopular: true
  },
  {
    id: "special-spicy-chicken",
    name: "Spicy Chicken",
    koreanName: "매운닭불고기",
    price: 26.99,
    category: "specials",
    image: "/images/hero-feast.jpg",
    description: "Flame-seared tender chicken thighs stir-fried in chef's signature red chili sauce with onions."
  },
  {
    id: "special-soy-chicken",
    name: "Soy Sauce Chicken",
    koreanName: "간장닭불고기",
    price: 26.99,
    category: "specials",
    image: "/images/hero-feast.jpg",
    description: "Sweet and savory soy garlic glazed chicken sautéed with vegetables."
  },
  {
    id: "special-spicy-squid",
    name: "Spicy Stir-Fried Squid (Ojingeo Bokkeum)",
    koreanName: "오징어볶음",
    price: 24.99,
    category: "specials",
    image: "/images/hero-feast.jpg",
    description: "Tender calamari squid stir-fried with crunchy cabbage, scallions, and fiery Korean chili pepper sauce."
  },
  {
    id: "special-japchae",
    name: "Japchae (Glass Noodles)",
    koreanName: "잡채",
    price: 22.99,
    category: "specials",
    image: "/images/hero-feast.jpg",
    description: "Sweet potato glass noodles stir-fried with rich sesame oil, spinach, shiitake mushrooms, carrots, and sweet soy."
  },
  {
    id: "special-galbitang",
    name: "Beef Rib Soup (Galbitang)",
    koreanName: "갈비탕",
    price: 22.99,
    category: "specials",
    image: "/images/galbitang.png",
    description: "Deeply comforting clear beef bone broth simmered for hours with massive, fall-off-the-bone beef short ribs, chewy glass noodles, and delicate egg ribbon garnish.",
    isPopular: true,
    badge: "Comfort Classic"
  },
  {
    id: "special-bibimbob",
    name: "Bibimbob",
    koreanName: "비빔밥",
    price: 20.99,
    category: "specials",
    image: "/images/bibimbap.png",
    description: "Served in an authentic Korean golden brass bowl with seasoned mountain greens, zucchini, carrots, seasoned beef, and a perfect sunny-side-up egg."
  },
  {
    id: "special-donkatsu",
    name: "Pork Cutlet / Cheese Donkach",
    koreanName: "돈까스",
    price: 20.99,
    category: "specials",
    image: "/images/cheese-donkatsu.png",
    description: "Golden crispy panko-crusted pork cutlet smothered with rich, stretching mozzarella cheese, served with sesame cabbage slaw and tonkatsu sauce.",
    isPopular: true,
    badge: "Viral Stretch"
  },
  {
    id: "special-kimchi-fried-rice",
    name: "Kimchi Fried Rice",
    koreanName: "김치볶음밥",
    price: 18.99,
    category: "specials",
    image: "/images/bibimbap.png",
    description: "Smoky wok-fried rice with aged kimchi, pork crumbles, toasted seaweed, sesame oil, and topped with a sunny-side-up fried egg."
  },
  {
    id: "special-dumplings",
    name: "Fried Dumplings (8 pcs)",
    koreanName: "만두튀김",
    price: 10.99,
    category: "specials",
    image: "/images/mix-soon-tofu.png",
    description: "Eight golden crispy pan-fried dumplings filled with seasoned pork, chives, and tofu, served with spicy vinegar soy dip."
  },

  // DRINKS
  {
    id: "drink-soju",
    name: "Korean Soju (Chamisul / Jinro)",
    koreanName: "소주",
    price: 11.99,
    category: "drinks",
    image: "/images/korean-drinks.jpg",
    description: "The quintessential Korean spirit. Clean, smooth, and refreshing 375ml green bottle. Pairs perfectly with Soon Tofu and KBBQ.",
    badge: "21+ Only"
  },
  {
    id: "drink-makgeolli",
    name: "Makgeolli (Cloudy Rice Wine)",
    koreanName: "막걸리",
    price: 11.99,
    category: "drinks",
    image: "/images/korean-drinks.jpg",
    description: "Traditional unfiltered Korean sparkling rice wine. Sweet, tangy, and served chilled in authentic golden brass bowls.",
    badge: "21+ Only"
  },
  {
    id: "drink-beer",
    name: "Korean Beer (Cass / Terra / Hite)",
    koreanName: "맥주",
    price: 8.99,
    category: "drinks",
    image: "/images/korean-drinks.jpg",
    description: "Ice-cold, ultra-crisp Korean lager bottle. The ultimate companion to sizzling meat.",
    badge: "21+ Only"
  },
  {
    id: "drink-soft",
    name: "Soft Drink / Korean Soda",
    koreanName: "음료수",
    price: 2.50,
    category: "drinks",
    image: "/images/korean-drinks.jpg",
    description: "Choice of Coca-Cola, Diet Coke, Sprite, or Korean specialty beverages (Milkis, Sac Sac Orange)."
  }
];
