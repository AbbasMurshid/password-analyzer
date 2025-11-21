import React from 'react';
import { useAccessibility } from './AccessibilityProvider';

const AccessibilitySettings = ({ isOpen, onClose }) => {
    const {
        highContrastMode,
        reduceMotion,
        fontSize,
        toggleHighContrast,
        toggleReduceMotion,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize
    } = useAccessibility();

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-settings-title"
        >
            <div
                className="glass-panel rounded-xl p-6 max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2
                        id="accessibility-settings-title"
                        className="text-2xl font-bold text-cyan-400"
                    >
                        ♿ Accessibility Settings
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-cyan-400 transition-colors text-2xl"
                        aria-label="Close accessibility settings"
                    >
                        ×
                    </button>
                </div>

                {/* Settings Options */}
                <div className="space-y-6">
                    {/* High Contrast Mode */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-200">High Contrast Mode</h3>
                            <p className="text-sm text-slate-400">Increase visual contrast for better readability</p>
                        </div>
                        <button
                            onClick={toggleHighContrast}
                            className={`relative w-14 h-7 rounded-full transition-colors ${highContrastMode ? 'bg-cyan-500' : 'bg-slate-600'
                                }`}
                            aria-label={`High contrast mode ${highContrastMode ? 'enabled' : 'disabled'}`}
                            aria-pressed={highContrastMode}
                            role="switch"
                        >
                            <span
                                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${highContrastMode ? 'translate-x-7' : 'translate-x-0'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Reduce Motion */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-200">Reduce Motion</h3>
                            <p className="text-sm text-slate-400">Minimize animations and transitions</p>
                        </div>
                        <button
                            onClick={toggleReduceMotion}
                            className={`relative w-14 h-7 rounded-full transition-colors ${reduceMotion ? 'bg-cyan-500' : 'bg-slate-600'
                                }`}
                            aria-label={`Reduce motion ${reduceMotion ? 'enabled' : 'disabled'}`}
                            aria-pressed={reduceMotion}
                            role="switch"
                        >
                            <span
                                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${reduceMotion ? 'translate-x-7' : 'translate-x-0'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Font Size */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-2">Font Size</h3>
                        <p className="text-sm text-slate-400 mb-3">Adjust text size for comfortable reading</p>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={decreaseFontSize}
                                disabled={fontSize === 'small'}
                                className={`px-4 py-2 rounded-lg transition-colors ${fontSize === 'small'
                                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                        : 'bg-slate-700 text-slate-200 hover:bg-cyan-500 hover:text-slate-900'
                                    }`}
                                aria-label="Decrease font size"
                            >
                                A-
                            </button>
                            <div className="flex-1 text-center">
                                <span className="text-slate-300 font-medium">
                                    {fontSize === 'small' && 'Small'}
                                    {fontSize === 'normal' && 'Normal'}
                                    {fontSize === 'large' && 'Large'}
                                </span>
                            </div>
                            <button
                                onClick={increaseFontSize}
                                disabled={fontSize === 'large'}
                                className={`px-4 py-2 rounded-lg transition-colors ${fontSize === 'large'
                                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                        : 'bg-slate-700 text-slate-200 hover:bg-cyan-500 hover:text-slate-900'
                                    }`}
                                aria-label="Increase font size"
                            >
                                A+
                            </button>
                            <button
                                onClick={resetFontSize}
                                className="px-4 py-2 rounded-lg bg-slate-700 text-slate-200 hover:bg-purple-500 hover:text-white transition-colors"
                                aria-label="Reset font size to normal"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <p className="text-sm text-slate-300">
                        <strong className="text-cyan-400">💡 Tip:</strong> Settings are saved automatically and will persist across sessions.
                    </p>
                </div>

                {/* Close Button */}
                <div className="mt-6">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors"
                    >
                        Close Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessibilitySettings;
