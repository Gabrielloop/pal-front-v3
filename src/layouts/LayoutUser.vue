<script setup>
import NavBar from '@/components/ui/NavBar.vue'
import Header from '@/components/ui/Header.vue'
import Menu from '@/components/ui/Menu.vue'
import MainContent from '@/components/ui/MainContent.vue'
import { useListStore } from '@/stores/useListStore'
import { onMounted, ref } from 'vue'
import LoadingLogo from '@/components/ui/LoadingLogo.vue'

const listStore = useListStore()

const loading = ref(true)

onMounted(async () => {
  try {
    await listStore.fetchAll()
  } catch (error) {
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <main class="mb-16 sm:mb-0">
      <!-- HEADER : Logo + barre de recherche -->
      <Header />

      <!-- NAV : Barre de navigation en bas de page : version mobile uniquement-->
      <NavBar class="block md:hidden" />

      <!-- MAIN : Contenu principal de la page -->
      <MainContent>
        <!-- ASIDE : Menu latéral pour les écrans larges -->
        <template #aside>
          <Menu class="hidden md:block" />
        </template>

        <!-- SECTION : Contenu principal de la page -->
        <template #section>
          <div
            class="flex h-[50vh] w-full items-center justify-center overflow-hidden"
            v-if="loading"
          >
            <LoadingLogo />
          </div>
          <router-view v-else />
        </template>
      </MainContent>
    </main>
  </div>
</template>
