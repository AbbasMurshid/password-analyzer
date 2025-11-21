import { detectPatterns } from './patterns';

export const generateHeatmap = (password) => {
    if (!password) return [];

    const scores = new Array(password.length).fill(0);

    // Base score for each character
    for (let i = 0; i < password.length; i++) {
        const char = password[i];
        if (/[A-Z]/.test(char)) scores[i] += 2;
        else if (/[0-9]/.test(char)) scores[i] += 2;
        else if (/[^a-zA-Z0-9]/.test(char)) scores[i] += 4;
        else scores[i] += 1;
    }

    // Penalize patterns
    // This is a simplified heuristic. In a real app, we'd map pattern indices to the score array.
    const patterns = detectPatterns(password);
    // For now, we'll just do a simple pass: if a pattern is found, we don't know exactly WHERE without more complex logic in patterns.js
    // So we will implement a simple "weakness" detector here for visualization

    // Detect sequences and repeats for heatmap specifically
    for (let i = 0; i < password.length - 1; i++) {
        // Penalize repeats
        if (password[i] === password[i + 1]) {
            scores[i] -= 2;
            scores[i + 1] -= 2;
        }

        // Penalize sequences (123, abc)
        const currCode = password.charCodeAt(i);
        const nextCode = password.charCodeAt(i + 1);
        if (nextCode === currCode + 1) {
            scores[i] -= 1;
            scores[i + 1] -= 1;
        }
    }

    return scores.map(s => {
        if (s <= 0) return 'bg-red-500';
        if (s <= 2) return 'bg-orange-400';
        return 'bg-green-500';
    });
};
