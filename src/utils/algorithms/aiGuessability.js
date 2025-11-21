import { englishBigrams } from '../data/markovData';
import { commonSuffixes, commonPasswords } from '../data/frequencyData';

export const calculateAIGuessability = (password) => {
    if (!password) return { score: 0, time: 'Instant' };

    let guessabilityScore = 0;
    const lower = password.toLowerCase();

    // 1. Check against common password list (Direct Hit)
    if (commonPasswords.has(lower)) {
        return { score: 100, time: 'Instant (< 0.001s)', message: 'Found in top 100 common passwords' };
    }

    // 2. N-gram Analysis (Simulating Language Model)
    let bigramMatches = 0;
    for (let i = 0; i < lower.length - 1; i++) {
        const bigram = lower.slice(i, i + 2);
        if (englishBigrams[bigram]) {
            bigramMatches++;
            guessabilityScore += (englishBigrams[bigram] * 1000); // Weight the probability
        }
    }

    // 3. Common Suffix Penalty
    for (const [suffix, penalty] of Object.entries(commonSuffixes)) {
        if (password.endsWith(suffix)) {
            guessabilityScore += (50 * penalty); // High score = easier to guess
        }
    }

    // Normalize score (0 - 100)
    // Higher score means EASIER to guess (bad)
    // We want to return a "Safety Score" where 100 is safe, 0 is guessed.
    // So we invert it.

    // Heuristic mapping
    let aiScore = Math.max(0, 100 - (guessabilityScore / 2));

    // Adjust for length (AI struggles with length even if patterns exist)
    if (password.length > 12) aiScore += 20;
    if (password.length > 16) aiScore += 20;

    return {
        score: Math.min(100, Math.round(aiScore)),
        guesses: Math.round(Math.pow(10, (100 - aiScore) / 10)), // Simulated guess count
        message: aiScore < 50 ? 'High probability of AI prediction' : 'Resistant to neural guessing'
    };
};
