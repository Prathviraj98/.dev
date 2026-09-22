'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDaytime: boolean;
  toggleDaytime: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDaytime: true,
  toggleDaytime: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDaytime, setIsDaytime] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-detect Day (6 AM - 6 PM) vs Night (6 PM - 6 AM)
    const currentHour = new Date().getHours();
    const isDay = currentHour >= 6 && currentHour < 18;

    // Check localStorage fallback if user previously manually toggled
    const savedTheme = localStorage.getItem('dotdev_theme');
    if (savedTheme) {
      setIsDaytime(savedTheme === 'day');
    } else {
      setIsDaytime(isDay);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDaytime) {
      document.body.classList.add('day-mode');
      document.body.classList.remove('night-mode');
    } else {
      document.body.classList.add('night-mode');
      document.body.classList.remove('day-mode');
    }
  }, [isDaytime, mounted]);

  const toggleDaytime = () => {
    setIsDaytime((prev) => {
      const nextState = !prev;
      localStorage.setItem('dotdev_theme', nextState ? 'day' : 'night');
      return nextState;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDaytime, toggleDaytime }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
