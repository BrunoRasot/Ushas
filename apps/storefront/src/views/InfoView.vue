<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sent = ref(false)
const contact = ref({ name: '', phone: '', email: '', message: '' })

const content = computed(() => ({
  afiliados: {
    eyebrow: 'COMUNIDAD USHAS PERÚ', title: 'Programa de afiliados', lead: 'Comparte tus favoritos de USHAS y recibe beneficios por cada compra realizada con tu código.', sections: [
      ['¿Cómo funciona?', 'Regístrate, recibe tu código personal y compártelo en tus redes sociales. Cada compra asociada a tu código suma beneficios para ti.'],
      ['Requisitos principales', 'Ser mayor de 18 años, tener una comunidad activa y crear contenido auténtico sobre belleza y maquillaje.'],
      ['¿Quieres ser parte?', 'Escríbenos por WhatsApp para conocer las condiciones, materiales y disponibilidad del programa en Perú.']
    ], cta: 'HABLAR POR WHATSAPP'
  },
  mayor: {
    eyebrow: 'VENTAS MAYORISTAS', title: 'Compras por mayor', lead: 'Abastece tu negocio con maquillaje USHAS y recibe atención personalizada para tus pedidos.', sections: [
      ['Catálogo para tu negocio', 'Solicita nuestro catálogo mayorista y conoce los productos disponibles, novedades y precios especiales.'],
      ['Atención en Lima y envíos a Perú', 'Coordinamos pedidos desde Cercado de Lima y envíos a diferentes ciudades del país.'],
      ['Haz crecer tu tienda', 'Nuestro equipo te orientará para elegir una selección de productos pensada para tu público.']
    ], cta: 'SOLICITAR CATÁLOGO'
  },
  preguntas: {
    eyebrow: 'AYUDA USHAS', title: 'Preguntas frecuentes', lead: 'Todo lo que necesitas saber antes de realizar tu pedido.', sections: [
      ['¿Realizan envíos?', 'Sí. Realizamos envíos a diferentes ciudades del Perú. El costo y el tiempo se confirman antes de completar tu compra.'],
      ['¿Hay envío gratis?', 'Ofrecemos envío gratis en pedidos desde S/ 150, sujeto a cobertura y campañas vigentes.'],
      ['¿Tienen compras por mayor?', 'Sí. Puedes solicitar el catálogo mayorista por WhatsApp para recibir asesoría y condiciones de compra.'],
      ['¿Cómo puedo comunicarme con ustedes?', 'Puedes escribirnos por WhatsApp o usar el formulario de contacto de esta página.']
    ]
  },
  nosotros: {
    eyebrow: 'USHAS PERÚ', title: 'Sobre nosotros', lead: 'Belleza accesible para expresarte, experimentar y crear looks que se sientan como tú.', sections: [
      ['Nuestra propuesta', 'USHAS Perú acerca maquillaje, cuidado personal y accesorios con variedad de colores, tendencias y opciones para cada rutina.'],
      ['Una comunidad que inspira', 'Creemos que el maquillaje es una herramienta de creatividad y confianza. Por eso acompañamos a quienes aman descubrir, combinar y compartir belleza.'],
      ['Encuéntranos', 'Visítanos en Jr. Jambari 731, Cercado de Lima, o comunícate con nuestro equipo para consultas y pedidos.']
    ]
  },
  envios: {
    eyebrow: 'INFORMACIÓN DE ENVÍOS', title: 'Política de envío', lead: 'Enviamos tus productos con cuidado para que disfrutes tu pedido donde estés.', sections: [
      ['Cobertura', 'Realizamos envíos a Lima y a distintas regiones del Perú mediante operadores con cobertura disponible.'],
      ['Costos y tiempos', 'El costo y plazo de entrega dependen del destino, peso del pedido y operador logístico. Los confirmaremos antes de procesar tu compra.'],
      ['Envío gratis', 'Los pedidos desde S/ 150 pueden acceder a envío gratis según la cobertura y campaña vigente.'],
      ['Seguimiento', 'Cuando tu pedido sea despachado, te compartiremos la información disponible para su seguimiento.']
    ]
  }
}[String(route.name)] || null))

const submitContact = () => { sent.value = true; contact.value = { name: '', phone: '', email: '', message: '' } }
</script>

<template>
  <section v-if="route.name === 'contacto'" class="contact-page">
    <p class="info-eyebrow">CONTACTO USHAS PERÚ</p><h1>Hablemos de belleza</h1><span>¿Tienes una consulta, pedido o propuesta? Déjanos un mensaje.</span>
    <form v-if="!sent" @submit.prevent="submitContact"><div><label>Nombre<input v-model="contact.name" required placeholder="Tu nombre"></label><label>Número de teléfono<input v-model="contact.phone" required placeholder="+51"></label></div><label>Correo electrónico<input v-model="contact.email" type="email" required placeholder="tu@email.com"></label><label>Comentario<textarea v-model="contact.message" required placeholder="¿Cómo podemos ayudarte?"></textarea></label><button type="submit">ENVIAR MENSAJE <b>→</b></button></form>
    <div v-else class="contact-success"><b>¡Gracias por escribirnos!</b><span>Recibimos tu mensaje de demostración. Nuestro equipo te responderá pronto.</span><button @click="sent = false">ENVIAR OTRO MENSAJE</button></div>
  </section>
  <section v-else-if="content" class="info-page"><header><p class="info-eyebrow">{{ content.eyebrow }}</p><h1>{{ content.title }}</h1><span>{{ content.lead }}</span></header><div class="info-content"><article v-for="section in content.sections" :key="section[0]"><h2>{{ section[0] }}</h2><p>{{ section[1] }}</p></article></div><a v-if="content.cta" class="info-cta" href="https://wa.me/51912341783" target="_blank" rel="noopener">{{ content.cta }} <b>→</b></a></section>
</template>
