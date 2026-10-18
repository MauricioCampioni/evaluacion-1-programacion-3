import { obtenerCarrito, actualizarCantidad, eliminarDelCarrito, vaciarCarrito, calcularTotal } from '../../../utils/cart';
import { ICartItem } from '../../../types/product';

const renderizarCarrito = (): void => {
    const contenedor = document.getElementById("contenedor-carrito") as HTMLDivElement | null;
    const resumen = document.getElementById("resumen-carrito") as HTMLDivElement | null;
    const totalSpan = document.getElementById("total-precio") as HTMLSpanElement | null;

    if (!contenedor) return;

    const items: ICartItem[] = obtenerCarrito();

    if (items.length === 0) {
        contenedor.innerHTML = `
            <div style="text-align: center; padding: 3rem; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                <p style="font-size: 1.2rem; color: #555; margin-bottom: 1rem;">Tu carrito está vacío.</p>
                <p style="color: #777;">¡Explorá nuestro catálogo para agregar las mejores comidas!</p>
                <br>
                <a href="../../../../index.html" style="display: inline-block; padding: 10px 20px; background-color: var(--color-primario); color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Ver Catálogo</a>
            </div>
        `;
        if (resumen) resumen.style.display = "none";
        return;
    }

    if (resumen) resumen.style.display = "flex";

    let html = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio Unitario</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    items.forEach(item => {
        const subtotal = item.producto.precio * item.cantidad;
        html += `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="${item.producto.imagen}" alt="${item.producto.nombre}" width="50" height="50" style="object-fit: cover; border-radius: 4px;">
                        <strong>${item.producto.nombre}</strong>
                    </div>
                </td>
                <td>$${item.producto.precio.toLocaleString('es-AR')}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button class="btn-cantidad" data-id="${item.producto.id}" data-action="decrease" style="width: 28px; height: 28px; padding: 0; margin: 0; font-size: 16px;">-</button>
                        <span style="font-weight: bold; min-width: 20px; text-align: center;">${item.cantidad}</span>
                        <button class="btn-cantidad" data-id="${item.producto.id}" data-action="increase" style="width: 28px; height: 28px; padding: 0; margin: 0; font-size: 16px;">+</button>
                    </div>
                </td>
                <td><strong>$${subtotal.toLocaleString('es-AR')}</strong></td>
                <td>
                    <button class="btn-eliminar" data-id="${item.producto.id}" style="background-color: #dc3545; width: auto; padding: 6px 12px; font-size: 14px; margin: 0;">Eliminar</button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    contenedor.innerHTML = html;

    if (totalSpan) {
        totalSpan.textContent = `$${calcularTotal().toLocaleString('es-AR')}`;
    }

    // Event Listeners
    const btnCantidades = contenedor.querySelectorAll(".btn-cantidad");
    btnCantidades.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const target = e.currentTarget as HTMLButtonElement;
            const id = parseInt(target.getAttribute("data-id") || "0");
            const action = target.getAttribute("data-action");
            const item = items.find(i => i.producto.id === id);

            if (item) {
                if (action === "increase") {
                    actualizarCantidad(id, item.cantidad + 1);
                } else if (action === "decrease") {
                    actualizarCantidad(id, item.cantidad - 1);
                }
                renderizarCarrito();
            }
        });
    });

    const btnEliminares = contenedor.querySelectorAll(".btn-eliminar");
    btnEliminares.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const target = e.currentTarget as HTMLButtonElement;
            const id = parseInt(target.getAttribute("data-id") || "0");
            eliminarDelCarrito(id);
            renderizarCarrito();
        });
    });
};

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();

    const btnVaciar = document.getElementById("btn-vaciar");
    btnVaciar?.addEventListener("click", () => {
        if (confirm("¿Estás seguro de que querés vaciar el carrito?")) {
            vaciarCarrito();
            renderizarCarrito();
        }
    });

    const btnCheckout = document.getElementById("btn-checkout");
    btnCheckout?.addEventListener("click", () => {
        alert("¡Gracias por tu compra! Tu pedido fue procesado correctamente.");
        vaciarCarrito();
        renderizarCarrito();
    });
});
