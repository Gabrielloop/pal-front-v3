<template>
  <div class="flex min-h-screen w-full flex-col items-center p-4">
    <section v-if="loading">
      <PageTitle>
        <template #title>Mes listes</template>
      </PageTitle>
      <LoadingLogo />
    </section>
    <section v-else-if="LocalUser && !loading">
      <PageTitle>
        <template #title>{{ LocalUser.LocalUserName || 'Liste' }}</template>
        <template #subtitle>{{ LocalUser.LocalUserDescription || 'Ma liste' }}</template>
      </PageTitle>
      <Grid>
        <BookCard v-for="book in LocalUser.LocalUserBooks" :key="book.isbn" :book="book" />
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

const LocalUser = ref(null)
const loading = ref(true)

// Fonction de chargement de la liste selon les paramètres d'URL
async function loadList() {
  const type = route.params.type
  const id = route.params.id

  loading.value = true
  LocalUser.value = null

  console.log('type de route :', type, id)

  if (type === 'list' && id) {
    const list = listStore.getListbyId(parseInt(id))
    if (list) {
      LocalUser.value = {
        LocalUserName: list.name,
        LocalUserDescription: list.description,
        LocalUserBooks: list.books,
      }
    }
  } else if (type === 'favoris') {
    console.log('Favoris:', listStore.favorites),
      (LocalUser.value = {
        LocalUserName: 'Favoris',
        LocalUserDescription: 'Livres marqués comme favoris',
        LocalUserBooks: listStore.favorites,
      })
  } else if (type === 'wishlist') {
    LocalUser.value = {
      LocalUserName: 'Wishlist',
      LocalUserDescription: 'Livres à lire plus tard',
      LocalUserBooks: listStore.wishlists,
    }
  } else if (type === 'lectures' && id) {
    const labelMap = {
      'en-cours': 'Lectures en cours',
      termine: 'Lectures terminées',
      abandonne: 'Lectures abandonnées',
      'a-commencer': 'À commencer',
    }

    const filterMap = {
      all: () => true, // Tous les livres
      'en-cours': (r) => r.reading.isReading,
      termine: (r) => r.reading.isFinished,
      abandonne: (r) => r.reading.isAbandoned,
      'a-commencer': (r) => !r.reading.isStarted,
    }

    if (filterMap[id]) {
      const filtered = listStore.readings.filter(filterMap[id])
      LocalUser.value = {
        LocalUserName: labelMap[id],
        LocalUserDescription: 'Livres selon l’état de lecture',
        LocalUserBooks: filtered,
      }
    }
  } else if (type === 'classements' && id !== undefined) {
    const stars = parseInt(id)

    const filteredNotes = listStore.notes.filter((n) => parseInt(n.noteContent) === stars)
    const books = filteredNotes.map((n) => n.book ?? n)

    LocalUser.value = {
      LocalUserName: `Classement ${stars} ★`,
      LocalUserDescription: `Livres notés ${stars} étoile${stars > 1 ? 's' : ''}`,
      LocalUserBooks: books,
    }
  } else {
    // Aucun type reconnu
    LocalUser.value = null
  }

  loading.value = false
}

// Charger la liste au montage et lors des changements de route
watch(() => route.fullPath, loadList)
onMounted(loadList)
</script>
