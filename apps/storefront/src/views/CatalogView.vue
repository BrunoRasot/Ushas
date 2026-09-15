<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { categories, products } from '@ushas/mock-data'
import ProductCard from '@/components/ProductCard.vue'
const route = useRoute(); const search = ref(''); const selected = ref('')
const active = computed(() => String(route.params.slug || selected.value))
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const list = computed(() => products.filter(p => (!active.value || normalize(p.category) === normalize(active.value.replace('-', ' '))) && normalize(p.name).includes(normalize(search.value))))
</script>
<template><section class="catalog-hero"><p class="eyebrow">USHAS PERÚ</p><h1>Tu maquillaje, tus reglas.</h1><p>Explora color, cuidado y productos para todos tus looks.</p></section><section class="section catalog"><aside><b>FILTRAR POR</b><label>Buscar<input v-model="search" placeholder="¿Qué estás buscando?" /></label><label>Categorías<select v-model="selected"><option value="">Todas las categorías</option><option v-for="category in categories" :key="category.id" :value="category.slug">{{ category.name }}</option></select></label><button class="clear" @click="selected = ''; search = ''">Limpiar filtros</button></aside><div><div class="catalog-info"><h2>{{ active ? `Colección ${active}` : 'Todos los productos' }}</h2><span>{{ list.length }} productos</span></div><div class="product-grid"><ProductCard v-for="product in list" :key="product.id" :product="product" /></div><p v-if="!list.length" class="empty">No encontramos productos con esos filtros.</p></div></section></template>
