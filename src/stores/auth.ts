export const useAuthStore = defineStore('auth', () => {
  const auth = ref()

  const isAuthenticated = computed(() => !!auth.value)

  const logout = () => {
    auth.value = undefined
  }

  return { auth, isAuthenticated, logout }
})
