<template>
  <div class="not-found-page">
    <div class="content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist or has been moved.</p>

      <div class="actions">
        <router-link to="/" class="btn btn-primary">
          Go to Home
        </router-link>
        <router-link to="/products" class="btn btn-outline">
          Browse Products
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  text-align: center;
  padding: 2rem;
}

.content {
  max-width: 500px;
}

h1 {
  font-size: 8rem;
  font-weight: 800;
  color: #e44d26;
  margin: 0;
  line-height: 0.9;
}

h2 {
  font-size: 2.5rem;
  margin: 1rem 0 1.5rem;
  color: #333;
}

p {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2.5rem;
}

.actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.9rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 1.1rem;
}

.btn-primary {
  background: #e44d26;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #c33d1f;
  transform: translateY(-2px);
}

.btn-outline {
  border: 2px solid #e44d26;
  color: #e44d26;
  background: transparent;
}

.btn-outline:hover {
  background: #e44d26;
  color: white;
}
</style>