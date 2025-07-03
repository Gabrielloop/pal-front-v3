<template>
  <article>
    <FormContainer title="Mode sombre">
      <template #actions>
        <Switch
          v-model="darkMode"
          :aria-label="darkMode ? 'Désactiver le mode sombre' : 'Activer le mode sombre'"
        >
          {{ darkMode ? 'Mode sombre activé' : 'Mode sombre désactivé' }}
        </Switch>
      </template>
    </FormContainer>
  </article>
</template>

<script setup>
import FormContainer from '@/components/ui/FormContainer.vue'
import Switch from '@/components/ui/Switch.vue'
import { ref, watch } from 'vue'

const darkMode = ref(localStorage.getItem('darkMode') === 'true')

watch(darkMode, (val) => {
  localStorage.setItem('darkMode', val)
  document.documentElement.classList.toggle('dark', val)
})
</script>
