export const RESTAURANT_INFO = {
  name: "Veggie Castle II",
  tagline: "100% Vegan Caribbean Comfort Food & Juice Bar in South Richmond Hill",
  address: "132-09 Liberty Ave, South Richmond Hill, NY 11419",
  neighborhood: "South Richmond Hill, Queens, NY",
  phone: "718.641.8342",
  phoneRaw: "+17186418342",
  phone2: "718.975.4978",
  phone2Raw: "+17189754978",
  phone2Label: "Brooklyn (Flatbush Ave)",
  instagram: "@veggiecastle",
  instagramUrl: "https://www.instagram.com/veggiecastle/",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Veggie+Castle+II+132-09+Liberty+Ave+South+Richmond+Hill+NY+11419",
  hours: [
    { days: "Monday – Sunday", time: "9:30 AM – 10:00 PM" }
  ],
  features: [
    "0% Fee Direct Online Ordering",
    "100% Plant-Based & Vegan",
    "Fresh Cold-Pressed Juice Bar",
    "Pickup & Local Delivery"
  ]
};

export const SIDES_LIST = [
  "Rice & Peas", "Yellow Rice", "Spinach Rice w/ Chick Peas",
  "Fried Rice", "Cook Up Rice", "Vegetable Chow Mein",
  "Mac & Cheese", "Baked Ziti", "Vegan Rasta Pasta",
  "Stir-Fry Veggies", "String Beans & Mushrooms",
  "Roasted or Stewed Eggplant", "Okra", "Collard Greens",
  "Broccoli & Cauliflower Medley (Steamed)",
  "Kale", "Spinach", "Asparagus", "Butternut Squash",
  "Brussel Sprouts", "Acorn Squash W/ Walnuts",
  "Stewed Peas", "Curry or Stewed Chick Peas"
];

export const PROTEIN_OPTIONS = {
  tofuAndJackfruit: [
    "Sweet n Sour", "Stir-Fry", "BBQ Jackfruit",
    "Curry", "Scrambled Tofu", "Curry Jackfruit",
    "Jerk", "Jerk Jackfruit"
  ],
  seitanAndSoy: [
    "Curry Seitan", "Curry Beef", "Stir-fry Salmon",
    "Stew Seitan", "Oxtail", "Vegan Saltfish",
    "Ginger Chicken", "Stew Beef", "Pepper Pot",
    "Curry Chicken", "Stir-Fry Beef", "Drumsticks",
    "Jerk Chicken", "Stew Salmon"
  ]
};

export const CATEGORIES = [
  { id: "all",      label: "All Items" },
  { id: "grill",   label: "Grill Menu" },
  { id: "proteins",label: "Protein Plates" },
  { id: "salads",  label: "Salads & Wraps" },
  { id: "juices",  label: "Juice Cures" },
  { id: "blends",  label: "Signature Blends" },
];

export const SPICE_LEVELS = [
  {
    id: "mild",
    name: "Mild ? Island Herbs & Thyme",
    desc: "Gentle island aromatics, fresh thyme, scallions, garlic, sweet peppers, and coconut milk with zero burn.",
    color: "#156E34"
  },
  {
    id: "medium",
    name: "Medium ? Scotch Bonnet Warmth",
    desc: "Classic Caribbean warmth with authentic Jamaican pimento and a balanced hint of sun-ripened Scotch Bonnet.",
    color: "#D9820B"
  },
  {
    id: "hot",
    name: "Fiery Hot ? Authentic Island Kick",
    desc: "Bold and fiery with freshly crushed Scotch Bonnet peppers for true island spice lovers.",
    color: "#E63946"
  }
];

