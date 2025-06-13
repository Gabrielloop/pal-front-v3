<template>
    <form class="p-4 border rounded space-y-4">
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <div>
        <slot name="fields" />
      </div>
      <ActionGroup>
        <slot name="actions" />
      </ActionGroup>
    </form>
  </template>
  
  <script setup>

import ActionGroup from '@/components/ui/ActionGroup.vue'

defineProps({
  title: String,
})

</script>


