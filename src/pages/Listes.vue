<template>
  <section v-if="userlist && !loading">
    <h3>{{ userlist.userlistName || 'Liste' }}</h3>
    <p>{{ userlist.userlistDescription || 'Ma liste' }}</p>
    <BookGrid :cols="{ base: 1, sm: 2, md: 3, lg: 4 }">
      <BookCard v-for="book in userlist.books" :key="book.isbn" :book="book" />
    </BookGrid>
  </section>
  <section v-else-if="loading">
    <p>Chargement.</p>
  </section>
  <section v-else>
    <p>Aucune liste trouvée.</p>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useListStore } from '@/stores/useListStore'
import { ref, onMounted, watch } from 'vue'
import BookGrid from '@/components/ui/BookGrid.vue'
import BookCard from '@/components/ui/BookCard.vue'

const listStore = useListStore()
const route = useRoute()

const userlist = ref(null)
const loading = ref(true)

async function loadList() {
  const type = route.params.type
  const id = route.params.id

  loading.value = true
  userlist.value = null

  if (type === 'list' && id) {
    if (!listStore.getListbyId(parseInt(id))) {
      await listStore.fetchLists()
    }
    userlist.value = listStore.getListbyId(parseInt(id))
  } else if (type === 'userlist' && id) {
    userlist.value = await listStore.getUserListbyId(id)
  } else {
    userlist.value = null
  }

  loading.value = false
}

onMounted(loadList)

watch(() => route.params, loadList)
</script>
