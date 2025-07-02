<script setup>
defineProps({
  mode: { type: String, default: 'menu' }, // "menu" ou "dashboard"
  lists: { type: Array, required: true },
})
</script>

<template>
  <div v-if="mode === 'menu'">
    <ul class="ml-4 space-y-1" role="list">
      <li v-for="list in lists" :key="list.key">
        <RouterLink :to="list.route" class="text-sm text-gray-600 hover:underline">
          {{ list.label }}
        </RouterLink>
      </li>
    </ul>
  </div>

  <div v-else-if="mode === 'dashboard'" class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div
      v-for="list in lists"
      :key="list.key"
      class="rounded-lg bg-white p-4 shadow"
      role="article"
      :aria-labelledby="`list-title-${list.key}`"
    >
      <h3 class="text-lg font-semibold">{{ list.label }}</h3>
      <p class="text-sm text-gray-500">{{ list.description || 'Aucune description' }}</p>
      <RouterLink :to="list.route" class="mt-2 inline-block text-sm text-blue-500"
        >Voir plus</RouterLink
      >
    </div>
  </div>
</template>
