import React, { useState, useEffect } from 'react';
import PasswordInput from './components/PasswordInput';
import PasswordAnalysis from './components/PasswordAnalysis';
import Heatmap from './components/Heatmap';
import Suggestions from './components/Suggestions';
import PatternWarning from './components/PatternWarning';
import CrackTimeTable from './components/CrackTimeTable';
import { analyzePassword } from './utils/scoringEngine';

function App() {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    setAnalysis(analyzePassword(password));
  }, [password]);

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
          <div className="flex items-center justify-center gap-2 text-cyan-400/80 font-mono text-sm tracking-[0.2em] uppercase">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
            Advanced Algorithm Engine
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
          </div>
        </header>

        <main className="space-y-8">
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
                <CrackTimeTable crackTime={analysis.crackTime} />
              </div>

              {/* AI Suggestions */}
              <Suggestions password={password} onSelect={setPassword} />
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
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">Secure Environment</span>
        </div>
        <p className="font-mono text-slate-600">
          &copy; {new Date().getFullYear()} <span className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer glitch-hover">abbasmurshid</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
