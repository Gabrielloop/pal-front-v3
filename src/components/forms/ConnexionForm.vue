<template>
  <FormContainer title="Connexion">
    <template #fields>
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="input input-text mb-2 w-full"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        class="input input-text mb-2 w-full"
      />
      <p v-if="error" class="text-red-500">{{ error }}</p>
    </template>

    <template #actions>
      <Button :loading="loading" @click.prevent="submit" variant="valider">
        <template #icon> <AppIcon name="in" class="mr-2 h-5 w-5" /> </template>Se connecter</Button
      >
      <Button variant="attente" @click="$emit('forgot-password')">Mot de passe oublié</Button>
    </template>
  </FormContainer>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'
import FormContainer from '@/components/ui/FormContainer.vue'
import Button from '@/components/ui/Button.vue'
import AppIcon from '../AppIcon.vue'

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
  } catch (err) {
    error.value = 'Échec de la connexion'
  } finally {
    loading.value = false
  }
}
</script>
