<template>
  <FormContainer title="Ajouter un livre à une liste">
    <template #fields>
      <input
        v-model="localIsbn"
        type="text"
        placeholder="isbn du livre"
        class="input input-text mb-2 w-full"
      />
      <input
        v-model="localUserlistId"
        type="text"
        placeholder="userlistId"
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
import { useBookStore } from '@/stores/useBookStore'
import FormContainer from '@/components/ui/FormContainer.vue'
import Button from '@/components/ui/Button.vue'
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({
  isbn: {
    type: String,
    required: true,
  },
  userlistId: {
    type: String,
    required: true,
  },
})

const localIsbn = ref(props.isbn)
const localUserlistId = ref(props.userlistId)
const error = ref(null)
const loading = ref(false)

const router = useRouter()
const listStore = useListStore()
const bookStore = useBookStore()

function validateForm() {
  if (!localIsbn.value.trim()) return "l'ISBN est requis."
  if (!localUserlistId.value.trim()) return 'La liste est requise.'
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
    await bookStore.addBookToList({
      userlistId: localUserlistId.value,
      isbn: localIsbn.value,
    })
  } catch (err) {
    error.value = "Impossible d'ajouter à la liste."
  } finally {
    loading.value = false
  }
}
</script>
