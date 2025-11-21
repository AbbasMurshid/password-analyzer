import React from 'react';

const CrackTimeCalculator = ({ crackTime }) => {
    if (!crackTime) return null;

    const timeData = [
        {
            name: 'Online Attack',
            speed: '1K/sec',
            hash: 'Online throttled',
            time: crackTime.online || 'N/A',
            color: 'from-green-500 to-emerald-600',
            icon: '🌐'
        },
        {
            name: 'Offline (MD5)',
            speed: '95B/sec',
            hash: 'MD5 Hash (Fast)',
            time: crackTime.md5,
            color: 'from-yellow-500 to-orange-600',
            icon: '⚡'
        },
        {
            name: 'Offline (SHA256)',
            speed: '35B/sec',
            hash: 'SHA-256 (Medium)',
            time: crackTime.sha256,
            color: 'from-orange-500 to-red-600',
            icon: '🔥'
        },
        {
            name: 'Offline (Bcrypt)',
            speed: '200K/sec',
            hash: 'Bcrypt (Slow & Secure)',
            time: crackTime.bcrypt,
            color: 'from-purple-500 to-pink-600',
            icon: '🛡️'
        }
    ];

    const getTimeColor = (time) => {
        if (!time) return 'text-slate-400';
        const lower = time.toLowerCase();
        if (lower.includes('instant') || lower.includes('second')) return 'text-red-400';
        if (lower.includes('minute') || lower.includes('hour')) return 'text-orange-400';
        if (lower.includes('day') || lower.includes('month')) return 'text-yellow-400';
        if (lower.includes('year')) return 'text-green-400';
        if (lower.includes('centur') || lower.includes('million')) return 'text-cyan-400';
        return 'text-white';
    };

    const getBarWidth = (time) => {
        if (!time) return '0%';
        const lower = time.toLowerCase();
        if (lower.includes('instant')) return '5%';
        if (lower.includes('second')) return '15%';
        if (lower.includes('minute')) return '25%';
        if (lower.includes('hour')) return '35%';
        if (lower.includes('day')) return '45%';
        if (lower.includes('week')) return '55%';
        if (lower.includes('month')) return '65%';
        if (lower.includes('year') && !lower.includes('million') && !lower.includes('billion')) {
            const years = parseFloat(time);
            if (years < 100) return '75%';
            if (years < 1000) return '85%';
            return '95%';
        }
        return '100%';
    };

    return (
        <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Time To Crack
            </h3>

            <div className="space-y-4">
                {timeData.map((item, idx) => (
                    <div key={idx} className="group">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{item.icon}</span>
                                <div>
                                    <div className="text-sm font-semibold text-white">{item.name}</div>
                                    <div className="text-xs text-slate-500">{item.speed}</div>
                                </div>
                            </div>
                            <div className={`text-sm font-mono font-bold ${getTimeColor(item.time)}`}>
                                {item.time}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out`}
                                style={{ width: getBarWidth(item.time) }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-white/10">
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        <span className="text-slate-400">Weak (\u003c1 day)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                        <span className="text-slate-400">Moderate (days-months)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span className="text-slate-400">Strong (years)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-cyan-500 rounded"></div>
                        <span className="text-slate-400">Cyber-Secure (eons)</span>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-white/5">
                <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="text-cyan-400 font-semibold">Note:</span> These estimates assume an attacker with high-end GPU hardware (RTX 4090).
                    Real-world attacks may be faster or slower depending on resources and hash algorithm used.
                </p>
            </div>
        </div>
    );
};

export default CrackTimeCalculator;
