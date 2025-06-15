<template>
  <div
    class="logo-wrapper"
    :style="{ width: size, height: size }"
    @mouseenter="showGif"
    @mouseleave="hideGif"
  >
    <img :src="pngLogo" alt="Verso logo" class="logo-base" />
    <img :src="gifSrc" alt="Verso animation" class="logo-gif" v-show="gifVisible" />
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
