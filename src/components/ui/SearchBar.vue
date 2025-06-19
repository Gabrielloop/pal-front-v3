<template>
  <form @submit.prevent="goToSearch" class="flex h-full flex-row items-center gap-2">
    <input
      v-model="searchTerm"
      placeholder="Rechercher un livre..."
      class="input input-text align-item h-10 w-full"
    />
    <Button :loading="bnfStore.loading" type="submit" variant="valider" class="h-10">
      <template #icon> <AppIcon name="search" class="h-5 w-5" /> </template
    ></Button>
  </form>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBnfStore } from '@/stores/useBnfStore'
import Button from '@/components/ui/Button.vue'
import AppIcon from '@/components/AppIcon.vue'

const searchTerm = ref('')
const bnfStore = useBnfStore()
const router = useRouter()

function goToSearch() {
  if (searchTerm.value.trim()) {
    router.push({ path: '/recherches', query: { q: searchTerm.value.trim() } })
  }
}
</script>

<style scoped></style>
