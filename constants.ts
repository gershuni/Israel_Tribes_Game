
import { RegionData, TribeData, TribeId, BiblicalCity, LocalizedString } from './types';

// UI Translations
export const UI_LABELS = {
  title: { he: "נחלות השבטים", en: "Tribes of Israel Map" },
  subtitleEasy: { he: "התאימו בין השבט לנחלה", en: "Match the Tribe to its Territory" },
  subtitleHard: { he: "התאימו בין השופט לנחלת שבטו", en: "Match the Judge to their Tribe's Land" },
  modeTribes: { he: "שבטים", en: "Tribes" },
  modeJudges: { he: "שופטים (מתקדם)", en: "Judges (Hard)" },
  citiesShow: { he: "ערים", en: "Cities" },
  hint: { he: "רמז", en: "Hint" },
  showAll: { he: "הצג הכל", en: "Show All" },
  hideAll: { he: "הסתר הכל", en: "Hide All" },
  score: { he: "ניקוד", en: "Score" },
  completed: { he: "הושלמו", en: "Done" },
  infoTitle: { he: "דבר תורה", en: "Biblical Source" },
  instructionsTitle: { he: "הנחיות", en: "Instructions" },
  instructionsEasy: { 
    he: "לחצו על שם של שבט ועל הנחלה המתאימה לו במפה.", 
    en: "Click on a Tribe name and then select its matching territory on the map." 
  },
  instructionsHard: { 
    he: "בחרו שופט והתאימו אותו לנחלת שבטו במפה.", 
    en: "Select a Judge and match them to their Tribe's territory on the map." 
  },
  identification: { he: "הזיהוי:", en: "Identification:" },
  winTitle: { he: "חזק חזק ונתחזק!", en: "Chazak Chazak V'nitchazek!" },
  winMessage: { he: "השלמתם את מפת נחלות השבטים בהצלחה.", en: "You have successfully completed the Map of the Tribes." },
  finalScore: { he: "ניקוד סופי", en: "Final Score" },
  restart: { he: "התחל מחדש", en: "Play Again" },
  footerQuote: { he: "\"קום התהלך בארץ לארכה ולרחבה\" (בראשית י\"ג)", en: "\"Arise, walk through the land in the length of it and in the breadth of it\" (Genesis 13:17)" },
  
  // Dynamic messages
  selectRegion: { he: "בחרו נחלה במפה", en: "Select a region on the map" },
  selectJudge: { he: "בחרו את השופט", en: "Select the Judge" },
  selectTribe: { he: "בחרו את שם השבט", en: "Select the Tribe name" },
  correctMatch: { he: "יפה מאוד! נחלת {name} זוהתה נכון", en: "Great job! {name} territory identified correctly." },
  correctMatchJudge: { he: "יפה מאוד! {judge} משבט {name}", en: "Correct! {judge} from the Tribe of {name}." },
  errorMatch: { he: "שגיאה! הנחלה שנבחרה אינה מתאימה לשבט שנבחר. נסו שנית.", en: "Incorrect! The selected region does not match the tribe. Try again." },
  hintError: { he: "יש לבחור שבט או אזור לפני השימוש ברמז", en: "Select a tribe or region before asking for a hint." },
  hintUsed: { he: "רמז: {msg} (-1 נקודה)", en: "Hint: {msg} (-1 Point)" },
  hintNotFound: { he: "לא נמצא רמז", en: "No hint found" },
  whichTribe: { he: "מאיזה שבט?", en: "Which Tribe?" },
  loading: { he: "טוען...", en: "Loading..." }
};

