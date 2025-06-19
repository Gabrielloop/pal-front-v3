<template>
  <article>
    <FormContainer title="Changer mes informations">
      <template #fields>
        <input v-model="name" type="text" placeholder="Nom" class="input input-text mb-2 w-full" />
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="input input-text mb-2 w-full"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Nouveau mot de passe"
          class="input input-text mb-2 w-full"
        />
        <input
          v-model="passwordConfirmation"
          type="password"
          placeholder="Répéter le mot de passe"
          class="input input-text mb-2 w-full"
        />
        <p v-if="error" class="text-danger">{{ error }}</p>
      </template>

      <template #actions>
        <Button :loading="loading" @click.prevent="submit" variant="valider">
          <template #icon>
            <AppIcon name="check" class="mr-2 h-5 w-5" />
          </template>
          Enregistrer
        </Button>
      </template>
    </FormContainer>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import FormContainer from '@/components/ui/FormContainer.vue'
import Button from '@/components/ui/Button.vue'
import AppIcon from '../AppIcon.vue'

const auth = useAuthStore()

const name = ref(auth.user?.name ?? '')
const email = ref(auth.user?.email ?? '')
const password = ref('')
const passwordConfirmation = ref('')

const error = ref(null)
const loading = ref(false)

const submit = async () => {
  error.value = null
  loading.value = true
  try {
    await auth.updateProfile({
      name: name.value,
      email: email.value,
      password: password.value,
      passwordConfirmation: passwordConfirmation.value,
    })
  } catch (err) {
    error.value = 'Erreur lors de la mise à jour du profil'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>
