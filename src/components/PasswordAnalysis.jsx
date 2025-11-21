import React from 'react';

const MetricCard = ({ title, score, max = 100, color = 'cyan', icon, details }) => {
    const percentage = Math.min(100, Math.max(0, (score / max) * 100));

    // Color mapping for consistent styling
    const colorMap = {
        cyan: { bg: '#06b6d4', border: '#0891b2', text: '#22d3ee' },
        green: { bg: '#10b981', border: '#059669', text: '#34d399' },
        red: { bg: '#ef4444', border: '#dc2626', text: '#f87171' },
        yellow: { bg: '#eab308', border: '#ca8a04', text: '#fbbf24' },
        blue: { bg: '#3b82f6', border: '#2563eb', text: '#60a5fa' },
        orange: { bg: '#f97316', border: '#ea580c', text: '#fb923c' }
    };

    const colors = colorMap[color] || colorMap.cyan;

    return (
        <div className="glass-panel p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: colors.border }}></div>
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider">{title}</h4>
                {icon}
            </div>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-2xl font-bold font-mono" style={{ color: colors.text }}>{score}</span>
                <span className="text-slate-600 text-xs mb-1">/ {max}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className="h-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%`, backgroundColor: colors.bg }}
                ></div>
            </div>
            {details && <p className="text-xs text-slate-500 mt-2 truncate">{details}</p>}
        </div>
    );
};

const PasswordAnalysis = ({ analysis }) => {
    if (!analysis) return null;

    const { score, strength, color, entropy, crackTime, warnings, details } = analysis;

    // Color mapping
    const colorMap = {
        cyan: { stroke: '#06b6d4', text: '#22d3ee' },
        green: { stroke: '#10b981', text: '#34d399' },
        red: { stroke: '#ef4444', text: '#f87171' },
        yellow: { stroke: '#eab308', text: '#fbbf24' }
    };

    const colors = colorMap[color] || colorMap.cyan;

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Main Score Header */}
            <div className="text-center relative py-8">
                <div className="inline-block relative">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                        <circle
                            cx="50" cy="50" r="45" fill="none" stroke={colors.stroke} strokeWidth="8"
                            className="transition-all duration-1000 ease-out"
                            strokeDasharray="283"
                            strokeDashoffset={283 - (283 * score) / 100}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <span className="text-4xl font-black font-mono" style={{ color: colors.text }}>{score}</span>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Score</div>
                    </div>
                </div>
                <h2 className="text-3xl font-bold mt-4 tracking-tight neon-text" style={{ color: colors.text }}>
                    {strength}
                </h2>
                <p className="text-slate-500 font-mono text-sm mt-2">
                    {entropy} bits (NNGS Effective Entropy)
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard
                    title="AI Resistance"
                    score={details.aiScore}
                    color={details.aiScore > 50 ? 'green' : 'red'}
                    icon={<span className="text-lg">🤖</span>}
                    details={details.aiScore > 50 ? "Hard to predict" : "Predictable pattern"}
                />
                <MetricCard
                    title="Dark Web Safety"
                    score={100 - details.darkWebScore}
                    color={details.darkWebScore < 30 ? 'green' : 'red'}
                    icon={<span className="text-lg">🕸️</span>}
                    details={details.darkWebScore > 0 ? "Leak similarity detected" : "No leaks found"}
                />
                <MetricCard
                    title="Keyboard Pattern"
                    score={details.geometryScore}
                    color={details.geometryScore > 50 ? 'green' : 'yellow'}
                    icon={<span className="text-lg">⌨️</span>}
                    details="Spatial randomness"
                />
                <MetricCard
                    title="Structure"
                    score={details.grammarScore}
                    color={details.grammarScore > 60 ? 'blue' : 'orange'}
                    icon={<span className="text-lg">🏗️</span>}
                    details={details.structure}
                />
            </div>




        </div>
    );
};

export default PasswordAnalysis;
