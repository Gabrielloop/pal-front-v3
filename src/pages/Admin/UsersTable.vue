<template>
  <div class="w-full p-4">
    <div class="mb-4 flex flex-row items-center justify-between">
      <h2 class="mb-4 text-xl font-bold">Gestion des utilisateurs</h2>
      <Button variant="valider" class="mb-4" @click="updateUserCollection" :disabled="loading">
        <template #icon>
          <AppIcon name="refresh" class="mr-2 h-5 w-5" />
        </template>
        Rafraîchir la liste
      </Button>
    </div>
    <EditableTable
      :columns="[
        { label: 'ID', key: 'id' },
        { label: 'Nom', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Rôle', key: 'role' },
        { label: 'Mode sombre', key: 'isDarkMode', type: 'checkbox' },
      ]"
      :items="users"
      :loadingById="loadingById"
      @update="handleUpdate"
      @delete="handleDelete"
      v-if="!loading"
    />

    <p v-else class="text-center">Chargement des utilisateurs...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usersCollection, userUpdate, userDelete } from '@/api/admin'
import { useToastStore } from '@/stores/toast'
import EditableTable from '@/components/admin/EditableTable.vue'
import AppIcon from '@/components/AppIcon.vue'
import Button from '@/components/ui/Button.vue'

const users = ref([])
const toast = useToastStore()

const loading = ref(true)
const loadingById = ref({})

// fonction pour mettre à jour la collection d'utilisateurs
const updateUserCollection = async () => {
  loading.value = true
  try {
    const response = await usersCollection()
    users.value = response.data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isDarkMode: user.isDarkMode,
    }))
  } catch (error) {
    console.error('Erreur lors de la mise à jour des utilisateurs :', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await updateUserCollection()
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs :', error)
  } finally {
    loading.value = false
  }
})

const handleUpdate = async (user) => {
  loadingById.value[user.id] = true
  try {
    await userUpdate(
      { name: user.name, email: user.email, role: user.role, isDarkMode: user.isDarkMode },
      user.id
    )
    toast.success('Utilisateur mis à jour avec succès')
  } catch (error) {
    toast.error("Erreur lors de la mise à jour de l'utilisateur")
  } finally {
    loadingById.value[user.id] = false
  }
}

const handleDelete = async (userId, index) => {
  loadingById.value[userId] = true
  if (!confirm('Supprimer cet utilisateur ?')) return
  try {
    await userDelete(userId)
    users.value.splice(index, 1)
    toast.success('Utilisateur supprimé avec succès')
  } catch (error) {
    toast.error("Erreur lors de la suppression de l'utilisateur")
  } finally {
    loadingById.value[userId] = false
  }
}
</script>

<style scoped>
table {
  table-layout: auto;
}
</style>
