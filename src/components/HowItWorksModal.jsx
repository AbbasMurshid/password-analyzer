import React from 'react';

const HowItWorksModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Modal Content */}
            <div className="relative max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-white/10 p-6">
                    <div className="flex items-center justify-between">
                        <h2 id="modal-title" className="text-3xl font-black text-white">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                                How It Works
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
                <div className="p-8 space-y-8">
                    {/* Introduction */}
                    <div className="glass-panel p-6 rounded-xl">
                        <p className="text-slate-300 leading-relaxed">
                            CYBER GUARD uses advanced AI-resistance algorithms to analyze your password's security. 
                            All analysis happens <span className="text-cyan-400 font-semibold">locally in your browser</span> - 
                            your password never leaves your device.
                        </p>
                    </div>

                    {/* Algorithms */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                            <span className="w-1 h-6 bg-cyan-500"></span>
                            Security Algorithms
                        </h3>

                        {/* NNGS */}
                        <div className="glass-panel p-6 rounded-xl hover:border-cyan-500/50 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">🧠</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-cyan-400 mb-2">Neural Network Guessability Score (NNGS)</h4>
                                    <p className="text-slate-400 text-sm mb-3">
                                        Calculates "Effective Entropy" by estimating how predictable each character is to an AI model.
                                    </p>
                                    <div className="bg-slate-950/50 p-4 rounded-lg border border-white/5">
                                        <code className="text-xs text-cyan-300 font-mono">
                                            NNGS = -Σ log₂(P_AI(xᵢ | x₁..ᵢ₋₁))
                                        </code>
                                    </div>
                                    <ul className="mt-3 space-y-1 text-sm text-slate-400">
                                        <li>• Detects English-like patterns (e.g., "th", "er")</li>
                                        <li>• Models character class transitions</li>
                                        <li>• Penalizes repetition heavily</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* AI Guessability */}
                        <div className="glass-panel p-6 rounded-xl hover:border-purple-500/50 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">🤖</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-purple-400 mb-2">AI Resistance Formula</h4>
                                    <p className="text-slate-400 text-sm mb-3">
                                        Uses sigmoid function to map effective entropy to a 0-100 score.
                                    </p>
                                    <div className="bg-slate-950/50 p-4 rounded-lg border border-white/5">
                                        <code className="text-xs text-purple-300 font-mono">
                                            Score = 1 / (1 + e^(-(NetEntropy - 24) / 6)) × 100
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dark Web */}
                        <div className="glass-panel p-6 rounded-xl hover:border-red-500/50 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">🕸️</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-red-400 mb-2">Dark Web Similarity & Breach Check</h4>
                                    <p className="text-slate-400 text-sm mb-3">
                                        Compares against leaked patterns using Levenshtein distance and checks breach databases.
                                    </p>
                                    <ul className="space-y-1 text-sm text-slate-400">
                                        <li>• Checks against 10,000+ known breached passwords</li>
                                        <li>• Calculates similarity to common patterns</li>
                                        <li>• Uses edit distance normalization</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Keyboard Geometry */}
                        <div className="glass-panel p-6 rounded-xl hover:border-yellow-500/50 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">⌨️</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-yellow-400 mb-2">Keyboard Geometry</h4>
                                    <p className="text-slate-400 text-sm">
                                        Analyzes spatial distribution using Manhattan distance to detect keyboard walks like "qwerty" or "asdfgh".
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pattern Detection */}
                        <div className="glass-panel p-6 rounded-xl hover:border-green-500/50 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">🔍</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-green-400 mb-2">Common Pattern Detection</h4>
                                    <p className="text-slate-400 text-sm mb-3">
                                        Identifies specific weak patterns using regex matching.
                                    </p>
                                    <ul className="space-y-1 text-sm text-slate-400">
                                        <li>• Sequential numbers (1234, 6789)</li>
                                        <li>• Repeated characters (aaa, 111)</li>
                                        <li>• Years (1990, 2024)</li>
                                        <li>• Alternating patterns (aba, 121)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Examples */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                            <span className="w-1 h-6 bg-cyan-500"></span>
                            Examples: Strong vs Weak
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Weak Examples */}
                            <div className="glass-panel p-6 rounded-xl border-red-500/30">
                                <h4 className="text-sm font-mono text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    Weak Passwords
                                </h4>
                                <ul className="space-y-3">
                                    <li className="bg-slate-950/50 p-3 rounded border border-white/5">
                                        <code className="text-red-300 font-mono">password123</code>
                                        <p className="text-xs text-slate-500 mt-1">Common word + sequential numbers</p>
                                    </li>
                                    <li className="bg-slate-950/50 p-3 rounded border border-white/5">
                                        <code className="text-red-300 font-mono">qwerty</code>
                                        <p className="text-xs text-slate-500 mt-1">Keyboard pattern</p>
                                    </li>
                                    <li className="bg-slate-950/50 p-3 rounded border border-white/5">
                                        <code className="text-red-300 font-mono">P@ssw0rd!</code>
                                        <p className="text-xs text-slate-500 mt-1">Predictable substitutions</p>
                                    </li>
                                    <li className="bg-slate-950/50 p-3 rounded border border-white/5">
                                        <code className="text-red-300 font-mono">john1990</code>
                                        <p className="text-xs text-slate-500 mt-1">Name + year pattern</p>
                                    </li>
                                </ul>
                            </div>

                            {/* Strong Examples */}
                            <div className="glass-panel p-6 rounded-xl border-green-500/30">
                                <h4 className="text-sm font-mono text-green-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Strong Passwords
                                </h4>
                                <ul className="space-y-3">
                                    <li className="bg-slate-950/50 p-3 rounded border border-white/5">
                                        <code className="text-green-300 font-mono">Falcon#Cyber!2024</code>
                                        <p className="text-xs text-slate-500 mt-1">Mixed case, symbols, unpredictable</p>
                                    </li>
                                    <li className="bg-slate-950/50 p-3 rounded border border-white/5">
                                        <code className="text-green-300 font-mono">x9$mQ2#pL7!nK4</code>
                                        <p className="text-xs text-slate-500 mt-1">Completely random</p>
                                    </li>
                                    <li className="bg-slate-950/50 p-3 rounded border border-white/5">
                                        <code className="text-green-300 font-mono">Correct-Horse-Battery-Staple</code>
                                        <p className="text-xs text-slate-500 mt-1">Memorable passphrase</p>
                                    </li>
                                    <li className="bg-slate-950/50 p-3 rounded border border-white/5">
                                        <code className="text-green-300 font-mono">Moon&amp;Stars!Shine7</code>
                                        <p className="text-xs text-slate-500 mt-1">Creative phrase with symbols</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* What We Check */}
                    <div className="glass-panel p-6 rounded-xl bg-cyan-500/5">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cyan-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            What We Check
                        </h3>
                        <ul className="grid md:grid-cols-2 gap-3 text-sm text-slate-300">
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 mt-1">✓</span>
                                <span>Password length (min 8 characters)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 mt-1">✓</span>
                                <span>Character variety (uppercase, lowercase, numbers, symbols)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 mt-1">✓</span>
                                <span>Common patterns (sequential, repeated, keyboard walks)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 mt-1">✓</span>
                                <span>Dictionary words and predictable substitutions</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 mt-1">✓</span>
                                <span>Breach database (10,000+ known compromised passwords)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 mt-1">✓</span>
                                <span>AI predictability using neural network models</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur border-t border-white/10 p-6">
                    <button
                        onClick={onClose}
                        className="w-full py-3 px-6 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
                    >
                        Got It!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksModal;
