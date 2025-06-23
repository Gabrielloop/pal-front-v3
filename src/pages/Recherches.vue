<template>
  <div class="flex min-h-screen w-full flex-col items-center p-4">
    <section v-if="bnfStore.results.length === 0">
      <PageTitle>
        <template #title>Aucun résultat pour "{{ searchQuery }}</template>
        <template #subtitle>Essayez une autre recherche.</template>
      </PageTitle>
    </section>
    <section v-else-if="!loading">
      <PageTitle>
        <template #title
          >Résultat{{ bnfStore.results.length > 0 ? 's' : '' }} pour "{{ searchQuery }}</template
        >
        <template #subtitle>Recherche par titre ou ISBN dans la barre de recherches.</template>
      </PageTitle>
      <Grid>
        <BookCard v-for="book in bnfStore.results" :key="book.isbn" :book="book" />
      </Grid>
    </section>

    <section v-else>
      <LoadingLogo />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBnfStore } from '@/stores/useBnfStore'
import BookCard from '@/components/ui/BookCard.vue'
import Grid from '@/components/ui/Grid.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import LoadingLogo from '@/components/ui/LoadingLogo.vue'

const route = useRoute()
const bnfStore = useBnfStore()
const searchQuery = ref(route.query.q || '')

const loading = ref(bnfStore.loading)

onMounted(() => {
  if (route.query.q) {
    bnfStore.fetchResults(route.query.q, 1)
  }
})

watch(
  () => route.query.q,
  (newQ) => {
    if (newQ) {
      searchQuery.value = newQ
      bnfStore.fetchResults(newQ, 1)
    }
  }
)
</script>
