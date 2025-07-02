<template>
  <FormContainer title="Connexion">
    <template #fields>
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        aria-label="Adresse email"
        class="input input-text mb-2 w-full"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        aria-label="Mot de passe"
        class="input input-text mb-2 w-full"
      />
      <p aria-live="assertive" v-if="error" class="text-danger">{{ error }}</p>
    </template>

    <template #actions>
      <Button
        :disabled="!isFormValid"
        :loading="loading"
        @click.prevent="submit"
        type="submit"
        variant="valider"
      >
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
import { computed } from 'vue'
import FormContainer from '@/components/ui/FormContainer.vue'
import Button from '@/components/ui/Button.vue'
import AppIcon from '../AppIcon.vue'

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()

const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))
const isPasswordValid = computed(() => password.value.trim().length > 0)
const isFormValid = computed(() => isEmailValid.value && isPasswordValid.value)

function validateForm() {
  if (!email.value.trim()) return 'Veuillez entrer votre email.'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value.trim())) return 'Adresse email invalide.'

  if (!password.value.trim()) return 'Veuillez entrer votre mot de passe.'

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
    await auth.login({ email: email.value, password: password.value })
    router.push('/')
  } catch (err) {
    if (err.response?.status === 401) {
      error.value = 'Email ou mot de passe incorrect'
    } else {
      error.value = 'Erreur serveur. Veuillez réessayer.'
    }
  } finally {
    loading.value = false
  }
}
</script>
