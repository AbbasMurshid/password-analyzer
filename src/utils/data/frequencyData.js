// Frequency data simulating Zipf's law for common passwords and patterns

// Top 100 most common passwords (simulated subset)
export const commonPasswords = new Set([
    '123456', 'password', '123456789', '12345', '12345678', 'qwerty', '1234567', '111111',
    '123123', '987654321', '1234567890', 'iloveyou', 'admin', '1234', '000000', '555555',
    'secret', 'pass', 'test', '123', 'user', 'admin123', 'password123', 'google',
    'unknown', 'nothing', 'starwars', 'football', 'shadow', 'master', 'dragon',
    'superman', 'welcome', 'monkey', 'orange', 'battery', 'trusted', 'jordan',
    'princess', 'computer', 'cookie', 'system', 'hacker', 'number', 'access',
    'network', 'server', 'database', 'security', 'company', 'website', 'login'
]);

// Common suffixes and their estimated frequency penalty (0-1 scale, where 1 is rare)
export const commonSuffixes = {
    '1': 0.5, '12': 0.4, '123': 0.2, '1234': 0.1,
    '!': 0.6, '@': 0.6, '#': 0.7, '$': 0.8,
    '2020': 0.3, '2021': 0.3, '2022': 0.3, '2023': 0.2, '2024': 0.2, '2025': 0.2
};

// Character frequency in English language (approximate)
export const charFrequency = {
    'e': 12.7, 't': 9.1, 'a': 8.2, 'o': 7.5, 'i': 7.0, 'n': 6.7, 's': 6.3, 'h': 6.1,
    'r': 6.0, 'd': 4.3, 'l': 4.0, 'c': 2.8, 'u': 2.8, 'm': 2.4, 'w': 2.4, 'f': 2.2,
    'g': 2.0, 'y': 2.0, 'p': 1.9, 'b': 1.5, 'v': 1.0, 'k': 0.8, 'j': 0.15, 'x': 0.15,
    'q': 0.10, 'z': 0.07
};
