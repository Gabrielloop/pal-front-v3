<template>
  <div class="loading-contain flex flex-col">
    <div class="loading">
      <img src="@/assets/loading.gif" alt="Loading" class="object-contain" />
    </div>
    <div class="loading-text">Chargement...</div>
  </div>
</template>
<script setup>
const props = defineProps({
  class: {
    type: String,
    default: '',
  },
})
</script>
<style scoped>
.loading-contain {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, rgba(38, 63, 87, 0.5), #f8efd6, rgba(38, 63, 87, 0.5));
  animation: shimmer 2s linear infinite;
  background-size: 200% auto;
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
.object-contain {
  width: 80%;
  height: 80%;
  object-fit: contain;
}
.loading-text {
  font-size: 1.25rem;
  font-weight: bold;
  background: linear-gradient(90deg, rgba(38, 63, 87, 0.8), #f8efd6, rgba(38, 63, 87, 0.8));
  background-size: 200% auto;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: shimmer 2s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}
</style>
