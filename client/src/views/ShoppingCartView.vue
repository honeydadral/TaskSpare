<template>
  <div class="page-container">
    <h1>Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p>Your cart is empty 😔</p>
      <RouterLink to="/products" class="btn">Browse Products</RouterLink>
    </div>

    <div v-else>
      <div class="cart-items">
        <div v-for="item in cartStore.items" :key="item.product.id" class="cart-item" >
          <img :src="item.product.image" class="cart-image"  />
          <div class="cart-info">
            <h3>{{ item.product.name }}</h3>
            <p>${{ item.product.price.toFixed(2) }} × {{ item.quantity }}</p>
          </div>
          <div class="cart-actions">
            <p class="subtotal">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </p>
            <button @click="removeItem(item.product.id)" class="remove-btn">
              Remove
            </button>
          </div>
        </div>
      </div>

      <div class="cart-total">
        <h2>Total: ${{ cartStore.totalPrice.toFixed(2) }}</h2>
        <button @click="clearCart" class="clear-btn">Clear Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const removeItem = (id: number) => {
  cartStore.removeItem(id)
}

const clearCart = () => {
  if (confirm('Clear entire cart?')) cartStore.clearCart()
}
</script>


<style scoped>
.cart-image{
    width: 480px;
}
</style>