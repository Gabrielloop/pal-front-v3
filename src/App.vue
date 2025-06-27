<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

import '@/style.css'

const auth = useAuthStore()
const router = useRouter()

watch(
  () => auth.user?.isDarkMode,
  (isDark) => {
    document.documentElement.classList.toggle('dark', !!isDark)
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
