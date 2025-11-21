export const calculateCrackTime = (entropy) => {
    // Guesses per second for different scenarios
    const speeds = {
        offlineMD5: 100000000000, // 100 Billion/sec (Fast GPU cluster)
        onlineThrottled: 100, // 100/sec (Web login)
        offlineGeneral: 10000000000, // 10 Billion/sec (High-end GPU)
        massiveCracking: 1000000000000, // 1 Trillion/sec (State actor / Supercomputer)
    };

    const combinations = Math.pow(2, entropy);

    const formatTime = (seconds) => {
        if (seconds < 1) return 'Instant';
        if (seconds < 60) return `${Math.round(seconds)} seconds`;
        if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
        if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
        if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
        if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
        if (seconds < 315360000000) return `${Math.round(seconds / 3153600000)} centuries`;
        return 'Forever';
    };

    return [
        { label: 'Online Attack (Throttled)', time: formatTime(combinations / speeds.onlineThrottled), speed: '100 guesses/sec' },
        { label: 'Offline (Standard GPU)', time: formatTime(combinations / speeds.offlineGeneral), speed: '10B guesses/sec' },
        { label: 'Offline (Fast GPU Cluster)', time: formatTime(combinations / speeds.offlineMD5), speed: '100B guesses/sec' },
        { label: 'Massive Cracking Array', time: formatTime(combinations / speeds.massiveCracking), speed: '1T guesses/sec' },
    ];
};
