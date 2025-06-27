import { defineStore } from 'pinia'
import { useListStore } from '@/stores/useListStore'

export const useSectionsStore = defineStore('sections', {
  state: () => ({
    baseSections: [
      {
        key: 'dashboard',
        label: 'Accueil',
        route: '/dashboard',
        icon: 'home',
        dashboard: false,
      },
      {
        key: 'mes-listes',
        label: 'Mes listes',
        route: '/list',
        icon: 'list',
        dashboard: true,
      },
      {
        key: 'classements',
        label: 'Classements',
        route: '/list/classements/all',
        icon: 'star',
        dashboard: true,
      },
      {
        key: 'favoris',
        label: 'Favoris',
        route: '/list/favoris/all',
        icon: 'heart',
        dashboard: true,
      },
      {
        key: 'wishlist',
        label: 'Wishlist',
        route: '/list/wishlist/all',
        icon: 'cart',
        dashboard: true,
      },
      {
        key: 'lectures',
        label: 'Mes lectures',
        route: '/list/lectures/all',
        icon: 'book',
        dashboard: true,
      },
      {
        key: 'recherches',
        label: 'Recherches',
        route: '/search',
        icon: 'search',
        dashboard: false,
      },
      {
        key: 'options',
        label: 'Paramètres',
        route: '/profile',
        icon: 'options',
        dashboard: false,
      },
    ],
    sections: [],
  }),

  actions: {
    buildSections() {
      const listStore = useListStore()
      const starCounts = listStore.countStarsByValue

      // Sous-listes utilisateur (sous "Mes listes")
      const userLists = listStore.lists.map((list) => ({
        key: `list-${list.userlistId}`,
        label: list.userlistName,
        route: `/list/list/${list.userlistId}`,
      }))

      // Sous-listes fixes pour classements
      const ratingLists = [
        {
          key: 'rating-5',
          label: '5 étoiles',
          route: '/list/classements/5',
          icon: 'star',
          description: 'Les meilleures lectures',
          count: starCounts[5] || 0,
        },
        {
          key: 'rating-4',
          label: '4 étoiles',
          route: '/list/classements/4',
          icon: 'star',
          description: 'Les meilleures lectures',
          count: starCounts[4] || 0,
        },
        {
          key: 'rating-3',
          label: '3 étoiles',
          route: '/list/classements/3',
          icon: 'star',
          description: 'Les bonnes lectures',
          count: starCounts[3] || 0,
        },
        {
          key: 'rating-2',
          label: '2 étoiles',
          route: '/list/classements/2',
          icon: 'star',
          description: 'Les lectures moyennes',
          count: starCounts[2] || 0,
        },
        {
          key: 'rating-1',
          label: '1 étoiles',
          route: '/list/classements/1',
          icon: 'star',
          description: 'Les moins bonnes lectures',
          count: starCounts[1] || 0,
        },
        // {
        //   key: 'rating-0',
        //   label: '0 étoiles',
        //   route: '/list/classements/0',
        //   icon: 'star',
        //   description: "Livres que je n'ai pas notés",
        //   count: starCounts[0] || 0,
        // },
      ]

      const readingStatusLists = [
        {
          key: 'reading-start',
          label: 'À commencer',
          route: '/list/lectures/a-commencer',
          icon: 'book',
          description: "Livres que je n'ai pas commencés",
          count: listStore.countHasNotStartedReadings,
        },
        {
          key: 'reading-in',
          label: 'En cours',
          route: '/list/lectures/en-cours',
          icon: 'book',
          description: 'Lectures en cours',
          count: listStore.countHasStartedReadings,
        },
        {
          key: 'reading-done',
          label: 'Terminé',
          route: '/list/lectures/termine',
          icon: 'book',
          description: 'Lectures terminées',
          count: listStore.countHasFinishedReadings,
        },
        {
          key: 'reading-abandoned',
          label: 'Abandonné',
          route: '/list/lectures/abandonne',
          icon: 'book',
          description: 'Lectures abandonnées',
          count: listStore.countHasAbandonedReadings,
        },
      ]

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
