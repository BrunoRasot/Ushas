<script setup lang="ts">
import type { Product } from '@ushas/types'
import { useCartStore } from '@/stores/cart'
defineProps<{ product: Product }>(); const cart = useCartStore()
</script>
<template><article class="product-card"><RouterLink :to="`/producto/${product.slug}`" class="product-image"><img :src="product.image" :alt="product.name"><span v-if="product.badge">{{ product.badge }}</span></RouterLink><div class="product-copy"><p>{{ product.category }}</p><RouterLink :to="`/producto/${product.slug}`">{{ product.name }}</RouterLink><div class="price"><b>S/ {{ product.price.toFixed(2) }}</b><s v-if="product.originalPrice">S/ {{ product.originalPrice.toFixed(2) }}</s></div><button @click="cart.add(product)">Agregar al carrito</button></div></article></template>
