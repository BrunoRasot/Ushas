<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const email = ref(''); const password = ref(''); const subscribed = ref(true); const message = ref('')
const router = useRouter()
const demoAccount = { email: 'cliente@ushas.pe', password: 'Ushas2026!', name: 'María Fernanda' }
const loginDemo = (name: string) => { localStorage.setItem('ushas-demo-user', JSON.stringify({ name })); router.push('/') }
const continueWithEmail = () => {
  if (!email.value) { message.value = 'Ingresa tu correo electrónico para continuar.'; return }
  if (email.value.toLowerCase() !== demoAccount.email || password.value !== demoAccount.password) { message.value = 'Usa la cuenta de demostración mostrada debajo para ingresar.'; return }
  loginDemo(demoAccount.name)
}
const useDemoAccount = () => {
  email.value = demoAccount.email
  password.value = demoAccount.password
  message.value = 'Credenciales de demostración cargadas. Presiona la flecha para ingresar.'
}
const socialLogin = (provider: string) => { loginDemo(provider === 'Google' ? 'María Fernanda' : 'Valeria Rojas') }
</script>
<template><section class="auth-page"><RouterLink to="/" class="auth-logo">USHAS <small>PERÚ</small></RouterLink><div class="auth-content"><p class="auth-overline">TU MOMENTO DE BRILLAR</p><h1>Bienvenida</h1><p>Inicia sesión o crea tu cuenta para guardar tus favoritos y descubrir novedades.</p><form @submit.prevent="continueWithEmail"><label class="email-label">Correo electrónico<div class="email-field"><input v-model="email" type="email" placeholder="tu@email.com" autocomplete="email"></div></label><label class="email-label">Contraseña<div class="email-field"><input v-model="password" type="password" placeholder="Tu contraseña" autocomplete="current-password"><button aria-label="Iniciar sesión" type="submit">→</button></div></label><label class="auth-check"><input v-model="subscribed" type="checkbox"> <span>Quiero recibir novedades, lanzamientos y ofertas.</span></label></form><button class="demo-account" type="button" @click="useDemoAccount"><span>CUENTA DE DEMOSTRACIÓN</span><b>cliente@ushas.pe</b><small>Contraseña: Ushas2026!</small><i>Usar esta cuenta →</i></button><div class="auth-or social-or"><span></span>o continúa con<span></span></div><div class="auth-socials"><button class="google" @click="socialLogin('Google')"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.25c1.9-1.74 2.97-4.3 2.97-7.36Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.63-2.41l-3.25-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.6A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.41 13.92A6 6 0 0 1 6.1 12c0-.67.12-1.32.31-1.92v-2.6H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.52l3.35-2.6Z"/><path fill="#EA4335" d="M12 5.96c1.47 0 2.8.5 3.84 1.49l2.88-2.88C16.95 2.92 14.7 2 12 2a10 10 0 0 0-8.94 5.48l3.35 2.6C7.2 7.72 9.4 5.96 12 5.96Z"/></svg>Continuar con Google</button><button class="apple" @click="socialLogin('Apple')"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.1 12.8c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9-.7 0-1.8-.9-3-.9-1.5 0-3 .9-3.8 2.3-1.7 2.8-.4 6.9 1.2 9.2.8 1.1 1.7 2.4 2.9 2.3 1.2-.1 1.6-.7 3.1-.7 1.4 0 1.9.7 3.1.7 1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.2-2.7 1.2-2.8-.1 0-2.6-1-2.6-3.5ZM14.8 6c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.2Z"/></svg>Continuar con Apple</button></div><p v-if="message" class="auth-message">{{ message }}</p><p class="auth-terms">Al continuar, aceptas nuestros <a href="#terminos">Términos del servicio</a> y confirmas haber leído la <RouterLink to="/privacidad">Política de privacidad</RouterLink>.</p></div><RouterLink to="/privacidad" class="privacy-link">Política de privacidad</RouterLink></section></template>
