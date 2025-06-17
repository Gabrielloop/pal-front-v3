<template>
  <aside class="bg-ivory">
    <h2 class="mb-4 text-xl font-bold">Menu admin</h2>

    <!-- // Utilisation de UL pour afficher les sections -->
    <ul>
      <li v-for="(key, index) in Object.keys(sections)" :key="index" class="mb-6">
        <h3 class="text-lg font-semibold">{{ sections[key].label }}</h3>
        <BaseList :items="sections[key].options" class="mt-2" @select="$router.push($event.to)">
          <template #default="{ item }">
            <span class="dark:text-ivory">{{ item.name }}</span>
          </template>
        </BaseList>
      </li>
    </ul>

    <Button
      variant="valider"
      class="mt-4 w-full"
      @click="$router.push('/dashboard')"
      v-if="isAdmin"
    >
      <template #icon> <AppIcon name="book" class="mr-2 h-5 w-5" /> </template>Utilisateur</Button
    >
    <DeconnexionForm type="menu" class="mt-8" />
  </aside>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import BaseList from '@/components/ui/BaseList.vue'
import DeconnexionForm from '@/components/forms/DeconnexionForm.vue'
import Button from '@/components/ui/Button.vue'
import { useAuthStore } from '@/stores/useAuthStore'

const auth = useAuthStore()
const isAdmin = auth.isAdmin

// Liste des sections et sous-sections
const sections = {
  sections: {
    label: 'Utilisateurs',
    options: [
      { name: 'Utilisateurs', to: '/admin/users' },
      { name: 'Listes', to: '/admin/userlists' },
      { name: 'Livres', to: '/admin/userlistBooks' },
      { name: 'Commentaires', to: '/admin/comments' },
      { name: 'Notes', to: '/admin/notes' },
      { name: 'Favoris', to: '/admin/favorites' },
      { name: 'Wishlist', to: '/admin/wishlists' },
      { name: 'Lectures', to: '/admin/readings' },
    ],
  },
  lists: {
    label: 'Gestion des données',
    options: [{ name: 'Livres', to: '/admin/books' }],
  },
}
</script>

<style scoped></style>
