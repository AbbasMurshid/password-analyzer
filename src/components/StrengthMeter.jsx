import React from 'react';

const StrengthMeter = ({ score, entropy }) => {
    let strengthColor = 'bg-red-600';
    let shadowColor = 'shadow-red-500/50';
    let strengthText = 'CRITICAL';
    let percentage = Math.min(entropy, 128) / 1.28;

    if (entropy > 35) { strengthColor = 'bg-red-500'; shadowColor = 'shadow-red-500/50'; strengthText = 'WEAK'; }
    if (entropy > 50) { strengthColor = 'bg-orange-500'; shadowColor = 'shadow-orange-500/50'; strengthText = 'MODERATE'; }
    if (entropy > 70) { strengthColor = 'bg-yellow-400'; shadowColor = 'shadow-yellow-400/50'; strengthText = 'GOOD'; }
    if (entropy > 90) { strengthColor = 'bg-green-500'; shadowColor = 'shadow-green-500/50'; strengthText = 'STRONG'; }
    if (entropy > 120) { strengthColor = 'bg-cyan-500'; shadowColor = 'shadow-cyan-500/50'; strengthText = 'MAXIMUM'; }

    return (
        <div className="glass-panel p-6 rounded-xl relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${strengthColor} opacity-50 group-hover:opacity-100 transition-opacity`}></div>

            <div className="flex justify-between items-end mb-4">
                <div>
                    <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-1">Entropy Level</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-white font-mono">{entropy}</span>
                        <span className="text-xs text-slate-500 font-mono">BITS</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className={`text-xl font-bold font-mono tracking-wider ${strengthColor.replace('bg-', 'text-')} drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>
                        {strengthText}
                    </span>
                </div>
            </div>

            <div className="h-3 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/5 relative">
                {/* Grid lines on bar */}
                <div className="absolute inset-0 flex justify-between px-1 z-10 opacity-20">
                    {[...Array(10)].map((_, i) => <div key={i} className="w-[1px] h-full bg-white"></div>)}
                </div>
                <div
                    className={`h-full ${strengthColor} shadow-[0_0_20px_currentColor] transition-all duration-700 ease-out relative`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                >
                    <div className="absolute right-0 top-0 h-full w-1 bg-white/50 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default StrengthMeter;
