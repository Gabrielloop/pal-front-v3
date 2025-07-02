<template>
  <section v-if="bnfStore.results.length === 0" aria-label="Résultats">
    <PageTitle backButton>
      <template #title>Aucun résultat pour "{{ searchQuery }}"</template>
      <template #subtitle
        >Essayez une autre recherche. Par exemple : <strong>"Zola"</strong> ou un ISBN.</template
      >
    </PageTitle>
  </section>
  <section v-else-if="!loading"
  aria-live="polite"
  aria-labelledby="search-results-title"
  role="region">
    <PageTitle backButton>
      <template #title
        >Résultat{{ bnfStore.results.length > 0 ? 's' : '' }} pour "{{ searchQuery }}"</template
      >
      <template #subtitle>Recherche par titre ou ISBN dans la barre de recherches.</template>
    </PageTitle backButton>
    <Grid>
      <BookCard v-for="book in bnfStore.results" :key="book.isbn" :book="book" />
    </Grid>
  </section>

  <section v-else aria-live="polite">
    <LoadingLogo />
  </section>
</template>

<script setup>
import BookCard from '@/components/ui/BookCard.vue'
import Grid from '@/components/ui/Grid.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import LoadingLogo from '@/components/ui/LoadingLogo.vue'
import { useRoute } from 'vue-router'
import { useBnfStore } from '@/stores/useBnfStore'
import { computed } from 'vue'
import { watchEffect } from 'vue'

const route = useRoute()
const bnfStore = useBnfStore()
const searchQuery = computed(() => bnfStore.query)

const loading = computed(() => bnfStore.loading)

watchEffect(() => {
  const q = route.query.q
  if (q) {
    searchQuery.value = q
    bnfStore.fetchResults(q, 1)
  }
})
</script>
