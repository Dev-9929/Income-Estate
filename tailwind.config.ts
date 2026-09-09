import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        brand: {
          green: '#0D402B',
          darkGreen: '#07271B',
          gold: '#D4AF37',
          lightGold: '#F3E5AB',
          goldGlow: 'rgba(212, 175, 55, 0.2)',
          darkSlate: '#090D16',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#222222',
            a: {
              color: '#061d15',
              fontWeight: '600',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationColor: '#c5a880',
              '&:hover': {
                color: '#c5a880',
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: '#061d15',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.01em',
            },
            blockquote: {
              borderLeftColor: '#c5a880',
              backgroundColor: '#F5F7F5',
              color: '#061d15',
            },
            table: {
              width: '100%',
              borderCollapse: 'collapse',
            },
            'thead th': {
              backgroundColor: '#061d15',
              color: '#ffffff',
              fontWeight: '600',
            },
            'tbody tr': {
              borderBottomColor: '#E5E7EB',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
