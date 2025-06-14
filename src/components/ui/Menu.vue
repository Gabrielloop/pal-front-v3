<template>
  <aside class="flex flex-col">
    <h2 class="mb-4 text-lg font-semibold">Menu</h2>
    <ul class="space-y-2">
      <li v-for="section in sections" :key="section.id">
        <router-link :to="section.route" class="text-blue-600 hover:underline">
          {{ section.label }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { useSections } from '@/stores/useSections'
const { sections } = useSections()
</script>

<style scoped>
aside {
  width: 250px;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
