import { Rol } from './Rol';

export interface IUser {
    id: string;
    email: string;
    password?: string;
    rol: Rol;
}

export interface IProducto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria: string;
    stock: number;
}
