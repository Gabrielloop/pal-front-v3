<template>
  <section v-if="localLists && !loading">
    <PageTitle backButton>
      <template #title>{{ localLists.name || 'Liste' }}</template>
      <template #subtitle>{{ localLists.description || 'Ma liste' }}</template>
    </PageTitle>
    <article
      v-if="localLists.books?.length === 0"
      class="flex flex-col items-center justify-center gap-4"
    >
      <p>
        Aucun livre trouvé dans cette liste.<br />
        Lancer une recherche :
      </p>
      <SearchBar />
    </article>
    <Grid>
      <BookCard v-for="book in localLists.books" :key="book.isbn" :book="book" />
    </Grid>
    <article v-if="localLists && route.params.type === 'list'">
      <ListEditor
        :name="localLists.name"
        :description="localLists.description"
        :list-id="parseInt(route.params.id)"
        :editable="true"
        @update="updateLocalLists"
      />
    </article>
  </section>
  <section v-else>
    <PageTitle backButton>
      <template #title>Mes listes</template>
    </PageTitle>

    <LoadingLogo v-if="loading" />
    <CollectionList :items="listStore.lists" v-else />

    <article>
      <CreateListForm />
    </article>
  </section>
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
import ListEditor from '@/components/forms/ListEditor.vue'
import SearchBar from '../components/ui/SearchBar.vue'

const listStore = useListStore()
const route = useRoute()

const localLists = ref(null)
const loading = ref(true)

async function loadList() {
  const type = route.params.type
  const id = route.params.id

  loading.value = true
  localLists.value = null

  if (type === 'list' && id) {
    const list = await listStore.getListbyId(parseInt(id))
    if (list) {
      localLists.value = {
        name: list.userlistName,
        description: list.userlistDescription,
        books: list.books,
      }
    }
  } else if (type === 'favoris') {
    localLists.value = {
      name: 'Favoris',
      description: 'Livres marqués comme favoris',
      books: listStore.favorites,
    }
  } else if (type === 'wishlist') {
    localLists.value = {
      name: 'Wishlist',
      description: 'Livres à lire plus tard',
      books: listStore.wishlists,
    }
  } else if (type === 'lectures' && id) {
    const labelMap = {
      'en-cours': 'Lectures en cours',
      termine: 'Lectures terminées',
      abandonne: 'Lectures abandonnées',
      'a-commencer': 'À commencer',
    }

    const filterMap = {
      all: () => true,
      'en-cours': (r) => r.reading.isReading,
      termine: (r) => r.reading.isFinished,
      abandonne: (r) => r.reading.isAbandoned,
      'a-commencer': (r) => !r.reading.isStarted,
    }

    if (filterMap[id]) {
      const filtered = listStore.readings.filter(filterMap[id])
      localLists.value = {
        name: labelMap[id],
        description: 'Livres selon l’état de lecture',
        books: filtered,
      }
    }
  } else if (type === 'classements' && id !== undefined) {
    if (isNaN(id) || parseInt(id) <= 0) {
      loading.value = false
      return
    }

    const stars = parseInt(id)

    const filteredNotes = listStore.notes.filter((n) => parseInt(n.noteContent) === stars)
    const books = filteredNotes.map((n) => n.book ?? n)

    localLists.value = {
      name: `Classement ${stars} ★`,
      description: `Livres notés ${stars} étoile${stars > 1 ? 's' : ''}`,
      books: books,
    }
  } else {
    localLists.value = null
  }

  loading.value = false
}

function updateLocalLists({ name, description }) {
  if (localLists.value) {
    localLists.value.name = name
    localLists.value.description = description
  }
}

watch(() => route.fullPath, loadList)
onMounted(loadList)
</script>
