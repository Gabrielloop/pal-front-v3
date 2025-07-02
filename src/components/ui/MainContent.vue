<template>
  <div
    class="flex min-h-screen w-full flex-row items-start bg-background dark:bg-primary/90 dark:text-ivory"
  >
    <slot name="aside"></slot>

    <slot name="section" aria-live="polite"></slot>
  </div>
</template>
<script setup></script>
