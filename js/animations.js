gsap.registerPlugin(ScrollTrigger);

// Animación de entrada para el Hero
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.from(".reveal-text", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    })
    .from(".reveal-sub", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .from(".hero-btns", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.5");
});

// Revelar tarjetas de proyectos al hacer scroll
gsap.utils.toArray(".project-card").forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});