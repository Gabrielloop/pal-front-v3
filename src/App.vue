<script setup>
import { useAuthStore } from '@/store/auth'
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
