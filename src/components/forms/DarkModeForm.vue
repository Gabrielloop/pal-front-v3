<template>
  <FormContainer title="DarkMode">
    <template #actions>
      <Switch v-model="darkMode" class="flex items-center gap-2" :label="'Activer le mode sombre'">
        <AppIcon name="moon" class="h-5 w-5 text-primary dark:text-ivory" />
      </Switch>
    </template>
  </FormContainer>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'
import FormContainer from '@/components/ui/FormContainer.vue'
import AppIcon from '../AppIcon.vue'
import Switch from '../ui/Switch.vue'

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  error.value = null
  loading.value = true
  try {
    await auth.login({ email: email.value, password: password.value })
    router.push('/')
  } catch (err) {
    error.value = 'Échec de la connexion'
  } finally {
    loading.value = false
  }
}
</script>
