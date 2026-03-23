<script setup lang="ts">

import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
// import products from '@/temp-data.js'  // @ = src/ alias (created by Vite)
import { useCartStore } from '@/stores/cart'
import ProductNotFound from '@/views/NotFoundView.vue'
import axios from 'axios';

const cartStore = useCartStore()
const router = useRouter()
const route = useRoute()
const id = route.params.id   // now typed & reactive
// const product = ref(null)  // later: fetch product by ID from API or Pinia store
console.log('Product ID from route:', typeof id)  // should log the product ID from the URL
// console.log('Products data:', products)  // should log the array of products from temp-data.js

// onMounted(()=>{
//   const foundProduct = products.find((p:any) => p.id === Number(id));
//   product.value = foundProduct
// })
const product = ref(null)
const loading = ref(true)
const fetchError = ref<string | null>(null)

onMounted(async () => {
  try {
    loading.value = true; 
    const response = await axios.get(`http://localhost:4000/api/products/${id}`)
    // product.value = response.data
    // const fetchedProduct = response.data
    // const foundProduct = fetchedProduct.find((p:any) => p._id === Number(id));
    // product.value = foundProduct

    product.value = response.data
  } catch (error) {
    console.error('Failed to fetch products:', error)
    // Optional: show error message to user
  }
})

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value)
    alert(`✅ "${product.value.name}" added to cart!`)
  }
}

</script>
<template>
  <div class="page-container">
    <div v-if="product" class="product-detail">
        <button @click="$router.back()" class="back-btn">← Back to Products</button>
          <div class="detail-content">
          <img :src="product.image" :alt="product.name" class="detail-image" />
          <div class="info">
            <h1>{{ product.name }}</h1>
            <p class="price">£{{ product.price }}</p>
            <p class="description">{{ product.description }}</p>
            <p><strong>Stock:</strong> {{ product.stock }} left</p>
            <p><strong>Rating:</strong> {{ product.rating }} ★</p>
            <p><strong>Category:</strong> {{ product.category }}</p>

            <button class="add-to-cart-btn" @click="addToCart">
            Add to Cart
          </button>
          </div>
          </div>


    </div>
    <div v-else class="product-not-found">
      <!-- Use the new component when product is not found -->
      <ProductNotFound :product-id="route.params.id" />
    </div>
  </div>
</template>

