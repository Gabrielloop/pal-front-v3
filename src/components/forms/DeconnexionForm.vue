<template>
  <article>
    <FormContainer title="Deconnexion">
      <template #actions>
        <Button :loading="loading" @click.prevent="submit">
          <template #icon>
            <AppIcon name="out" class="mr-2 h-5 w-5" /> </template
          >Se déconnecter</Button
        >
      </template>
    </FormContainer>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import FormContainer from '@/components/ui/FormContainer.vue'
import Button from '@/components/ui/Button.vue'
import AppIcon from '../AppIcon.vue'

const error = ref(null)
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  error.value = null
  loading.value = true
  try {
    await auth.logout()
    router.push('/')
  } catch (err) {
    error.value = 'Échec de la déconnexion'
  } finally {
    loading.value = false
  }
}
</script>
