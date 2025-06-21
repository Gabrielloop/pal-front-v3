<template>
  <div class="relative flex-none" :class="getCoverSize()">
    <div
      v-if="!isImageLoaded"
      class="absolute inset-0 z-10 flex items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm dark:border-gray-600 dark:bg-ivory/5"
    >
      <LoadingLogo />
    </div>

    <img
      v-if="cover"
      :src="cover"
      alt="cover"
      class="rounded-sm object-cover shadow-sm"
      :class="getCoverSize()"
      @load="handleImageLoad"
      @error="handleImageError"
    />
  </div>
</template>
<script setup>
import { ref, watch, defineProps } from 'vue'
import LoadingLogo from '@/components/ui/LoadingLogo.vue'

const props = defineProps({
  cover: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  component: {
    type: String,
    default: 'details',
  },
})

const isImageLoaded = ref(false)

const handleImageLoad = () => {
  isImageLoaded.value = true
}

// récupération de la props components pour définir la w et h de la cover
const getCoverSize = () => {
  if (props.component === 'details') {
    return 'w-[200px] h-[300px]'
  } else if (props.component === 'card') {
    return 'w-[50px] h-[70px]'
  }
  return 'w-[50px] h-[70px]'
}

watch(
  () => props.cover,
  () => {
    isImageLoaded.value = false
  }
)
</script>
