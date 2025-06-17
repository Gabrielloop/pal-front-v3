<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  error.value = null
  loading.value = true
  try {
    await auth.login({ email: email.value, password: password.value })
    router.push('/')
  } catch (e) {
    error.value = 'Échec de la connexion'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-md p-4">
    <h2 class="mb-4 text-xl font-bold">Administration</h2>
  </div>
</template>

<style scoped></style>
