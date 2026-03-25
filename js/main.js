/**
 * MAIN.JS - Portafolio Diego Atlitec
 * Estructura modular: Canvas + Skills + Scroll Observer
 */

// --- 1. CONFIGURACIÓN DEL CANVAS (RED NEURONAL) ---
const initNeuralBackground = () => {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    const setSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const connect = () => {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 - distance/1200})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => { p.update(); p.draw(); });
        connect();
        requestAnimationFrame(animate);
    };

    setSize();
    window.addEventListener('resize', setSize);
    particlesArray = Array.from({ length: (canvas.width * canvas.height) / 15000 }, () => new Particle());
    animate();
};

// --- 2. LÓGICA DE SKILLS (DATOS Y RENDER) ---
const setupSkills = () => {
    // Definimos solo etiquetas. Los iconos vienen de Lucide en el HTML o se pueden inyectar.
    // Para mantener el diseño "slot", inyectamos los spans en los contenedores existentes.
    const skillData = {
        'cat-ai': ['Machine Learning', 'Deep Learning', 'Python', 'Neural Networks', 'TensorFlow', 'Keras'],
        'cat-dev': ['C++', 'C', 'Java', 'Swift', 'JavaScript', 'React', 'Haskell'],
        'cat-data': ['SQL Server', 'MySQL', 'Oracle', 'Azure', 'Linux', 'SQL'],
        'cat-met': ['Scrum', 'Git / GitHub', 'Agile']
    };

    Object.entries(skillData).forEach(([id, list]) => {
        const container = document.getElementById(id);
        if (!container) return;
        
        container.innerHTML = list.map(skill => `
            <div class="slot-chip">
                <span>${skill}</span>
            </div>
        `).join('');
    });
};

// --- 3. OBSERVER DE ANIMACIONES (SCROLL) ---
const initScrollAnimations = () => {
    const orbitItems = document.querySelectorAll('.orbit-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animación interna de los chips (efecto cascada)
                const chips = entry.target.querySelectorAll('.slot-chip');
                chips.forEach((chip, i) => {
                    setTimeout(() => chip.classList.add('animate'), i * 60);
                });
            }
        });
    }, observerOptions);

    orbitItems.forEach(item => observer.observe(item));
};

/**
 * EFECTO DE MOVIMIENTO ELÁSTICO (GELATINA) EN SKILLS
 * Calcula la posición del scroll y mueve los chips basándose en ella.
 */
const initJellySkills = () => {
    const orbitTags = document.querySelectorAll('.tags-orbit');
    
    const onScrollJelly = () => {
        const vh = window.innerHeight;

        orbitTags.forEach(container => {
            const rect = container.getBoundingClientRect();
            if (rect.top > vh || rect.bottom < 0) return;

            const elementCenter = rect.top + rect.height / 2;
            const dist = (elementCenter / vh) - 0.5;

            const chips = container.querySelectorAll('.slot-chip');
            chips.forEach((chip, i) => {
                // Aumentamos la fuerza a 100 para que el brinco sea exagerado y obvio
                const strength = 100; 
                const speed = 0.6 + (i * 0.12); 
                const moveY = dist * strength * speed;

                // 1. Escribimos la variable CSS (buena práctica)
                chip.style.setProperty('--ty', `${moveY}px`);
                
                // 2. FORZAMOS EL TRANSFORM DIRECTAMENTE (La solución real)
                // Esto sobrescribe cualquier keyframe de CSS que intente congelarlo.
                chip.style.transform = `translateY(${moveY}px)`;
            });
        });
    };

    window.addEventListener('scroll', onScrollJelly, { passive: true });
    // Ejecutar una vez al cargar
    onScrollJelly();
};

// --- INICIALIZACIÓN GENERAL ---
document.addEventListener('DOMContentLoaded', () => {
    initNeuralBackground();
    setupSkills();
    initScrollAnimations();
    
    // --- NUEVO: Inicializamos la gelatina ---
    initJellySkills(); 
    
    // Si usas Lucide, esto asegura que los iconos se carguen tras inyectar el HTML
    if (window.lucide) {
        window.lucide.createIcons();
    }
});

