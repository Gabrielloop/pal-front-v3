<template>
  <div class="flex h-screen w-full flex-col items-center justify-center bg-primary p-0 md:p-8">
    <Logo size="250px" />
    <h1 class="font-title text-ivory text-[5em]">Verso</h1>
    <article class="my-2 w-full sm:my-8 md:w-[500px]">
      <!-- TODO : Passer l'action en flex col pour l'affichage mobile -->
      <ConnexionForm @forgot-password="handleForgotPassword" />
    </article>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'
import ConnexionForm from '@/components/forms/ConnexionForm.vue'
import Logo from '@/components/ui/Logo.vue'

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()

// TODO : Gérer le mot de passe oublié
const handleForgotPassword = () => {
  alert('Redirection vers la page de réinitialisation') // ou router.push('/mot-de-passe-oublie')
}
</script>

<style scoped></style>
