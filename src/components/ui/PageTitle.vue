<template>
  <div class="flex flex-col">
    <div class="flex items-center gap-2">
      <BackButton v-if="backButton" />
      <component
        :is="headingTag"
        :id="headingId"
        :aria-describedby="subtitleId"
        class="text-2xl font-bold"
      >
        <slot name="title" />
      </component>
    </div>
    <p :id="subtitleId">
      <slot name="subtitle"></slot>
    </p>
  </div>
</template>
<script setup>
import BackButton from '@/components/ui/BackButton.vue'
import { defineProps } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  backButton: {
    type: Boolean,
    default: false,
  },
  as: {
    type: String,
    default: 'h1',
    validator: (value) => {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
    },
  },
})

const headingId = 'page-title'
const subtitleId = 'page-subtitle'
const headingTag = computed(() => props.as)
</script>
