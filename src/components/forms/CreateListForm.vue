<template>
  <FormContainer title="Nouvelle liste">
    <template #fields>
      <input
        v-model="titre"
        type="text"
        placeholder="Ma liste de livres"
        class="input input-text mb-2 w-full"
      />
      <input
        v-model="description"
        type="text"
        placeholder="Description de la liste"
        class="input input-text mb-2 w-full"
      />
      <p v-if="error" class="text-danger">{{ error }}</p>
    </template>

    <template #actions>
      <Button :loading="loading" @click.prevent="submit" type="submit" variant="valider">
        <template #icon> <AppIcon name="plus" class="mr-2 h-5 w-5" /> </template>Ajouter</Button
      >
    </template>
  </FormContainer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useListStore } from '@/stores/useListStore'
import FormContainer from '@/components/ui/FormContainer.vue'
import Button from '@/components/ui/Button.vue'
import AppIcon from '@/components/AppIcon.vue'

const titre = ref('')
const description = ref('')
const error = ref(null)
const loading = ref(false)

const router = useRouter()
const listStore = useListStore()

function validateForm() {
  if (!titre.value.trim()) return 'Le titre est requis.'
  if (!description.value.trim()) return 'La description est requise.'
  return null
}

const submit = async () => {
  error.value = null

  const validationError = validateForm()
  if (validationError) {
    error.value = validationError
    return
  }
  loading.value = true

  try {
    await listStore.createNewList({
      userlistName: titre.value,
      userlistDescription: description.value,
      userlistType: 'list',
    })
    router.push('/listes')
  } catch (err) {
    error.value = 'Impossible de créer la liste.'
  } finally {
    loading.value = false
  }
}
</script>
