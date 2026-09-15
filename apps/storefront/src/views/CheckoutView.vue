<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const router = useRouter()
const isSuccess = ref(false)
const paymentMethod = ref('tarjeta')

const submitCheckout = () => {
  if (cart.count === 0 && !isSuccess.value) {
    router.push('/')
    return
  }
  isSuccess.value = true
  cart.items = []
}
</script>

<template>
  <div class="checkout-page" v-if="!isSuccess">
    <div class="checkout-main">
      <header class="checkout-header">
        <RouterLink to="/" class="checkout-brand">USHAS <small>PERÚ</small></RouterLink>
      </header>
      <form @submit.prevent="submitCheckout" class="checkout-form">
        <section>
          <div class="checkout-section-header">
            <h2>¿Cómo podemos contactarte?</h2>
            <RouterLink to="/login">Iniciar sesión</RouterLink>
          </div>
          <label class="checkout-input">
            <input type="email" required placeholder="Email o número de teléfono móvil">
          </label>
          <label class="checkout-checkbox">
            <input type="checkbox">
            <span>Enviarme novedades y ofertas por correo electrónico</span>
          </label>
        </section>

        <section>
          <h2>Información y datos para la entrega</h2>
          <label class="checkout-input">
            <select required>
              <option>Perú</option>
            </select>
          </label>
          <div class="checkout-row">
            <label class="checkout-input"><input type="text" placeholder="Nombre (opcional)"></label>
            <label class="checkout-input"><input type="text" required placeholder="Apellidos"></label>
          </div>
          <label class="checkout-input"><input type="text" placeholder="DNI / CE (Opcional)"></label>
          <label class="checkout-input"><input type="text" required placeholder="Dirección"></label>
          <label class="checkout-input"><input type="text" placeholder="Referencias, información adicional"></label>
          <div class="checkout-row">
            <label class="checkout-input"><input type="text" required placeholder="Distrito"></label>
            <label class="checkout-input">
              <select required>
                <option value="" disabled selected>Elige un departamento...</option>
                <option>Lima</option>
                <option>Arequipa</option>
                <option>Cusco</option>
                <option>Piura</option>
              </select>
            </label>
            <label class="checkout-input"><input type="text" placeholder="Código postal (opcional)"></label>
          </div>
          <label class="checkout-input"><input type="tel" required placeholder="Teléfono para la entrega"></label>
          <label class="checkout-checkbox">
            <input type="checkbox">
            <span>Guardar mi información y consultar más rápidamente la próxima vez</span>
          </label>
        </section>

        <section>
          <h2>¿Cómo pagará este pedido?</h2>
          <p class="checkout-secure-text">Todas las transacciones son seguras y están encriptadas.</p>
          <div class="checkout-payment-box">
            <div class="payment-method" :class="{ secondary: paymentMethod !== 'tarjeta' }">
              <label class="checkout-radio">
                <input type="radio" name="payment" value="tarjeta" v-model="paymentMethod" required>
                <span>Tarjeta de crédito</span>
              </label>
              <div class="payment-icons">
                <span class="visa">VISA</span>
                <span class="mc">MC</span>
                <span class="amex">AMEX</span>
              </div>
            </div>
            <div class="payment-details" v-if="paymentMethod === 'tarjeta'">
              <label class="checkout-input"><input type="text" required placeholder="Número de tarjeta"></label>
              <div class="checkout-row">
                <label class="checkout-input"><input type="text" required placeholder="Fecha de vencimiento (MM / AA)"></label>
                <label class="checkout-input"><input type="text" required placeholder="Código de seguridad"></label>
              </div>
              <label class="checkout-input"><input type="text" required placeholder="Nombre del titular"></label>
              <label class="checkout-checkbox">
                <input type="checkbox" checked>
                <span>Usar la dirección de envío como dirección de facturación</span>
              </label>
            </div>
            <div class="payment-method" :class="{ secondary: paymentMethod !== 'contra_entrega' }">
              <label class="checkout-radio">
                <input type="radio" name="payment" value="contra_entrega" v-model="paymentMethod" required>
                <span>Pago contra entrega</span>
              </label>
            </div>
            <div class="payment-details" v-if="paymentMethod === 'contra_entrega'">
              <div class="cod-conditions">
                <p>Requisitos y condiciones</p>
                <p>Aplica únicamente para envíos nacionales dentro del área de cobertura.</p>
                <p>El pago debe realizarse en efectivo al momento de la entrega.</p>
                <p>No se aceptan pagos con tarjetas ni transferencias en la modalidad contra entrega.</p>
                <p>En caso de que no haya nadie para recibir el pedido, se reagendará una nueva entrega (con posibles cargos adicionales).</p>
                <p>USHAS Perú se reserva el derecho de rechazar pedidos con esta modalidad si se detectan antecedentes de entregas fallidas o direcciones incorrectas.</p>
              </div>
            </div>
          </div>
        </section>
        
        <button type="submit" class="button dark checkout-submit">FINALIZAR PEDIDO</button>
      </form>
    </div>
    <aside class="checkout-sidebar-view">
      <div class="checkout-cart-items">
        <div v-for="(item, idx) in cart.items" :key="idx" class="checkout-item">
          <div class="checkout-item-image">
            <img :src="item.image" :alt="item.name">
            <span class="checkout-item-qty">1</span>
          </div>
          <div class="checkout-item-info">
            <b>{{ item.name }}</b>
          </div>
          <div class="checkout-item-price">
            S/ {{ item.price.toFixed(2) }}
          </div>
        </div>
      </div>
      <div class="checkout-summary">
        <div class="checkout-summary-row">
          <span>Subtotal</span>
          <span>S/ {{ cart.total.toFixed(2) }}</span>
        </div>
        <div class="checkout-summary-row">
          <span>Envío</span>
          <span class="muted">Gratis</span>
        </div>
        <div class="checkout-summary-row total">
          <span>Total</span>
          <span><b>S/ {{ cart.total.toFixed(2) }}</b></span>
        </div>
      </div>
    </aside>
  </div>
  
  <div v-else class="checkout-success">
    <div class="success-card">
      <div class="success-icon">✓</div>
      <h1>¡Venta realizada!</h1>
      <p>Tu pedido simulado se ha procesado con éxito.</p>
      <RouterLink to="/" class="button dark">VOLVER AL INICIO</RouterLink>
    </div>
  </div>
</template>
