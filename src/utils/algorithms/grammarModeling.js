// Grammar Modeling: Identifies structural patterns in passwords
// e.g., "Word + Digit", "Name + Year", etc.

export const analyzeGrammar = (password) => {
    if (!password) return { score: 100, structure: '' };

    let scorePenalty = 0;
    const parts = [];

    // Master Regex for Tokenization (Preserves Order)
    // 1. Year: 19xx or 20xx
    // 2. Word: Any letter sequence (changed from 4+ to capture short words)
    // 3. Digits: Any number sequence
    // 4. Symbol: Non-alphanumeric
    const regex = /((?:19|20)\d{2})|([a-zA-Z]+)|(\d+)|([^a-zA-Z0-9]+)/g;

    let match;
    while ((match = regex.exec(password)) !== null) {
        if (match[1]) {
            parts.push('YEAR');
            scorePenalty += 20;
        } else if (match[2]) {
            parts.push('WORD');
            scorePenalty += 10; // Reduced penalty for words in passphrases
        } else if (match[3]) {
            parts.push('DIGITS');
            scorePenalty += 10;
        } else if (match[4]) {
            parts.push('SYMBOL');
            // No penalty for symbols, they are good!
        }
    }

    const structure = parts.join('+');

    // Check for specific weak structures
    if (structure === 'WORD+DIGITS') scorePenalty += 10;
    if (structure === 'WORD+YEAR') scorePenalty += 15;
    if (structure === 'WORD+DIGITS+SYMBOL') scorePenalty += 5;

    // Whitelist Secure Passphrases (e.g., WORD+SYMBOL+WORD+SYMBOL...)
    // If it has at least 3 words and symbols mixed in, it's good.
    const wordCount = parts.filter(p => p === 'WORD').length;
    const symbolCount = parts.filter(p => p === 'SYMBOL').length;

    if (wordCount >= 3 && symbolCount >= 2) {
        scorePenalty = 0; // Bonus for good passphrases!
    }

    // Base score is 100, subtract penalties
    const grammarScore = Math.max(0, 100 - scorePenalty);

    return {
        score: grammarScore,
        structure: structure || 'COMPLEX',
        message: grammarScore < 50
            ? `Predictable pattern detected: ${structure}`
            : 'Complex grammatical structure'
    };
};
