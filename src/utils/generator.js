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
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let randomPass = '';
    for (let i = 0; i < 16; i++) {
        randomPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    suggestions.push({ type: 'Random', value: randomPass, text: 'Cryptographically strong random' });

    // 3. Passphrase
    const words = ['Correct', 'Horse', 'Battery', 'Staple', 'Blue', 'Sky', 'Mountain', 'River', 'Cosmic', 'Panda', 'Cyber', 'Secure'];
    const passphrase = Array(4).fill(0).map(() => words[Math.floor(Math.random() * words.length)]).join('-');
    suggestions.push({ type: 'Passphrase', value: passphrase, text: 'Easy to remember, hard to crack' });

    return suggestions;
};

export const generatePassphrase = (type = 'normal') => {
    const words = ['Tech', 'Cyber', 'Secure', 'Node', 'React', 'Data', 'Cloud', 'Storm', 'Falcon', 'Eagle', 'Code', 'Base', 'Solar', 'Lunar', 'Neon', 'Flux'];
    const emojis = ['🚀', '🔒', '🔑', '🛡️', '💻', '🌐', '🎲', '🧠'];
    const separators = ['-', '#', '!', '.', '_', '$'];

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    if (type === 'emoji') {
        return Array(4).fill(0).map(() => getRandom(words) + getRandom(emojis)).join(getRandom(separators));
    }

    // Hardened Passphrase: 4 words + 1 number + variable separators
    const selectedWords = Array(4).fill(0).map(() => getRandom(words));

    // Insert a random number at a random position
    const randomNum = Math.floor(Math.random() * 99) + 1;
    const numPos = Math.floor(Math.random() * 4); // 0 to 3
    selectedWords[numPos] += randomNum;

    return selectedWords.join(getRandom(separators));
};
