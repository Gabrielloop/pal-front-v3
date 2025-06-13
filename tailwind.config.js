/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /^btn(-[a-z]+)?$/, // attrape btn, btn-valider, btn-disabled, etc.
    },
    {
      pattern: /^badge(-[a-z]+)?$/, // attrape badge, badge-primary, etc.
    }
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',    // Bleu principal
        secondary: '#f59e0b',  // Jaune/orange
        accent: '#10b981',     // Vert
        muted: '#6b7280',      // Gris doux
        danger: '#dc2626',      // Refuser
        warning: '#f59e0b',     // En attente
        disabled: '#9ca3af',    // Gris neutre
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        'title': '2rem',
        'section': '2.5rem'
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
