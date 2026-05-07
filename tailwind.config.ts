import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  card: 'hsl(var(--card))',
  'card-foreground': 'hsl(var(--card-foreground))',
  primary: 'hsl(var(--primary))',
  'primary-foreground': 'hsl(var(--primary-foreground))',
  secondary: 'hsl(var(--secondary))',
  'secondary-foreground': 'hsl(var(--secondary-foreground))',
  muted: 'hsl(var(--muted))',
  'muted-foreground': 'hsl(var(--muted-foreground))',
  accent: 'hsl(var(--accent))',
  'accent-foreground': 'hsl(var(--accent-foreground))',
  destructive: 'hsl(var(--destructive))',
  'destructive-foreground': 'hsl(var(--destructive-foreground))',
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',

  brand: {
    DEFAULT: '#360400',
    deep:    '#2a0300',
    dark:    '#0d0000',
    rich:    '#5a0800',
  },
  teal: {
    DEFAULT: '#009688',
    light:   '#4dd0c4',
    dark:    '#00796b',
  },

  white: {
    light:  '#ffff'
  },

  amber: {
    DEFAULT: '#f59e0b',
    50:      '#fffbeb',
    100:     '#fef3c7',
    200:     '#fde68a',
    300:     '#fcd34d',
    400:     '#fbbf24',
    500:     '#f59e0b',
    600:     '#d97706',
    700:     '#b45309',
    800:     '#92400e',
    900:     '#78350f',
  },
},
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
} satisfies Config;
