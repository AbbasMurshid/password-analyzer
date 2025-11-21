import { leakedPatterns } from '../data/leakedPatterns';

// Levenshtein Distance Implementation
const levenshteinDistance = (a, b) => {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(
                        matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1  // deletion
                    )
                );
            }
        }
    }

    return matrix[b.length][a.length];
};

export const calculateDarkWebSimilarity = (password) => {
    if (!password) return { score: 0, match: null };

    const lower = password.toLowerCase();
    let maxSimilarity = 0;
    let closestMatch = null;

    for (const pattern of leakedPatterns) {
        // Skip if length difference is too big to be relevant
        if (Math.abs(pattern.length - lower.length) > 3) continue;

        const distance = levenshteinDistance(lower, pattern);
        const maxLength = Math.max(lower.length, pattern.length);

        // Similarity = 1 - (distance / max_length)
        const similarity = 1 - (distance / maxLength);

        if (similarity > maxSimilarity) {
            maxSimilarity = similarity;
            closestMatch = pattern;
        }
    }

    // Score: 0 to 100 (100 = exact match or very close)
    const score = Math.round(maxSimilarity * 100);

    return {
        score,
        match: closestMatch,
        message: score > 80
            ? `Critical similarity (${score}%) to leaked pattern: "${closestMatch}"`
            : score > 50
                ? `Moderate resemblance to leaked pattern: "${closestMatch}"`
                : score > 30
                    ? `Slight resemblance to leaked pattern: "${closestMatch}"`
                    : null
    };
};
