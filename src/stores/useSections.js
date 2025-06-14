import { defineStore } from 'pinia'

export const useSections = defineStore('sections', {
  state: () => ({
    sections: [
      { key: 'mes-listes', label: 'Mes listes', route: '/listes' },
      { key: 'classements', label: 'Classements', route: '/listes/classements' },
      { key: 'favoris', label: 'Favoris', route: '/listes/favoris' },
      { key: 'lectures', label: 'Mes lectures', route: '/listes/lectures' },
    ],
  }),
})
