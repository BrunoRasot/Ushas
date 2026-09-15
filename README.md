# USHAS Perú e-commerce

MVP navegable preparado para evolucionar a una plataforma de comercio electrónico real.

## Inicio

```bash
pnpm install
pnpm dev:storefront
```

La demo del storefront se ejecuta en `http://localhost:5173`.

## Estructura

- `apps/storefront`: tienda pública Vue 3.
- `apps/admin`: reservado para el panel administrativo.
- `apps/api`: reservado para el monolito modular NestJS.
- `packages/types`: contratos de dominio compartidos.
- `packages/mock-data`: datos y adaptadores de demo reemplazables por API.
