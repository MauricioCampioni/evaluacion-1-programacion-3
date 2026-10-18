import { AuthService } from '../../../utils/auth';

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login') as HTMLFormElement | null;
    if (!formLogin) return;

    formLogin.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const emailInput = document.getElementById('email') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;

        const ingresoCorrecto = AuthService.login(emailInput.value.trim(), passwordInput.value);

        if (ingresoCorrecto) {
            const sesion = AuthService.obtenerSesionActiva();
            const isDeep = window.location.pathname.includes('/src/pages/');
            if (sesion?.rol === 'admin') {
                window.location.href = isDeep ? '../../../../admin.html' : 'admin.html';
            } else {
                window.location.href = isDeep ? '../../../../index.html' : 'index.html';
            }
        } else {
            alert('Credenciales inválidas. Intente nuevamente.');
        }
    });
});
