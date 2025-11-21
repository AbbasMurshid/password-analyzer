import React, { useState } from 'react';
import { generateRandomPassword, generatePronounceablePassword, generatePassphrase } from '../utils/generator';

const PasswordGenerator = ({ onGenerate }) => {
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [includeUnicode, setIncludeUnicode] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = (type) => {
        let password = '';

        switch (type) {
            case 'random':
                password = generateRandomPassword({
                    length,
                    includeUppercase,
                    includeLowercase,
                    includeNumbers,
                    includeSymbols,
                    includeUnicode
                });
                break;
            case 'pronounceable':
                password = generatePronounceablePassword(length);
                break;
            case 'passphrase':
                password = generatePassphrase('normal');
                break;
            case 'emoji':
                password = generatePassphrase('emoji');
                break;
            default:
                password = generateRandomPassword({ length: 16 });
        }

        setGeneratedPassword(password);
        if (onGenerate) {
            onGenerate(password);
        }
    };

    const copyToClipboard = () => {
        if (generatedPassword) {
            navigator.clipboard.writeText(generatedPassword);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="glass-panel p-8 rounded-xl animate-fade-in-up">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                    </svg>
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    Password Generator
                </span>
            </h2>

            {/* Quick Generate Buttons */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
                <button
                    onClick={() => handleGenerate('random')}
                    className="p-4 bg-slate-900/50 hover:bg-purple-500/10 rounded-lg border border-white/5 hover:border-purple-500/50 transition-all group"
                >
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">🎲</span>
                        <div className="text-left flex-1">
                            <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors">Random Strong</h3>
                            <p className="text-xs text-slate-500">Completely random characters</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => handleGenerate('pronounceable')}
                    className="p-4 bg-slate-900/50 hover:bg-blue-500/10 rounded-lg border border-white/5 hover:border-blue-500/50 transition-all group"
                >
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">🗣️</span>
                        <div className="text-left flex-1">
                            <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors">Pronounceable</h3>
                            <p className="text-xs text-slate-500">Easier to remember</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => handleGenerate('passphrase')}
                    className="p-4 bg-slate-900/50 hover:bg-green-500/10 rounded-lg border border-white/5 hover:border-green-500/50 transition-all group"
                >
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">📝</span>
                        <div className="text-left flex-1">
                            <h3 className="font-bold text-white group-hover:text-green-300 transition-colors">Passphrase</h3>
                            <p className="text-xs text-slate-500">Word-based security</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => handleGenerate('emoji')}
                    className="p-4 bg-slate-900/50 hover:bg-pink-500/10 rounded-lg border border-white/5 hover:border-pink-500/50 transition-all group"
                >
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">🚀</span>
                        <div className="text-left flex-1">
                            <h3 className="font-bold text-white group-hover:text-pink-300 transition-colors">Emoji Enhanced</h3>
                            <p className="text-xs text-slate-500">Unicode characters</p>
                        </div>
                    </div>
                </button>
            </div>

            {/* Advanced Options */}
            <div className="glass-panel p-6 rounded-xl mb-6">
                <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Advanced Options
                </h3>

                {/* Length Slider */}
                <div className="mb-6">
                    <div className="flex justify-between mb-2">
                        <label className="text-sm text-slate-300">Length: {length}</label>
                        <span className="text-xs text-slate-500">8-64 characters</span>
                    </div>
                    <input
                        type="range"
                        min="8"
                        max="64"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                </div>

                {/* Character Type Checkboxes */}
                <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={includeUppercase}
                            onChange={(e) => setIncludeUppercase(e.target.checked)}
                            className="w-4 h-4 rounded accent-purple-500"
                        />
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Uppercase (A-Z)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={includeLowercase}
                            onChange={(e) => setIncludeLowercase(e.target.checked)}
                            className="w-4 h-4 rounded accent-purple-500"
                        />
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Lowercase (a-z)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={includeNumbers}
                            onChange={(e) => setIncludeNumbers(e.target.checked)}
                            className="w-4 h-4 rounded accent-purple-500"
                        />
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Numbers (0-9)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={includeSymbols}
                            onChange={(e) => setIncludeSymbols(e.target.checked)}
                            className="w-4 h-4 rounded accent-purple-500"
                        />
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Symbols (!@#$)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer group col-span-2">
                        <input
                            type="checkbox"
                            checked={includeUnicode}
                            onChange={(e) => setIncludeUnicode(e.target.checked)}
                            className="w-4 h-4 rounded accent-purple-500"
                        />
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Unicode (★☆♦♣)</span>
                    </label>
                </div>
            </div>

            {/* Generated Password Display */}
            {generatedPassword && (
                <div className="glass-panel p-6 rounded-xl bg-purple-500/5 border-purple-500/30 animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-mono text-purple-400 uppercase tracking-widest">Generated Password</h3>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors"
                        >
                            {copied ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                    </svg>
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                    <div className="bg-slate-950/50 p-4 rounded border border-white/10 mb-3">
                        <code className="text-white font-mono text-lg break-all block select-all">
                            {generatedPassword}
                        </code>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        Click "Copy" then test strength above or use directly
                    </div>
                </div>
            )}
        </div>
    );
};

export default PasswordGenerator;
