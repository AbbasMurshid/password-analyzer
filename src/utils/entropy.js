export const calculateEntropy = (password) => {
    if (!password) return 0;

    let poolSize = 0;

    // Character pool analysis
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32; // Special chars

    // Basic entropy formula: L * log2(R)
    const rawEntropy = password.length * Math.log2(Math.max(poolSize, 1));

    return Math.round(rawEntropy);
};
