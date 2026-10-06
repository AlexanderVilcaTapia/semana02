document.addEventListener('DOMContentLoaded', () => {
    console.log('⚡ JavaScript cargado y listo.');

    // Marcar navegación activa automáticamente
    const currentPath = window.location.pathname === '/' ? '/index' : window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active', 'fw-bold');
        }
    });

    // Validación del formulario de contacto
    const form = document.querySelector('#contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            const nombre = document.querySelector('#nombre').value.trim();
            const email = document.querySelector('#email').value.trim();
            
            if (!nombre || !email) {
                e.preventDefault();
                alert('Por favor, completa los campos requeridos.');
            }
        });
    }
});