import { ref, computed } from 'vue'

const user = ref(null)
const token = ref(localStorage.getItem('token'))

if (token.value) {
  try {
    user.value = JSON.parse(localStorage.getItem('user'))
  } catch {}
}

export function useAuth() {
  const login = (newToken, newUser) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
    token.value = newToken
    user.value = newUser
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    token.value = null
    user.value = null
    window.location.href = '/login' // or use router
  }

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  return {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout
  }
}