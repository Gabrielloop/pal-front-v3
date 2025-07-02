<template>
  <form class="space-y-4 rounded border p-4">
    <h2 class="text-lg font-semibold" v-if="title" :id="'form-title'">{{ title }}</h2>
    <div role="group" aria-labelledby="form-title">
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
  title: {
    type: String,
    default: '',
  },
})
</script>
