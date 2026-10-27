/* =====================================================================
   PERSONALIZE HERE — everything you are likely to change lives in CONFIG
   ===================================================================== */
window.CONFIG = {
  herName: "Kareen",      // Leave "" to use "The Birthday Girl".
  nickname: "Kooks",      // What you call her. Used in the friendlier spots. Leave "" to use herName.
  myName: "",             // e.g. "Mohammad". Leave "" to sign as the Planning Department.
  // Your WhatsApp number in international format, digits only, no + or spaces.
  // Example for Lebanon: "96170123456". Leave "" and WhatsApp will let her pick the chat.
  whatsappNumber: "+96171139833",
  // Countdown target. Beirut is UTC+02:00 in November. Change the time once pickup is set.
  eventStart: "2026-11-08T00:00:00+02:00",
  eventDateLabel: "Sunday, November 8, 2026",

  breakfast: [
    { id: "lebanese", code: "LBF", icon: "wheat",       title: "Classic Lebanese",        desc: "Manoushe, labneh, cheese, olives and vegetables." },
    { id: "eggs",     code: "EGG", icon: "egg-fried",   title: "Eggs & toast",            desc: "Tell me the style. I won’t guess." },
    { id: "pastries", code: "CRS", icon: "croissant",   title: "Croissants & pastries",   desc: "Flaky, buttery, slightly messy." },
    { id: "pancakes", code: "PNK", icon: "layers",      title: "Pancakes or waffles",     desc: "Syrup diplomacy." },
    { id: "healthy",  code: "FIT", icon: "apple",       title: "Healthy breakfast",       desc: "Yogurt, fruit, granola, good intentions." },
    { id: "sandwich", code: "SDW", icon: "sandwich",    title: "A sandwich",              desc: "Portable and road-trip approved." },
    { id: "sweet",    code: "SWT", icon: "cake-slice",  title: "Coffee & something sweet",desc: "Breakfast, but make it dessert." },
    { id: "surprise", code: "???", icon: "sparkles",    title: "Surprise me!",            desc: "Full trust in the Department." },
    { id: "other",    code: "OTH", icon: "pencil-line", title: "Other",                   desc: "Let me specify." }
  ],
  drinks: [
    { id: "coffee", icon: "coffee",      title: "Coffee" },
    { id: "tea",    icon: "leaf",        title: "Tea" },
    { id: "juice",  icon: "citrus",      title: "Juice" },
    { id: "other",  icon: "pencil-line", title: "Something else" }
  ],
  lunch: [
    { id: "lebanese",   code: "LEB", icon: "salad",            title: "Lebanese",              desc: "Mezze, grills, the whole table." },
    { id: "italian",    code: "ITA", icon: "chef-hat",         title: "Italian",               desc: "Pasta-forward thinking." },
    { id: "burgers",    code: "BRG", icon: "beef",             title: "Burgers & fries",       desc: "A classic for a reason." },
    { id: "pizza",      code: "PZA", icon: "pizza",            title: "Pizza",                 desc: "No pineapple debates today." },
    { id: "asian",      code: "ASN", icon: "soup",             title: "Asian",                 desc: "Sushi, noodles, dumplings." },
    { id: "grilled",    code: "GRL", icon: "flame",            title: "Grilled food",          desc: "Smoke, char, happiness." },
    { id: "healthy",    code: "FIT", icon: "apple",            title: "Healthy",               desc: "Fresh, light, still delicious." },
    { id: "restaurant", code: "RST", icon: "utensils-crossed", title: "A nice restaurant",     desc: "Sit down, linen napkins." },
    { id: "street",     code: "STR", icon: "store",            title: "Street food / casual",  desc: "A quick stop with big flavor." },
    { id: "surprise",   code: "???", icon: "sparkles",         title: "Surprise me!",          desc: "The Department will deliberate." },
    { id: "other",      code: "OTH", icon: "pencil-line",      title: "Other",                 desc: "Let me specify." }
  ],
  terms: [
    ["The destination remains confidential until the appropriate time.", "The appropriate time is not now."],
    ["Comfortable shoes are strongly encouraged.", "Your feet will thank you around 3 PM."],
    ["Good vibes are mandatory, although occasional dramatic complaints are permitted.", ""],
    ["There will be a lovely road trip and a few activities selected with you in mind.", ""],
    ["You are encouraged to take pictures, laugh, relax, and enjoy the day.", ""],
    ["You are not allowed to complain about being bored before the activities have even started.", ""],
    ["Birthday girl privileges apply throughout the day.", "See the privileges card below."],
    ["Food preferences will be taken seriously.", "Very seriously. There may be a spreadsheet."],
    ["The birthday girl is expected to have an excellent time.", ""],
    ["Asking for the complete itinerary in advance may result in absolutely no useful information being provided.", "You may try anyway."]
  ],
  peeks: [
    ["Nice try.", "Still classified.", "Somewhere with a view. That’s all you get.", "The map is lying on purpose."],
    ["Sealed. Firmly.", "You’ll like it. That’s the hint.", "Wear the comfortable shoes."],
    ["Patience is part of the activity.", "Trust the process.", "You’ll thank me later. As stated."],
    ["Top secret means top secret.", "Not even a little clue.", "Access denied, birthday girl."]
  ]
};
