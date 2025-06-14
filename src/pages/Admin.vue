<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
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
    <h2 class="mb-4 text-xl font-bold">Connexion</h2>
    <form @submit.prevent="submit">
      <input v-model="email" placeholder="Email" type="email" class="input mb-2 w-full" required />
      <input
        v-model="password"
        placeholder="Mot de passe"
        type="password"
        class="input mb-2 w-full"
        required
      />
      <Button :loading="loading">Se connecter</Button>
      <p v-if="error" class="mt-2 text-red-500">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped></style>
