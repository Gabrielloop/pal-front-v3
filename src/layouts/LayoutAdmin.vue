<script setup>
import Header from '@/components/ui/Header.vue'
import MainContent from '@/components/ui/MainContent.vue'
import AdminMenu from '@/components/admin/AdminMenu.vue'
</script>

<template>
  <div>
    <main>
      <Header isAdmin />
      <MainContent>
        <template #aside>
          <AdminMenu role="navigation" aria-label="Menu d’administration" />
        </template>

        <template #section>
          <router-view />
        </template>
      </MainContent>
    </main>
  </div>
</template>
