<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<!-- src/App.vue or src/layouts/DefaultLayout.vue -->
<template>
  <div>
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/products">Products</RouterLink> |
        <!-- <RouterLink to="/cart">Cart (0)</RouterLink> -->
         <RouterLink to="/cart">
            Cart ({{ cartStore.totalItems }})
        </RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

