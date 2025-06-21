<template>
  <div class="flex h-screen w-full flex-col items-center justify-center bg-primary p-0 md:p-8">
    <Logo size="250px" />
    <h1 class="font-title text-[5em] text-ivory">Verso</h1>
    <article class="my-2 w-full sm:my-8 md:w-[500px]">
      <!-- TODO : Passer l'action en flex col pour l'affichage mobile -->
      <!-- TODO : ajouter un lien vers une page d'inscription -->
      <ConnexionForm @forgot-password="handleForgotPassword" />
    </article>
  </div>
</template>

<script setup>
import ConnexionForm from '@/components/forms/ConnexionForm.vue'
import Logo from '@/components/ui/Logo.vue'

// TODO : Gérer le mot de passe oublié
const handleForgotPassword = () => {
  alert('Redirection vers la page de réinitialisation') // ou router.push('/mot-de-passe-oublie')
}
</script>

<style scoped></style>