export const TRIBES: TribeData[] = [
  { 
    id: TribeId.ASHER, 
    name: { he: "אשר", en: "Asher" }, 
    color: "#a7d175", 
    judge: { he: "אבצן", en: "Ibzan" },
    judgeDescription: {
      he: "לפי דעה במחקר, אבצן מבית לחם הגלילית משויך לאשר.",
      en: "Ibzan of Bethlehem (Galilean) is associated with Asher to ensure all tribes had a judge."
    },
    biblicalSource: {
      text: { he: "מֵאָשֵׁר שְׁמֵנָה לַחְמוֹ וְהוּא יִתֵּן מַעֲדַנֵּי מֶלֶךְ", en: "Out of Asher his bread shall be fat, and he shall yield royal dainties." },
      source: { he: "בראשית מ\"ט, כ'", en: "Genesis 49:20" }
    },
    hint: {
      he: "בברכת משה נאמר עליו: 'בָּרוּךְ מִבָּנִים ___, יְהִי רְצוּי אֶחָיו וְטֹבֵל בַּשֶּׁמֶן רַגְלוֹ'.",
      en: "In Moses' blessing: 'Let him be acceptable to his brethren, and let him dip his foot in oil.'"
    }
  }, 
  { 
    id: TribeId.NAPHTALI, 
    name: { he: "נפתלי", en: "Naphtali" }, 
    color: "#fdbb2d", 
    judge: { he: "ברק בן אבינועם", en: "Barak ben Abinoam" },
    judgeDescription: {
      he: "ברק בן אבינועם מקדש נפתלי.",
      en: "Barak came from Kedesh-Naphtali."
    },
    biblicalSource: {
      text: { he: "נַפְתָּלִי אַיָּלָה שְׁלֻחָה הַנֹּתֵן אִמְרֵי שָׁפֶר", en: "Naphtali is a hind let loose: he giveth goodly words." },
      source: { he: "בראשית מ\"ט, כ\"א", en: "Genesis 49:21" }
    },
    hint: {
      he: "בברכת יעקב נמשל לבעל חיים זריז: 'אַיָּלָה שְׁלֻחָה הַנֹּתֵן אִמְרֵי שָׁפֶר'.",
      en: "Jacob compared him to a swift animal: 'A hind let loose: he giveth goodly words.'"
    }
  },
  { 
    id: TribeId.ZEBULUN, 
    name: { he: "זבולון", en: "Zebulun" }, 
    color: "#a58cb2", 
    judge: { he: "אילון הזבולוני", en: "Elon" },
    judgeDescription: {
      he: "הפסוק מכנה אותו במפורש 'אילון הזבולוני'.",
      en: "The text explicitly calls him 'Elon the Zebulunite'."
    },
    biblicalSource: {
      text: { he: "זְבוּלֻן לְחוֹף יַמִּים יִשְׁכֹּן וְהוּא לְחוֹף אֳנִיּוֹת", en: "Zebulun shall dwell at the haven of the sea; and he shall be for an haven of ships." },
      source: { he: "בראשית מ\"ט, י\"ג", en: "Genesis 49:13" }
    },
    hint: {
      he: "יעקב אבינו בירך אותו שיעסוק במסחר ימי: 'לְחוֹף יַמִּים יִשְׁכֹּן וְהוּא לְחוֹף אֳנִיּוֹת'.",
      en: "Blessed to be involved in maritime trade: 'He shall dwell at the haven of the sea'."
    }
  },
  { 
    id: TribeId.ISSACHAR, 
    name: { he: "יששכר", en: "Issachar" }, 
    color: "#ef4444", 
    judge: { he: "תולע בן פואה", en: "Tola ben Puah" },
    judgeDescription: {
      he: "הפסוק מעיד: 'תולע בן פואה... איש יששכר'.",
      en: "The verse states: 'Tola the son of Puah... a man of Issachar'."
    },
    biblicalSource: {
      text: { he: "יִשָּׂשכָר חֲמֹר גָּרֶם רֹבֵץ בֵּין הַמִּשְׁפְּתָיִם", en: "Issachar is a strong ass couching down between two burdens." },
      source: { he: "בראשית מ\"ט, י\"ד", en: "Genesis 49:14" }
    },
    hint: {
      he: "נמשל לחמור גרם (חזק) הנושא עול תורה, ונאמר עליו: 'וַיַּרְא מְנֻחָה כִּי טוֹב'.",
      en: "Compared to a strong donkey bearing the yoke of Torah, seeing that 'rest was good'."
    }
  },
  { 
    id: TribeId.MANASSEH, 
    name: { he: "מנשה", en: "Manasseh" }, 
    color: "#e8d92e", 
    judge: { he: "גדעון בן יואש", en: "Gideon" },
    judgeDescription: {
      he: "גדעון התגורר בעפרה אשר בנחלת מנשה.",
      en: "Gideon lived in Ophrah, located in the territory of Manasseh."
    },
    biblicalSource: {
      text: { he: "בְּכוֹר שׁוֹרוֹ הָדָר לוֹ... וְהֵם אַלְפֵי מְנַשֶּׁה", en: "His glory is like the firstling of his bullock... and they are the thousands of Manasseh." },
      source: { he: "דברים ל\"ג, י\"ז", en: "Deuteronomy 33:17" }
    },
    hint: {
      he: "בנו הבכור של יוסף, שיעקב שיכל את ידיו בברכה, אך הבטיח שגם הוא יגדל לעם.",
      en: "Joseph's firstborn, yet Jacob crossed his hands during the blessing, giving precedence to the younger."
    }
  },
  { 
    id: TribeId.GAD, 
    name: { he: "גד", en: "Gad" }, 
    color: "#7bbba3", 
    judge: { he: "יפתח הגלעדי", en: "Jephthah" },
    judgeDescription: {
      he: "יפתח היה מהגלעד, אזור נחלת גד.",
      en: "Jephthah was a Gileadite; Gilead was part of Gad's territory."
    },
    biblicalSource: {
      text: { he: "גָּד גְּדוּד יְגוּדֶנּוּ וְהוּא יָגֻד עָקֵב", en: "Gad, a troop shall overcome him: but he shall overcome at the last." },
      source: { he: "בראשית מ\"ט, י\"ט", en: "Genesis 49:19" }
    },
    hint: {
      he: "שבט של לוחמים אמיצים, עליו נאמר: 'גְּדוּד יְגוּדֶנּוּ וְהוּא יָגֻד עָקֵב'.",
      en: "A tribe of brave warriors: 'A troop shall overcome him: but he shall overcome at the last.'"
    }
  },
  { 
    id: TribeId.REUBEN, 
    name: { he: "ראובן", en: "Reuben" }, 
    color: "#fdf6aa", 
    judge: { he: "יאיר הגלעדי", en: "Jair" },
    judgeDescription: {
      he: "חלק מהגלעד היה בנחלת ראובן.",
      en: "Part of Gilead fell within Reuben's territory."
    },
    biblicalSource: {
      text: { he: "רְאוּבֵן בְּכֹרִי אַתָּה כֹּחִי וְרֵאשִׁית אוֹנִי", en: "Reuben, thou art my firstborn, my might, and the beginning of my strength." },
      source: { he: "בראשית מ\"ט, ג'", en: "Genesis 49:3" }
    },
    hint: {
      he: "בכור בניו של יעקב. אביו אמר עליו: 'פַּחַז כַּמַּיִם אַל תּוֹתַר'.",
      en: "The firstborn of Jacob. His father said: 'Unstable as water, thou shalt not excel.'"
    }
  },
  { 
    id: TribeId.EPHRAIM, 
    name: { he: "אפרים", en: "Ephraim" }, 
    color: "#fefce8", 
    judge: { he: "דבורה הנביאה", en: "Deborah" },
    judgeDescription: {
      he: "דבורה ישבה בהר אפרים.",
      en: "Deborah dwelt in Mount Ephraim."
    },
    biblicalSource: {
      text: { he: "וּמְבֹרֶכֶת ה' אַרְצוֹ... וְהֵם רִבְבוֹת אֶפְרַיִם", en: "Blessed of the Lord be his land... and they are the ten thousands of Ephraim." },
      source: { he: "דברים ל\"ג", en: "Deuteronomy 33:13" }
    },
    hint: {
      he: "בנו הצעיר של יוסף שקיבל את הבכורה. יהושע בן נון היה משבט זה.",
      en: "Joseph's younger son who received the greater blessing. Joshua bin Nun was from this tribe."
    }
  }, 
  { 
    id: TribeId.DAN, 
    name: { he: "דן", en: "Dan" }, 
    color: "#447a67", 
    judge: { he: "שמשון הגיבור", en: "Samson" },
    judgeDescription: {
      he: "אביו מנוח היה 'ממשפחת הדני'.",
      en: "His father Manoah was of the family of the Danites."
    },
    biblicalSource: {
      text: { he: "דָּן יָדִין עַמּוֹ כְּאַחַד שִׁבְטֵי יִשְׂרָאֵל", en: "Dan shall judge his people, as one of the tribes of Israel." },
      source: { he: "בראשית מ\"ט, ט\"ז", en: "Genesis 49:16" }
    },
    hint: {
      he: "יעקב המשילו לנחש האורב בדרך'.",
      en: "Jacob compared him to 'a serpent by the way, an adder in the path'."
    }
  },
  { 
    id: TribeId.BENJAMIN, 
    name: { he: "בנימין", en: "Benjamin" }, 
    color: "#f3f4f6", 
    judge: { he: "אהוד בן גרא", en: "Ehud ben Gera" },
    judgeDescription: {
      he: "הפסוק מציין: 'איש ימיני'.",
      en: "The verse describes him as a Benjamite."
    },
    biblicalSource: {
      text: { he: "לְבִנְיָמִן אָמַר יְדִיד ה' יִשְׁכֹּן לָבֶטַח עָלָיו", en: "The beloved of the Lord shall dwell in safety by him." },
      source: { he: "דברים ל\"ג, י\"ב", en: "Deuteronomy 33:12" }
    },
    hint: {
      he: "צעיר האחים. נמשל לטורף: 'זְאֵב יִטְרָף בַּבֹּקֶר יֹאכַל עַד'.",
      en: "The youngest brother. Likened to a predator: 'The wolf shall ravin'."
    }
  },
  { 
    id: TribeId.JUDAH, 
    name: { he: "יהודה", en: "Judah" }, 
    color: "#e8aa55", 
    judge: { he: "עתניאל בן קנז", en: "Othniel" },
    judgeDescription: {
      he: "אחיו של כלב בן יפונה, נשיא יהודה.",
      en: "The brother of Caleb, the prince of Judah."
    },
    biblicalSource: {
      text: { he: "גּוּר אַרְיֵה יְהוּדָה... לֹא יָסוּר שֵׁבֶט מִיהוּדָה", en: "Judah is a lion's whelp... The sceptre shall not depart from Judah." },
      source: { he: "בראשית מ\"ט, ט'", en: "Genesis 49:9" }
    },
    hint: {
      he: "סמלו הוא האריה, וממנו עתידים לצאת מלכי ישראל.",
      en: "His symbol is the Lion, and the kings of Israel descend from him."
    }
  },
  { 
    id: TribeId.SIMEON, 
    name: { he: "שמעון", en: "Simeon" }, 
    color: "#fde047", 
    judge: { he: "שמגר בן ענת", en: "Shamgar" },
    judgeDescription: {
      he: "לפי המדרש שמגר היה משבט שמעון.",
      en: "According to Midrash, Shamgar was from the tribe of Simeon."
    },
    biblicalSource: {
      text: { he: "אֲחַלְּקֵם בְּיַעֲקֹב וַאֲפִיצֵם בְּיִשְׂרָאֵל", en: "I will divide them in Jacob, and scatter them in Israel." },
      source: { he: "בראשית מ\"ט, ז'", en: "Genesis 49:7" }
    },
    hint: {
      he: "בשל מעשה שכם, יעקב קבע: 'אֲחַלְּקֵם בְּיַעֲקֹב וַאֲפִיצֵם בְּיִשְׂרָאֵל'.",
      en: "Because of the incident at Shechem, Jacob said: 'I will divide them in Jacob, and scatter them in Israel.'"
    }
  },
];

