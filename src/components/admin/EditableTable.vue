<template>
  <div>
    <table class="w-full border-collapse border border-gray-300">
      <thead class="bg-primary text-ivory">
        <tr>
          <th v-for="col in columns" :key="col.key" class="border p-2">
            {{ col.label }}
          </th>
          <th class="border p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id || index">
          <td v-for="col in columns" :key="col.key" class="border p-2">
            <input
              v-model="item[col.key]"
              class="w-full rounded border p-1"
              :type="col.type || 'text'"
            />
          </td>
          <td class="border p-2 text-center">
            <slot name="actions" :item="item" :index="index" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import Button from '@/components/ui/Button.vue'
import AppIcon from '@/components/AppIcon.vue'
import { defineProps } from 'vue'

defineProps({
  columns: Array,
  items: Array,
  loadingById: Object,
})
</script>
