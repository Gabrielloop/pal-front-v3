<template>
  <div class="flex min-h-screen w-full flex-col items-center p-4">
    <section v-if="loading">
      <LoadingLogo />
    </section>
    <section v-else-if="userlist && !loading">
      <h3>{{ userlist.userlistName || 'Liste' }}</h3>
      <p>{{ userlist.userlistDescription || 'Ma liste' }}</p>
      <BookGrid>
        <BookCard v-for="book in userlist.books" :key="book.isbn" :book="book" />
      </BookGrid>
    </section>
    <section v-else>
      <BookGrid>
        <CollectionList :items="listStore.lists" />
      </BookGrid>
      <CreateListForm />
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useListStore } from '@/stores/useListStore'
import { ref, onMounted, watch } from 'vue'
import BookGrid from '@/components/ui/BookGrid.vue'
import BookCard from '@/components/ui/BookCard.vue'
import LoadingLogo from '@/components/ui/LoadingLogo.vue'
import CreateListForm from '@/components/forms/CreateListForm.vue'
import CollectionList from '@/components/ui/CollectionList.vue'

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
