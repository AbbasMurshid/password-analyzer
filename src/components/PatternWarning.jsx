import React from 'react';

const PatternWarning = ({ warnings }) => {
    if (!warnings || warnings.length === 0) return null;

    return (
        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-red-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-500/5 pointer-events-none"></div>
            <h3 className="text-red-400 font-bold font-mono uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 animate-pulse">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                Security Vulnerabilities
            </h3>
            <ul className="space-y-3 relative z-10">
                {warnings.map((warning, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className="font-bold font-mono text-xs px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                            WARNING
                        </span>
                        <span className="text-sm text-slate-300">{warning}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatternWarning;
