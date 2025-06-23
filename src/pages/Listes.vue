<template>
  <div class="flex min-h-screen w-full flex-col items-center p-4">
    <section v-if="loading">
      <PageTitle>
        <template #title>Mes listes</template>
      </PageTitle>
      <LoadingLogo />
    </section>
    <section v-else-if="userlist && !loading">
      <PageTitle>
        <template #title>{{ userlist.userlistName || 'Liste' }}</template>
        <template #subtitle>{{ userlist.userlistDescription || 'Ma liste' }}</template>
      </PageTitle>
      <Grid>
        <BookCard v-for="book in userlist.books" :key="book.isbn" :book="book" />
      </Grid>
    </section>
    <section v-else>
      <PageTitle>
        <template #title>Mes listes</template>
      </PageTitle>

      <CollectionList :items="listStore.lists" />

      <article>
        <CreateListForm />
      </article>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useListStore } from '@/stores/useListStore'
import { ref, onMounted, watch } from 'vue'
import BookCard from '@/components/ui/BookCard.vue'
import LoadingLogo from '@/components/ui/LoadingLogo.vue'
import CreateListForm from '@/components/forms/CreateListForm.vue'
import CollectionList from '@/components/ui/CollectionList.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import Grid from '@/components/ui/Grid.vue'

const listStore = useListStore()
const route = useRoute()

const userlist = ref(null)
const loading = ref(true)

async function loadList() {
  const type = route.params.type
  const id = route.params.id

  loading.value = true
  userlist.value = null

  // 🟢 Cas 1 : liste utilisateur
  if (type === 'list' && id) {
    userlist.value = listStore.getListbyId(parseInt(id))
  }

  // 🟢 Cas 2 : favoris
  else if (type === 'favoris') {
    userlist.value = {
      userlistName: 'Favoris',
      userlistDescription: 'Livres marqués comme favoris',
      books: listStore.favorites,
    }
  }

  // 🟢 Cas 3 : wishlist
  else if (type === 'wishlist') {
    userlist.value = {
      userlistName: 'Wishlist',
      userlistDescription: 'Livres à lire plus tard',
      books: listStore.wishlists,
    }
  }

  // 🟢 Cas 4 : lectures (en-cours / terminé / abandonné / a-commencer)
  else if (type === 'lectures' && id) {
    const labelMap = {
      'en-cours': 'Lectures en cours',
      termine: 'Lectures terminées',
      abandonne: 'Lectures abandonnées',
      'a-commencer': 'À commencer',
    }

    const filterMap = {
      'en-cours': (r) => r.isReading,
      termine: (r) => r.isFinished,
      abandonne: (r) => r.isAbandoned,
      'a-commencer': (r) => !r.isStarted,
    }

    if (filterMap[id]) {
      const filtered = listStore.readings.filter(filterMap[id])
      userlist.value = {
        userlistName: labelMap[id],
        userlistDescription: 'Livres selon l’état de lecture',
        books: filtered,
      }
    }
  }

  // 🟢 Cas 5 : classement par étoiles
  else if (type === 'classements' && id !== undefined) {
    const stars = parseInt(id)
    const filteredNotes = listStore.notes.filter((n) => n.stars === stars)
    const books = listStore.filteredNotes.map((n) => n.book)

    userlist.value = {
      userlistName: `Classement ${stars} ★`,
      userlistDescription: `Livres notés ${stars} étoile${stars > 1 ? 's' : ''}`,
      books,
    }
  }

  // ❌ Aucun cas reconnu
  else {
    userlist.value = null
  }

  loading.value = false
}

watch(() => route.fullPath, loadList)
onMounted(loadList)

watch(() => route.params, loadList)
</script>
