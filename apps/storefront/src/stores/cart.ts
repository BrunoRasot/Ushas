import { defineStore } from 'pinia'
import type { Product } from '@ushas/types'
export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] as Product[], isOpen: false }),
  getters: { 
    count: (state) => state.items.length,
    total: (state) => state.items.reduce((acc, item) => acc + item.price, 0)
  },
  actions: { 
    add(product: Product) { 
      this.items.push(product)
      this.isOpen = true
    },
    checkout() {
      if (this.items.length === 0) {
        alert('Tu carrito está vacío.')
        return
      }
      alert(`Simulación de carrito de compras.\n\nTienes ${this.count} producto(s) por un total de S/ ${this.total.toFixed(2)}.\n\nEsta es una tienda de demostración, por lo que no se procesan pagos. ¡Gracias por probar USHAS Perú!`)
      this.items = []
      this.isOpen = false
    }
  }
})
