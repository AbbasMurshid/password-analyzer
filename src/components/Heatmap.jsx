import React from 'react';
import { generateHeatmap } from '../utils/heatmap';

const Heatmap = ({ password }) => {
    if (!password) return null;

    const colors = generateHeatmap(password);

    return (
        <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Structural Integrity
            </h3>

            <div className="flex flex-wrap gap-1.5 justify-center p-6 bg-black/40 rounded-lg border border-white/5 shadow-inner min-h-[100px] items-center content-center">
                {password.split('').map((char, idx) => (
                    <div key={idx} className="group relative">
                        <span
                            className={`
                ${colors[idx]} text-slate-900 font-bold font-mono text-xl px-3 py-2 rounded 
                transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1
                shadow-[0_0_10px_rgba(0,0,0,0.3)] relative z-10 block min-w-[2rem] text-center
              `}
                        >
                            {char}
                        </span>
                        {/* Reflection/Glow effect */}
                        <div className={`absolute inset-0 ${colors[idx]} blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-0`}></div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-8 mt-4 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 shadow-[0_0_5px_#ef4444]"></div> VULNERABLE
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 shadow-[0_0_5px_#fb923c]"></div> MODERATE
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 shadow-[0_0_5px_#22c55e]"></div> SECURE
                </div>
            </div>
        </div>
    );
};

export default Heatmap;
