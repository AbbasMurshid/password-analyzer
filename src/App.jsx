import React, { useState, useEffect } from 'react';
import PasswordInput from './components/PasswordInput';
import PasswordAnalysis from './components/PasswordAnalysis';
import Heatmap from './components/Heatmap';
import Suggestions from './components/Suggestions';
import PatternWarning from './components/PatternWarning';
import CrackTimeTable from './components/CrackTimeTable';
import HowItWorksModal from './components/HowItWorksModal';
import PrivacyStatement from './components/PrivacyStatement';
import EducationalSection from './components/EducationalSection';
import PasswordGenerator from './components/PasswordGenerator';
import CrackTimeCalculator from './components/CrackTimeCalculator';
import { analyzePassword } from './utils/scoringEngine';

function App() {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  useEffect(() => {
    setAnalysis(analyzePassword(password));
  }, [password]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+I or Cmd+I for How It Works
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        setShowHowItWorks(true);
      }
      // Ctrl+G or Cmd+G for Generator
      if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        setShowGenerator(prev => !prev);
      }
      // Esc to close modals
      if (e.key === 'Escape') {
        setShowHowItWorks(false);
        setShowPrivacy(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-900">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-0"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl flex-grow relative z-10">
        <header className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] -z-10"></div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 neon-text">
              CYBER
            </span>
            <span className="text-white ml-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              GUARD
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-cyan-400/80 font-mono text-sm tracking-[0.2em] uppercase mb-4">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
            Advanced Algorithm Engine
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
          </div>
          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setShowHowItWorks(true)}
              className="px-5 py-2.5 bg-slate-800/50 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 text-purple-300 hover:text-purple-200 rounded-lg transition-all font-mono text-sm flex items-center gap-2 group"
              aria-label="How it works"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:rotate-12 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              How It Works
              <span className="text-xs text-slate-500">(Ctrl+I)</span>
            </button>
            <button
              onClick={() => setShowGenerator(prev => !prev)}
              className="px-5 py-2.5 bg-slate-800/50 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-300 hover:text-cyan-200 rounded-lg transition-all font-mono text-sm flex items-center gap-2"
              aria-label="Toggle password generator"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
              {showGenerator ? 'Hide' : 'Show'} Generator
              <span className="text-xs text-slate-500">(Ctrl+G)</span>
            </button>
          </div>
        </header>

        <main className="space-y-8">
          {/* Password Generator (collapsible) */}
          {showGenerator && (
            <PasswordGenerator onGenerate={setPassword} />
          )}

          <PasswordInput value={password} onChange={setPassword} />

          {password && analysis ? (
            <div className="animate-fade-in-up space-y-8">
              {/* Main Analysis Dashboard */}
              <PasswordAnalysis analysis={analysis} />

              {/* Warnings */}
              <PatternWarning warnings={analysis.warnings} />

              {/* Detailed Visualizations */}
              <div className="grid md:grid-cols-2 gap-6">
                <Heatmap password={password} />
                <CrackTimeCalculator crackTime={analysis.crackTime} />
              </div>

              {/* AI Suggestions */}
              <Suggestions password={password} onSelect={setPassword} />

              {/* Educational Section */}
              <EducationalSection />
            </div>
          ) : (
            <div className="mt-16 grid md:grid-cols-3 gap-6 animate-fade-in">
              <div className="glass-panel p-8 rounded-xl hover:border-cyan-500/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-mono">Adaptive Entropy</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Markov-chain based analysis that learns from character transitions.
                </p>
              </div>

              <div className="glass-panel p-8 rounded-xl hover:border-purple-500/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-mono">AI Guessability</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Simulates neural network attacks to predict how easily AI can guess your password.
                </p>
              </div>

              <div className="glass-panel p-8 rounded-xl hover:border-red-500/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <span className="text-2xl">🕸️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-mono">Dark Web Scan</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Checks similarity against millions of leaked patterns using Levenshtein distance.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5 mt-auto relative z-10 bg-slate-900/80 backdrop-blur">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">100% Client-Side Processing</span>
        </div>
        <div className="flex items-center justify-center gap-4 mb-3 text-xs">
          <button
            onClick={() => setShowPrivacy(true)}
            className="text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
          >
            Privacy & Security
          </button>
          <span className="text-slate-700">•</span>
          <button
            onClick={() => setShowHowItWorks(true)}
            className="text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
          >
            How It Works
          </button>
        </div>
        <p className="font-mono text-slate-600">
          &copy; {new Date().getFullYear()} <span className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer glitch-hover">abbasmurshid</span>. All rights reserved.
        </p>
      </footer>

      {/* Modals */}
      <HowItWorksModal isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
      <PrivacyStatement isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </div>
  );
}

export default App;
