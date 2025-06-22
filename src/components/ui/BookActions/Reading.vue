<template>
  <FormContainer title="Progression de lecture">
    <template #fields>
      <div>
        <label class="mb-1 block font-semibold">Avancement : {{ readingContent }}%</label>
        <input type="range" v-model="readingContent" min="0" max="100" class="w-full" />
      </div>
      <div class="flex-1">
        <label class="mb-1 block font-semibold">Début</label>
        <input type="date" v-model="startedDate" class="w-full rounded border p-1" />
      </div>
      <div class="flex-1">
        <label class="mb-1 block font-semibold">Fin</label>
        <input type="date" v-model="finishedDate" class="w-full rounded border p-1" />
      </div>
      <p v-if="error" class="text-danger">{{ error }}</p>
    </template>

    <template #actions>
      <Button
        :loading="loading"
        :disabled="loading || readingContent == 0"
        @click.prevent="saveProgress"
        type="submit"
        variant="valider"
      >
        <template #icon>
          <AppIcon name="book" class="mr-2 h-5 w-5" />
        </template>
        <span v-if="isAbandoned">Reprendre</span>
        <span v-else-if="readingContent == 100">Terminer</span>
        <span v-else-if="readingContent < 100">Modifier</span>
        <span v-else>Sauvegarder</span></Button
      >
      <Button
        :loading="loading"
        :disabled="isAbandoned"
        @click.prevent="abandonReading"
        variant="refuser"
      >
        <template #icon>
          <AppIcon name="book" class="mr-2 h-5 w-5" />
        </template>
        Abandonner</Button
      >
    </template>
  </FormContainer>
</template>

<script setup>
import { ref } from 'vue'
import { useBookStore } from '@/stores/useBookStore'
import FormContainer from '@/components/ui/FormContainer.vue'
import Button from '@/components/ui/Button.vue'
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const isbn = props.book.isbn
const initialReading = props.book.reading || {
  readingContent: 0,
  isAbandoned: false,
  startedAt: null,
  finishedAt: null,
}

const bookStore = useBookStore()
const loading = ref(false)
const error = ref('')

const readingContent = ref(initialReading.readingContent || 0)
const isAbandoned = ref(initialReading.isAbandoned || false)

const formatDateInput = (datetimeString) => {
  if (!datetimeString) return ''
  return new Date(datetimeString).toISOString().split('T')[0]
}

const startedDate = ref(formatDateInput(initialReading.startedAt))
const finishedDate = ref(formatDateInput(initialReading.finishedAt))
const toNullableDate = (dateStr) => (dateStr === '' ? null : dateStr)

const saveProgress = async () => {
  loading.value = true
  const payload = {
    readingContent: readingContent.value,
    startedAt: toNullableDate(startedDate.value),
    finishedAt: toNullableDate(finishedDate.value),
  }
  isAbandoned.value = false
  console.log('isAbandoned:', isAbandoned.value)
  await bookStore.saveReadingProgress(isbn, payload)
  loading.value = false
}

const abandonReading = async () => {
  loading.value = true
  const success = await bookStore.abandonReading(isbn)
  if (success) {
    readingContent.value = 0
    readingContent.value = initialReading.readingContent
    isAbandoned.value = true
    console.log('isAbandoned:', isAbandoned.value)
  }
  loading.value = false
}
</script>
