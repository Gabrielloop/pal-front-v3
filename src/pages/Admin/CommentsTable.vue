<template>
  <div class="w-full p-4">
    <div class="mb-4 flex flex-row items-center justify-between">
      <!-- Edit : titre de la page -->
      <h2 class="mb-4 text-xl font-bold">Gestion des commentaires</h2>

      <!-- Edit : bouton pour rafraîchir la liste -->
      <Button variant="valider" class="mb-4" @click="updateCommentsCollection" :disabled="loading">
        <template #icon>
          <AppIcon name="refresh" class="mr-2 h-5 w-5" />
        </template>
        Rafraîchir la liste
      </Button>
    </div>

    <!-- Edit : définition des colonnes de la table & de la liste d'items -->
    <EditableTable
      :columns="columns"
      :items="comments"
      :loadingById="loadingById"
      @update="handleUpdate"
      @delete="handleDelete"
      v-if="!loading"
    >
      <template #actions="{ item, index }">
        <Button
          variant="attente"
          :disabled="loadingById?.[item.key]"
          @click="handleUpdate(item)"
          class="mx-1"
        >
          <template #icon>
            <AppIcon name="edit" class="h-5 w-5" />
          </template>
          Modifier</Button
        >
        <Button
          variant="refuser"
          :disabled="loadingById?.[item.key]"
          @click="handleDelete(item.isbn, item.userId, index)"
          class="mx-1"
        >
          <template #icon>
            <AppIcon name="trash" class="h-5 w-5" />
          </template>

          Supprimer</Button
        >
      </template>
    </EditableTable>

    <p v-else class="text-center">Chargement des données...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Edit : import des fonctions API
import { commentsCollection, commentUpdate, commentDelete } from '@/api/admin'
import {
  COMMENT_COLUMNS,
  createComment,
  makePayload,
  isValidComment,
  getCommentKey,
} from '@/utils/comment'

import { useToastStore } from '@/stores/toast'
import EditableTable from '@/components/admin/EditableTable.vue'
import AppIcon from '@/components/AppIcon.vue'
import Button from '@/components/ui/Button.vue'

// Edit : colonnes dynamiques à partir des fields
const columns = COMMENT_COLUMNS

// Edit : nom du tableau pour stocker la data à afficher/modifier/supprimer
const comments = ref([])
const toast = useToastStore()
const loading = ref(true)
const loadingById = ref({})

// Edit : fonction pour mettre à jour la collection
const updateCommentsCollection = async () => {
  loading.value = true
  try {
    const response = await commentsCollection()
    comments.value = response.data.map(createComment)
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error)
    toast.error('Erreur de chargement')
  } finally {
    loading.value = false
  }
}

// Edit : appel de la fonction pour charger les données au montage du composant
onMounted(updateCommentsCollection)

// Edit : fonction pour mettre à jour la data
const handleUpdate = async (comment) => {
  const key = comment.key

  if (!isValidComment(comment)) {
    toast.warn('Tous les champs doivent être remplis')
    return
  }

  loadingById.value[key] = true
  try {
    await commentUpdate(makePayload(comment), comment.userId, comment.isbn)
    toast.success('Donnée mise à jour avec succès')
  } catch (error) {
    console.error('Erreur API :', error)
    toast.error('Erreur lors de la mise à jour')
  } finally {
    loadingById.value[key] = false
  }
}

// Edit : fonction pour supprimer la data
const handleDelete = async (isbn, userId, index) => {
  const key = getCommentKey(isbn, userId)

  if (!confirm('Supprimer ce commentaire ?')) return

  loadingById.value[key] = true

  try {
    await commentDelete(userId, isbn)
    comments.value.splice(index, 1)
    toast.success('Donnée supprimé avec succès')
  } catch (error) {
    toast.error('Erreur lors de la suppression')
  } finally {
    loadingById.value[key] = false
  }
}
</script>

<style scoped>
table {
  table-layout: auto;
}
</style>
