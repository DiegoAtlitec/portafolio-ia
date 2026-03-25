/**
 * ANIMATIONS.JS - Diego Atlitec
 * Control de líneas de tiempo con GSAP y ScrollTrigger
 */

// Registrar el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * 1. ANIMACIÓN DE CARGA (HERO)
 * Se ejecuta en cuanto el DOM está listo
 */
const initHeroAnimations = () => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".reveal-text", {
        y: 60,
        opacity: 0,
        duration: 1.4
    })
    .from(".reveal-sub", {
        y: 30,
        opacity: 0,
        duration: 1
    }, "-=1")
    .from(".hero-btns", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        scale: 0.9,
        ease: "back.out(1.7)"
    }, "-=0.6")
    /* Cambio aquí: Quitamos el delay agresivo para que el Nav siempre aparezca */
    .from(".glass-nav", {
        y: -100,
        opacity: 0,
        duration: 1,
        clearProps: "all" // Esto limpia los estilos de GSAP al terminar
    }, "-=0.5"); 
};
/**
 * 2. REVELACIÓN DE SECCIONES (SCROLL)
 * Maneja la entrada de Proyectos y Experiencia
 */
const initScrollReveal = () => {
    // Tarjetas de Proyectos
    gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: i * 0.1, // Efecto cascada automático
            ease: "power2.out"
        });
    });

    // Títulos de secciones
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 90%"
            },
            x: -30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });
};

/**
 * 3. CONTROL DE INTERACCIÓN (PARALLAX SUAVE)
 * Mueve el "blob" del fondo ligeramente con el mouse
 */
const initBackgroundInteractions = () => {
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(".blob-bg", {
            x: xPos,
            y: yPos,
            duration: 2,
            ease: "power2.out"
        });
    });
};

// Inicialización de todas las animaciones
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initScrollReveal();
    initBackgroundInteractions();
});