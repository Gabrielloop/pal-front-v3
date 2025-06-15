<script setup>
import Logo from '@/components/ui/Logo.vue'
import { createRouter, createWebHistory } from 'vue-router'
</script>

<template>
  <header class="text-ivory bg-primary shadow">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center gap-4">
          <router-link :to="'/'"><Logo /></router-link>
          <h1 class="font-title text-title">Verso</h1>
        </div>
        <span>recherche</span>
      </div>
    </div>
  </header>
</template>
