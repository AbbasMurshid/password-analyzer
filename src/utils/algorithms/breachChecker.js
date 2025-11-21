import { BREACHED_PASSWORDS, WEAK_PATTERNS } from '../data/breachDatabase';

/**
 * Check if a password has been found in known data breaches
 * @param {string} password - The password to check
 * @returns {Object} - { isBreached: boolean, severity: string, message: string }
 */
export const checkBreach = (password) => {
    if (!password) {
        return {
            isBreached: false,
            severity: 'none',
            message: '',
            score: 100
        };
    }

    // Convert to lowercase for case-insensitive matching
    const lowerPassword = password.toLowerCase();

    // Check exact match in breach database
    if (BREACHED_PASSWORDS.has(lowerPassword) || BREACHED_PASSWORDS.has(password)) {
        return {
            isBreached: true,
            severity: 'critical',
            message: '🚨 Password found in breach database - Change immediately!',
            score: 0,  // Maximum penalty
            penaltyBits: 60  // Severe penalty
        };
    }

    // Check weak patterns
    for (const pattern of WEAK_PATTERNS) {
        if (pattern.test(password)) {
            return {
                isBreached: true,
                severity: 'high',
                message: '⚠️ Password follows a very common pattern - Highly vulnerable',
                score: 10,
                penaltyBits: 40
            };
        }
    }

    // Check for near-matches (password with simple modifications)
    const variations = generateCommonVariations(lowerPassword);
    for (const variation of variations) {
        if (BREACHED_PASSWORDS.has(variation)) {
            return {
                isBreached: true,
                severity: 'medium',
                message: '⚠️ Password is a simple variation of a breached password',
                score: 30,
                penaltyBits: 25
            };
        }
    }

    return {
        isBreached: false,
        severity: 'none',
        message: '✓ Not found in breach database',
        score: 100,
        penaltyBits: 0
    };
};

/**
 * Generate common variations of a password
 * (e.g., removing trailing numbers, symbols)
 */
const generateCommonVariations = (password) => {
    const variations = [];

    // Remove trailing numbers
    const withoutTrailingNumbers = password.replace(/\d+$/, '');
    if (withoutTrailingNumbers !== password && withoutTrailingNumbers.length >= 4) {
        variations.push(withoutTrailingNumbers);
    }

    // Remove trailing symbols
    const withoutTrailingSymbols = password.replace(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/, '');
    if (withoutTrailingSymbols !== password && withoutTrailingSymbols.length >= 4) {
        variations.push(withoutTrailingSymbols);
    }

    // Remove both
    const withoutBoth = password.replace(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?\d]+$/, '');
    if (withoutBoth !== password && withoutBoth.length >= 4) {
        variations.push(withoutBoth);
    }

    // Common substitutions reversed (l33t speak)
    const deLeet = password
        .replace(/0/g, 'o')
        .replace(/1/g, 'i')
        .replace(/3/g, 'e')
        .replace(/4/g, 'a')
        .replace(/5/g, 's')
        .replace(/7/g, 't')
        .replace(/@/g, 'a')
        .replace(/\$/g, 's');

    if (deLeet !== password && deLeet.length >= 4) {
        variations.push(deLeet);
    }

    return variations;
};

/**
 * Get detailed breach statistics
 */
export const getBreachStats = () => {
    return {
        totalBreachedPasswords: BREACHED_PASSWORDS.size,
        lastUpdated: '2024-11',
        source: 'Common breached passwords from HIBP and security research'
    };
};
