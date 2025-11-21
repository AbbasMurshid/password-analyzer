import React from 'react';

const EducationalSection = () => {
    return (
        <div className="glass-panel p-8 rounded-xl animate-fade-in-up">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                    What You Can Do Next
                </span>
            </h2>

            <p className="text-slate-300 mb-8 leading-relaxed">
                Creating a strong password is just the first step. Here are essential practices to maximize your security:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Password Manager */}
                <div className="glass-panel p-6 rounded-xl hover:border-cyan-500/50 transition-all group">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                            <span className="text-2xl">🔐</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">Use a Password Manager</h3>
                            <p className="text-sm text-slate-400 mb-3">
                                Store and generate unique passwords for every account. Never reuse passwords!
                            </p>
                            <div className="space-y-2">
                                <a href="https://bitwarden.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                                    → Bitwarden (Open Source, Free)
                                </a>
                                <a href="https://1password.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                                    → 1Password (Premium)
                                </a>
                                <a href="https://www.lastpass.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                                    → LastPass (Freemium)
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2FA/MFA */}
                <div className="glass-panel p-6 rounded-xl hover:border-purple-500/50 transition-all group">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                            <span className="text-2xl">🛡️</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">Enable Multi-Factor Authentication (MFA)</h3>
                            <p className="text-sm text-slate-400 mb-3">
                                Add an extra layer of security beyond passwords. Even if your password is compromised, MFA keeps you safe.
                            </p>
                            <div className="bg-slate-950/50 p-3 rounded border border-white/5">
                                <p className="text-xs text-slate-500 mb-2">Recommended Apps:</p>
                                <ul className="space-y-1 text-sm text-slate-400">
                                    <li>• Google Authenticator</li>
                                    <li>• Authy</li>
                                    <li>• Microsoft Authenticator</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Unique Passwords */}
                <div className="glass-panel p-6 rounded-xl hover:border-green-500/50 transition-all group">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                            <span className="text-2xl">🔑</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">Unique Password Per Site</h3>
                            <p className="text-sm text-slate-400 mb-3">
                                If one site gets hacked, your other accounts stay safe. Password managers make this easy!
                            </p>
                            <div className="bg-red-950/20 border border-red-500/30 p-3 rounded">
                                <p className="text-xs text-red-300 font-semibold mb-1">❌ Don't Do This:</p>
                                <p className="text-xs text-slate-400">Using "MyPassword123!" for email, banking, and social media</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Check for Breaches */}
                <div className="glass-panel p-6 rounded-xl hover:border-yellow-500/50 transition-all group">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                            <span className="text-2xl">🔍</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">Check for Data Breaches</h3>
                            <p className="text-sm text-slate-400 mb-3">
                                See if your accounts have been compromised in known data breaches.
                            </p>
                            <a href="https://haveibeenpwned.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
                                <span>→ Have I Been Pwned</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Regular Updates */}
                <div className="glass-panel p-6 rounded-xl hover:border-blue-500/50 transition-all group">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                            <span className="text-2xl">🔄</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">Update Passwords Regularly</h3>
                            <p className="text-sm text-slate-400 mb-3">
                                Change passwords for critical accounts (email, banking) every 6-12 months or immediately if a breach occurs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Passphrases */}
                <div className="glass-panel p-6 rounded-xl hover:border-pink-500/50 transition-all group">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500/20 transition-colors">
                            <span className="text-2xl">💭</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">Consider Passphrases</h3>
                            <p className="text-sm text-slate-400 mb-3">
                                Long, memorable phrases are often stronger and easier to remember than complex random passwords.
                            </p>
                            <div className="bg-slate-950/50 p-3 rounded border border-white/5">
                                <p className="text-xs text-green-300 font-mono mb-1">✓ Example:</p>
                                <code className="text-xs text-slate-400">Correct-Horse-Battery-Staple</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Tips */}
            <div className="mt-8 glass-panel p-6 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border-cyan-500/30">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                    Pro Tips
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">→</span>
                        <span>Never share passwords via email, text, or messaging apps</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">→</span>
                        <span>Be cautious of phishing emails asking for password resets</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">→</span>
                        <span>Use security keys (YubiKey, Titan) for ultimate protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">→</span>
                        <span>Keep recovery codes in a safe place (physical backup)</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default EducationalSection;
