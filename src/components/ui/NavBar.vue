<template>
  <header class="w-full">
    <nav
      class="align-center navbar absolute bottom-0 flex h-[75px] w-full flex-row justify-between md:relative"
    >
      <span class="hidden md:block">Nav Bar</span>
      <div class="flex h-full w-full flex-row items-center justify-around">
        <Button
          v-for="page in pages"
          :key="page.name"
          :variant="page.isVisited ? 'attente' : 'valider'"
        >
          <template #icon>
            <AppIcon :name="page.icon" class="mr-2 h-5 w-5" />
          </template>
          <router-link :to="page.path">{{ page.name }}</router-link>
        </Button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Button from '@/components/ui/Button.vue'
import AppIcon from '@/components/AppIcon.vue'

const route = useRoute()

// Liste des pages
const rawPages = [
  { name: 'Listes', path: '/list', icon: 'list' },
  { name: 'Recherche', path: '/find', icon: 'search' },
  { name: 'Profile', path: '/profil', icon: 'user' },
]

// Calcul dynamique de isVisited
const pages = computed(() =>
  rawPages.map((page) => ({
    ...page,
    isVisited: route.path.startsWith(page.path),
  }))
)
</script>
