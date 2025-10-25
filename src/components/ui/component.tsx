'use client';

import { Sun, Moon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface Particle {
  id: number;
  delay: number;
  duration: number;
}

export default function Component() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // State Management
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Ref to track toggle button DOM element
  const toggleRef = useRef<HTMLButtonElement>(null);
  
  // Track whether toggle is in checked (dark) or unchecked (light) position
  const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark');

  // Handle hydration - prevent mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate particles with different timing
  const generateParticles = () => {
    const newParticles: Particle[] = [];
    const particleCount = 3; // Multiple layers

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        delay: i * 0.1, // Stagger timing
        duration: 0.6 + i * 0.1, // Different durations for depth
      });
    }

    setParticles(newParticles);
    setIsAnimating(true);

    // Clear particles after animation
    setTimeout(() => {
      setIsAnimating(false);
      setParticles([]);
    }, 1000);
  };

  // Toggle handler - switches theme and triggers particles
  const handleToggle = () => {
    generateParticles();
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
        {/* SVG Filter for Film Grain Texture */}
        <svg className="absolute w-0 h-0">
        <defs>
          {/* Light mode grain - subtle */}
          <filter id="grain-light">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="desaturatedNoise"
            />
            <feComponentTransfer in="desaturatedNoise" result="lightGrain">
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="lightGrain" mode="overlay" />
          </filter>
          
          {/* Dark mode grain - more visible */}
          <filter id="grain-dark">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="desaturatedNoise"
            />
            <feComponentTransfer in="desaturatedNoise" result="darkGrain">
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="darkGrain" mode="overlay" />
          </filter>
        </defs>
      </svg>

      {/* Pill-shaped track container */}
      <motion.button
        ref={toggleRef}
        onClick={handleToggle}
        className="relative flex h-12 w-24 items-center rounded-full p-1 transition-all duration-300 focus:outline-none"
        style={{
          background: isDark
            ? 'linear-gradient(145deg, #1e293b, #0f172a)'
            : 'linear-gradient(145deg, #f1f5f9, #e2e8f0)',
          boxShadow: isDark
            ? 'inset 2px 2px 5px rgba(0, 0, 0, 0.5), inset -2px -2px 5px rgba(255, 255, 255, 0.05), 0 4px 15px rgba(0, 0, 0, 0.3)'
            : 'inset 2px 2px 5px rgba(0, 0, 0, 0.1), inset -2px -2px 5px rgba(255, 255, 255, 0.7), 0 4px 15px rgba(0, 0, 0, 0.1)',
          border: isDark ? '1px solid rgba(71, 85, 105, 0.3)' : '1px solid rgba(203, 213, 225, 0.5)',
        }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        role="switch"
        aria-checked={isDark}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-3">
          <Sun size={18} className={isDark ? 'text-yellow-100' : 'text-amber-600'} />
          <Moon size={18} className={isDark ? 'text-yellow-100' : 'text-slate-700'} />
        </div>

        {/* Circular Thumb with Bouncy Spring Physics */}
        <motion.div
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full overflow-hidden"
          style={{
            background: isDark
              ? 'linear-gradient(145deg, #475569, #334155)'
              : 'linear-gradient(145deg, #ffffff, #f8fafc)',
            boxShadow: isDark
              ? 'inset 1px 1px 3px rgba(255, 255, 255, 0.1), inset -1px -1px 3px rgba(0, 0, 0, 0.5), 0 6px 20px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)'
              : 'inset 1px 1px 3px rgba(255, 255, 255, 0.8), inset -1px -1px 3px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
            border: isDark
              ? '1px solid rgba(148, 163, 184, 0.2)'
              : '1px solid rgba(226, 232, 240, 0.8)',
          }}
          animate={{
            x: isDark ? 48 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300, // Fast, responsive movement
            damping: 20, // Bouncy feel with slight overshoot
          }}
        >
          {/* Particle Layer - expanding circles from center with grainy texture */}
          {isAnimating && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '10px',
                  height: '10px',
                  background: isDark
                    ? 'radial-gradient(circle, rgba(147, 197, 253, 0.5) 0%, rgba(147, 197, 253, 0) 70%)'
                    : 'radial-gradient(circle, rgba(251, 191, 36, 0.7) 0%, rgba(251, 191, 36, 0) 70%)',
                  mixBlendMode: 'normal',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isDark ? 6 : 8, opacity: [0, 1, 0] }}
                transition={{
                  duration: isDark ? 0.5 : particle.duration,
                  delay: particle.delay,
                  ease: 'easeOut',
                }}
              >
                {/* Grainy texture overlay */}
                <div 
                  className="absolute inset-0 rounded-full opacity-40"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay',
                  }}
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Icon */}
          <div className="relative z-10">
            {isDark ? (
              <Moon size={20} className="text-yellow-200" />
            ) : (
              <Sun size={20} className="text-amber-500" />
            )}
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
}

