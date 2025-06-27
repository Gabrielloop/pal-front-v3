<script setup>
import LogoutForm from '@/components/forms/LogoutForm.vue'
import DarkModeForm from '@/components/forms/DarkModeForm.vue'
import UpdateUserForm from '../components/forms/UpdateUserForm.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import AppIcon from '@/components/AppIcon.vue'
import Button from '@/components/ui/Button.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { computed } from 'vue'
const auth = useAuthStore()
const isAdmin = computed(() => auth.isAdmin)
</script>

<template>
  <section>
    <PageTitle backButton>
      <template #title>Paramètres utilisateurs</template>
      <template #subtitle></template>
    </PageTitle>
    <Button variant="attente" @click="$router.push('/admin')" v-if="isAdmin" class="w-[200px]">
      <template #icon> <AppIcon name="lock" class="mr-2 h-5 w-5" /> </template>Admin</Button
    >
    <LogoutForm />
    <DarkModeForm />
    <UpdateUserForm />
  </section>
</template>

<style scoped></style>
