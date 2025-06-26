<script setup>
import AppIcon from '@/components/AppIcon.vue'
import CollectionList from '@/components/ui/CollectionList.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import { useListStore } from '@/stores/useListStore'
import { useSectionsStore } from '@/stores/useSectionsStore'

const listStore = useListStore()
const sectionStore = useSectionsStore()
</script>

<template>
  <section>
    <PageTitle>
      <template #title>Tableau de bord</template>
      <template #subtitle>Gérer vos listes, collections et autres fonctionnalités.</template>
    </PageTitle>
    <article v-for="section in sectionStore.sections.filter((s) => s.dashboard)" :key="section.key">
      <RouterLink
        :to="section.route"
        class="flex items-center gap-4 rounded px-3 py-2 text-primary hover:bg-background dark:text-ivory dark:hover:bg-ivory/10"
      >
        <AppIcon :name="section.icon" class="h-5 w-5" />
        <span class="text-xl">{{ section.label }}</span>
      </RouterLink>
      <CollectionList :items="listStore.lists" route="" v-if="section.key === 'mes-listes'" />
      <CollectionList :items="section.children" v-else-if="section.children" />
    </article>
  </section>
</template>

<style scoped></style>
