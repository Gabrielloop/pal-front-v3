<template>
  <div
    class="logo-wrapper"
    role="presentation"
    :style="{ width: size, height: size }"
    @mouseenter="showGif"
    @mouseleave="hideGif"
  >
    <img :src="pngLogo" alt="" aria-hidden="true" class="logo-base" />
    <img :src="gifSrc" alt="" aria-hidden="true" class="logo-gif" v-show="gifVisible" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import pngLogo from '@/assets/verso_logo.png'
import gifLogo from '@/assets/verso_anim.gif'

const gifVisible = ref(false)
const gifSrc = ref(gifLogo)

const props = defineProps({
  size: {
    type: String,
    default: '50px',
  },
})

function showGif() {
  gifSrc.value = gifLogo + '?t=' + new Date().getTime()
  gifVisible.value = true
}

function hideGif() {
  gifVisible.value = false
}
</script>

<style scoped>
.logo-wrapper {
  position: relative;
}

.logo-base,
.logo-gif {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
}
</style>
