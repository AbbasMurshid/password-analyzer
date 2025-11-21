// In a real client-side secure app, we might use k-anonymity with the Pwned Passwords API.
// For this "Advanced" demo without backend, we'll simulate it using a heuristic of "leak-like" patterns.

const leakedPatterns = [
    'password', '123456', 'qwerty', 'admin', 'welcome', 'login', 'football', 'dragon', 'master'
];

export const calculateDarkWebScore = (password) => {
    if (!password) return { score: 0, message: 'No password' };

    let similarity = 0;
    const lower = password.toLowerCase();

    // Check for exact matches with common leaks
    if (leakedPatterns.includes(lower)) {
        return { score: 100, message: 'EXACT MATCH found in major breaches!' };
    }

    // Check for partial matches
    for (const pattern of leakedPatterns) {
        if (lower.includes(pattern)) {
            similarity += 30;
        }
    }

    // Check for common substitutions often found in leaks
    if (/[@!$]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)) {
        // This is actually good for strength, but common in "weak" strong passwords like P@ssw0rd1
        if (lower.includes('pass') || lower.includes('word')) {
            similarity += 50;
        }
    }

    const score = Math.min(similarity, 95); // Cap at 95 unless exact match

    if (score > 70) return { score, message: 'High similarity to known leaked patterns.' };
    if (score > 30) return { score, message: 'Some similarity to leaked structures.' };
    return { score, message: 'No significant dark web links found.' };
};
