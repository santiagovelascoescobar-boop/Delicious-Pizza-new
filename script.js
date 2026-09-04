// Script interactivo para Delicious Pizza Tocaima
document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú Hamburguesa para Móviles
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // 2. Envío de Pedido a WhatsApp
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address') ? document.getElementById('address').value : 'Tocaima';
            const message = document.getElementById('message').value;

            // Formatear mensaje para WhatsApp
            const textMsg = `¡Hola Delicious Pizza! 🍕%0A%0A*Nuevo Pedido a Domicilio*%0A*Nombre:* ${encodeURIComponent(name)}%0A*Teléfono:* ${encodeURIComponent(phone)}%0A*Dirección:* ${encodeURIComponent(address)}%0A*Pedido:* ${encodeURIComponent(message)}`;
            
            // Abrir WhatsApp con el pedido pre-cargado
            window.open(`https://api.whatsapp.com/send?text=${textMsg}`, '_blank');
        });
    }

    // 3. Resaltar enlace de navegación activo al desplazar
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});
