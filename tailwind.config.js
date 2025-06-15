/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './assets/**/*.css'],
  safelist: [
    'btn',
    'btn-primary',
    'btn-accent',
    'btn-valider',
    'btn-refuser',
    'btn-attente',
    'btn-disabled',
    'btn-sm',
    'btn-lg',
    'badge',
    'badge-primary',
    'badge-danger',
    'badge-warning',
    'badge-muted',
    'toast-success',
    'toast-error',
    'toast-info',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#162432', // Bleu principal
        ivory: '#f8efd6', // Ivoire             Textes enn blanc sur fond sombre
        background: '#fcf9f1', // Ivoir clair   Fond général
        accent: '#F2E8D5', // Beige             Contraste
        valide: '#266b03', // Vert              Validation, succès
        secondary: '#f59e0b', // a définir
        muted: '#585258', // Gris               Désactivé
        danger: '#6b1003', // Rouge             Danger, erreur, refuser
        warning: '#6b5203', // En attente       Attente, warning
        disabled: '#585258', // Gris neutre     Désactivé
      },
      fontFamily: {
        title: ['"Playball"', 'cursive'],
        body: ['"Mona Sans"', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        title: '2rem',
        section: '2.5rem',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
