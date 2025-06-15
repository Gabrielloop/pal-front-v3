<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'
import DeconnexionForm from '@/components/forms/DeconnexionForm.vue'

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

    <DeconnexionForm />
  </section>
</template>

<style scoped></style>
