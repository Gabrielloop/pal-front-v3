import { createApp } from 'vue'
import '@/style.css'
import '@/assets/main.css'
import '@/assets/designSystem.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/store/auth'
import { router } from '@/router'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
const auth = useAuthStore()
auth.restore()

app.use(router)
app.mount('#app')