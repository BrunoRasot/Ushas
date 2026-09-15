<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { categories, products } from '@ushas/mock-data'
import ProductCard from '@/components/ProductCard.vue'

const logoScale = ref(1); const logoProgress = ref(0)
const router = useRouter()
const updateHeroLogo = () => {
  const heroHeight = window.innerHeight - 38
  const progress = Math.min(Math.max(window.scrollY / (heroHeight * 0.72), 0), 1)
  logoProgress.value = progress
  logoScale.value = 1 - progress * 0.62
}
onMounted(() => { updateHeroLogo(); window.addEventListener('scroll', updateHeroLogo, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', updateHeroLogo))
const scrollToInfo = () => document.querySelector('.service-strip')?.scrollIntoView({ behavior: 'smooth' })
const featuredPage = ref(0)
const featuredProducts = computed(() => products.slice(0, 10))
const featuredVisible = computed(() => featuredProducts.value.slice(featuredPage.value * 5, featuredPage.value * 5 + 5))
const previousFeatured = () => { featuredPage.value = featuredPage.value === 0 ? 1 : 0 }
const nextFeatured = () => { featuredPage.value = featuredPage.value === 1 ? 0 : 1 }
const glowPage = ref(0)
const glowProductIds = ['p11', 'p12', 'p13', 'p14', 'p22', 'p23', 'p24', 'p28', 'p33', 'p31']
const glowProducts = computed(() => glowProductIds.map((id) => products.find((product) => product.id === id)).filter(Boolean))
const glowVisible = computed(() => glowProducts.value.slice(glowPage.value * 5, glowPage.value * 5 + 5))
const previousGlow = () => { glowPage.value = glowPage.value === 0 ? 1 : 0 }
const nextGlow = () => { glowPage.value = glowPage.value === 1 ? 0 : 1 }
const reviews = ref([
  { name: 'María Fernanda', initials: 'MF', color: '#f28ab5', text: 'Me encantaron los productos. Llegó todo en perfecto estado y los tonos se ven hermosos.', product: 'Compra verificada' },
  { name: 'Valeria Rojas', initials: 'VR', color: '#b796e4', text: 'El spray fijador dejó mi maquillaje intacto durante horas. Sin duda volveré a comprar.', product: 'Setting Spray Pink' },
  { name: 'Camila Torres', initials: 'CT', color: '#efae82', text: 'La paleta tiene colores súper pigmentados y fáciles de combinar. Mi nueva favorita.', product: 'Paleta de sombras USHAS' }
])
const showReviewForm = ref(false)
const currentUser = ref<{ name: string } | null>(JSON.parse(localStorage.getItem('ushas-demo-user') || 'null'))
const reviewForm = ref({ rating: 5, text: '' })
const openReviewForm = () => {
  if (!currentUser.value) { router.push('/login'); return }
  showReviewForm.value = true
}
const submitReview = () => {
  const text = reviewForm.value.text.trim()
  if (!currentUser.value || !text) return
  const name = currentUser.value.name
  const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
  reviews.value.unshift({ name, initials, color: '#bd83d9', text, product: `${reviewForm.value.rating} de 5 estrellas` })
  reviewForm.value = { rating: 5, text: '' }
  showReviewForm.value = false
}
</script>
<template>
  <section class="hero"><div class="hero-image"><img src="/images/ushas/hero.webp" alt="Campaña de maquillaje USHAS"><div class="hero-watermark" :style="{ top: `${52 + logoProgress * 37}%`, transform: `translate(-50%, -50%) scale(${logoScale})` }"><img src="/images/ushas/logo-hero-transparent.png" alt="USHAS Perú"></div><button class="hero-scroll" :style="{ opacity: Math.max(0, 1 - logoProgress * 3), pointerEvents: logoProgress > .34 ? 'none' : 'auto' }" @click="scrollToInfo"><span>EMBARCA EN TU VIAJE CON USHAS</span><i></i></button></div></section>
  <section class="service-strip"><h2>CONOCE MÁS DE USHAS PERÚ</h2><div class="service-items">
    <RouterLink to="/catalogo" custom v-slot="{ navigate }">
      <article @click="navigate" style="cursor: pointer;"><i>📦</i><div><strong>Productos más vendidos</strong><span>Son los más recomendados, los más pedidos y los primeros en agotarse.</span></div></article>
    </RouterLink>
    <RouterLink to="/compras-por-mayor" custom v-slot="{ navigate }">
      <article @click="navigate" style="cursor: pointer;"><i>🛒</i><div><strong>Compras por Mayor</strong><span>Crece tu negocio con USHAS, no dudes en contactarnos.</span></div></article>
    </RouterLink>
    <RouterLink to="/sobre-nosotros" custom v-slot="{ navigate }">
      <article @click="navigate" style="cursor: pointer;"><i>🧑‍💼</i><div><strong>Calidad y Seguridad</strong><span>Nuestros productos contienen la mejor calidad y precio del mercado.</span></div></article>
    </RouterLink>
    <RouterLink to="/politica-de-envio" custom v-slot="{ navigate }">
      <article @click="navigate" style="cursor: pointer;"><i>🚚</i><div><strong>Envíos Gratis</strong><span>A partir de compras arriba de 150 soles envíos gratis a todo el Perú.</span></div></article>
    </RouterLink>
    <article><i>🗓️</i><div><strong>Horarios de atención</strong><span>Lunes a viernes<br>8:00 AM - 10:00 PM<br>Sábado 8:00 AM - 3 PM</span></div></article>
    <RouterLink to="/contacto" custom v-slot="{ navigate }">
      <article @click="navigate" style="cursor: pointer;"><i>📲</i><div><strong>Contáctanos</strong><span>Síguenos en nuestras redes sociales.</span></div></article>
    </RouterLink>
  </div></section>
  <section class="lips-banner" aria-label="Promoción de labiales"></section>
  <section class="section centered categories-block"><h2>CATEGORÍAS</h2><div class="chips"><RouterLink v-for="category in categories" :key="category.id" :to="`/categoria/${category.slug}`">{{ category.name }}</RouterLink></div></section>
  <section class="section catalog-preview"><p class="collection-title">Favoritos USHAS</p><h2>Color para cada versión de ti</h2><span class="collection-subtitle">Una selección de productos para descubrir, combinar y disfrutar.</span><div class="featured-carousel"><button class="carousel-arrow left" aria-label="Ver cinco productos anteriores" @click="previousFeatured"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg></button><Transition name="products-slide" mode="out-in"><div :key="featuredPage" class="product-grid"><ProductCard v-for="product in featuredVisible" :key="product.id" :product="product" /></div></Transition><button class="carousel-arrow right" aria-label="Ver cinco productos siguientes" @click="nextFeatured"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7" /></svg></button></div><div class="carousel-indicator"><button :class="{ active: featuredPage === 0 }" @click="featuredPage = 0" aria-label="Página 1"></button><button :class="{ active: featuredPage === 1 }" @click="featuredPage = 1" aria-label="Página 2"></button></div><RouterLink class="outline-button" to="/catalogo">VER TODO</RouterLink></section>
  <section class="statement"><p class="statement-kicker">MAQUILLAJE CON PERSONALIDAD</p><h2>Brilla, seduce, repite: Maquillaje<br>para las que saben cómo usar su<br>poder.</h2><span>Donde cada momento de maquillaje cuenta. En USHAS, creemos que el maquillaje no es solo un proceso, es un viaje de auto-expresión y empoderamiento.</span><RouterLink to="/catalogo" class="button dark">EXPLORAR CATÁLOGO <b>→</b></RouterLink></section>
  <section class="section catalog-preview discovery-carousel"><p class="collection-title">RITUAL DE ROSTRO</p><h2>Luz que se nota, confianza que se siente</h2><span class="collection-subtitle">Prepara, define e ilumina tu look con esenciales para un acabado radiante.</span><div class="featured-carousel"><button class="carousel-arrow left" aria-label="Ver cinco productos anteriores" @click="previousGlow"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg></button><Transition name="products-slide" mode="out-in"><div :key="glowPage" class="product-grid"><ProductCard v-for="product in glowVisible" :key="product!.id" :product="product!" /></div></Transition><button class="carousel-arrow right" aria-label="Ver cinco productos siguientes" @click="nextGlow"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7" /></svg></button></div><div class="carousel-indicator"><button :class="{ active: glowPage === 0 }" @click="glowPage = 0" aria-label="Página 1"></button><button :class="{ active: glowPage === 1 }" @click="glowPage = 1" aria-label="Página 2"></button></div><RouterLink class="outline-button" to="/catalogo">VER TODO</RouterLink></section>
  <section class="reviews-section"><div class="reviews-heading"><p>COMUNIDAD USHAS</p><h2>Reseñas de clientes</h2><span>Opiniones simuladas para la presentación de la tienda.</span></div><div class="review-summary"><div><b>4.9</b><span aria-label="5 de 5 estrellas">★★★★★</span><small>Basado en 186 opiniones</small></div><button type="button" @click="openReviewForm">ESCRIBIR UNA RESEÑA <b>→</b></button></div><div class="reviews-grid"><article v-for="review in reviews.slice(0, 3)" :key="review.name" class="review-card"><header><i :style="{ backgroundColor: review.color }">{{ review.initials }}</i><div><strong>{{ review.name }} <em>✓</em></strong><small>{{ review.product }}</small></div></header><div class="review-stars" aria-label="5 de 5 estrellas">★★★★★</div><p>{{ review.text }}</p></article></div></section>
  <Transition name="fade"><div v-if="showReviewForm" class="review-modal-backdrop" @click.self="showReviewForm = false"><form class="review-modal" @submit.prevent="submitReview"><button class="review-modal-close" type="button" aria-label="Cerrar" @click="showReviewForm = false">×</button><p>COMUNIDAD USHAS</p><h2>Escribe tu reseña</h2><span>Publicas como <b>{{ currentUser?.name }}</b></span><label>Tu calificación<div class="rating-picker"><button v-for="star in 5" :key="star" type="button" :class="{ active: star <= reviewForm.rating }" :aria-label="`${star} estrellas`" @click="reviewForm.rating = star">★</button></div></label><label>Tu reseña<textarea v-model="reviewForm.text" required maxlength="240" placeholder="Cuéntanos qué te gustó..."></textarea></label><button class="review-submit" type="submit">PUBLICAR RESEÑA <b>→</b></button></form></div></Transition>
</template>
