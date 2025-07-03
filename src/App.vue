<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import '@/style.css'

const router = useRouter()

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
