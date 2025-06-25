<template>
  <button
    @click="goBack"
    class="rounded-full bg-primary p-2 text-white transition-colors duration-200 hover:bg-danger/50"
  >
    <AppIcon name="back" class="h-5 w-5" />
  </button>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>
