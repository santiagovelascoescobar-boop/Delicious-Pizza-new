// JavaScript para animación de introducción de Delicious Pizza
document.addEventListener('DOMContentLoaded', () => {
    const overlayText = document.querySelector('.overlay-text');
    
    // Efecto sutil de pulso en el texto de bienvenida
    if (overlayText) {
        setInterval(() => {
            overlayText.style.textShadow = overlayText.style.textShadow.includes('30px')
                ? '0 0 15px rgba(37, 99, 235, 0.8), 0 0 45px rgba(59, 130, 246, 0.9)'
                : '0 0 15px rgba(37, 99, 235, 0.8), 0 0 30px rgba(59, 130, 246, 0.5)';
        }, 1200);
    }
});
