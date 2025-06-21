<template>
  <div class="flex gap-1 rounded-full bg-primary px-2 py-1 text-white dark:bg-white/10">
    <button
      v-for="star in 5"
      :key="star"
      :disabled="loading"
      @click="handleSetNote(star)"
      class="transition-colors duration-200"
    >
      <AppIcon :name="star <= note ? 'starSolid' : 'star'" class="h-5 w-5 hover:text-yellow-400" />
    </button>
  </div>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import { ref } from 'vue'
import { useBookStore } from '@/stores/useBookStore'

const loading = ref(false)
const bookStore = useBookStore()

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const note = ref(Number(props.book.contentNote) || 0)

const handleSetNote = async (selectedNote) => {
  const noteToSend = selectedNote === note.value ? '0' : selectedNote.toString()
  loading.value = true
  try {
    await bookStore.postNote({
      isbn: props.book.isbn,
      noteContent: noteToSend,
    })

    if (noteToSend === '0') {
      note.value = 0
    } else {
      note.value = selectedNote
    }
    props.book.note = note.value
  } catch (error) {
    console.error("Erreur lors de l'envoi de la note :", error)
  } finally {
    loading.value = false
  }
}
</script>
