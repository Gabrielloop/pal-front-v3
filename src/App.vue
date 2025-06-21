<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import '@/style.css'

const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (auth.isAuthenticated) {
    console.log('User is authenticated:', auth.user.role)
  } else {
    console.log('User is not authenticated')
  }
})

watch(
  () => auth.user?.isDarkMode,
  (isDark) => {
    document.documentElement.classList.toggle('dark', !!isDark)
  },
  { immediate: true }
)

watch(
  () => auth.user,
  (newUser) => {
    console.log('User changed:', newUser?.role)
  },
  { immediate: true }
)

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'Verso'
  }
})
</script>

<template>
  <router-view />
</template>

<style scoped></style>
