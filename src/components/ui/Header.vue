<script setup>
import Logo from '@/components/ui/Logo.vue'

const props = defineProps({
  isAdmin: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full bg-primary text-ivory shadow"
    :class="{ 'bg-secondary': isAdmin }"
  >
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center gap-4">
          <router-link :to="'/'"><Logo /></router-link>
          <h1 class="font-title text-title">Verso</h1>
        </div>
        <span :class="{ hidden: isAdmin }">recherche</span>
      </div>
    </div>
  </header>
</template>
