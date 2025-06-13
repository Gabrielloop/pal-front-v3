import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const routes = [
    { path: '/', name: 'Home', component: () => import('@/pages/Home.vue') },
    { path: '/admin', name: 'Admin', component: () => import('@/pages/Admin.vue'), meta: { requiresAdmin: true } },
    { path: '/profil', name: 'Profil', component: () => import('@/pages/Profil.vue'), meta: { requiresAuth: true } },
    { path: '/login', name: 'Login', component: () => import('@/pages/Login.vue') },
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
