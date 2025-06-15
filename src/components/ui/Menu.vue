<template>
  <aside class="bg-ivory h-screen">
    <h2 class="mb-4 text-xl font-bold">Menu</h2>
    <!-- Chargement de la liste -->

    <ul>
      <!-- Boucle sur les sections du store -->
      <li v-for="section in sectionStore.sections" :key="section.key">
        <RouterLink
          :to="section.route"
          class="flex items-center gap-4 rounded px-3 py-2 text-primary hover:bg-background"
          ><AppIcon :name="section.icon" class="h-5 w-5" />
          <span>{{ section.label }}</span>
        </RouterLink>

        <!-- Si "mes-listes", on affiche les listes utilisateur -->
        <BaseList
          v-if="section.key === 'mes-listes'"
          :items="listStore.lists"
          :loading="listStore.isLoading"
          class="mb-4 ml-4 text-sm"
        >
          <template #default="{ item }">
            <RouterLink :to="`/listes/${item.userlist_id}`">
              <span class="menu-block block truncate" :title="item.userlist_name">
                {{ item.userlist_name }}
              </span>
            </RouterLink>
          </template>
        </BaseList>

        <!-- Affiche les sous-listes si elles existent -->
        <BaseList v-else-if="section.children" :items="section.children" class="mb-4 ml-4 text-sm">
          <template #default="{ item }">
            <RouterLink :to="item.route">
              <span class="menu-block block truncate" :title="item.label">
                {{ item.label }}
              </span>
            </RouterLink>
          </template>
        </BaseList>
      </li>
    </ul>
    <DeconnexionForm type="menu" class="mt-8" />
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
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