export const BIBLICAL_CITIES: BiblicalCity[] = [
  { name: { he: "שילה", en: "Shiloh" }, coords: { lat: 32.056, lng: 35.290 }, tribeId: TribeId.EPHRAIM },
  { name: { he: "שכם", en: "Shechem" }, coords: { lat: 32.213, lng: 35.285 }, tribeId: TribeId.MANASSEH },
  { name: { he: "חברון", en: "Hebron" }, coords: { lat: 31.524, lng: 35.107 }, tribeId: TribeId.JUDAH },
  { name: { he: "ירושלים", en: "Jerusalem" }, coords: { lat: 31.776, lng: 35.234 }, tribeId: TribeId.BENJAMIN },
  { name: { he: "בית אל", en: "Bethel" }, coords: { lat: 31.942, lng: 35.221 }, tribeId: TribeId.BENJAMIN },
  { name: { he: "באר שבע", en: "Beersheba" }, coords: { lat: 31.245, lng: 34.795 }, tribeId: TribeId.SIMEON },
  { name: { he: "יריחו", en: "Jericho" }, coords: { lat: 31.870, lng: 35.449 }, tribeId: TribeId.BENJAMIN },
  { name: { he: "גזר", en: "Gezer" }, coords: { lat: 31.861, lng: 34.924 }, tribeId: TribeId.EPHRAIM },
  { name: { he: "מגידו", en: "Megiddo" }, coords: { lat: 32.585, lng: 35.184 }, tribeId: TribeId.MANASSEH },
  { name: { he: "חצור", en: "Hazor" }, coords: { lat: 33.017, lng: 35.568 }, tribeId: TribeId.NAPHTALI },
  { name: { he: "דן", en: "Dan" }, coords: { lat: 33.248, lng: 35.653 }, tribeId: TribeId.DAN },
  { name: { he: "יפו", en: "Jaffa" }, coords: { lat: 32.050, lng: 34.750 }, tribeId: TribeId.DAN },
  { name: { he: "חשבון", en: "Heshbon" }, coords: { lat: 31.802, lng: 35.800 }, tribeId: TribeId.REUBEN }, 
  { name: { he: "רמת הגולן", en: "Golan" }, coords: { lat: 32.950, lng: 35.750 }, tribeId: TribeId.MANASSEH },
  { name: { he: "עין גדי", en: "Ein Gedi" }, coords: { lat: 31.458, lng: 35.389 }, tribeId: TribeId.JUDAH },
  { name: { he: "עכו", en: "Acre" }, coords: { lat: 32.926, lng: 35.083 }, tribeId: TribeId.ASHER }
];

