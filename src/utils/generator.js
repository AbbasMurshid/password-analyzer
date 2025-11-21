export const generateSuggestions = (currentPassword) => {
    const suggestions = [];

    // 1. Stronger variant of current
    if (currentPassword) {
        const variant = currentPassword.split('').map(c => {
            if (Math.random() > 0.7) return c.toUpperCase();
            if (c === 'a') return '@';
            if (c === 'e') return '3';
            if (c === 'i') return '!';
            if (c === 'o') return '0';
            return c;
        }).join('') + Math.floor(Math.random() * 100);
        suggestions.push({ type: 'Variant', value: variant, text: 'Hardened version of your input' });
    }

    // 2. Random Strong
    const randomPass = generateRandomPassword({ length: 16, includeSymbols: true });
    suggestions.push({ type: 'Random', value: randomPass, text: 'Cryptographically strong random' });

    // 3. Passphrase
    const passphrase = generatePassphrase('normal');
    suggestions.push({ type: 'Passphrase', value: passphrase, text: 'Easy to remember, hard to crack' });

    return suggestions;
};

/**
 * Generate a random password
 * @param {Object} options - Configuration options
 * @param {number} options.length - Password length (8-128)
 * @param {boolean} options.includeUppercase - Include uppercase letters
 * @param {boolean} options.includeLowercase - Include lowercase letters
 * @param {boolean} options.includeNumbers - Include numbers
 * @param {boolean} options.includeSymbols - Include symbols
 * @param {boolean} options.includeUnicode - Include Unicode characters (emoji, etc.)
 * @returns {string} Generated password
 */
export const generateRandomPassword = (options = {}) => {
    const {
        length = 16,
        includeUppercase = true,
        includeLowercase = true,
        includeNumbers = true,
        includeSymbols = true,
        includeUnicode = false
    } = options;

    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (includeUnicode) charset += '★☆♦♣♠♥€¥£™©®✓✗⚡⚠♪♫';

    if (charset.length === 0) {
        charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }

    let password = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array); // Use cryptographically secure random

    for (let i = 0; i < length; i++) {
        password += charset.charAt(array[i] % charset.length);
    }

    return password;
};

/**
 * Generate a pronounceable password using syllable patterns
 * @param {number} length - Desired length (min 6)
 * @returns {string} Pronounceable password
 */
export const generatePronounceablePassword = (length = 12) => {
    const consonants = 'bcdfghjklmnprstvwxyz';
    const vowels = 'aeiou';
    const endings = '!@#$%123456789';

    let password = '';
    const targetLength = Math.max(6, length - 2); // Reserve space for number/symbol

    // Alternate consonant-vowel-consonant pattern
    while (password.length < targetLength) {
        // Consonant
        password += consonants.charAt(Math.floor(Math.random() * consonants.length));
        if (password.length >= targetLength) break;

        // Vowel
        password += vowels.charAt(Math.floor(Math.random() * vowels.length));
        if (password.length >= targetLength) break;

        // Sometimes add another consonant for variety
        if (Math.random() > 0.5) {
            password += consonants.charAt(Math.floor(Math.random() * consonants.length));
        }
    }

    // Capitalize first letter
    password = password.charAt(0).toUpperCase() + password.slice(1);

    // Add number or symbol at the end
    password += endings.charAt(Math.floor(Math.random() * endings.length));

    return password;
};

export const generatePassphrase = (type = 'normal') => {
    const words = ['Tech', 'Cyber', 'Secure', 'Node', 'React', 'Data', 'Cloud', 'Storm', 'Falcon', 'Eagle', 'Code', 'Base', 'Solar', 'Lunar', 'Neon', 'Flux', 'Crystal', 'Thunder', 'Quantum', 'Phoenix', 'Dragon', 'Matrix', 'Shadow', 'Titan', 'Nova', 'Omega', 'Alpha', 'Beta', 'Gamma', 'Delta'];
    const emojis = ['🚀', '🔒', '🔑', '🛡️', '💻', '🌐', '🎲', '🧠', '⚡', '🌟', '🔮', '🎯'];
    const separators = ['-', '#', '!', '.', '_', '$', '@', '*'];

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    if (type === 'emoji') {
        return Array(4).fill(0).map(() => getRandom(words) + getRandom(emojis)).join(getRandom(separators));
    }

    // Hardened Passphrase: 4-6 words + numbers + variable separators
    const numWords = Math.random() > 0.5 ? 4 : 5;
    const selectedWords = Array(numWords).fill(0).map(() => getRandom(words));

    // Insert 1-2 random numbers at random positions
    const numCount = Math.random() > 0.5 ? 1 : 2;
    for (let i = 0; i < numCount; i++) {
        const randomNum = Math.floor(Math.random() * 99) + 1;
        const numPos = Math.floor(Math.random() * selectedWords.length);
        selectedWords[numPos] += randomNum;
    }

    // Use potentially different separators
    if (Math.random() > 0.7) {
        // Mix separators for extra complexity
        return selectedWords.map((word, idx) =>
            idx < selectedWords.length - 1 ? word + getRandom(separators) : word
        ).join('');
    }

    return selectedWords.join(getRandom(separators));
};