export const MENU_ITEMS = [
  // GRILL MENU
  { 
    id: "grill-classic-veggie-burger", 
    name: "Classic Veggie Burger", 
    price: 7.00, 
    comboPrice: 12.00, 
    category: "grill", 
    description: "Soy or Black Bean Burger, Lettuce, Tomatoes, Pickles, Onions, Ketchup, Signature Burger Sauce on Whole Wheat Bun.", 
    comboDesc: "Combo includes Fries and Bottled Juice.", 
    isPopular: true, 
    badge: "Fan Favorite",
    image: "/images/oyster-mushroom-burger.jpg"
  },
  { 
    id: "grill-veggie-burger-supreme", 
    name: "Veggie Burger Supreme", 
    price: 9.00, 
    comboPrice: 14.00, 
    category: "grill", 
    description: "Lettuce, Tomato, Onions, Pickles, Ketchup, Signature Burger Sauce.", 
    comboDesc: "Combo includes Fries and Bottled Juice.", 
    isPopular: true,
    badge: "House Favorite",
    image: "/images/oyster-mushroom-burger.jpg"
  },
  { 
    id: "grill-vegan-classic-chicken", 
    name: "Vegan Classic Chicken Sandwich", 
    price: 7.00, 
    comboPrice: 12.00, 
    category: "grill", 
    description: "Lettuce, Tomato, Onions, Pickles, Ketchup, Signature Burger Sauce.", 
    comboDesc: "Combo includes Fries and Bottled Juice.",
    badge: "Classic",
    image: "/images/vegan-chopped-cheese.jpg"
  },
  { 
    id: "grill-jerk-vegan-chicken", 
    name: "Jerk Vegan Chicken Sandwich", 
    price: 7.00, 
    comboPrice: 12.00, 
    category: "grill", 
    description: "Lettuce, Tomato, Cucumber, Onions, BBQ Sauce and Burger Sauce.", 
    comboDesc: "Combo includes Fries and Bottled Juice.", 
    isPopular: true, 
    badge: "Jerk Style",
    image: "/images/vegan-jerk-wrap.jpg"
  },
  { 
    id: "grill-vegan-fish-n-chips", 
    name: "Vegan Fish N' Chips", 
    price: 12.00, 
    category: "grill", 
    description: "Crispy battered golden vegan fish fillets served with hot seasoned french fries, homemade tartar sauce, and lemon.", 
    isPopular: true, 
    badge: "Island Classic",
    image: "/images/vegan-fish-chips.jpg"
  },
  { 
    id: "grill-vegan-fish-sandwich", 
    name: "Vegan Fish Sandwich", 
    price: 7.00, 
    comboPrice: 12.00, 
    category: "grill", 
    description: "Lettuce, Tomato, Pickles, Onion, Remoulade Sauce on a toasted bun.", 
    comboDesc: "Combo includes Fries and Bottled Juice.",
    badge: "Crispy",
    image: "/images/vegan-fish-chips.jpg"
  },
  { 
    id: "grill-oyster-mushroom-burger", 
    name: "Oyster Mushroom Burger", 
    price: 10.00, 
    comboPrice: 14.00, 
    category: "grill", 
    description: "Crispy fried golden oyster mushrooms, vegan cheddar, lettuce, tomato, pickles, onions, ketchup, house remoulade on brioche.", 
    comboDesc: "Combo includes Fries and Bottled Juice.", 
    isPopular: true, 
    badge: "Best Seller #1",
    image: "/images/oyster-mushroom-burger.jpg"
  },
  { 
    id: "grill-jackfruit-sandwich", 
    name: "Jackfruit Sandwich", 
    price: 9.11, 
    category: "grill", 
    description: "BBQ Jackfruit, Vegan Cheese, Coleslaw, Fried Onion Rings, Signature Burger Sauce.",
    badge: "BBQ Jackfruit",
    image: "/images/vegan-chopped-cheese.jpg"
  },
  { 
    id: "grill-rasta-man-special", 
    name: "Rasta Man Special", 
    price: 12.00, 
    category: "grill", 
    description: "Chicken or Burger Strips with Fries and a Salad. Ketchup and Sweet Onion Vinaigrette.", 
    badge: "Signature",
    image: "/images/vegan-feast-hero.jpg"
  },
  { 
    id: "grill-po-boy", 
    name: "Po Boy", 
    price: 10.53, 
    category: "grill", 
    description: "Fried Oyster Mushroom, Lettuce, Shredded Carrots, Cucumbers, Red Onions, and Remoulade Sauce on a Hero.",
    badge: "Hero Sandwich",
    image: "/images/vegan-fish-chips.jpg"
  },
  { 
    id: "grill-chopped-cheese", 
    name: "Chopped Cheese", 
    price: 10.53, 
    category: "grill", 
    description: "Sizzling plant-based beef, grilled onions, melted vegan cheese, lettuce, tomato, chipotle and burger sauce on a toasted hero roll.", 
    isPopular: true, 
    badge: "Queens Legend",
    image: "/images/vegan-chopped-cheese.jpg"
  },
  { 
    id: "grill-impossible-burger", 
    name: "Impossible Burger", 
    price: 13.53, 
    category: "grill", 
    description: "Classic / BBQ Style / Cali Style. Sizzling plant-based Impossible patty with vegan cheese, crisp veggies, and signature sauce.", 
    badge: "Plant-Based Beef",
    image: "/images/vegan-chopped-cheese.jpg"
  },
  { 
    id: "grill-philly-cheese-steak", 
    name: "Philly Cheese Steak", 
    price: 8.17, 
    category: "grill", 
    description: "Grilled Mushrooms, Onion and Pepper with Vegan Cheese and Burger Sauce on a toasted hero.",
    badge: "Savory",
    image: "/images/vegan-chopped-cheese.jpg"
  },

  // PROTEIN PLATES
  { 
    id: "protein-small", 
    name: "Small Protein Plate", 
    price: 9.00, 
    category: "proteins", 
    description: "2 Sides + 1 Protein. Choose from Tofu & Jackfruit or Seitan & Soy options. Served with seasoned rice and hot island sides.", 
    isPopular: true, 
    badge: "2 Sides + 1 Protein",
    image: "/images/vegan-curry-plate.jpg"
  },
  { 
    id: "protein-medium", 
    name: "Medium Protein Plate", 
    price: 12.50, 
    category: "proteins", 
    description: "2 Sides + 2 Proteins. Mix and match your favorite plant-based proteins (Jerk Jackfruit, Curry Tofu, Vegan Saltfish, Seitan) with Caribbean sides.", 
    isPopular: true, 
    badge: "2 Sides + 2 Proteins",
    image: "/images/vegan-curry-plate.jpg"
  },
  { 
    id: "protein-large", 
    name: "Large Protein Plate", 
    price: 17.00, 
    category: "proteins", 
    description: "3 Sides + 2 Proteins. The ultimate Caribbean vegan feast: two proteins, three hot sides (Rice & Peas, Mac & Cheese, Plantains, Callaloo).", 
    isPopular: true, 
    badge: "3 Sides + 2 Proteins",
    image: "/images/vegan-feast-hero.jpg"
  },

  // SALADS & WRAPS
  { 
    id: "salad-garden", 
    name: "Garden Salad", 
    price: 9.99, 
    category: "salads", 
    description: "Romaine, Arugula, Red Onions, Tomatoes, Cucumber, Avocado, Chickpeas. Choice of Sweet Onion Vinaigrette, Ranch, Goddess, or House Dressing.", 
    isPopular: true,
    badge: "Fresh & Crisp",
    image: "/images/fresh-island-salad.jpg"
  },
  { 
    id: "salad-falafel", 
    name: "Falafel Salad", 
    price: 11.99, 
    category: "salads", 
    description: "Garden salad base topped with crispy golden falafels and house garlic tahini dressing.",
    badge: "Golden Falafel",
    image: "/images/fresh-island-salad.jpg"
  },
  { 
    id: "salad-vegan-steak", 
    name: "Vegan Steak Salad", 
    price: 12.99, 
    category: "salads", 
    description: "Garden salad base topped with seasoned vegan steak strips, avocado, and balsamic vinaigrette.", 
    isPopular: true, 
    badge: "High Protein",
    image: "/images/fresh-island-salad.jpg"
  },
  { 
    id: "salad-vegan-chicken", 
    name: "Vegan Chicken Salad", 
    price: 11.99, 
    category: "salads", 
    description: "Garden salad base topped with juicy vegan grilled chicken strips and house dressing.",
    badge: "Plant Protein",
    image: "/images/fresh-island-salad.jpg"
  },
  { 
    id: "salad-vegan-fish", 
    name: "Vegan Fish Salad", 
    price: 12.99, 
    category: "salads", 
    description: "Garden salad topped with Veggie Castle's famous seasoned vegan fish fillets.",
    badge: "Island Herb",
    image: "/images/fresh-island-salad.jpg"
  },
  { 
    id: "salad-tarrus-riley", 
    name: "Tarrus 'Singy Singy' Riley Special", 
    price: 14.99, 
    category: "salads", 
    description: "Grilled Jerk Chicken Salad tossed with Cassava and Sweet Plantains. Named after legendary reggae artist Tarrus Riley.", 
    isPopular: true, 
    badge: "Celebrity Special",
    image: "/images/vegan-jerk-wrap.jpg"
  },
  { 
    id: "wrap-grilled-jerk-chicken", 
    name: "Grilled / Jerk Chicken Wrap", 
    price: 10.99, 
    category: "salads", 
    description: "Vegan Jerk Chicken, Romaine and Arugula, Vegan Cheddar, Sliced Avocado, and Chipotle Mayo wrapped in spinach tortilla.", 
    isPopular: true,
    badge: "Jerk Wrap",
    image: "/images/vegan-jerk-wrap.jpg"
  },

  // JUICE CURES
  { 
    id: "juice-cold", 
    name: "Cold Buster Juice", 
    price: 7.99, 
    category: "juices", 
    description: "Cayenne, Grapefruit, Garlic, Ginger, Lemon, Orange. Nature's immune-boosting powerhouse.", 
    isPopular: true, 
    badge: "Immune Boost",
    image: "/images/cold-pressed-juices.jpg"
  },
  { 
    id: "juice-multi-v", 
    name: "Multi V", 
    price: 8.99, 
    category: "juices", 
    description: "Carrot, Apple, Beets, Papaya, Pineapple, Mixed Berries, Celery, Broccoli, Ginger. Complete vitamin surge.", 
    isPopular: true, 
    badge: "Bestseller #1",
    image: "/images/cold-pressed-juices.jpg"
  },
  { 
    id: "juice-acai", 
    name: "Acai Berry Blend", 
    price: 9.99, 
    category: "juices", 
    description: "Acai Berries, Mixed Berries, and Pineapple. Pure antioxidant superfood blend.", 
    isPopular: true, 
    badge: "Superfood",
    image: "/images/cold-pressed-juices.jpg"
  },
  { 
    id: "juice-green", 
    name: "Green Juice", 
    price: 8.99, 
    category: "juices", 
    description: "Spinach, Kale, Parsley, Celery, Watercress, Cucumber and Broccoli. 100% alkalizing green vitalizer.",
    badge: "Pure Green",
    image: "/images/cold-pressed-juices.jpg"
  },
  { 
    id: "juice-protein-shake", 
    name: "Protein Shake", 
    price: 10.99, 
    category: "juices", 
    description: "Banana, Plant Protein Powder, Almond Milk, Cinnamon and Sea Moss. High-protein recovery fuel.", 
    isPopular: true, 
    badge: "High Protein",
    image: "/images/sea-moss-smoothie.jpg"
  },
  { 
    id: "juice-red-lion", 
    name: "The Red Lion", 
    price: 8.99, 
    category: "juices", 
    description: "Beet, Mixed Berries, and Apple. Powerful blood-building and endurance blend.", 
    badge: "Blood Builder",
    image: "/images/cold-pressed-juices.jpg"
  },
  { 
    id: "juice-wheatgrass", 
    name: "Wheatgrass Shot", 
    price: 5.99, 
    category: "juices", 
    description: "Pure raw Wheatgrass shot. Detoxifying, alkalizing, and instant energy surge.", 
    badge: "Detox Shot",
    image: "/images/cold-pressed-juices.jpg"
  },
  { 
    id: "juice-brain-booster", 
    name: "Brain Booster", 
    price: 8.99, 
    category: "juices", 
    description: "Spinach, Celery, Carrot and Lemon. Sharpen your focus and mental clarity naturally.",
    badge: "Focus Blend",
    image: "/images/cold-pressed-juices.jpg"
  },
  { 
    id: "juice-hangover", 
    name: "Hangover Cure", 
    price: 7.99, 
    category: "juices", 
    description: "Watermelon, Ginger, Orange, Cucumber. Fast deep cellular rehydration and electrolyte replenishment.",
    badge: "Electrolytes",
    image: "/images/cold-pressed-juices.jpg"
  },
  { 
    id: "juice-skin-moisture", 
    name: "Skin Moisture", 
    price: 8.99, 
    category: "juices", 
    description: "Apple, Pineapple, Ginger, and Aloe. Hydrate and glow from the inside out.", 
    badge: "Glow Up",
    image: "/images/cold-pressed-juices.jpg"
  },
  { 
    id: "juice-stress", 
    name: "Stress Reliever", 
    price: 7.99, 
    category: "juices", 
    description: "Strawberry, Banana, Almond Milk, and Chamomile extract. Calming and soothing nourishment.",
    badge: "Relaxation",
    image: "/images/cold-pressed-juices.jpg"
  },
  { 
    id: "juice-depression", 
    name: "Depression Cure", 
    price: 7.99, 
    category: "juices", 
    description: "Carrot, Beet, Apple, Spinach. Mood-lifting and dopamine-supporting natural blend.",
    badge: "Mood Lift",
    image: "/images/cold-pressed-juices.jpg"
  },
  { 
    id: "juice-diabetes", 
    name: "Diabetes Control", 
    price: 7.99, 
    category: "juices", 
    description: "Watercress, Celery, Parsley, Aloe, and Cucumber. Low glycemic, insulin-sensitizing greens.",
    badge: "Low Glycemic",
    image: "/images/cold-pressed-juices.jpg"
  },
  { 
    id: "juice-kidney", 
    name: "Kidney Cleanser", 
    price: 7.99, 
    category: "juices", 
    description: "Carrot, Beet, and Celery. Traditional cleansing tonic for kidneys and lymphatic flow.",
    badge: "Detox Cleanser",
    image: "/images/cold-pressed-juices.jpg"
  },

  // SIGNATURE BLENDS
  { 
    id: "blend-ital-jockey", 
    name: "Ital Jockey", 
    price: 12.99, 
    category: "blends", 
    description: "Wildcrafted Sea Moss, Rolled Oats, Raw Almonds, Banana, Almond Milk, Plant Protein, Ginseng, and Island Nutmeg. The legendary Veggie Castle signature power blend.", 
    isPopular: true, 
    badge: "Original Signature",
    image: "/images/sea-moss-smoothie.jpg"
  },
  { 
    id: "blend-fruit-moss", 
    name: "Fruit Moss", 
    price: 11.99, 
    category: "blends", 
    description: "Wildcrafted Sea Moss, Mango, Banana, Mixed Berries, Pineapple, and Papaya. Tropical island vitamin explosion.", 
    isPopular: true, 
    badge: "Tropical Sea Moss",
    image: "/images/sea-moss-smoothie.jpg"
  },
  { 
    id: "blend-carrot-moss", 
    name: "Carrot Moss", 
    price: 11.99, 
    category: "blends", 
    description: "Fresh Carrot Juice, Sea Moss, Rolled Oats, Almonds, Banana, Almond Milk, Plant Protein, Ginseng, and Cinnamon.", 
    badge: "Carrot & Moss",
    image: "/images/sea-moss-smoothie.jpg"
  },
  { 
    id: "blend-spinach-moss", 
    name: "Spinach Moss", 
    price: 11.99, 
    category: "blends", 
    description: "Organic Spinach, Wildcrafted Sea Moss, Spirulina, Rolled Oats, Almonds, Banana, Almond Milk, Plant Protein, and Spices.", 
    badge: "Green Power Moss",
    image: "/images/sea-moss-smoothie.jpg"
  },
  { 
    id: "blend-the-juliet", 
    name: "The Juliet", 
    price: 12.99, 
    category: "blends", 
    description: "Strawberry, Banana, Papaya, Pineapple, Almond Milk, Crushed Almonds, and Caribbean Spices. Sweet, velvety, indulgent.", 
    isPopular: true, 
    badge: "Sweet & Creamy",
    image: "/images/sea-moss-smoothie.jpg"
  },
  { 
    id: "blend-sexual-drive", 
    name: "Sexual Drive", 
    price: 13.99, 
    category: "blends", 
    description: "Melon, Ginger, Banana, Sea Moss, Maca Root, and Yohimbe. The legendary stamina, circulation, and vitality elixir.", 
    badge: "Vitality Boost",
    image: "/images/sea-moss-smoothie.jpg"
  },
];