// --- SHARED BOUNDARY DEFINITIONS (Coords remain unchanged) ---

// 1. The Coastline (South to North)
const COAST_GAZA = { lat: 31.50, lng: 34.45 };
const COAST_ASHKELON = { lat: 31.65, lng: 34.55 };
const COAST_ASHDOD = { lat: 31.80, lng: 34.63 };
const COAST_YAVNE = { lat: 31.90, lng: 34.68 };
const COAST_RISHON = { lat: 31.98, lng: 34.72 };
const COAST_YARKON = { lat: 32.10, lng: 34.77 }; // Tel Aviv
const COAST_HERZLIYA = { lat: 32.18, lng: 34.80 };
const COAST_NETANYA = { lat: 32.33, lng: 34.85 };
const COAST_HADERA = { lat: 32.45, lng: 34.88 };
const COAST_DOR = { lat: 32.61, lng: 34.91 };
const COAST_HAIFA_TIP = { lat: 32.83, lng: 34.97 }; // Rosh HaCarmel
const COAST_ACRE = { lat: 32.93, lng: 35.07 };
const COAST_ROSH_HANIKRA = { lat: 33.09, lng: 35.10 };

// 2. Jordan River Path (North to South) - Wobbly
const JORDAN_HULA_N = { lat: 33.15, lng: 35.62 };
const JORDAN_HULA_S = { lat: 33.03, lng: 35.62 };
const KINNERET_N = { lat: 32.90, lng: 35.60 };
const KINNERET_E = { lat: 32.80, lng: 35.65 }; // En Gev
const KINNERET_S = { lat: 32.71, lng: 35.58 };
const JORDAN_GESHER = { lat: 32.62, lng: 35.57 };
const JORDAN_BET_SHEAN = { lat: 32.50, lng: 35.57 };
const JORDAN_MEHOLA = { lat: 32.35, lng: 35.55 };
const JORDAN_ADAM = { lat: 32.10, lng: 35.53 }; // Damia Bridge area
const JORDAN_JERICHO = { lat: 31.88, lng: 35.50 };
const DEAD_SEA_N = { lat: 31.76, lng: 35.50 };
const DEAD_SEA_MID = { lat: 31.45, lng: 35.40 };
const DEAD_SEA_S = { lat: 31.05, lng: 35.38 };

