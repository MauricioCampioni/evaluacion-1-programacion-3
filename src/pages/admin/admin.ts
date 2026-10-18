import { IProduct } from '../../types/product';
import { PRODUCTS } from '../../data/data';

const renderizarTablaAdmin = (): void => {
    const tbody = document.getElementById("tabla-admin-productos") as HTMLTableSectionElement | null;
    if (!tbody) return;

    tbody.innerHTML = "";

    PRODUCTS.forEach((p: IProduct) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.id.toString().padStart(3, '0')}</td>
            <td><img src="${p.imagen}" alt="${p.nombre}" width="60" style="border-radius: 4px;"></td>
            <td><strong>${p.nombre}</strong></td>
            <td>${p.categoria || 'General'}</td>
            <td>$${p.precio.toLocaleString('es-AR')}</td>
            <td><span style="color: ${p.stock > 0 ? 'green' : 'red'}; font-weight: bold;">${p.stock}</span></td>
            <td><a href="#" style="color: #0066cc; margin-right: 8px;">Editar</a> <a href="#" style="color: red;">Eliminar</a></td>
        `;
        tbody.appendChild(tr);
    });
};

document.addEventListener("DOMContentLoaded", renderizarTablaAdmin);
