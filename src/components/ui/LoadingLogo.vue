<template>
  <div class="bg-primaru rounded-fuly h-full w-full">
    <img src="@/assets/loading.gif" alt="Loading" class="h-full w-full object-contain" />
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
