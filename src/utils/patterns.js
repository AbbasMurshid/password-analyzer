
const commonPatterns = [
    '123456', 'password', 'qwerty', 'asdfgh', 'zxcvbn', 'admin', 'welcome', 'login',
    '786', '123', '2024', '2023', '2022', '2025', 'india', 'bharat', 'love', 'god'
];

const dictionary = new Set([
    'password', 'admin', 'welcome', 'login', 'user', 'guest', 'root', 'master', 'dragon', 'baseball', 'football', 'shadow', 'mustang', 'superman'
]);

export const detectPatterns = (password) => {
    const warnings = [];
    const lower = password.toLowerCase();

    // Check for common patterns
    for (const pattern of commonPatterns) {
        if (lower.includes(pattern)) {
            warnings.push({ type: 'common', text: `Contains common pattern: "${pattern}"`, severity: 'high' });
        }
    }

    // Check for dictionary words (simple substring check for demo)
    // In production, use a trie or bloom filter
    for (const word of dictionary) {
        if (lower.includes(word) && word.length > 3) {
            warnings.push({ type: 'dictionary', text: `Contains dictionary word: "${word}"`, severity: 'medium' });
        }
    }

    // Check for repeated characters (e.g., "aaa")
    if (/(.)\1{2,}/.test(password)) {
        warnings.push({ type: 'repeat', text: 'Contains repeated characters', severity: 'medium' });
    }

    // Check for sequential numbers
    if (/\d{3,}/.test(password)) {
        // Simple check for 123, 789 etc.
        const nums = password.match(/\d+/g);
        if (nums) {
            for (const numStr of nums) {
                if (numStr.length < 3) continue;
                let isSeq = true;
                for (let i = 0; i < numStr.length - 1; i++) {
                    if (parseInt(numStr[i]) + 1 !== parseInt(numStr[i + 1])) {
                        isSeq = false;
                        break;
                    }
                }
                if (isSeq) warnings.push({ type: 'sequence', text: 'Contains sequential numbers', severity: 'medium' });
            }
        }
    }

    return warnings;
};
