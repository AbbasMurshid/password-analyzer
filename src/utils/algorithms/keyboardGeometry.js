import { qwertyLayout, shiftMap } from '../data/keyboardLayouts';

const getCoordinates = (char) => {
    const lower = char.toLowerCase();
    // Check direct map
    if (qwertyLayout[lower]) return qwertyLayout[lower];
    // Check shift map (e.g. '!' -> '1')
    if (shiftMap[char] && qwertyLayout[shiftMap[char]]) return qwertyLayout[shiftMap[char]];

    return null;
};

export const calculateKeyboardGeometry = (password) => {
    if (!password || password.length < 2) return { score: 0, patterns: [] };

    let totalDistance = 0;
    let adjacentCount = 0;
    let patternSegments = 0;

    for (let i = 0; i < password.length - 1; i++) {
        const c1 = password[i];
        const c2 = password[i + 1];

        const p1 = getCoordinates(c1);
        const p2 = getCoordinates(c2);

        if (p1 && p2) {
            // Manhattan Distance: |x1 - x2| + |y1 - y2|
            // We use Euclidean for "physical" distance on keyboard, but Manhattan is fine too.
            // Let's use Euclidean for better diagonal handling.
            const dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

            totalDistance += dist;

            // Check for adjacency (distance <= 1.5 allows for diagonals)
            if (dist <= 1.5) {
                adjacentCount++;
                patternSegments++;
            }
        }
    }

    // Average distance per transition
    const avgDistance = totalDistance / (password.length - 1);

    // Score calculation
    // Low average distance = Bad (Keyboard walk)
    // High average distance = Good (Random jumping)

    // Normalize: Expect avg distance ~3-4 for random typing. ~1 for patterns.
    let score = Math.min(100, (avgDistance / 4) * 100);

    // Penalize for long adjacent sequences
    if (adjacentCount > 2) score -= (adjacentCount * 5);

    return {
        score: Math.max(0, Math.round(score)),
        averageDistance: avgDistance.toFixed(2),
        message: score < 40
            ? 'Detected keyboard walk patterns (e.g. "qwerty")'
            : 'Good keyboard spatial distribution'
    };
};
