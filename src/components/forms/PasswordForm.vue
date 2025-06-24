<template>
  <FormContainer title="Mot de passe oublié">
    <template #fields>
      <input
        v-model="email"
        @input="touched = true"
        type="email"
        placeholder="Votre adresse email"
        class="input input-text mb-2 w-full"
      />
      <p class="text-sm">
        Cliquez sur le bouton ci-dessous pour envoyer un message à l’administrateur contenant votre
        demande de réinitialisation.
      </p>
      <p v-if="error" class="text-danger">{{ error }}</p>
    </template>

    <template #actions>
      <a :href="mailtoLink" :class="{ 'pointer-events-none opacity-50': !isEmailValid }">
        <Button :disabled="!isEmailValid" variant="valider" type="button">
          <template #icon>
            <AppIcon name="mail" class="mr-2 h-5 w-5" />
          </template>
          Envoyer la demande
        </Button></a
      ><Button variant="primary" type="button" @click="back">
        <template #icon>
          <AppIcon name="back" class="mr-2 h-5 w-5" />
        </template>
        Retour
      </Button>
    </template>
  </FormContainer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { defineEmits } from 'vue'
import FormContainer from '@/components/ui/FormContainer.vue'
import Button from '@/components/ui/Button.vue'
import AppIcon from '../AppIcon.vue'

const emit = defineEmits(['back'])

const email = ref('')
const touched = ref(false)

const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))

const error = computed(() => {
  if (!touched.value) return ''
  if (!isEmailValid.value) return 'Veuillez entrer une adresse email valide.'
  return ''
})

const back = () => {
  email.value = ''
  touched.value = false
  emit('back')
}

const mailtoLink = computed(() => {
  const to = 'admin@tonsite.com'
  const subject = encodeURIComponent('Demande de réinitialisation de mot de passe')
  const body = encodeURIComponent(
    `Bonjour,\n\nL'utilisateur avec l'adresse ${email.value || '[non précisé]'} demande une réinitialisation de mot de passe.\n\nMerci.`
  )
  return `mailto:${to}?subject=${subject}&body=${body}`
})
</script>
