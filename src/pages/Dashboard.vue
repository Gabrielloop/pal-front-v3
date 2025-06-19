<script setup>
import AppIcon from '@/components/AppIcon.vue'
import CollectionList from '@/components/ui/CollectionList.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useListStore } from '@/stores/useListStore'
import { useSectionsStore } from '@/stores/useSectionsStore'

const listStore = useListStore()
const sectionStore = useSectionsStore()
</script>

<template>
  <section>
    <h3>Accueil</h3>

    <!-- boucle sur les sections dont dashboard = true -->
    <article v-for="section in sectionStore.sections.filter((s) => s.dashboard)" :key="section.key">
      <RouterLink
        :to="section.route"
        class="flex items-center gap-4 rounded px-3 py-2 text-primary hover:bg-background dark:text-ivory dark:hover:bg-ivory/10"
      >
        <AppIcon :name="section.icon" class="h-5 w-5" />
        <span>{{ section.label }}</span>
      </RouterLink>

      <CollectionList :items="listStore.lists" v-if="section.key === 'mes-listes'" />
      <CollectionList :items="section.children" v-else-if="section.children" />
      <!-- Sous-sections -->
      <!-- <BaseList v-else-if="section.children" :items="section.children" class="mb-4 ml-4 text-sm">
        <template #default="{ item }">
          <RouterLink :to="item.route">
            <span class="menu-block block truncate" :title="item.label">
              {{ item.label }}
            </span>
          </RouterLink>
        </template>
      </BaseList> -->
    </article>
  </section>
</template>

<style scoped></style>
