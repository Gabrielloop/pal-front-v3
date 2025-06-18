<template>
  <form @submit.prevent="goToSearch" class="flex flex-row items-center gap-2">
    <input
      v-model="searchTerm"
      placeholder="Rechercher un livre..."
      class="input input-text mb-2 w-full"
    />
    <Button :loading="loading" type="submit" variant="valider">
      <template #icon> <AppIcon name="search" class="mr-2 h-5 w-5" /> </template
    ></Button>
  </form>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormContainer from '@/components/ui/FormContainer.vue'
import Button from '@/components/ui/Button.vue'
import AppIcon from '@/components/AppIcon.vue'

const searchTerm = ref('')
const router = useRouter()

function goToSearch() {
  if (searchTerm.value.trim()) {
    router.push({ path: '/recherches', query: { q: searchTerm.value.trim() } })
  }
}
</script>

<style scoped></style>
