<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
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
  <main>
    <h3>Profil</h3>
    <section>
      <DeconnexionForm />
    </section>
  </main>
</template>

<style scoped></style>
