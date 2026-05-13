import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-soft': 'var(--bg-soft)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        'pink-ticker-bg': 'var(--pink-ticker-bg)',
        'pink-chip': 'var(--pink-chip)',
        'blue-promo': 'var(--blue-promo)',
        'lavender-hover': 'var(--lavender-hover)',
        'lavender-stripe': 'var(--lavender-stripe)',
        'red-tag': 'var(--red-tag)',
        'gold-petition': 'var(--gold-petition)',
        hairline: 'var(--hairline)',
        divider: 'var(--divider)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        ui: ['var(--font-ui)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
      },
      maxWidth: {
        site: '1440px',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
