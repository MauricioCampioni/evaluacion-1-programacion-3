import { IProduct } from '../types/product';
import { ICategoria } from '../types/categoria';

export const categorias: ICategoria[] = [
    { id: 1, nombre: "Hamburguesas", descripcion: "Hamburguesas gourmet caseras", eliminado: false },
    { id: 2, nombre: "Pizzas", descripcion: "Pizzas artesanales al molde", eliminado: false },
    { id: 3, nombre: "Papas Fritas", descripcion: "Papas crocantes e ingredientes especial", eliminado: false },
    { id: 4, nombre: "Bebidas", descripcion: "Gaseosas y bebidas refrescantes", eliminado: false }
];

export const PRODUCTS: IProduct[] = [
    {
        id: 1,
        nombre: "Hamburguesa Doble",
        descripcion: "Hamburguesa doble con alioli, queso cheddar y bacon.",
        precio: 25000,
        imagen: "./assets/Hamburguesa 1.jpeg",
        categoria: "Hamburguesas",
        categorias: [categorias[0]],
        stock: 12,
        disponible: true,
        eliminado: false
    },
    {
        id: 2,
        nombre: "Pizza Muzzarella",
        descripcion: "Salsa de tomate casera, muzzarella y orégano.",
        precio: 18000,
        imagen: "./assets/Pizza_Muzzarella.png",
        categoria: "Pizzas",
        categorias: [categorias[1]],
        stock: 5,
        disponible: true,
        eliminado: false
    },
    {
        id: 3,
        nombre: "Papas con Cheddar",
        descripcion: "Papas fritas crujientes bañadas en salsa de queso cheddar.",
        precio: 15000,
        imagen: "./assets/Papas_Cheddar.png",
        categoria: "Papas Fritas",
        categorias: [categorias[2]],
        stock: 0,
        disponible: false,
        eliminado: false
    },
    {
        id: 4,
        nombre: "Coca Cola",
        descripcion: "Bebida refrescante de 500ml en botella de vidrio.",
        precio: 4500,
        imagen: "./assets/Coca_Cola.png",
        categoria: "Bebidas",
        categorias: [categorias[3]],
        stock: 20,
        disponible: true,
        eliminado: false
    },
    {
        id: 5,
        nombre: "Pizza Napolitana",
        descripcion: "Pizza tradicional con tomate fresco, ajo y albahaca.",
        precio: 20000,
        imagen: "./assets/Pizza_Napolitana.png",
        categoria: "Pizzas",
        categorias: [categorias[1]],
        stock: 8,
        disponible: true,
        eliminado: false
    }
];

export function getCategories(): ICategoria[] {
    return categorias.filter(c => !c.eliminado);
}
