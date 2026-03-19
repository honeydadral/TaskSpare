<script setup lang="ts">

import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import products from '@/temp-data.js'  // @ = src/ alias (created by Vite)
import { useCartStore } from '@/stores/cart'
import ProductNotFound from '@/views/NotFoundView.vue'

const cartStore = useCartStore()

interface Product {
  id: number
  name: string
  image: string
  price: number
  description: string
  stock: number   
  rating: number
}

const route = useRoute()
const id = route.params.id   // now typed & reactive
const product = ref<Product | null>(null)  // later: fetch product by ID from API or Pinia store
// console.log('Product ID from route:', id)  // should log the product ID from the URL
// console.log('Products data:', products)  // should log the array of products from temp-data.js

onMounted(()=>{
  const foundProduct = products.find((p:any) => p.id === Number(id));
  product.value = foundProduct
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
            <p class="price">£{{ product.price.toFixed(2) }}</p>
            <p class="description">{{ product.description }}</p>
            <p><strong>Stock:</strong> {{ product.stock }} left</p>
            <p><strong>Rating:</strong> {{ product.rating }} ★</p>

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

