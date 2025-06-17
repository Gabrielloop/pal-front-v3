<template>
  <div class="w-full p-4">
    <div class="mb-4 flex flex-row items-center justify-between">
      <h2 class="mb-4 text-xl font-bold">Gestion des livres importés</h2>
      <Button variant="valider" class="mb-4" @click="updateBooksCollection" :disabled="loading">
        <template #icon>
          <AppIcon name="refresh" class="mr-2 h-5 w-5" />
        </template>
        Rafraîchir la liste
      </Button>
    </div>
    <EditableTable
      :columns="[
        { label: 'Isbn', key: 'isbn' },
        { label: 'Titre', key: 'bookTitle' },
        { label: 'Auteur', key: 'bookAuthor' },
        { label: 'Editeur', key: 'bookPublisher' },
        { label: 'Année', key: 'bookYear', type: 'number' },
      ]"
      :items="books"
      :loadingById="loadingById"
      @update="handleUpdate"
      @delete="handleDelete"
      v-if="!loading"
    />

    <p v-else class="text-center">Chargement des lives...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { booksCollection, bookCreate, bookUpdate, bookDelete } from '@/api/admin'
import { useToastStore } from '@/stores/toast'
import EditableTable from '@/components/admin/EditableTable.vue'
import AppIcon from '@/components/AppIcon.vue'
import Button from '@/components/ui/Button.vue'

// Tableau pour stocker la data à afficher/modifier/supprimer
const books = ref([])

const toast = useToastStore()

const loading = ref(true)
const loadingById = ref({})

// fonction pour mettre à jour la collection de livres
const updateBooksCollection = async () => {
  loading.value = true
  try {
    const response = await booksCollection()
    books.value = response.data.map((book) => ({
      isbn: book.isbn,
      bookTitle: book.bookTitle,
      bookAuthor: book.bookAuthor,
      bookPublisher: book.bookPublisher,
      bookYear: book.bookYear,
    }))
  } catch (error) {
    console.error('Erreur lors de la mise à jour des livres :', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await updateBooksCollection()
  } catch (error) {
    console.error('Erreur lors de la récupération des livres :', error)
  } finally {
    loading.value = false
  }
})

const handleUpdate = async (book) => {
  loadingById.value[book.isbn] = true
  try {
    await bookUpdate(
      {
        isbn: book.isbn,
        bookTitle: book.bookTitle,
        bookAuthor: book.bookAuthor,
        bookPublisher: book.bookPublisher,
        bookYear: book.bookYear,
      },
      book.isbn
    )
    toast.success('Livre mis à jour avec succès')
  } catch (error) {
    toast.error('Erreur lors de la mise à jour du livre')
  } finally {
    loadingById.value[book.isbn] = false
  }
}

const handleDelete = async (isbn, index) => {
  loadingById.value[isbn] = true
  if (!confirm('Supprimer ce livre ?')) return
  try {
    await bookDelete(isbn)
    books.value.splice(index, 1)
    toast.success('Livre supprimé avec succès')
  } catch (error) {
    toast.error('Erreur lors de la suppression du livre')
  } finally {
    loadingById.value[isbn] = false
  }
}
</script>

<style scoped>
table {
  table-layout: auto;
}
</style>
