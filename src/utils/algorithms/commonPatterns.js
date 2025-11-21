export const detectCommonPatterns = (password) => {
    if (!password) return { score: 100, warnings: [] };

    const warnings = [];
    const lower = password.toLowerCase();
    let penalty = 0;

    // 1. Sequential Numbers
    // Detects: 0123, 1234, 2345, etc.
    if (/0123|1234|2345|3456|4567|5678|6789|7890/.test(password)) {
        warnings.push("Avoid sequential numbers (e.g., 1234)");
        penalty += 20;
    }

    // 2. Reverse Sequential Numbers
    // Detects: 9876, 8765, etc.
    if (/9876|8765|7654|6543|5432|4321|3210/.test(password)) {
        warnings.push("Avoid reverse sequential numbers (e.g., 54321)");
        penalty += 20;
    }

    // 3. Keyboard Patterns (Rows)
    // Detects: qwerty, asdf, zxcv, etc.
    if (/qwerty|asdf|zxcv|qwer|wert|erty|rtyu|tyui|yuio|uiop|asdf|sdfg|dfgh|fghj|ghjk|hjkl|zxcv|xcvb|cvbn|vbnm/.test(lower)) {
        warnings.push("Avoid keyboard row patterns (e.g., qwerty)");
        penalty += 25;
    }

    // 4. Repetitive Characters
    // Detects: aaaaa, 11111, etc. (3 or more repeats)
    if (/(.)\1{2,}/.test(password)) {
        warnings.push("Avoid repeating characters (e.g., aaa)");
        penalty += 15;
    }

    // 5. Alternating Patterns
    // Detects: abab, 1212 (repetition of 2-char sequence)
    if (/^(.{2})\1+$/.test(password) || /(.{2})\1{2,}/.test(password)) {
        warnings.push("Avoid alternating patterns (e.g., 121212)");
        penalty += 15;
    }

    // 6. Year Patterns
    // Detects: 1900-2029
    if (/19[0-9]{2}|20[0-2][0-9]/.test(password)) {
        warnings.push("Avoid using recent years (e.g., 1990-2029)");
        penalty += 10;
    }

    // 7. Common Words (Basic Check)
    if (/password|admin|user|login|welcome|123/.test(lower)) {
        warnings.push("Contains very common weak words");
        penalty += 30;
    }

    return {
        score: Math.max(0, 100 - penalty),
        warnings
    };
};
