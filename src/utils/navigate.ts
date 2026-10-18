import { AuthService } from './auth';

const protegerRutas = (): void => {
    const usuarioLogueado = AuthService.obtenerSesionActiva();
    const rutaActual = window.location.pathname;

    const isLoginPage = rutaActual.includes('login.html');
    const isRegistroPage = rutaActual.includes('registro.html');

    if (!usuarioLogueado) {
        if (!isLoginPage && !isRegistroPage) {
            const redirectPath = rutaActual.includes('/src/pages/') ? '../../../../login.html' : 'login.html';
            window.location.href = redirectPath;
            return;
        }
    } else {
        if (isLoginPage || isRegistroPage) {
            redirigir(usuarioLogueado.rol);
            return;
        }
        if (rutaActual.includes('admin.html') && usuarioLogueado.rol !== 'admin') {
            redirigir(usuarioLogueado.rol);
            return;
        }
    }
};

const redirigir = (rol: string): void => {
    const isDeep = window.location.pathname.includes('/src/pages/');
    if (rol === 'admin') {
        window.location.href = isDeep ? '../../../../admin.html' : 'admin.html';
    } else {
        window.location.href = isDeep ? '../../../../index.html' : 'index.html';
    }
};

export const inicializarNavegacion = (): void => {
    protegerRutas();
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e: Event) => {
            e.preventDefault();
            AuthService.cerrarSesion();
        });
    }
};
