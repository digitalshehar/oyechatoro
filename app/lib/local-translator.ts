/**
 * Local Translation Utility for Oye Chatoro
 * No API required - works on a predefined dictionary of food terms.
 */

const dictionary: Record<string, string> = {
    // Categories
    "pizza": "पिज्जा",
    "burger": "बर्गर",
    "chaat": "चाट",
    "beverages": "कोल्ड ड्रिंक्स",
    "drinks": "कोल्ड ड्रिंक्स",
    "sandwich": "सैंडविच",
    "chinese": "चाइनीज़",
    "pasta": "पास्ता",
    "momos": "मोमोज",
    "frankie": "फ्रैंकी",
    "shakes": "शेक्स",
    "shake": "शेक",
    "maggie": "मैगी",
    "snacks": "स्नैक्स",
    "bread": "ब्रेड",
    "breads": "ब्रेड",
    "dips": "डिप्स",
    "dip": "डिप",
    "fries": "फ्राइज",
    "bhel": "भेल",
    "kurkure": "कुरकुरे",
    "vada": "वड़ा",
    "pav": "पाव",
    "dabeli": "दाबेली",
    "patties": "पैटिस",
    "patty": "पैटिस",
    "kachori": "कचौड़ी",
    "raj": "राज",
    "samosa": "समोसा",
    "vapa": "वड़ा",
    "dal": "दाल",
    "rice": "चावल",
    "roti": "रोटी",
    "naan": "नान",
    "paratha": "पराठा",
    "kulcha": "कुलचा",
    "manchurian": "मंचूरियन",
    "noodles": "नूडल्स",
    "chowmein": "चाउमीन",
    "fried-rice": "फ्राइड राइस",
    "spring": "स्प्रिंग",
    "roll": "रोल",
    "rolls": "रोल",
    "dry": "ड्राई",
    "gravy": "ग्रेवी",
    "soup": "सूप",
    "coke": "कोक",
    "thumsup": "थम्सअप",
    "sprite": "स्प्राइट",
    "fanta": "फैंटा",
    "limca": "लिम्का",
    "maaza": "माज़ा",
    "water": "पानी",
    "mineral": "मिनरल",
    "soda": "सोडा",
    "juice": "जूस",
    "tea": "चाय",
    "chai": "चाय",

    // Ingredients & Base
    "paneer": "पनीर",
    "cheese": "चीज़",
    "veg": "वेज",
    "corn": "कॉर्न",
    "garlic": "गार्लिक",
    "mushroom": "मशरूम",
    "capsicum": "शिमला मिर्च",
    "onion": "प्याज",
    "potato": "आलू",
    "tomato": "टमाटर",
    "butter": "बटर",
    "mayo": "मेयो",
    "schezwan": "सेजवान",
    "chilli": "चिली",
    "soya": "सोया",
    "atta": "आटा",

    // Styles & Cooking
    "tikka": "टिक्का",
    "tandoori": "तंदूरी",
    "masala": "मसाला",
    "fried": "फ्राइड",
    "roasted": "रोस्टेड",
    "grilled": "ग्रिल्ड",
    "spicy": "स्पाइसी",
    "sweet": "स्वीट",
    "classic": "क्लासिक",
    "margherita": "मार्गेरिटा",
    "white": "वाइट",
    "red": "रेड",
    "sauce": "सॉस",
    "dahi": "दही",
    "papdi": "पापड़ी",
    "basket": "बास्केट",
    "cold": "कोल्ड",
    "coffee": "कॉफी",
    "special": "स्पेशल",
    "hot": "हॉट",
    "fresh": "ताज़ा",
    "plain": "प्लेन",
    "crispy": "क्रिस्पी",
    "supreme": "सुप्रीम",
    "deluxe": "डीलकक्स",
    "premium": "प्रीमियम",
    "butterscotch": "बटरस्कॉच",
    "strawberry": "स्ट्रॉबेरी",
    "chocolate": "चॉकलेट",
    "vanilla": "वेनिला",
    "mango": "मैंगो",
    "pineapple": "पाइनएप्पल",
    "banana": "बनाना",
    "lassi": "लस्सी",
    "mojito": "मोहितो",
    "brownie": "ब्राउनी",
    "ice": "आइस",
    "cream": "क्रीम",

    // Quantities & Misc
    "with": "के साथ",
    "without": "बिना",
    "small": "छोटा",
    "medium": "मध्यम",
    "large": "बड़ा",
    "full": "फुल",
    "half": "हाफ",
    "single": "सिंगल",
    "double": "डबल",
    "extra": "एक्स्ट्रा",
    "pcs": "पीस",
    "pc": "पीस",
    "combo": "कॉम्बो",
    "inch": "इंच",
    "inchs": "इंच",
    "og": "ओजी",
    "only": "सिर्फ",
    "slice": "स्लाइस",
    "tikki": "टिक्की",
    "scoop": "स्कूप",
    "cone": "कोन",
    "cup": "कप",
    "glass": "ग्लास",
};

/**
 * Translates an English menu item name to Hindi using the local dictionary.
 */
export function translateToHindi(text: string): string {
    if (!text) return "";

    // Split by words, but preserve case temporarily
    const words = text.split(/(\s+|[-/()])/); // Preserve spaces and separators

    return words.map(word => {
        const cleanWord = word.toLowerCase().trim();
        if (!cleanWord) return word; // Return separators as is

        // Check dictionary
        if (dictionary[cleanWord]) {
            return dictionary[cleanWord];
        }

        // Handle specific cases like "1pcs" or "6Pcs"
        const numMatch = cleanWord.match(/^(\d+)(pcs|pc)$/);
        if (numMatch) {
            return `${numMatch[1]} पीस`;
        }

        // Fallback: If word contains numbers, keep it. 
        // If it starts with a number (e.g., "1st"), keep it.
        if (/\d/.test(cleanWord)) return word;

        // If not found, return original word
        return word;
    }).join("");
}

/**
 * Simple helper for categories
 */
export function translateCategory(name: string): string {
    return translateToHindi(name);
}
