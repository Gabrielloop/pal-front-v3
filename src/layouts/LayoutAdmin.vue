<script setup>
import Header from '@/components/ui/Header.vue'
import MainContent from '@/components/ui/MainContent.vue'
import AdminMenu from '@/components/ui/AdminMenu.vue'
</script>

<template>
  <div>
    <main>
      <!-- HEADER : Logo + barre de recherche -->
      <Header isAdmin />

      <!-- MAIN : Contenu principal de la page -->
      <MainContent>
        <!-- ASIDE : Menu latéral pour les écrans larges -->
        <template #aside> <AdminMenu /> </template>

        <!-- SECTION : Contenu principal de la page -->
        <template #section>
          <router-view />
        </template>
      </MainContent>
    </main>
  </div>
</template>
