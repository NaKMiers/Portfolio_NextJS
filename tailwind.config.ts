import type { Config } from 'tailwindcss'
import tailwindScrollbar from 'tailwind-scrollbar'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        primary: '#111',
        secondary: '#393A47',
        accent: '#00bfff',
        /** Editorial one-page (tokens also live as CSS vars on `.portfolio-public-root`) */
        pp: {
          bg: 'var(--pp-bg)',
          panel: 'var(--pp-panel)',
          'panel-strong': 'var(--pp-panel-strong)',
          text: 'var(--pp-text)',
          muted: 'var(--pp-muted)',
          line: 'var(--pp-line)',
          blue: 'var(--pp-blue)',
          green: 'var(--pp-green)',
          violet: 'var(--pp-violet)',
          pink: 'var(--pp-pink)',
          orange: 'var(--pp-orange)',
        },
      },
      backgroundImage: {
        circles: 'url("/bg-circles.png")',
        circleStar: 'url("/circle-star.svg")',
        site: 'url("/site-bg.svg")',
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
      },
      fontFamily: {
        poppins: [`var(--font-poppins)`, 'sans-serif'],
        sora: [`var(--font-sora)`, 'sans-serif'],
        display: [`var(--font-montserrat)`, 'Montserrat', 'system-ui', 'sans-serif'],
        editorial: [`var(--font-source-sans-3)`, 'Source Sans 3', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        editorial: 'var(--pp-max)',
      },
      spacing: {
        section: 'var(--pp-section-y)',
        'section-sm': 'var(--pp-section-y-sm)',
        gutter: 'var(--pp-gutter)',
      },
      borderRadius: {
        panel: 'var(--pp-radius-panel)',
      },
      boxShadow: {
        panel: 'var(--pp-shadow)',
      },
    },
  },
  container: {
    padding: {
      DEFAULT: '15px',
    },
  },
  plugins: [tailwindScrollbar],
}
export default config
