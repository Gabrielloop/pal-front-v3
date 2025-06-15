<template>
  <aside class="h-screen">
    <h2 class="mb-4 text-xl font-bold">Menu</h2>
    <!-- Chargement de la liste -->

    <ul>
      <!-- Boucle sur les sections du store -->
      <li v-for="section in sectionStore.sections" :key="section.key">
        <RouterLink
          :to="section.route"
          class="flex items-center gap-2 rounded px-3 py-2 text-gray-700 hover:bg-blue-100"
          ><AppIcon :name="section.icon" class="h-5 w-5" />
          <span>{{ section.label }}</span>
        </RouterLink>

        <!-- Si "mes-listes", on affiche les listes utilisateur -->
        <BaseList
          v-if="section.key === 'mes-listes'"
          :items="listStore.lists"
          :loading="listStore.isLoading"
          class="ml-4"
        >
          <template #default="{ item }">
            <pre>{{ props }}</pre>
            <RouterLink
              :to="`/listes/${item.userlist_id}`"
              class="block w-full rounded px-2 py-1 transition hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {{ item.userlist_name }}
            </RouterLink>
          </template>
        </BaseList>
      </li>
    </ul>
    <DeconnexionForm type="menu" class="mt-32" />
  </aside>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import BaseList from '@/components/ui/BaseList.vue'
import DeconnexionForm from '../forms/DeconnexionForm.vue'
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
