<template>
  <section v-if="LocalUser && !loading">
    <PageTitle backButton>
      <template #title>{{ LocalUser.LocalUserName || 'Liste' }}</template>
      <template #subtitle>{{ LocalUser.LocalUserDescription || 'Ma liste' }}</template>
    </PageTitle>
    <Grid>
      <BookCard v-for="book in LocalUser.LocalUserBooks" :key="book.isbn" :book="book" />
    </Grid>
    <article v-if="LocalUser && route.params.type === 'list'">
      <ListEditor
        :name="LocalUser.LocalUserName"
        :description="LocalUser.LocalUserDescription"
        :list-id="parseInt(route.params.id)"
        :editable="true"
        @update="updateLocalUser"
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

const listStore = useListStore()
const route = useRoute()

const LocalUser = ref(null)
const loading = ref(true)

async function loadList() {
  const type = route.params.type
  const id = route.params.id

  loading.value = true
  LocalUser.value = null

  if (type === 'list' && id) {
    const list = listStore.getListbyId(parseInt(id))
    if (list) {
      LocalUser.value = {
        LocalUserName: list.userlistName,
        LocalUserDescription: list.userlistDescription,
        LocalUserBooks: list.books,
      }
    }
  } else if (type === 'favoris') {
    LocalUser.value = {
      LocalUserName: 'Favoris',
      LocalUserDescription: 'Livres marqués comme favoris',
      LocalUserBooks: listStore.favorites,
    }
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
      all: () => true,
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
    LocalUser.value = null
  }

  loading.value = false
}

function updateLocalUser({ name, description }) {
  if (LocalUser.value) {
    LocalUser.value.LocalUserName = name
    LocalUser.value.LocalUserDescription = description
  }
}

watch(() => route.fullPath, loadList)
onMounted(loadList)
</script>
