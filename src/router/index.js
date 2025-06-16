import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const routes = [
  {
    path: '/login',
    component: () => import('@/layouts/LayoutLogin.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/pages/Login.vue'),
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
      },
      {
        path: 'dashboard',
        name: 'Accueil',
        component: () => import('@/pages/Dashboard.vue'),
      },
      {
        path: 'listes',
        name: 'Listes',
        component: () => import('@/pages/Listes.vue'),
      },
      {
        path: 'listes/:id',
        name: 'Ma liste',
        component: () => import('@/pages/Listes.vue'),
      },
      {
        path: 'recherches',
        name: 'Recherches',
        component: () => import('@/pages/Recherches.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/pages/Profile.vue'),
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
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/pages/Admin/UserTable.vue'),
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
