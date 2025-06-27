<template>
  <FormContainer title="Mon avis">
    <template #fields>
      <p class="text-sm italic">Visible uniquement par moi</p>
      <textarea
        v-model="commentContent"
        maxlength="255"
        required
        rows="8"
        class="input input-textarea mb-2 w-full resize-none rounded-md border border-primary bg-white p-2 focus:border-primary focus:ring-0 dark:bg-white/10"
      />
      <p v-if="error" class="text-danger">{{ error }}</p>
    </template>

    <template #actions>
      <Button
        :loading="loading"
        :disabled="!commentContent && !book.comment"
        @click.prevent="handleComment"
        type="submit"
        :variant="!commentContent && book.comment ? 'refuser' : 'valider'"
      >
        <template #icon> <AppIcon name="comment" class="mr-2 h-5 w-5" /> </template>
        <span v-if="!commentContent && !book.comment">Rédiger</span>
        <span v-else-if="!commentContent">Supprimer</span>
        <span v-else-if="book.comment">Modifier</span>
        <span v-else>Ajouter</span></Button
      >
    </template>
  </FormContainer>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import Button from '@/components/ui/Button.vue'
import FormContainer from '@/components/ui/FormContainer.vue'

import { defineProps } from 'vue'
import { useBookStore } from '@/stores/useBookStore'
import { ref } from 'vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})
const error = ref('')
const loading = ref(false)

const bookStore = useBookStore()
const isbn = props.book.isbn
const commentContent = ref(props.book.contentComment || '')

function validateForm() {
  if (!commentContent.value.trim() && !props.book.comment)
    return 'Le commentaire ne peut pas être vide.'
  if (commentContent.value.length > 255)
    return 'Le commentaire ne doit pas dépasser 255 caractères.'
  return null
}

const handleComment = async () => {
  const validationError = validateForm()
  if (validationError) {
    error.value = validationError
    return
  }
  loading.value = true

  try {
    await bookStore.postComment({
      isbn: isbn,
      commentContent: commentContent.value,
    })
    error.value = ''
    props.book.isComment = true
    props.book.comment = commentContent.value
  } catch (error) {
    error.value = "Une erreur est survenue lors de l'envoi du commentaire."
  } finally {
    loading.value = false
  }
}
</script>
