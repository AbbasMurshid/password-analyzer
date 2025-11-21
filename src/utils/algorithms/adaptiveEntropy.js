import { charClassTransitions } from '../data/markovData';

const getCharClass = (char) => {
    if (/[a-z]/.test(char)) return 'lower';
    if (/[A-Z]/.test(char)) return 'upper';
    if (/[0-9]/.test(char)) return 'digit';
    if (/[^a-zA-Z0-9]/.test(char)) return 'symbol';
    return 'other';
};

export const calculateAdaptiveEntropy = (password) => {
    if (!password) return 0;

    let logProb = 0;
    let prevClass = null;

    // Initial probability (assuming uniform distribution for first char based on pool size)
    // Simplified: ~6 bits for first char
    logProb += 6;
    prevClass = getCharClass(password[0]);

    for (let i = 1; i < password.length; i++) {
        const currentClass = getCharClass(password[i]);

        // Get transition probability from previous class to current class
        const transitionProb = charClassTransitions[prevClass]?.[currentClass] || 0.1;

        // Calculate pool size for the current class to refine probability
        // P(char | class) = 1 / pool_size_of_class
        let classPoolSize = 26; // Default for lower/upper
        if (currentClass === 'digit') classPoolSize = 10;
        if (currentClass === 'symbol') classPoolSize = 32;

        // Total Probability = P(class_transition) * P(char | class)
        const charProb = transitionProb * (1 / classPoolSize);

        // Entropy = -log2(Probability)
        // We sum the negative log probabilities
        logProb += -Math.log2(charProb);

        prevClass = currentClass;
    }

    return Math.round(logProb);
};
