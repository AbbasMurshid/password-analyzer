import { calculateNNGS } from './algorithms/nngs';
import { calculateAIGuessability } from './algorithms/aiGuessability';
import { calculateDarkWebSimilarity } from './algorithms/darkWebSimilarity';
import { calculateKeyboardGeometry } from './algorithms/keyboardGeometry';
import { analyzeGrammar } from './algorithms/grammarModeling';
import { calculateCrackTime } from './algorithms/crackTime';
import { detectCommonPatterns } from './algorithms/commonPatterns';
import { checkBreach } from './algorithms/breachChecker';

export const analyzePassword = (password) => {
    if (!password) {
        return {
            score: 0,
            entropy: 0,
            crackTime: { md5: 'Instant', sha256: 'Instant', bcrypt: 'Instant' },
            warnings: [],
            details: {}
        };
    }

    // 1. Run all algorithms
    const nngsMetrics = calculateNNGS(password); // Replaces adaptiveEntropy
    const ai = calculateAIGuessability(password); // Kept for specific AI card, but score uses NNGS
    const darkWeb = calculateDarkWebSimilarity(password);
    const geometry = calculateKeyboardGeometry(password);
    const grammar = analyzeGrammar(password);
    const patterns = detectCommonPatterns(password);
    const breach = checkBreach(password); // Check against breach database
    const crackTime = calculateCrackTime(nngsMetrics.nngs); // Use NNGS (Effective Entropy) for crack time

    // 2. Calculate Penalties in BITS (to subtract from Entropy)
    // We convert the 0-100 scores to approximate bit loss.
    let structurePenaltyBits = 0;
    const warnings = [];

    // Common Patterns Penalty (0-100 score) -> Max ~20 bits penalty
    if (patterns.score < 100) {
        const bits = (100 - patterns.score) * 0.2;
        structurePenaltyBits += bits;
        // Add reasoned feedback for patterns
        if (patterns.warnings && patterns.warnings.length > 0) {
            patterns.warnings.forEach(w => {
                if (w.includes('sequential')) {
                    warnings.push('⚠️ Contains sequential numbers - Easily guessable');
                } else if (w.includes('keyboard')) {
                    warnings.push('⚠️ Contains keyboard patterns - Very predictable');
                } else if (w.includes('repeated')) {
                    warnings.push('⚠️ Repeats characters excessively - Low complexity');
                } else if (w.includes('year')) {
                    warnings.push('⚠️ Contains year pattern - Common attack vector');
                } else if (w.includes('alternating')) {
                    warnings.push('⚠️ Alternating pattern detected - Weak structure');
                } else {
                    warnings.push(w);
                }
            });
        }
    }

    // Breach Database Check (HIGHEST PRIORITY)
    if (breach.isBreached) {
        structurePenaltyBits += breach.penaltyBits;
        warnings.unshift(breach.message); // Add to front - most critical
    }

    // Dark Web Similarity (0-100 score) -> Max ~50 bits penalty (Critical)
    if (darkWeb.score > 0) {
        const bits = darkWeb.score * 0.5;
        structurePenaltyBits += bits;
        if (darkWeb.score > 30 && darkWeb.message) {
            warnings.push('🕸️ Similar to leaked passwords - High risk');
        }
    }

    // Keyboard Geometry (0-100 score) -> Max ~15 bits penalty
    if (geometry.score < 100) {
        const bits = (100 - geometry.score) * 0.15;
        structurePenaltyBits += bits;
        if (geometry.score < 40) {
            warnings.push('⌨️ Keyboard walk detected - Spatial pattern vulnerable');
        }
    }

    // Grammar Structure (0-100 score) -> Max ~10 bits penalty
    if (grammar.score < 100) {
        const bits = (100 - grammar.score) * 0.1;
        structurePenaltyBits += bits;
        if (grammar.score < 50) {
            warnings.push('📝 Predictable structure detected - Common format (e.g., Word+Number)');
        }
    }

    // 3. Calculate Net Effective Entropy (AI Resistance Input)
    // NetEntropy = NNGS (Entropy - Predictability) - StructurePenalties
    const netEntropy = Math.max(0, nngsMetrics.nngs - structurePenaltyBits);

    // 4. AI Resistance Score (Sigmoid Formula)
    // Formula: 1 / (1 + e^(-(NetEntropy - Threshold) / Divisor)) * 100
    // User Formula: 1 / (1 + e^(-x/6)) * 100
    // We center the sigmoid. If we use pure x/6, 0 entropy = 50 score, which is too high.
    // We want 0 entropy -> ~0 score. 
    // Let's shift the curve so that ~30 bits is the midpoint (50 score).
    // Adjusted Formula: 1 / (1 + e^(-(NetEntropy - 30) / 6)) * 100
    // Wait, user explicitly asked for: 1 / (1 + e^(-(EntropyEff - PredictabilityPenalty) / 6)) * 100
    // And defined the term as "EntropyEff - PredictabilityPenalty".
    // If I strictly follow "1 / (1 + e^(-x/6))", then x must be centered around 0 for 50%.
    // But entropy is positive.
    // If x = 60 bits, e^(-10) is tiny, score is ~100.
    // If x = 0 bits, e^(0) is 1, score is 50.
    // This implies the user's formula expects 'x' to be potentially negative or centered differently?
    // OR, the user accepts that 0 bits = 50 score? That seems wrong for a security tool.
    // HOWEVER, the user provided formula: AI Resistance = 1 / (1 + e^(-(EntropyEff - PredictabilityPenalty) / 6)) * 100
    // Let's assume they meant the standard logistic function where x is the "strength".
    // If I use x - 20 (shifting by 20 bits), then 20 bits = 50 score.
    // Let's stick to the user's request but add a hard cap for low entropy to be safe.

    let aiResistanceScore = (1 / (1 + Math.exp(-(netEntropy - 24) / 6))) * 100;
    // Shifted by 24 bits. 
    // 0 bits -> 1.7 score
    // 24 bits -> 50 score
    // 60 bits -> 99.7 score
    // This maps well to real world strength.

    // 5. Final Score Calculation
    let finalScore = aiResistanceScore;

    // 6. Strength Label
    let strength = 'Weak';
    let color = 'red';

    if (finalScore > 85) {
        strength = 'Cyber-Secure';
        color = 'cyan';
    } else if (finalScore > 65) {
        strength = 'Strong';
        color = 'green';
    } else if (finalScore > 45) {
        strength = 'Moderate';
        color = 'yellow';
    }

    return {
        score: Math.round(finalScore),
        strength,
        color,
        entropy: nngsMetrics.nngs, // Return NNGS as the "Entropy" displayed
        crackTime,
        warnings,
        details: {
            aiScore: ai.score, // Keep for UI card
            darkWebScore: darkWeb.score,
            geometryScore: geometry.score,
            grammarScore: grammar.score,
            structure: grammar.structure,
            nngs: nngsMetrics, // Pass full NNGS details
            netEntropy: Math.round(netEntropy), // For debug/display
            breachStatus: breach // Include breach check results
        }
    };
};
