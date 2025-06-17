<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'
import DeconnexionForm from '@/components/forms/DeconnexionForm.vue'
import DarkModeForm from '@/components/forms/DarkModeForm.vue'
import UpdateUserForm from '../components/forms/UpdateUserForm.vue'

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()
</script>

<template>
  <section>
    <h3>Paramètres</h3>
    <DarkModeForm />
    <UpdateUserForm />
    <DeconnexionForm />
  </section>
</template>

<style scoped></style>
