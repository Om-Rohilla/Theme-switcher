'use client';

import Component from '../components/ui/component';

// Visual demo/preview will go here
// This file is required for 21st.dev registry compatibility

export default function Demo() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-colors duration-500 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
          Cinematic Theme Switcher
        </h1>
        <Component />
        <p className="mt-8 text-gray-600 dark:text-gray-400">
          Ready to build an amazing animated theme switcher! 🚀
        </p>
      </div>
    </div>
  );
}

