<template>
  <div class="auth-container">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">{{ loading ? 'Registering...' : 'Register' }}</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

const register = async () => {
  try {
    const res = await axios.post('http://localhost:4000/api/auth/register', {
        name: name.value,
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    router.push('/products')
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed - try again'
    console.error('Registration error:', err)
  }finally {
    loading.value = false
  }
}
</script>
<style scoped>
.auth-container {
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

input {
  display: block;
  width: 100%;
  margin: 1rem 0;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}

button {
  width: 100%;
  padding: 0.9rem;
  background: #2a9d8f;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

button:disabled {
  background: #95c9c2;
  cursor: not-allowed;
}

.error {
  color: #e63946;
  margin-top: 1rem;
  text-align: center;
}
</style>