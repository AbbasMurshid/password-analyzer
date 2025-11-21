import React from 'react';
import { generateSuggestions, generatePassphrase } from '../utils/generator';

const Suggestions = ({ password, onSelect }) => {
    const suggestions = generateSuggestions(password);

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* AI Suggestions */}
            <div className="glass-panel p-6 rounded-xl">
                <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                    AI Optimization
                </h3>
                <ul className="space-y-3">
                    {suggestions.map((s, idx) => (
                        <li
                            key={idx}
                            className="group cursor-pointer relative overflow-hidden rounded-lg border border-white/5 hover:border-cyan-500/50 transition-all duration-300 hover:bg-white/5"
                            onClick={() => onSelect(s.value)}
                        >
                            <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <div className="p-4 relative z-10">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">{s.type}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                    </svg>
                                </div>
                                <code className="text-white font-mono text-lg break-all block mb-1 group-hover:text-cyan-300 transition-colors">{s.value}</code>
                                <p className="text-xs text-slate-500">{s.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Passphrase Generator */}
            <div className="glass-panel p-6 rounded-xl">
                <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Passphrase Generator
                </h3>
                <div className="space-y-4">
                    <button
                        onClick={() => onSelect(generatePassphrase('normal'))}
                        className="w-full p-4 bg-slate-900/50 hover:bg-purple-500/10 rounded-lg border border-white/5 hover:border-purple-500/50 transition-all text-left group relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <span className="block text-xs font-mono uppercase tracking-wider text-purple-400 mb-2">Standard Passphrase</span>
                            <span className="text-white font-mono text-lg group-hover:text-purple-300 transition-colors">Correct-Horse-Battery-Staple</span>
                        </div>
                    </button>

                    <button
                        onClick={() => onSelect(generatePassphrase('emoji'))}
                        className="w-full p-4 bg-slate-900/50 hover:bg-purple-500/10 rounded-lg border border-white/5 hover:border-purple-500/50 transition-all text-left group relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <span className="block text-xs font-mono uppercase tracking-wider text-purple-400 mb-2">Emoji Enhanced</span>
                            <span className="text-white font-mono text-lg group-hover:text-purple-300 transition-colors">Cyber🔒-Secure🚀-Code💻</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Suggestions;
