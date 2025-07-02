<template>
  <table class="w-full border border-ivory">
    <caption class="sr-only">
      Tableau de gestion des listes utilisateur
    </caption>
    <thead class="bg-primary text-ivory">
      <tr>
        <th scope="col" class="border px-4 py-2 text-left">Mes listes</th>
        <th scope="col" class="border px-4 py-2">Action</th>
      </tr>
    </thead>
    <tbody class="bg-ivory/10 dark:bg-white/10">
      <tr v-for="list in localLists" :key="list.userlistId">
        <td class="border px-1 py-1">
          <RouterLink :to="'/listes/list/' + list.userlistId">
            {{ list.userlistName }} ({{ list.books.length }})
          </RouterLink>
        </td>
        <td class="border px-1 py-1 text-center">
          <Button
            :loading="loadingMap[list.userlistId]"
            :disabled="loadingMap[list.userlistId]"
            @click="toggleList(list.userlistId)"
            :variant="isBookInList(list.userlistId) ? 'refuser' : 'valider'"
          >
            <template #icon>
              <AppIcon
                :name="isBookInList(list.userlistId) ? 'trash' : 'plus'"
                class="mr-2 h-5 w-5"
              />
            </template>
            {{ isBookInList(list.userlistId) ? 'Retirer' : 'Ajouter' }}
          </Button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useListStore } from '@/stores/useListStore'
import AppIcon from '@/components/AppIcon.vue'
import Button from '@/components/ui/Button.vue'
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

const store = useListStore()

const loadingMap = ref({}) // { [userlistId]: true/false }
const { lists, removeFromList, addToList } = store

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const localLists = ref([])

watch(
  () => lists,
  (newLists) => {
    localLists.value = JSON.parse(JSON.stringify(newLists))
  },
  { immediate: true, deep: true }
)

function isBookInList(userlistId) {
  const list = localLists.value.find((l) => l.userlistId === userlistId)
  if (!list) return false
  return list.books.some((b) => b.isbn === props.book.isbn)
}

async function toggleList(userlistId) {
  const list = localLists.value.find((l) => l.userlistId === userlistId)
  const book = props.book
  if (!list) return

  loadingMap.value[userlistId] = true
  try {
    const isInList = list.books.some((b) => b.isbn === book.isbn)
    if (isInList) {
      list.books = list.books.filter((b) => b.isbn !== book.isbn)
      await removeFromList(userlistId, book.isbn)
    } else {
      list.books.push(book)
      await addToList(book, userlistId)
    }
  } finally {
    loadingMap.value[userlistId] = false
  }
}
</script>
