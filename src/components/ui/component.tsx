'use client';

import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function Component() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Track whether toggle is in checked (dark) or unchecked (light) position
  const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark');

  // Handle hydration - prevent mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle handler that switches between themes
  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Prevent hydration mismatch - show placeholder during SSR
  if (!mounted) {
    return (
      <div className="relative inline-block">
        <div className="relative flex h-12 w-24 items-center rounded-full bg-gray-200 p-1" />
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      {/* Pill-shaped track container */}
      <button
        onClick={handleToggle}
        className={`relative flex h-12 w-24 items-center rounded-full p-1 transition-colors ${
          isDark ? 'bg-slate-800' : 'bg-gray-200'
        }`}
      >
        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-3">
          <Sun size={18} className={isDark ? 'text-white' : 'text-gray-800'} />
          <Moon size={18} className={isDark ? 'text-white' : 'text-gray-800'} />
        </div>

        {/* Circular Thumb with Bouncy Spring Physics */}
        <motion.div
          className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-md ${
            isDark ? 'bg-slate-900' : 'bg-white'
          }`}
          animate={{
            x: isDark ? 48 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          {isDark ? (
            <Moon size={20} className="text-white" />
          ) : (
            <Sun size={20} className="text-gray-800" />
          )}
        </motion.div>
      </button>
    </div>
  );
}

