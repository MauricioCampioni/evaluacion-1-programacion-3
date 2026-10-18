import { ICategoria } from './categoria';

export interface IProduct {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria?: string;
    categorias?: ICategoria[];
    stock: number;
    disponible?: boolean;
    createdAt?: string;
    eliminado?: boolean;
}

export interface ICartItem {
    producto: IProduct;
    cantidad: number;
}
