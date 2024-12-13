// Validar inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('usuario');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');

    if (user) {
        loginLink.textContent = 'Cerrar Sesión';
        loginLink.href = '#';
        registerLink.style.display = 'none';

        loginLink.addEventListener('click', () => {
            localStorage.removeItem('usuario');
            alert('Has cerrado sesión.');
            window.location.reload();
        });
    }
});

// Guardar datos de registro
document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuario = {
        nombre: document.getElementById('name').value,
        email: document.getElementById('email').value
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = 'login.html';
});

// Guardar sesión al iniciar
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    localStorage.setItem('usuario', JSON.stringify({ email }));
    alert('Inicio de sesión exitoso.');
    window.location.href = 'index.html';
});