// 3. Key Junction Points (To close gaps)
const J_ROSH_HANIKRA = COAST_ROSH_HANIKRA;
const J_CARMEL_RIDGE_WEST = COAST_HAIFA_TIP;
const J_CARMEL_RIDGE_EAST = { lat: 32.72, lng: 35.10 }; // Jokneam area (Asher/Zebulun/Manasseh)
const J_TABOR = { lat: 32.68, lng: 35.38 }; // (Zebulun/Issachar/Naphtali)
const J_MEGIDDO = { lat: 32.57, lng: 35.18 }; // (Manasseh/Issachar border area)
const J_GILBOA = { lat: 32.50, lng: 35.42 }; // (Issachar/Manasseh East border)
const J_SHECHEM_EAST = { lat: 32.18, lng: 35.35 }; 
const J_JABBOK_MOUTH = { lat: 32.15, lng: 35.54 }; // Where Jabbok hits Jordan (Manasseh/Gad)
const J_SHILOH_AREA = { lat: 32.05, lng: 35.30 };
const J_LOWER_BET_HORON = { lat: 31.88, lng: 35.03 }; // (Dan/Ephraim/Benjamin)
const J_LATRUN = { lat: 31.83, lng: 34.98 }; // (Dan/Judah/Benjamin) - Critical gap fix
const J_JERUSALEM_N = { lat: 31.80, lng: 35.22 };
const J_JERUSALEM_E = { lat: 31.78, lng: 35.35 }; // Towards Dead Sea

