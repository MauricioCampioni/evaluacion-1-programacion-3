import { PRODUCTS, getCategories } from '../../../data/data';
import { IProduct } from '../../../types/product';
import { ICategoria } from '../../../types/categoria';
import { agregarAlCarrito } from '../../../utils/cart';

let categoriaSeleccionada: string = 'Todas';

const cargarCategorias = (): void => {
    const listaCategorias = document.getElementById("lista-categorias") as HTMLUListElement | null;
    if (!listaCategorias) return;

    listaCategorias.innerHTML = "";

    const liTodas = document.createElement("li");
    const aTodas = document.createElement("a");
    aTodas.href = "#";
    aTodas.textContent = "Todas";
    if (categoriaSeleccionada === 'Todas') aTodas.classList.add("active");
    aTodas.addEventListener("click", (e) => {
        e.preventDefault();
        categoriaSeleccionada = 'Todas';
        actualizarNavegacionCategorias();
        cargarProductos();
    });
    liTodas.appendChild(aTodas);
    listaCategorias.appendChild(liTodas);

    const categorias: ICategoria[] = getCategories();
    categorias.forEach(cat => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = cat.nombre;
        if (categoriaSeleccionada === cat.nombre) a.classList.add("active");
        a.addEventListener("click", (e) => {
            e.preventDefault();
            categoriaSeleccionada = cat.nombre;
            actualizarNavegacionCategorias();
            cargarProductos();
        });
        li.appendChild(a);
        listaCategorias.appendChild(li);
    });
};

const actualizarNavegacionCategorias = (): void => {
    const links = document.querySelectorAll("#lista-categorias a");
    links.forEach(link => {
        if (link.textContent === categoriaSeleccionada) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
};

const cargarProductos = (filtroNombre: string = ""): void => {
    const contenedor = document.getElementById("contenedor-productos") as HTMLDivElement | null;
    if (!contenedor) return;

    contenedor.innerHTML = "";

    let filtrados: IProduct[] = PRODUCTS;

    if (categoriaSeleccionada !== 'Todas') {
        filtrados = filtrados.filter(p => p.categoria === categoriaSeleccionada || p.categorias?.some(c => c.nombre === categoriaSeleccionada));
    }

    if (filtroNombre.trim() !== "") {
        filtrados = filtrados.filter(p => p.nombre.toLowerCase().includes(filtroNombre.toLowerCase()));
    }

    if (filtrados.length === 0) {
        contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #666; font-size: 1.1rem;">
            No se encontraron productos que coincidan con la búsqueda.
        </p>`;
        return;
    }

    filtrados.forEach((prod: IProduct) => {
        const article = document.createElement("article");
        article.className = "card-producto";

        const sinStock = prod.stock === 0;

        article.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}"/>   
            <h3>${prod.nombre}</h3>
            <p>${prod.descripcion}</p>
            <div class="precio">$${prod.precio.toLocaleString('es-AR')}</div>
            <button class="btn-agregar ${sinStock ? 'btn-disabled' : ''}" type="button" ${sinStock ? 'disabled' : ''}>
                ${sinStock ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
        `;

        const btnAgregar = article.querySelector(".btn-agregar") as HTMLButtonElement | null;
        if (btnAgregar && !sinStock) {
            btnAgregar.addEventListener("click", () => {
                agregarAlCarrito(prod, 1);
                const originalText = btnAgregar.textContent;
                btnAgregar.textContent = "¡Agregado!";
                btnAgregar.style.backgroundColor = "#28a745";
                setTimeout(() => {
                    btnAgregar.textContent = originalText;
                    btnAgregar.style.backgroundColor = "";
                }, 1200);
            });
        }

        contenedor.appendChild(article);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();
    cargarProductos();

    const formBuscar = document.getElementById("form-buscar") as HTMLFormElement | null;
    formBuscar?.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        const inputBuscar = document.getElementById("buscarProducto") as HTMLInputElement;
        cargarProductos(inputBuscar ? inputBuscar.value.trim() : "");
    });
});
