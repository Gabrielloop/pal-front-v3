<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { watch, onMounted } from 'vue'

import '@/style.css'

const auth = useAuthStore()

onMounted(() => {
  if (auth.isAuthenticated) {
    console.log('User is authenticated:', auth.user.role)
  } else {
    console.log('User is not authenticated')
  }
})

// Watcher pour activer/désactiver la classe "dark" sur <html>
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
</script>

<template>
  <router-view />
</template>

<style scoped></style>
