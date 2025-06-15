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

      // Construit les sections dynamiquement
      this.sections = this.baseSections.map((section) => {
        if (section.key === 'mes-listes') {
          return {
            ...section,
            children: userLists,
          }
        }
        return section
      })
    },
  },
})
