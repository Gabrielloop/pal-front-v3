import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

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
        redirect: '/list',
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/pages/List.vue'),
      },
      {
        path: 'profil',
        name: 'Profil',
        component: () => import('@/pages/Profil.vue'),
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
        name: 'AdminHome',
        component: () => import('@/pages/Admin.vue'),
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ name: 'Login' })
  }

  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return next({ name: 'Home' })
  }

  next()
})
