<template>
  <article>
    <FormContainer title="Mode sombre">
      <template #actions>
        <Switch v-model="darkMode">
          {{ darkMode ? 'Mode sombre activé' : 'Mode sombre désactivé' }}
        </Switch>
      </template>
    </FormContainer>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import FormContainer from '@/components/ui/FormContainer.vue'
import Switch from '@/components/ui/Switch.vue'

const auth = useAuthStore()

const darkMode = computed({
  get: () => auth.user?.isDarkMode ?? false,
  set: (val) => auth.updateDarkMode(val),
})
</script>
