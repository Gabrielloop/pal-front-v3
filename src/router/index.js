import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

import Home from '@/pages/Home.vue'
import Admin from '@/pages/Admin.vue'
import Profil from '@/pages/Profil.vue'


const routes = [
  { path: '/', name: 'Home', component: () => Home },
  { path: '/admin', name: 'Admin', component: () => Admin, meta: { requiresAdmin: true } },
  { path: '/profil', name: 'Profil', component: () => Profil, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: () => Profil },
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
