<template>
  <div class="flex flex-col">
    <div class="flex items-center gap-2">
      <BackButton v-if="backButton" />
      <h2>
        <slot name="title"></slot>
      </h2>
    </div>
    <p>
      <slot name="subtitle"></slot>
    </p>
  </div>
</template>
<script setup>
import BackButton from '@/components/ui/BackButton.vue'
import { defineProps } from 'vue'
const props = defineProps({
  backButton: {
    type: Boolean,
    default: false,
  },
})
</script>
