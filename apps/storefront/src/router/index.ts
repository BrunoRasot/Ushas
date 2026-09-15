import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CatalogView from '@/views/CatalogView.vue'
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
  { path: '/', name: 'home', component: HomeView },
  { path: '/catalogo', name: 'catalog', component: CatalogView },
  { path: '/categoria/:slug', name: 'category', component: CatalogView },
  { path: '/producto/:slug', name: 'product', component: () => import('@/views/ProductView.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
  { path: '/checkout', name: 'checkout', component: () => import('@/views/CheckoutView.vue') },
  { path: '/privacidad', name: 'privacy', component: () => import('@/views/PrivacyView.vue') },
  { path: '/afiliados', name: 'afiliados', component: () => import('@/views/InfoView.vue') },
  { path: '/compras-por-mayor', name: 'mayor', component: () => import('@/views/InfoView.vue') },
  { path: '/preguntas-frecuentes', name: 'preguntas', component: () => import('@/views/InfoView.vue') },
  { path: '/sobre-nosotros', name: 'nosotros', component: () => import('@/views/InfoView.vue') },
  { path: '/contacto', name: 'contacto', component: () => import('@/views/InfoView.vue') },
  { path: '/politica-de-envio', name: 'envios', component: () => import('@/views/InfoView.vue') }
] })
export default router
