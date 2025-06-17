<template>
  <div class="w-full p-4">
    <div class="mb-4 flex flex-row items-center justify-between">
      <!-- Edit : titre de la page -->
      <h2 class="mb-4 text-xl font-bold">Gestion des listes de lecture</h2>

      <!-- Edit : bouton pour rafraîchir la liste -->
      <Button variant="valider" class="mb-4" @click="updateUserlistsCollection" :disabled="loading">
        <template #icon>
          <AppIcon name="refresh" class="mr-2 h-5 w-5" />
        </template>
        Rafraîchir la liste
      </Button>
    </div>

    <!-- Edit : définition des colonnes de la table & de la liste d'items -->
    <EditableTable
      :columns="columns"
      :items="userlists"
      :loadingById="loadingById"
      @update="handleUpdate"
      @delete="handleDelete"
      v-if="!loading"
    >
      <template #actions="{ item, index }">
        <Button
          variant="attente"
          :disabled="loadingById?.[item.key]"
          @click="handleUpdate(item, index)"
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
          @click="handleDelete(item.userlistId, index)"
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
import { userlistsCollection, userlistUpdate, userlistDelete } from '@/api/admin'
import {
  USERLIST_COLUMNS,
  createUserlist,
  makePayload,
  isValidUserlist,
  getUserlistKey,
} from '@/utils/userlists'

import { useToastStore } from '@/stores/toast'
import EditableTable from '@/components/admin/EditableTable.vue'
import AppIcon from '@/components/AppIcon.vue'
import Button from '@/components/ui/Button.vue'

// Edit : colonnes dynamiques à partir des fields
const columns = USERLIST_COLUMNS

// Edit : nom du tableau pour stocker la data à afficher/modifier/supprimer
const userlists = ref([])
const toast = useToastStore()
const loading = ref(true)
const loadingById = ref({})

// Edit : fonction pour mettre à jour la collection
const updateUserlistsCollection = async () => {
  loading.value = true
  try {
    const response = await userlistsCollection()
    userlists.value = response.data.map(createUserlist)
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error)
    toast.error('Erreur de chargement')
  } finally {
    loading.value = false
  }
}

// Edit : appel de la fonction pour charger les données au montage du composant
onMounted(updateUserlistsCollection)

// Edit : fonction pour mettre à jour la data
const handleUpdate = async (userlist, index) => {
  const key = userlist.key

  if (!isValidUserlist(userlist)) {
    toast.warn('Tous les champs doivent être remplis')
    return
  }

  loadingById.value[key] = true
  try {
    await userlistUpdate(makePayload(userlist), userlist.userlistId)
    toast.success('Donnée mise à jour avec succès')
  } catch (error) {
    console.error('Erreur API :', error)
    toast.error('Erreur lors de la mise à jour')
  } finally {
    loadingById.value[key] = false
  }
}

// Edit : fonction pour supprimer la data
const handleDelete = async (userlistId, index) => {
  const key = getUserlistKey(userlistId)

  if (!confirm('Supprimer ce livre ?')) return

  loadingById.value[key] = true

  try {
    await userlistDelete(userlistId)
    userlists.value.splice(index, 1)
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
