<template>
  <div class="flex h-screen w-full flex-col items-center justify-center bg-primary p-0 md:p-8">
    <Logo size="250px" />
    <h1 class="mb-4 font-title text-[5em] text-ivory">Verso</h1>
    <article class="my-2 w-full sm:my-8 md:w-[500px]">
      <component
        :is="showForgotPassword ? PasswordForm : ConnexionForm"
        @forgot-password="showForgotPassword = true"
        @back="showForgotPassword = false"
      />
    </article>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Logo from '@/components/ui/Logo.vue'
import ConnexionForm from '@/components/forms/ConnexionForm.vue'
import PasswordForm from '@/components/forms/PasswordForm.vue'

const showForgotPassword = ref(false)
</script>
