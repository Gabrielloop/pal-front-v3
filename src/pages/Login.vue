

<template>
  <ConnexionForm @forgot-password="handleForgotPassword" />
</template>


<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import ConnexionForm from '@/components/forms/ConnexionForm.vue'

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()

const handleForgotPassword = () => {
  alert('Redirection vers la page de réinitialisation') // ou router.push('/mot-de-passe-oublie')
}
</script>


<style scoped>

</style>
