import { ref } from 'vue'
import { useRouter } from 'vue-router'

const hasPrev = ref(false)

export function useNavHistory() {
  const router = useRouter()

  router.afterEach((to, from) => {
    if (from.name) {
      hasPrev.value = true
    }
  })

  return { hasPrev }
}
