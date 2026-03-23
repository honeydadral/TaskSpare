<template>
  <div class="products-container">
    <h1>Our Products</h1>
    
    <div class="product-grid">
      <div v-for="product in products" :key="product._id" class="product-card">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <h3>{{ product.name }}</h3>
        <p class="price">£{{ product.price.toFixed(2) }}</p>
        <p class="description">{{ product.description.substring(0, 80) }}...</p>
        <!-- <button @click="addToCart(product)">Add to Cart</button> -->
         <RouterLink 
            :to="{ name: 'product-detail', params: { id: product._id } }"
            class="view-btn">
            View Product
          </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import products from '@/temp-data.js'  // @ = src/ alias (created by Vite)
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/products')
    products.value = response.data
  } catch (error) {
    console.error('Failed to fetch products:', error)
    // Optional: show error message to user
  }
})
import { RouterLink } from 'vue-router'
// Later: connect to Pinia cart store
const addToCart = (product: any) => {
  console.log('Added to cart:', product.name)
  // piniaCartStore.addItem(product)  ← we'll do this next
}
</script>