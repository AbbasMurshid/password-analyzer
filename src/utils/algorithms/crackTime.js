// GPU-based Crack Time Estimation
// Uses realistic benchmarks for RTX 4090 / Hashcat

const GPU_SPEEDS = {
    // Hashes per second
    'Online': 1000,        // 1K/s (Throttled online attack)
    'MD5': 164000000000, // 164 GH/s
    'SHA256': 22000000000, // 22 GH/s
    'Bcrypt': 120000,      // 120 kH/s (Slow!)
    'PBKDF2': 4000000      // 4 MH/s
};

const formatTime = (seconds) => {
    if (seconds < 1) return 'Instant';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
    return 'Centuries';
};

export const calculateCrackTime = (entropy) => {
    // Keyspace = 2^entropy
    const keyspace = Math.pow(2, entropy);

    // We use SHA256 as a "standard" fast hash for general web security context
    // And Bcrypt for "secure" context

    const timeOnline = keyspace / GPU_SPEEDS['Online'];
    const timeMD5 = keyspace / GPU_SPEEDS['MD5'];
    const timeSHA256 = keyspace / GPU_SPEEDS['SHA256'];
    const timeBcrypt = keyspace / GPU_SPEEDS['Bcrypt'];

    return {
        online: formatTime(timeOnline),
        md5: formatTime(timeMD5),
        sha256: formatTime(timeSHA256),
        bcrypt: formatTime(timeBcrypt),
        seconds: timeSHA256 // Return raw seconds for sorting/logic if needed
    };
};
