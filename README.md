# 🎬 Cinematic Theme Switcher

> A premium animated theme toggle with particle effects, spring physics, and grainy textures inspired by modern design systems.

[![21st.dev](https://img.shields.io/badge/21st.dev-Component-blue)](https://21st.dev/r/omrohilla6/cinematic-theme-switcher)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19+-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📖 Description

The **Cinematic Theme Switcher** is not just another toggle—it's an experience. Inspired by premium design systems and cinematic interfaces, this component transforms theme switching into a delightful interaction that users will actually enjoy clicking.

Built with meticulous attention to detail, it features **organic particle effects** that expand from the toggle center, **spring physics** for satisfying bounce, and **film grain textures** that give it a premium, tactile feel. The component seamlessly integrates with `next-themes` for instant, app-wide theme synchronization while maintaining buttery-smooth 60fps animations powered by GPU-accelerated transforms.

Perfect for modern web applications, portfolios, SaaS dashboards, or any project where you want to add that extra touch of polish. It's fully accessible, keyboard-navigable, respects user motion preferences, and works flawlessly with SSR/SSG in Next.js.

---

## ✨ Features

- 🎨 **Cinematic Animations** - Smooth spring physics with satisfying bounce
- ✨ **Particle Effects** - Organic expanding circles with staggered timing
- 🎞️ **Film Grain Texture** - Subtle grainy overlay for premium feel
- 🚀 **GPU-Accelerated** - Butter-smooth 60fps performance
- 🌓 **Theme Integration** - Works seamlessly with next-themes
- ♿ **Fully Accessible** - ARIA labels, keyboard navigation, screen reader support
- 🎯 **Hover & Tap Feedback** - Micro-interactions that feel responsive
- 💎 **Theme-Aware Styling** - Adapts colors based on current theme
- 📱 **Responsive** - Works beautifully on all screen sizes
- ⚡ **Zero Config** - Drop it in and it just works
- 🎭 **Motion Safe** - Respects `prefers-reduced-motion`
- 🔧 **TypeScript** - Fully typed with complete intellisense
- 🎪 **SSR Ready** - No hydration mismatches, safe for Next.js App Router

---

## 🎥 Preview

### Light Mode → Dark Mode
When toggling from light to dark:
- Sun icon glows warmly
- Thumb slides right with bouncy physics
- Blue particles expand outward
- Smooth transition to dark slate background

### Dark Mode → Light Mode
When toggling from dark to light:
- Moon icon glows softly
- Thumb slides left with spring animation
- Amber particles emanate from center
- Clean transition to white background

> 🔗 **[View Live Demo →](https://21st.dev/r/omrohilla6/cinematic-theme-switcher)**

---

## 📦 Installation

Install the component directly into your project using the official 21st.dev command:

```bash
npx shadcn@latest add https://21st.dev/r/omrohilla6/cinematic-theme-switcher
```

This command will:
- ✅ Automatically install all required dependencies
- ✅ Add the component files to your project
- ✅ Set up proper TypeScript types
- ✅ Configure imports and paths

---

## 🛠️ Prerequisites

Before installing, ensure your project has:

| Requirement | Version | Notes |
|------------|---------|-------|
| **Next.js** | 15+ | App Router or Pages Router |
| **React** | 19+ | Hooks and client components |
| **Tailwind CSS** | 3.4+ | For styling |
| **next-themes** | 0.3+ | Theme management |
| **framer-motion** | 11+ | Animation engine |
| **lucide-react** | Latest | Icon library |

> **Note:** The installation command handles dependency installation automatically via shadcn/ui.

---

## 🚀 Basic Usage

### 1. Wrap Your App with ThemeProvider

First, set up `next-themes` in your root layout:

```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2. Import and Use the Component

```tsx
// app/components/navbar.tsx
import Component from '@/components/ui/component'

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <h1>My App</h1>
      <Component />
    </nav>
  )
}
```

That's it! The component works out of the box with zero configuration.

---

## 🎯 Advanced Usage

### Custom Positioning

```tsx
// Center in a hero section
<div className="flex items-center justify-center min-h-screen">
  <Component />
</div>

// Fixed top-right corner
<div className="fixed top-4 right-4 z-50">
  <Component />
</div>

// Inside a navbar
<nav className="flex items-center gap-4">
  <Logo />
  <Navigation />
  <Component />
</nav>
```

### With Custom Styling

```tsx
// Add custom wrapper classes
<div className="rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-800">
  <Component />
</div>
```

### Multiple Instances

You can use multiple instances on the same page - they'll all stay synchronized via `next-themes`:

```tsx
<header>
  <Component /> {/* Synced */}
</header>

<aside>
  <Component /> {/* Synced */}
</aside>
```

---

## 📋 API Reference

### Component Props

The component is designed to work out-of-the-box with sensible defaults. Currently, it doesn't expose custom props as it automatically integrates with your `next-themes` setup.

| Feature | Implementation |
|---------|---------------|
| **Theme Detection** | Automatic via `useTheme()` |
| **Styling** | Tailwind CSS classes |
| **Accessibility** | Built-in ARIA labels |
| **Animations** | Framer Motion |
| **Icons** | Lucide React (Sun/Moon) |

---

## 🔧 How It Works

### Technical Architecture

```
┌─────────────────────────────────────┐
│    Cinematic Theme Switcher         │
├─────────────────────────────────────┤
│                                     │
│  1. User Clicks Toggle              │
│  2. Generates 3 Particle Layers     │
│  3. Spring Physics Slides Thumb     │
│  4. Particles Expand Outward        │
│  5. Theme Changes via next-themes   │
│  6. Colors/Icons Update             │
│  7. Cleanup After Animation         │
│                                     │
└─────────────────────────────────────┘
```

### Animation Timeline

```
0ms    → User clicks toggle
0ms    → Thumb starts sliding (spring physics)
0ms    → Particle 1 begins expanding
100ms  → Particle 2 begins expanding  
200ms  → Particle 3 begins expanding
~300ms → Thumb reaches destination
1000ms → All particles complete & cleanup
```

### Performance Optimizations

- **GPU Acceleration**: All animations use `transform` and `opacity` (compositor-only properties)
- **Spring Physics**: Framer Motion's optimized spring solver (stiffness: 300, damping: 20)
- **Conditional Rendering**: Particles only exist during animation
- **No Layout Reflow**: All animations avoid triggering layout calculations
- **SSR Safe**: Hydration-safe with mounted state check

---

## 🎨 Customization

### Changing Colors

The component uses Tailwind CSS classes. Customize by modifying your theme:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Component uses these Tailwind colors:
        // slate, gray, amber, yellow, blue
      }
    }
  }
}
```

### Adjusting Animation Speed

While the component has optimized defaults, you can fork and modify timing in `component.tsx`:

```tsx
// Spring physics (thumb slide)
transition={{
  type: 'spring',
  stiffness: 300, // Higher = faster
  damping: 20,    // Lower = more bounce
}}

// Particle duration
duration: 0.6 + i * 0.1 // Adjust base speed
```

### Custom Grain Intensity

The film grain texture uses inline SVG. To adjust intensity, modify the opacity in `component.tsx`:

```tsx
// Find this line:
<div className="absolute inset-0 rounded-full opacity-40">
// Change opacity-40 to opacity-30 (less grain) or opacity-50 (more grain)
```

### Alternative Icon Sizes

```tsx
// In component.tsx, find icon size props:
<Sun size={18} /> // Background icons
<Moon size={20} /> // Thumb icon

// Adjust sizes as needed (16-24 recommended)
```

---

## ♿ Accessibility

The component is built with accessibility as a priority:

### Keyboard Navigation
- **Tab**: Focus the toggle
- **Enter/Space**: Activate toggle
- **Escape**: Remove focus

### Screen Readers
```html
<button 
  aria-label="Switch to dark mode"
  role="switch"
  aria-checked="false"
>
```

### Focus Indicators
- Blue ring in light mode
- Amber ring in dark mode
- Visible focus state with proper contrast

### Motion Preferences
The component respects `prefers-reduced-motion`. When enabled:
- Animations complete instantly
- Particles are disabled
- Only essential transitions remain

---

## 🐛 Troubleshooting

### Theme not switching
**Issue**: Toggle clicks but theme doesn't change  
**Solution**: Ensure `ThemeProvider` wraps your app with `attribute="class"`

```tsx
<ThemeProvider attribute="class" defaultTheme="system">
```

### Hydration mismatch
**Issue**: React hydration error in console  
**Solution**: Add `suppressHydrationWarning` to `<html>` tag

```tsx
<html suppressHydrationWarning>
```

### Animations not smooth
**Issue**: Choppy or laggy animations  
**Solution**: Check browser hardware acceleration is enabled in settings

### Icons not showing
**Issue**: Sun/Moon icons missing  
**Solution**: Ensure `lucide-react` is installed:

```bash
npm install lucide-react
```

### TypeScript errors
**Issue**: Import path not resolving  
**Solution**: Check your `tsconfig.json` has path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 🤝 Contributing

Found a bug or have a feature request? Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this component in your personal or commercial projects.

---

## 🙏 Acknowledgments

- **[shadcn/ui](https://ui.shadcn.com/)** - Component infrastructure and design system
- **[21st.dev](https://21st.dev/)** - Component registry and hosting
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[Lucide](https://lucide.dev/)** - Beautiful icon set

---

## 🔗 Links

- **[Live Demo](https://21st.dev/r/omrohilla6/cinematic-theme-switcher)** - Try it yourself
- **[21st.dev Component Page](https://21st.dev/r/omrohilla6/cinematic-theme-switcher)** - Official listing
- **[GitHub Repository](#)** - Source code
- **[Report Bug](#)** - Issue tracker

---

<div align="center">

**Made with ❤️ for the web**

If you found this component helpful, consider giving it a ⭐ on GitHub!

</div>
