<!-- App.vue (only the relevant part) -->

<template>
  <header class="navbar">
    <nav class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>
      <router-link to="/cart">Cart ({{ cartStore.totalItems }})</router-link>

      <!-- Auth / Profile section -->
      <div class="auth-section">
        <!-- Logged OUT state -->
        <template v-if="!auth.isAuthenticated">
          <router-link to="/login" class="auth-link">Login</router-link>
          <router-link to="/register" class="auth-link">Register</router-link>
        </template>

        <!-- Logged IN state -->
        <div v-else class="user-menu">
          <div class="profile-circle" @click="showMenu = !showMenu">
            <!-- Avatar or initial -->
            <img
              v-if="auth.user?.avatar"
              :src="auth.user.avatar"
              alt="Profile"
              class="profile-img"
            />
            <div v-else class="profile-placeholder">
              {{ auth.user?.name?.charAt(0)?.toUpperCase() || '?' }}
            </div>
          </div>

          <!-- Dropdown menu -->
          <div v-if="showMenu" class="dropdown-menu">
            <router-link to="/profile" class="dropdown-item">Profile</router-link>
            <router-link v-if="auth.isAdmin" to="/admin" class="dropdown-item">Admin Panel</router-link>
            <button @click="auth.logout" class="dropdown-item logout-btn">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <router-view />
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'   // your auth composable
import { useCartStore } from '@/stores/cart'

const auth = useAuth()
const cartStore = useCartStore()
const showMenu = ref(false)
</script>

<style scoped>
/* Navbar base */
.navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Logged out links */
.auth-link {
  text-decoration: none;
  color: #2a9d8f;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.auth-link:hover {
  background: #f0f9f8;
}

/* Profile circle (logged in) */
.user-menu {
  position: relative;
}

.profile-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background: #2a9d8f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: bold;
  border: 2px solid #e0e0e0;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Dropdown */
.dropdown-menu {
  position: absolute;
  right: 0;
  top: 55px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
  min-width: 180px;
  padding: 0.5rem 0;
  z-index: 200;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.75rem 1.2rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  text-decoration: none;
  font-size: 0.95rem;
}

.dropdown-item:hover {
  background: #f8f9fa;
}

.logout-btn {
  color: #e63946 !important;
  border-top: 1px solid #eee;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
}
</style>