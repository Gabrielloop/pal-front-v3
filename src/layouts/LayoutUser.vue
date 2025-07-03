<script setup>
import NavBar from '@/components/ui/NavBar.vue'
import Header from '@/components/ui/Header.vue'
import Menu from '@/components/ui/Menu.vue'
import MainContent from '@/components/ui/MainContent.vue'
import LoadingLogo from '@/components/ui/LoadingLogo.vue'
import { useListStore } from '@/stores/useListStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useToastStore } from '@/stores/toast'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const listStore = useListStore()
const authStore = useAuthStore()
const router = useRouter()
const toastStore = useToastStore()

const loading = ref(true)

onMounted(async () => {
  try {
    await listStore.fetchAll()
  } catch (error) {
    if (error.message.includes('Session expirée')) {
      authStore.logout()
      toast.warn('Session expirée')
      await router.push('/login')
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <main class="mb-16 sm:mb-0">
      <Header />

      <NavBar class="block md:hidden" />

      <MainContent>
        <template #aside>
          <Menu class="hidden md:block" />
        </template>

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
