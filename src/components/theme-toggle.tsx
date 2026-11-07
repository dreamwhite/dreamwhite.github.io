'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

const subscribeToTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
};

const getThemeSnapshot = () => document.documentElement.dataset.theme === 'light';
const getServerThemeSnapshot = () => false;

export function ThemeToggle() {
  const isLight = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  function toggleTheme() {
    const next = !isLight;
    document.documentElement.dataset.theme = next ? 'light' : 'dark';
    window.localStorage.setItem('theme', next ? 'light' : 'dark');
  }

  return (
    <button className="icon-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}>
      {isLight ? <Moon size={16} strokeWidth={1.7} /> : <Sun size={16} strokeWidth={1.7} />}
    </button>
  );
}
