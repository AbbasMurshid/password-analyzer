import { englishBigrams, charClassTransitions } from '../data/markovData';

// Neural Network Guessability Score (NNGS)
// Estimates the "Effective Entropy" by calculating -Sum(log2(P_AI))
// P_AI is the estimated probability of the next character given the previous context.

export const calculateNNGS = (password) => {
    if (!password) return { nngs: 0, entropy: 0, aiPenalty: 0 };

    let logSum = 0;
    const len = password.length;

    // 1. Base Probability (First character)
    // Assume uniform distribution for the first char based on its class (simplified)
    // Real NN would have a start token, but we'll use a safe estimate (1/94 printable chars)
    // log2(1/94) approx -6.55 bits
    logSum += 6.55;

    for (let i = 1; i < len; i++) {
        const prev = password[i - 1];
        const curr = password[i];
        const prevLower = prev.toLowerCase();
        const currLower = curr.toLowerCase();
        const bigram = prevLower + currLower;

        let p_ai = 0.001; // Base probability (smoothing)

        // A. Bigram Probability (Language Model Simulation)
        if (englishBigrams[bigram]) {
            p_ai = Math.max(p_ai, englishBigrams[bigram]);
        }

        // B. Character Class Transition Probability (Structure Model Simulation)
        const getCharClass = (c) => {
            if (/[a-z]/.test(c)) return 'lower';
            if (/[A-Z]/.test(c)) return 'upper';
            if (/[0-9]/.test(c)) return 'digit';
            if (/[^a-zA-Z0-9]/.test(c)) return 'symbol';
            return 'other';
        };

        const prevClass = getCharClass(prev);
        const currClass = getCharClass(curr);

        if (charClassTransitions[prevClass] && charClassTransitions[prevClass][currClass]) {
            // We weight the class transition. If it's a common transition (e.g. Upper->Lower),
            // the specific character probability is higher than random.
            // P(char | class) approx 1/26 for letters, 1/10 for digits.
            let classProb = charClassTransitions[prevClass][currClass];
            let charInClassProb = 0;

            if (currClass === 'lower' || currClass === 'upper') charInClassProb = 1 / 26;
            else if (currClass === 'digit') charInClassProb = 1 / 10;
            else charInClassProb = 1 / 32;

            // Combined probability estimate
            p_ai = Math.max(p_ai, classProb * charInClassProb);
        }

        // C. Repetition Penalty (NNs are very good at spotting repeats)
        if (curr === prev) {
            p_ai = Math.max(p_ai, 0.8); // Very high probability
        }

        // Calculate Information Content: -log2(P)
        // Higher P (predictable) -> Lower bits
        // Lower P (unpredictable) -> Higher bits
        logSum += -Math.log2(p_ai);
    }

    // Raw Entropy (Standard Shannon-like estimation for comparison)
    // L * log2(N)
    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;
    const rawEntropy = len * Math.log2(Math.max(poolSize, 1));

    // NNGS is the accumulated "surprise" (bits)
    // We cap it at the raw entropy because AI can't be worse than brute force (theoretically)
    const nngs = Math.min(rawEntropy, logSum);

    return {
        nngs: Math.round(nngs),
        entropy: Math.round(rawEntropy),
        aiPenalty: Math.round(rawEntropy - nngs) // How many bits lost to predictability
    };
};
