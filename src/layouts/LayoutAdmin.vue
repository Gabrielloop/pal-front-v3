<script setup></script>

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
