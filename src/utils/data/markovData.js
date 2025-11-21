// Markov Chain Transition Matrix for Character Classes
// Represents the probability of transitioning from one character type to another.
// Types: 'lower', 'upper', 'digit', 'symbol', 'other'

export const charClassTransitions = {
    lower: { lower: 0.7, upper: 0.05, digit: 0.1, symbol: 0.1, other: 0.05 },
    upper: { lower: 0.8, upper: 0.1, digit: 0.05, symbol: 0.05, other: 0.0 },
    digit: { lower: 0.1, upper: 0.05, digit: 0.8, symbol: 0.05, other: 0.0 },
    symbol: { lower: 0.4, upper: 0.2, digit: 0.2, symbol: 0.2, other: 0.0 },
    other: { lower: 0.25, upper: 0.25, digit: 0.25, symbol: 0.25, other: 0.0 }
};

// Simple bigram probabilities for English text (simplified for demo)
// Used to detect "English-like" patterns vs random strings
export const englishBigrams = {
    'th': 0.03, 'he': 0.03, 'in': 0.02, 'er': 0.02, 'an': 0.02, 're': 0.01,
    'nd': 0.01, 'at': 0.01, 'on': 0.01, 'nt': 0.01, 'ha': 0.01, 'es': 0.01,
    'st': 0.01, 'en': 0.01, 'ed': 0.01, 'to': 0.01, 'it': 0.01, 'ou': 0.01,
    'ea': 0.01, 'hi': 0.01, 'is': 0.01, 'or': 0.01, 'ti': 0.01, 'as': 0.01,
    'te': 0.01, 'et': 0.01, 'ng': 0.01, 'of': 0.01, 'al': 0.01, 'de': 0.01,
    'se': 0.01, 'le': 0.01, 'sa': 0.01, 'si': 0.01, 'ar': 0.01, 've': 0.01,
    'ra': 0.01, 'ld': 0.01, 'ur': 0.01
};
