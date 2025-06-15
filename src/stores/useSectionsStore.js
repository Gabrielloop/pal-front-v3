import { defineStore } from 'pinia'
import { useListStore } from '@/stores/useListStore'

export const useSectionsStore = defineStore('sections', {
  state: () => ({
    baseSections: [
      {
        key: 'mes-listes',
        label: 'Mes listes',
        route: '/listes',
        icon: 'list',
      },
      {
        key: 'classements',
        label: 'Classements',
        route: '/listes/classements',
        icon: 'star',
      },
      {
        key: 'favoris',
        label: 'Favoris',
        route: '/listes/favoris',
        icon: 'heart',
      },
      {
        key: 'wishlist',
        label: 'Wishlist',
        route: '/listes/wishlist',
        icon: 'cart',
      },
      {
        key: 'lectures',
        label: 'Mes lectures',
        route: '/listes/lectures',
        icon: 'book',
      },
      {
        key: 'recherches',
        label: 'Recherches',
        route: '/recherches',
        icon: 'search',
      },
      {
        key: 'options',
        label: 'Paramètres',
        route: '/profile',
        icon: 'options',
      },
    ],
    sections: [],
  }),

  actions: {
    buildSections() {
      const listStore = useListStore()

      // Sous-listes utilisateur (sous "Mes listes")
      const userLists = listStore.lists.map((list) => ({
        key: `list-${list.userlist_id}`,
        label: list.userlist_name,
        route: `/listes/${list.userlist_id}`,
      }))

      // Sous-listes fixes pour classements
      const ratingLists = [
        { key: 'rating-5', label: '5 étoiles', route: '/listes/classements/5' },
        { key: 'rating-4', label: '4 étoiles', route: '/listes/classements/4' },
        { key: 'rating-3', label: '3 étoiles', route: '/listes/classements/3' },
        { key: 'rating-2', label: '2 étoiles', route: '/listes/classements/2' },
        { key: 'rating-1', label: '1 étoiles', route: '/listes/classements/1' },
        { key: 'rating-0', label: '0 étoiles', route: '/listes/classements/0' },
      ]

      // Sous-listes fixes pour lectures
      const readingStatusLists = [
        { key: 'reading-start', label: 'À commencer', route: '/listes/lectures/a-commencer' },
        { key: 'reading-in', label: 'En cours', route: '/listes/lectures/en-cours' },
        { key: 'reading-done', label: 'Terminé', route: '/listes/lectures/termine' },
      ]

      // Construit les sections dynamiquement
      this.sections = this.baseSections.map((section) => {
        if (section.key === 'mes-listes') {
          return {
            ...section,
            children: userLists,
          }
        }
        if (section.key === 'classements') {
          return {
            ...section,
            children: ratingLists,
          }
        }
        if (section.key === 'lectures') {
          return {
            ...section,
            children: readingStatusLists,
          }
        }
        return section
      })
    },
  },
})
