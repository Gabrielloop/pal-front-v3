<template>
  <div class="relative flex-none" :class="getCoverSize()">
    <div
      v-if="!isImageLoaded"
      class="absolute inset-0 z-10 flex items-center justify-center rounded-sm border border-gray-200 bg-white shadow-sm dark:border-gray-600 dark:bg-ivory/5"
    >
      <LoadingLogo />
    </div>

    <img
      v-if="dynamicCover"
      :src="dynamicCover"
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
import { useBnfStore } from '@/stores/useBnfStore'

const props = defineProps({
  book: {
    type: Object,
    required: false,
  },
  cover: {
    type: String,
    required: false,
    default: '',
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

const dynamicCover = ref('')
const isImageLoaded = ref(false)
const bnfStore = useBnfStore()

watch(
  () => [props.book, props.cover],
  async () => {
    isImageLoaded.value = false

    if (props.cover) {
      dynamicCover.value = props.cover
      return
    }

    if (props.book) {
      const url = await bnfStore.resolveBestCover(props.book)
      dynamicCover.value = url || ''
    }
  },
  { immediate: true }
)

const handleImageLoad = () => {
  isImageLoaded.value = true
}

const handleImageError = () => {
  isImageLoaded.value = true
  dynamicCover.value = '/images/cover-fallback.png'
}

const getCoverSize = () => {
  if (props.component === 'details') {
    return 'w-[200px] h-[300px]'
  } else if (props.component === 'card') {
    return 'w-[140px] h-[200px]'
  }
  return 'w-[50px] h-[70px]'
}
</script>
<style scoped>
.crop-bottom {
  height: 250px;
  overflow: hidden;
}

.crop-bottom img {
  object-fit: cover;
  object-position: top;
}
</style>
