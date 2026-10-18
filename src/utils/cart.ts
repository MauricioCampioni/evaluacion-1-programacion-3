import { IProduct, ICartItem } from '../types/product';

const CART_KEY = 'cart';

export const obtenerCarrito = (): ICartItem[] => {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
};

export const guardarCarrito = (carrito: ICartItem[]): void => {
    localStorage.setItem(CART_KEY, JSON.stringify(carrito));
    actualizarBadgeCarrito();
};

export const agregarAlCarrito = (producto: IProduct, cantidad: number = 1): void => {
    const carrito = obtenerCarrito();
    const itemExistente = carrito.find(item => item.producto.id === producto.id);

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({ producto, cantidad });
    }

    guardarCarrito(carrito);
};

export const actualizarCantidad = (productoId: number, nuevaCantidad: number): void => {
    let carrito = obtenerCarrito();
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(productoId);
        return;
    }
    const item = carrito.find(i => i.producto.id === productoId);
    if (item) {
        item.cantidad = nuevaCantidad;
    }
    guardarCarrito(carrito);
};

export const eliminarDelCarrito = (productoId: number): void => {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.producto.id !== productoId);
    guardarCarrito(carrito);
};

export const vaciarCarrito = (): void => {
    localStorage.removeItem(CART_KEY);
    actualizarBadgeCarrito();
};

export const calcularTotal = (): number => {
    const carrito = obtenerCarrito();
    return carrito.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);
};

export const obtenerCantidadTotalItems = (): number => {
    const carrito = obtenerCarrito();
    return carrito.reduce((sum, item) => sum + item.cantidad, 0)
};

export const actualizarBadgeCarrito = (): void => {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.textContent = obtenerCantidadTotalItems().toString();
    }
};
