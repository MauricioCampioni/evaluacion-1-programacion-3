import { inicializarNavegacion } from './utils/navigate';
import { actualizarBadgeCarrito } from './utils/cart';

document.addEventListener('DOMContentLoaded', () => {
    inicializarNavegacion();
    actualizarBadgeCarrito();
});
