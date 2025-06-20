import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('@/layouts/LayoutLogin.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/pages/Login.vue'),
        meta: {
          title: 'Connexion',
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/LayoutUser.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/dashboard',
        meta: {
          title: 'Verso - Accueil',
        },
      },
      {
        path: 'dashboard',
        name: 'Accueil',
        component: () => import('@/pages/Dashboard.vue'),
        meta: {
          title: 'Verso - Accueil',
        },
      },
      {
        path: 'listes',
        name: 'Listes',
        component: () => import('@/pages/Listes.vue'),
        meta: {
          title: 'Verso - Mes listes',
        },
      },
      {
        path: 'listes/:type/:id',
        name: 'Ma liste',
        component: () => import('@/pages/Listes.vue'),
        meta: {
          title: 'Verso - Mes listes',
        },
      },
      {
        path: 'listes/classements',
        name: 'Classements',
        component: () => import('@/pages/Listes.vue'),
        meta: {
          title: 'Verso - Classements',
        },
      },
      {
        path: 'listes/favoris',
        name: 'Mes favoris',
        component: () => import('@/pages/Listes.vue'),
        meta: {
          title: 'Verso - Mes favoris',
        },
      },
      {
        path: 'listes/wishlist',
        name: 'Ma wishlist',
        component: () => import('@/pages/Listes.vue'),
        meta: {
          title: 'Verso - Ma wishlist',
        },
      },
      {
        path: 'listes/lectures',
        name: 'Mes lectures',
        component: () => import('@/pages/Listes.vue'),
        meta: {
          title: 'Verso - Mes lectures',
        },
      },
      {
        path: 'book',
        name: 'Livre',
        component: () => import('@/pages/Book.vue'),
        meta: {
          title: 'Verso - Détails du livre',
        },
      },
      {
        path: 'book/:isbn',
        name: 'Livre',
        component: () => import('@/pages/Book.vue'),
        meta: {
          title: 'Verso - Détails du livre',
        },
      },
      {
        path: 'recherches',
        name: 'Recherches',
        component: () => import('@/pages/Recherches.vue'),
        meta: {
          title: 'Verso - Recherches',
        },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/pages/Profile.vue'),
        meta: {
          title: 'Verso - Profile',
        },
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/LayoutAdmin.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'Admin',
        component: () => import('@/pages/Admin.vue'),
        meta: {
          title: 'Admin',
        },
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/pages/Admin/UsersTable.vue'),
        meta: {
          title: 'Admin',
        },
      },
      {
        path: 'books',
        name: 'AdminBooks',
        component: () => import('@/pages/Admin/BooksTable.vue'),
        meta: {
          title: 'Admin',
        },
      },
      {
        path: 'comments',
        name: 'AdminComments',
        component: () => import('@/pages/Admin/CommentsTable.vue'),
        meta: {
          title: 'Admin',
        },
      },
      {
        path: 'favorites',
        name: 'AdminFavorites',
        component: () => import('@/pages/Admin/FavoritesTable.vue'),
        meta: {
          title: 'Admin',
        },
      },
      {
        path: 'wishlists',
        name: 'AdminWishlists',
        component: () => import('@/pages/Admin/WishlistsTable.vue'),
        meta: {
          title: 'Admin',
        },
      },
      {
        path: 'notes',
        name: 'AdminNotes',
        component: () => import('@/pages/Admin/NotesTable.vue'),
        meta: {
          title: 'Admin',
        },
      },
      {
        path: 'readings',
        name: 'AdminReadings',
        component: () => import('@/pages/Admin/ReadingsTable.vue'),
        meta: {
          title: 'Admin',
        },
      },
      {
        path: 'userlists',
        name: 'AdminUserlists',
        component: () => import('@/pages/Admin/UserlistsTable.vue'),
        meta: {
          title: 'Admin',
        },
      },
      {
        path: 'userlistBooks',
        name: 'AdminUserlistBooks',
        component: () => import('@/pages/Admin/UserlistBooksTable.vue'),
        meta: {
          title: 'Admin',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard : Vérification de l'authentification et des permissions
router.beforeEach(async (to, from, next) => {
  const { useAuthStore } = await import('@/stores/useAuthStore')
  const auth = useAuthStore()

  const isLoggedIn = auth.isAuthenticated
  const isAdmin = auth.isAdmin

  // Route nécessitant une authentification
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // Route nécessitant un admin
  if (to.meta.requiresAdmin && !isAdmin) {
    return next({ name: 'Listes' })
  }

  next()
})
