import React from 'react';

const CrackTimeTable = ({ crackTime }) => {
    if (!crackTime) return null;

    const data = [
        { label: 'MD5 (Fastest)', speed: '164 GH/s', time: crackTime.md5 },
        { label: 'SHA-256 (Standard)', speed: '22 GH/s', time: crackTime.sha256 },
        { label: 'Bcrypt (Secure)', speed: '120 kH/s', time: crackTime.bcrypt }
    ];

    return (
        <div className="glass-panel p-6 rounded-xl overflow-hidden">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Estimated Crack Time
            </h3>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 text-xs font-mono text-slate-500 uppercase tracking-wider">
                            <th className="p-3 pl-0">Attack Vector</th>
                            <th className="p-3 text-right">Time to Breach</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data.map((row, idx) => (
                            <tr key={idx} className="group hover:bg-white/5 transition-colors">
                                <td className="p-3 pl-0">
                                    <div className="font-medium text-slate-300 group-hover:text-cyan-400 transition-colors">{row.label}</div>
                                    <div className="text-xs text-slate-600 font-mono">{row.speed}</div>
                                </td>
                                <td className={`p-3 text-right font-mono font-bold ${row.time === 'Instant' ? 'text-red-500' : 'text-cyan-400'}`}>
                                    <span className="group-hover:drop-shadow-[0_0_5px_currentColor] transition-all">
                                        {row.time}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CrackTimeTable;
