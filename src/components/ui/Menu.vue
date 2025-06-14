<template>
  <aside class="h-screen">
    <h2 class="mb-4 text-xl font-bold">Menu</h2>
    <!-- Chargement de la liste -->
    <div v-if="listStore.isLoading">Chargement des listes...</div>
    <ul v-else>
      <!-- Boucle sur les sections du store -->
      <li v-for="section in sectionStore.sections" :key="section.key">
        <RouterLink
          :to="section.route"
          class="flex items-center gap-2 rounded px-3 py-2 text-gray-700 hover:bg-blue-100"
          ><AppIcon :name="section.icon" class="h-5 w-5" />
          <span>{{ section.label }}</span>
        </RouterLink>

        <!-- Si "mes-listes", on affiche les listes utilisateur -->
        <ul v-if="section.key === 'mes-listes'" class="ml-4">
          <li v-for="list in listStore.lists" :key="list.userlist_id">
            <RouterLink :to="`/listes/${list.userlist_id}`">
              {{ list.userlist_name }}
            </RouterLink>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import { useSectionsStore } from '@/stores/useSectionsStore'
import { useListStore } from '@/stores/useListStore'
import { onMounted } from 'vue'

const sectionStore = useSectionsStore()
const listStore = useListStore()

onMounted(() => {
  sectionStore.buildSections()
})

console.log('Listes:', listStore.lists)
</script>

<style scoped>
aside {
  width: 250px;
  background-color: #f8f9fa;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
