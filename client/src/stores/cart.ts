// src/stores/cart.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref<any[]>([])   // { product, quantity }

  // Add item (or increase quantity if already in cart)
  const addItem = (product: any) => {
    const existing = items.value.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  // Remove item completely
  const removeItem = (productId: number) => {
    items.value = items.value.filter(item => item.product.id !== productId)
  }

  // Clear entire cart
  const clearCart = () => {
    items.value = []
  }

  // Total number of items (for navbar "Cart (3)")
  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  // Total price
  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + item.product.price * item.quantity
    }, 0)
  })

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    clearCart
  }
})