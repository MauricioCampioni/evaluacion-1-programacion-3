# Food Store - Evaluación 1 (Programación 3)

## Descripción del Proyecto
Esta aplicación frontend interactiva evoluciona el proyecto **Food Store** incorporando:
- **Catálogo interactivo** con filtrado por categorías y búsqueda por nombre en tiempo real.
- **Carrito de compras con persistencia** mediante `localStorage` (clave `"cart"`).
- **Control de cantidades, cálculo dinámico de totales** y gestión de stock.
- **Autenticación y protección de rutas** (roles `admin` y `client`).
- **Organización modular en TypeScript** siguiendo las normas y convenciones de la materia.

## Estructura del Proyecto
```
src/
├── pages/
│   ├── auth/ (login y registro)
│   ├── admin/ (panel de administración)
│   └── client/
│       ├── home/ (home.html y home.ts)
│       └── cart/ (cart.html y cart.ts)
├── types/
│   ├── IUser.ts, Rol.ts
│   ├── product.ts (IProduct, ICartItem)
│   └── categoria.ts (ICategoria)
├── data/
│   └── data.ts (PRODUCTS, getCategories)
└── utils/
    ├── auth.ts, navigate.ts
    └── cart.ts (Lógica de localStorage)
```

## Instrucciones de Ejecución

1. **Instalar dependencias**:
   ```bash
   pnpm install
   # O con npm:
   npm install
   ```

2. **Ejecutar servidor de desarrollo**:
   ```bash
   pnpm dev
   # O con npm:
   npm run dev
   ```

3. **Abrir en el navegador**:
   Ingresar a `http://localhost:5173`

4. **Compilar para producción**:
   ```bash
   pnpm build
   ```
