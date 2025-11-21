import React from 'react';

const PrivacyStatement = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-title"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Modal Content */}
            <div className="relative max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-white/10 p-6">
                    <div className="flex items-center justify-between">
                        <h2 id="privacy-title" className="text-3xl font-black text-white">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-500">
                                Privacy & Security
                            </span>
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors group"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    {/* Key Promise */}
                    <div className="glass-panel p-6 rounded-xl bg-green-500/5 border-green-500/30">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-green-400 mb-2">100% Client-Side Processing</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Your password <span className="font-semibold text-white">never leaves your device</span>.
                                    All analysis happens locally in your browser using JavaScript. We do not send, store,
                                    or log any password data.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* What We Do */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-cyan-500"></span>
                            What We Do
                        </h3>
                        <ul className="space-y-3 text-slate-300">
                            <li className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span><strong className="text-white">Analyze Locally:</strong> All password analysis runs in your browser using JavaScript</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span><strong className="text-white">Use Industry Standards:</strong> Implemented using NIST SP 800-63B guidelines and modern cryptographic best practices</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span><strong className="text-white">Check Breach Database:</strong> Compare against a local database of known breached passwords (no network requests)</span>
                            </li>
                        </ul>
                    </div>

                    {/* What We Don't Do */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-red-500"></span>
                            What We Don't Do
                        </h3>
                        <ul className="space-y-3 text-slate-300">
                            <li className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span><strong className="text-white">No Network Requests:</strong> Your password is never transmitted over the internet</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span><strong className="text-white">No Data Storage:</strong> We don't store passwords in cookies, localStorage, or any database</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span><strong className="text-white">No Logging:</strong> We don't track, log, or analyze what passwords you test</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span><strong className="text-white">No Third-Party Services:</strong> We don't use external APIs that could compromise your privacy</span>
                            </li>
                        </ul>
                    </div>

                    {/* Dependencies */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-purple-500"></span>
                            Open Source Dependencies
                        </h3>
                        <p className="text-slate-300 mb-3">
                            This analyzer is built with the following open-source libraries:
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400">•</span>
                                <span><strong className="text-slate-300">React:</strong> UI framework (no data collection)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400">•</span>
                                <span><strong className="text-slate-300">Tailwind CSS:</strong> Styling framework (no tracking)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400">•</span>
                                <span><strong className="text-slate-300">Custom Algorithms:</strong> All security analysis is custom-built without external dependencies</span>
                            </li>
                        </ul>
                    </div>

                    {/* Verification */}
                    <div className="glass-panel p-6 rounded-xl bg-cyan-500/5">
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cyan-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Verify Our Claims
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            You can verify that no network requests are made by:
                        </p>
                        <ol className="mt-3 space-y-2 text-sm text-slate-400">
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 font-mono">1.</span>
                                <span>Opening your browser's Developer Tools (F12)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 font-mono">2.</span>
                                <span>Navigate to the "Network" tab</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 font-mono">3.</span>
                                <span>Analyze a password and observe zero network activity</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 font-mono">4.</span>
                                <span>Review our source code - it's completely transparent</span>
                            </li>
                        </ol>
                    </div>

                    {/* Disclaimer */}
                    <div className="text-xs text-slate-500 border-t border-white/10 pt-4">
                        <p className="mb-2">
                            <strong className="text-slate-400">Disclaimer:</strong> This tool is designed for educational purposes
                            and to help you create stronger passwords. While we use industry-standard algorithms, no password
                            analyzer can guarantee 100% security. Always follow best practices like using unique passwords
                            for each service and enabling two-factor authentication.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur border-t border-white/10 p-6">
                    <button
                        onClick={onClose}
                        className="w-full py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
                    >
                        Understood
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyStatement;
