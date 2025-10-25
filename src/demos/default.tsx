'use client';

import Component from '@/components/ui/component';

export default function Demo() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-900 transition-colors duration-700 ease-in-out">
      <div className="flex min-h-screen items-center justify-center transition-colors duration-700 ease-in-out">
        <Component />
      </div>
    </div>
  );
}

