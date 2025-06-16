<template>
  <main
    class="flex min-h-screen w-full flex-1 flex-row items-start bg-background dark:bg-primary/90 dark:text-ivory"
  >
    <slot name="aside"></slot>
    <slot name="section"></slot>
  </main>
</template>
<script setup></script>
