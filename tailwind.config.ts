import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './nuxt.config.ts'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F5C7A',
          50: '#EEF4F8',
          100: '#D9E2EC',
          200: '#B6C9D6',
          500: '#5196B8',
          600: '#3E7A98',
          700: '#0A4359',
          800: '#083445',
          900: '#0D1B2A'
        },
        steel: {
          DEFAULT: '#5196B8',
          600: '#3E7A98'
        },
        paper: '#F7F8FA',
        heading: '#2A85AC',
        ink: {
          DEFAULT: '#17212B',
          muted: '#52606D'
        },
        line: '#D9E2EC'
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        roboto: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        content: '72rem',
        narrow: '46rem'
      },
      boxShadow: {
        lift: '0 14px 40px rgba(10, 36, 64, 0.08)',
        header: '0 8px 24px rgba(10, 36, 64, 0.12)'
      },
      letterSpacing: {
        tightish: '-0.02em'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        kenburns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-1.2%, -0.8%)' }
        },
        hint: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.45' },
          '50%': { transform: 'translateY(8px)', opacity: '1' }
        }
      },
      animation: {
        marquee: 'marquee 70s linear infinite',
        kenburns: 'kenburns 22s ease-out forwards',
        hint: 'hint 2.4s ease-in-out infinite'
      }
    }
  },
  plugins: []
} satisfies Config
