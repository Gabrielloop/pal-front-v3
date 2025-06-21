<script setup>
import Logo from '@/components/ui/Logo.vue'
import SearchBar from '@/components/ui/SearchBar.vue'

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
    <div class="px-2 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between gap-2">
        <div class="flex items-center gap-4">
          <router-link :to="'/'"><Logo /></router-link>
          <h1 class="hidden font-title text-title text-ivory md:block">Verso</h1>
        </div>
        <SearchBar class="max-w-md flex-1" />
      </div>
    </div>
  </header>
</template>
