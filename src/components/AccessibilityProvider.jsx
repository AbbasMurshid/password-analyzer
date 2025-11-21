import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error('useAccessibility must be used within AccessibilityProvider');
    }
    return context;
};

export const AccessibilityProvider = ({ children }) => {
    // Load saved preferences from localStorage
    const [highContrastMode, setHighContrastMode] = useState(() => {
        const saved = localStorage.getItem('highContrastMode');
        return saved ? JSON.parse(saved) : false;
    });

    const [reduceMotion, setReduceMotion] = useState(() => {
        const saved = localStorage.getItem('reduceMotion');
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        return saved ? JSON.parse(saved) : preference;
    });

    const [fontSize, setFontSize] = useState(() => {
        const saved = localStorage.getItem('fontSize');
        return saved || 'normal'; // 'small', 'normal', 'large'
    });

    // Apply high contrast mode to document
    useEffect(() => {
        if (highContrastMode) {
            document.documentElement.classList.add('high-contrast-mode');
        } else {
            document.documentElement.classList.remove('high-contrast-mode');
        }
        localStorage.setItem('highContrastMode', JSON.stringify(highContrastMode));
    }, [highContrastMode]);

    // Apply reduced motion preference
    useEffect(() => {
        if (reduceMotion) {
            document.documentElement.style.setProperty('--motion-reduce', '1');
        } else {
            document.documentElement.style.setProperty('--motion-reduce', '0');
        }
        localStorage.setItem('reduceMotion', JSON.stringify(reduceMotion));
    }, [reduceMotion]);

    // Apply font size
    useEffect(() => {
        const sizeMap = {
            small: '14px',
            normal: '16px',
            large: '18px'
        };
        document.documentElement.style.fontSize = sizeMap[fontSize];
        localStorage.setItem('fontSize', fontSize);
    }, [fontSize]);

    // Listen for system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleChange = (e) => {
            if (localStorage.getItem('reduceMotion') === null) {
                setReduceMotion(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleHighContrast = () => setHighContrastMode(prev => !prev);
    const toggleReduceMotion = () => setReduceMotion(prev => !prev);
    const increaseFontSize = () => {
        if (fontSize === 'small') setFontSize('normal');
        else if (fontSize === 'normal') setFontSize('large');
    };
    const decreaseFontSize = () => {
        if (fontSize === 'large') setFontSize('normal');
        else if (fontSize === 'normal') setFontSize('small');
    };
    const resetFontSize = () => setFontSize('normal');

    const value = {
        // State
        highContrastMode,
        reduceMotion,
        fontSize,

        // Actions
        toggleHighContrast,
        toggleReduceMotion,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,

        // Direct setters
        setHighContrastMode,
        setReduceMotion,
        setFontSize
    };

    return (
        <AccessibilityContext.Provider value={value}>
            {children}
        </AccessibilityContext.Provider>
    );
};

export default AccessibilityProvider;
