'use client';

import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface Particle {
  id: number;
  delay: number;
  duration: number;
}

export default function Component() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
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

  // Toggle handler that switches between themes and triggers particles
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
          className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-md overflow-hidden ${
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
          {/* Particle Layer - expanding circles from center with film grain */}
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
                    ? 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, rgba(251, 191, 36, 0) 70%)'
                    : 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 70%)',
                  filter: `url(#grain-${isDark ? 'dark' : 'light'})`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 8, opacity: [0, 1, 0] }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: 'easeOut',
                }}
              />
            </motion.div>
          ))}

          {/* Icon */}
          <div className="relative z-10">
            {isDark ? (
              <Moon size={20} className="text-white" />
            ) : (
              <Sun size={20} className="text-gray-800" />
            )}
          </div>
        </motion.div>
      </button>
    </div>
  );
}