export const MAP_REGIONS: RegionData[] = [
  {
    id: "asher",
    tribeId: TribeId.ASHER,
    coords: [
      J_ROSH_HANIKRA,
      { lat: 33.10, lng: 35.25 },
      { lat: 33.05, lng: 35.35 },
      { lat: 32.95, lng: 35.30 }, 
      { lat: 32.85, lng: 35.25 },
      { lat: 32.78, lng: 35.22 }, 
      J_CARMEL_RIDGE_EAST, 
      { lat: 32.74, lng: 35.04 }, 
      J_CARMEL_RIDGE_WEST, 
      COAST_ACRE,
      J_ROSH_HANIKRA
    ],
    center: { lat: 32.95, lng: 35.15 }
  },
  {
    id: "naphtali",
    tribeId: TribeId.NAPHTALI,
    coords: [
      { lat: 33.28, lng: 35.57 }, 
      { lat: 33.25, lng: 35.65 },
      JORDAN_HULA_N,
      JORDAN_HULA_S,
      KINNERET_N,
      { lat: 32.85, lng: 35.55 },
      { lat: 32.75, lng: 35.55 },
      J_TABOR,
      { lat: 32.78, lng: 35.22 },
      { lat: 32.85, lng: 35.25 },
      { lat: 32.95, lng: 35.30 },
      { lat: 33.05, lng: 35.35 },
      { lat: 33.10, lng: 35.25 },
      { lat: 33.28, lng: 35.57 }
    ],
    center: { lat: 33.05, lng: 35.45 }
  },
  {
    id: "zebulun",
    tribeId: TribeId.ZEBULUN,
    coords: [
      J_CARMEL_RIDGE_EAST, 
      { lat: 32.78, lng: 35.22 }, 
      J_TABOR, 
      { lat: 32.70, lng: 35.30 },
      { lat: 32.60, lng: 35.15 }, 
      J_CARMEL_RIDGE_EAST
    ],
    center: { lat: 32.72, lng: 35.22 }
  },
  {
    id: "issachar",
    tribeId: TribeId.ISSACHAR,
    coords: [
      J_TABOR,
      { lat: 32.75, lng: 35.55 }, 
      JORDAN_GESHER,
      JORDAN_BET_SHEAN,
      J_GILBOA,
      J_MEGIDDO,
      { lat: 32.70, lng: 35.30 }, 
      J_TABOR
    ],
    center: { lat: 32.60, lng: 35.40 }
  },
  {
    id: "manasseh_west",
    tribeId: TribeId.MANASSEH,
    coords: [
      J_CARMEL_RIDGE_WEST,
      J_CARMEL_RIDGE_EAST, 
      { lat: 32.60, lng: 35.15 }, 
      J_MEGIDDO,
      J_GILBOA,
      JORDAN_BET_SHEAN,
      JORDAN_MEHOLA,
      JORDAN_ADAM, 
      J_SHECHEM_EAST,
      { lat: 32.12, lng: 35.15 }, 
      { lat: 32.10, lng: 34.95 }, 
      COAST_YARKON, 
      COAST_HERZLIYA,
      COAST_NETANYA,
      COAST_HADERA,
      COAST_DOR,
      J_CARMEL_RIDGE_WEST
    ],
    center: { lat: 32.35, lng: 35.15 }
  },
  {
    id: "manasseh_east",
    tribeId: TribeId.MANASSEH,
    coords: [
      { lat: 33.15, lng: 35.65 }, 
      { lat: 33.15, lng: 35.95 }, 
      { lat: 32.80, lng: 36.00 }, 
      { lat: 32.15, lng: 35.90 }, 
      J_JABBOK_MOUTH, 
      JORDAN_MEHOLA, 
      JORDAN_BET_SHEAN,
      JORDAN_GESHER,
      KINNERET_S,
      KINNERET_E, 
      KINNERET_N,
      JORDAN_HULA_S,
      JORDAN_HULA_N,
      { lat: 33.15, lng: 35.65 }
    ],
    center: { lat: 32.85, lng: 35.80 }
  },
  {
    id: "gad",
    tribeId: TribeId.GAD,
    coords: [
      J_JABBOK_MOUTH,
      { lat: 32.15, lng: 35.90 },
      { lat: 31.85, lng: 35.90 }, 
      { lat: 31.80, lng: 35.75 }, 
      DEAD_SEA_N,
      JORDAN_JERICHO,
      JORDAN_ADAM,
      J_JABBOK_MOUTH
    ],
    center: { lat: 32.00, lng: 35.70 }
  },
  {
    id: "ephraim",
    tribeId: TribeId.EPHRAIM,
    coords: [
      COAST_YARKON,
      { lat: 32.10, lng: 34.95 },
      { lat: 32.12, lng: 35.15 },
      J_SHECHEM_EAST,
      JORDAN_ADAM,
      JORDAN_JERICHO,
      J_SHILOH_AREA,
      J_LOWER_BET_HORON,
      { lat: 32.00, lng: 34.90 }, 
      COAST_YARKON
    ],
    center: { lat: 32.10, lng: 35.25 }
  },
  {
    id: "dan",
    tribeId: TribeId.DAN,
    coords: [
      COAST_YARKON,
      { lat: 32.00, lng: 34.90 }, 
      J_LOWER_BET_HORON,
      J_LATRUN, 
      COAST_ASHDOD,
      COAST_YAVNE,
      COAST_RISHON,
      COAST_YARKON
    ],
    center: { lat: 31.95, lng: 34.82 }
  },
  {
    id: "benjamin",
    tribeId: TribeId.BENJAMIN,
    coords: [
      J_LOWER_BET_HORON,
      J_SHILOH_AREA,
      JORDAN_JERICHO,
      DEAD_SEA_N,
      J_JERUSALEM_E,
      J_JERUSALEM_N,
      J_LATRUN, 
      J_LOWER_BET_HORON
    ],
    center: { lat: 31.85, lng: 35.30 }
  },
  {
    id: "judah",
    tribeId: TribeId.JUDAH,
    coords: [
      COAST_ASHDOD,
      J_LATRUN, 
      J_JERUSALEM_N,
      J_JERUSALEM_E,
      DEAD_SEA_N,
      DEAD_SEA_MID,
      DEAD_SEA_S,
      { lat: 30.90, lng: 35.30 }, 
      { lat: 29.55, lng: 34.95 }, 
      { lat: 29.80, lng: 34.60 }, 
      { lat: 30.80, lng: 34.30 }, 
      { lat: 31.20, lng: 34.25 },
      COAST_GAZA,
      COAST_ASHKELON,
      COAST_ASHDOD
    ],
    center: { lat: 31.60, lng: 35.10 }
  },
  {
    id: "simeon",
    tribeId: TribeId.SIMEON,
    coords: [
      { lat: 31.45, lng: 34.65 }, 
      { lat: 31.48, lng: 34.85 }, 
      { lat: 31.35, lng: 35.05 }, 
      { lat: 31.15, lng: 35.00 }, 
      { lat: 31.05, lng: 34.85 }, 
      { lat: 31.10, lng: 34.55 }, 
      { lat: 31.25, lng: 34.45 }, 
      { lat: 31.45, lng: 34.65 }
    ],
    center: { lat: 31.25, lng: 34.80 }
  },
  {
    id: "reuben",
    tribeId: TribeId.REUBEN,
    coords: [
      DEAD_SEA_N,
      { lat: 31.80, lng: 35.75 }, 
      { lat: 31.85, lng: 35.90 }, 
      { lat: 31.50, lng: 36.00 }, 
      { lat: 31.30, lng: 35.90 },
      { lat: 31.45, lng: 35.57 }, 
      DEAD_SEA_MID,
      DEAD_SEA_N
    ],
    center: { lat: 31.65, lng: 35.75 }
  }
];

export const INITIAL_SCORE = 0;
export const WIN_SCORE = 10;
export const PENALTY_SCORE = 2;
