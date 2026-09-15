<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
const route = useRoute()
const isAuthPage = computed(() => route.name === 'login' || route.name === 'privacy' || route.name === 'checkout')
</script>
<template><SiteHeader v-if="!isAuthPage" /><main><RouterView /></main><SiteFooter v-if="!isAuthPage" /></template>
