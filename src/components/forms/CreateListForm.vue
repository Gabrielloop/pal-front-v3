<template>
  <FormContainer title="Nouvelle liste">
    <template #fields>
      <input
        v-model="titre"
        type="text"
        maxlength="100"
        minlenght="3"
        required
        placeholder="Ma liste de livres"
        class="input input-text mb-2 w-full"
      />
      <textarea
        v-model="description"
        type="text"
        maxlength="255"
        required
        placeholder="Description de la liste"
        class="input input-text dar:k:bg-primary/10 mb-2 w-full dark:bg-white/10"
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
  if (!description.value.trim()) return 'La description est requise.'
  if (description.value.length > 255) return 'La description ne doit pas dépasser 255 caractères.'

  if (!titre.value.trim()) return 'Le titre est requis.'
  if (titre.value.length > 100) return 'Le titre ne doit pas dépasser 100 caractères.'
  if (titre.value.length < 3) return 'Le titre doit contenir au moins 3 caractères.'
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
    const success = await listStore.createList({
      userlistName: titre.value,
      userlistDescription: description.value,
      userlistType: 'list',
    })
    if (success) {
      router.push('/listes')
    }
  } catch (err) {
    error.value = 'Impossible de créer la liste.'
  } finally {
    loading.value = false
  }
}
</script>
