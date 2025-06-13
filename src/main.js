import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/store/auth'
import { router } from '@/router'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)

const auth = useAuthStore()
auth.restore()

console.log('Token depuis Pinia:', auth.token)

app.use(router)

app.mount('#app')