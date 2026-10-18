import { AuthService } from '../../../utils/auth';

document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('form-registro') as HTMLFormElement | null;
    if (!formRegistro) return;

    formRegistro.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const emailInput = document.getElementById('reg-email') as HTMLInputElement;
        const passwordInput = document.getElementById('reg-password') as HTMLInputElement;

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (password.length < 8) {
            alert('La contraseña debe tener un mínimo de 8 caracteres.');
            return;
        }

        const registroExitoso = AuthService.registrarUsuario(email, password);

        if (registroExitoso) {
            alert('¡Usuario creado correctamente! Ahora podés iniciar sesión.');
            const isDeep = window.location.pathname.includes('/src/pages/');
            window.location.href = isDeep ? '../login/login.html' : 'login.html';
        } else {
            alert('Error: Este correo electrónico ya está registrado.');
        }
    });
});
