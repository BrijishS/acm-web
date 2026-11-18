/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#050505',
        'obsidian-dark': '#030508',
        'obsidian-light': '#0B1018',
        'obsidian-card': '#0e1624',
        jet: '#050505',
        'jet-surface': '#0B1018',
        'jet-card': '#0e1624',
        cerulean: '#007BFF',
        'cerulean-cyan': '#38BDF8',
        'cerulean-glow': 'rgba(0, 123, 255, 0.4)',
        rose: '#FF2E88',
        'rose-neon': '#FF3B9D',
        'rose-glow': 'rgba(255, 46, 136, 0.4)',
        chrome: '#C0C0C0',
        'chrome-silver': '#C0C0C0',
        'chrome-muted': '#A5ADBA',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A5ADBA',
        pure: '#FFFFFF',
      },
      fontFamily: {
        mono: ['"DM Mono"', 'monospace', 'ui-monospace'],
        heading: ['"Barlow Condensed"', 'sans-serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        'hologram-blue': '0 0 25px rgba(56, 189, 248, 0.4), inset 0 0 15px rgba(56, 189, 248, 0.2)',
        'hologram-rose': '0 0 25px rgba(255, 59, 157, 0.4), inset 0 0 15px rgba(255, 59, 157, 0.2)',
        'hud-panel': '0 8px 32px 0 rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(56, 189, 248, 0.18)',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' }
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        floatHud: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      },
      animation: {
        scanline: 'scanline 8s linear infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 25s linear infinite',
        'rotate-reverse': 'rotateSlow 35s linear infinite reverse',
        'float-hud': 'floatHud 6s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
