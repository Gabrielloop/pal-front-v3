
<script setup>

import { useAuthStore } from '@/store/auth'
import DeconnexionForm from '../components/forms/DeconnexionForm.vue';
import ConnexionForm from '../components/forms/ConnexionForm.vue';

const auth = useAuthStore()


</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <p class="text-xs text-gray-400">
    Auth debug: {{ auth.user?.email }} — connecté: {{ auth.isAuthenticated }} - token: {{ auth.token }} - role: {{ auth.user?.role }}
  </p>
    <DeconnexionForm v-if="auth?.user"/>
    <ConnexionForm v-else/>
    </div>
</template>



<style scoped>

</style>
