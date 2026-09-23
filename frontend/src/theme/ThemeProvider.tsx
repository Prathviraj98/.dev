'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type TimeMode = 'morning' | 'afternoon' | 'evening' | 'night';

export interface TimeModeInfo {
  mode: TimeMode;
  name: string;
  timeRange: string;
  badgeColor: string;
  accentColor: string;
  description: string;
}

export const TIME_MODES_INFO: Record<TimeMode, TimeModeInfo> = {
  morning: {
    mode: 'morning',
    name: 'Morning Sunrise',
    timeRange: '6:00 AM – 11:59 AM',
    badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
    accentColor: '#f59e0b',
    description: 'Gold & Teal Sunrise Nebula Space',
  },
  afternoon: {
    mode: 'afternoon',
    name: 'Solar Afternoon',
    timeRange: '12:00 PM – 4:59 PM',
    badgeColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
    accentColor: '#06b6d4',
    description: 'High Solar Cyan & Electric Blue Space',
  },
  evening: {
    mode: 'evening',
    name: 'Dusk Twilight',
    timeRange: '5:00 PM – 8:59 PM',
    badgeColor: 'text-pink-300 bg-pink-500/10 border-pink-500/30',
    accentColor: '#ec4899',
    description: 'Twilight Magenta & Violet Cosmic Dust',
  },
  night: {
    mode: 'night',
    name: 'Deep Space Night',
    timeRange: '9:00 PM – 5:59 AM',
    badgeColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
    accentColor: '#10b981',
    description: 'Abyss Matrix Cyber Constellation',
  },
};

export function getAutoTimeMode(): TimeMode {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

interface ThemeContextType {
  timeMode: TimeMode;
  isAuto: boolean;
  setTimeMode: (mode: TimeMode) => void;
  cycleTimeMode: () => void;
  resetToAuto: () => void;
  isDaytime: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  timeMode: 'afternoon',
  isAuto: true,
  setTimeMode: () => {},
  cycleTimeMode: () => {},
  resetToAuto: () => {},
  isDaytime: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [timeMode, setTimeModeState] = useState<TimeMode>('afternoon');
  const [isAuto, setIsAuto] = useState<boolean>(true);

  const applyTimeMode = useCallback((mode: TimeMode) => {
    setTimeModeState(mode);

    if (typeof document !== 'undefined') {
      document.body.classList.remove('theme-morning', 'theme-afternoon', 'theme-evening', 'theme-night', 'day-mode', 'night-mode');
      document.body.classList.add(`theme-${mode}`);

      if (mode === 'morning' || mode === 'afternoon') {
        document.body.classList.add('day-mode');
      } else {
        document.body.classList.add('night-mode');
      }
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('dotdev_time_mode');
    const savedAuto = localStorage.getItem('dotdev_theme_auto');

    if (savedAuto === 'false' && savedTheme && ['morning', 'afternoon', 'evening', 'night'].includes(savedTheme)) {
      setIsAuto(false);
      applyTimeMode(savedTheme as TimeMode);
    } else {
      setIsAuto(true);
      const autoMode = getAutoTimeMode();
      applyTimeMode(autoMode);
    }

    const interval = setInterval(() => {
      const currentAutoCheck = localStorage.getItem('dotdev_theme_auto');
      if (currentAutoCheck !== 'false') {
        const nextAutoMode = getAutoTimeMode();
        applyTimeMode(nextAutoMode);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [applyTimeMode]);

  const setTimeMode = (mode: TimeMode) => {
    setIsAuto(false);
    localStorage.setItem('dotdev_theme_auto', 'false');
    localStorage.setItem('dotdev_time_mode', mode);
    applyTimeMode(mode);
  };

  const resetToAuto = () => {
    setIsAuto(true);
    localStorage.setItem('dotdev_theme_auto', 'true');
    const autoMode = getAutoTimeMode();
    applyTimeMode(autoMode);
  };

  const cycleTimeMode = () => {
    const modes: TimeMode[] = ['morning', 'afternoon', 'evening', 'night'];
    const currentIndex = modes.indexOf(timeMode);

    if (isAuto) {
      const nextIndex = (currentIndex + 1) % modes.length;
      setTimeMode(modes[nextIndex]);
    } else {
      if (currentIndex === modes.length - 1) {
        resetToAuto();
      } else {
        setTimeMode(modes[currentIndex + 1]);
      }
    }
  };

  const isDaytime = timeMode === 'morning' || timeMode === 'afternoon';

  return (
    <ThemeContext.Provider
      value={{
        timeMode,
        isAuto,
        setTimeMode,
        cycleTimeMode,
        resetToAuto,
        isDaytime,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
