<script setup>
import DeconnexionForm from '@/components/forms/DeconnexionForm.vue'
import DarkModeForm from '@/components/forms/DarkModeForm.vue'
import UpdateUserForm from '../components/forms/UpdateUserForm.vue'
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
