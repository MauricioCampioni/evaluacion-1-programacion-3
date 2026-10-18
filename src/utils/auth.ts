const USERS_KEY = 'users';
const SESSION_KEY = 'userData';

export const AuthService = {
    obtenerUsuarios() {
        const usersJSON = localStorage.getItem(USERS_KEY);
        return usersJSON ? JSON.parse(usersJSON) : [];
    },
    registrarUsuario(email: string, password?: string) {
        const usuarios = this.obtenerUsuarios();
        const existe = usuarios.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
        if (existe) {
            return false;
        }
        const nuevoUsuario = {
            id: crypto.randomUUID(),
            email: email,
            password: password,
            rol: 'client'
        };
        usuarios.push(nuevoUsuario);
        localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
        return true;
    },
    login(email: string, password?: string) {
        const usuarios = this.obtenerUsuarios();
        const usuarioEncontrado = usuarios.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (!usuarioEncontrado) {
            return false;
        }
        const datosSesion = {
            id: usuarioEncontrado.id,
            email: usuarioEncontrado.email,
            rol: usuarioEncontrado.rol
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(datosSesion));
        return true;
    },
    obtenerSesionActiva() {
        const sessionJSON = localStorage.getItem(SESSION_KEY);
        return sessionJSON ? JSON.parse(sessionJSON) : null;
    },
    cerrarSesion() {
        localStorage.removeItem(SESSION_KEY);
        const relativePath = window.location.pathname.includes('/src/pages/') ? '../../../../login.html' : 'login.html';
        window.location.href = relativePath;
    }
};
