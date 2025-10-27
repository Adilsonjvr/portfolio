// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    initCreativeCanvas();
    initParallax();
    initNavigation();
    initScrollAnimations();
    initProjectsObserver();
    initCounters();
    initCursor();
});

// ==================== CANVAS CRIATIVO ====================
function initCreativeCanvas() {
    const canvas = document.getElementById('creative-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.baseX = x;
            this.baseY = y;
            this.size = Math.random() * 3 + 1;
            this.density = Math.random() * 30 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        draw() {
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
            gradient.addColorStop(0, 'rgba(255, 140, 0, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 165, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            // Movimento base
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce nas bordas
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }

            // Interação com o mouse
            if (mouse.x != null && mouse.y != null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;

                if (distance < mouse.radius) {
                    const directionX = forceDirectionX * force * this.density;
                    const directionY = forceDirectionY * force * this.density;
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }

            this.draw();
        }
    }

    function init() {
        particles = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 12000);

        for (let i = 0; i < numberOfParticles; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push(new Particle(x, y));
        }
    }

    function connect() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    const opacity = 1 - (distance / 100);
                    ctx.strokeStyle = `rgba(255, 140, 0, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
        });

        connect();
        requestAnimationFrame(animate);
    }

    init();
    animate();
}

// ==================== EFEITO PARALLAX ====================
function initParallax() {
    const layers = document.querySelectorAll('.parallax-layer');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.3;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });

    // Parallax do mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        layers.forEach((layer, index) => {
            const depth = (index + 1) * 20;
            const moveX = (mouseX - 0.5) * depth;
            const moveY = (mouseY - 0.5) * depth;

            layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    });
}

// ==================== NAVEGAÇÃO ====================
function initNavigation() {
    const nav = document.querySelector('.nav-minimal');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Ocultar/mostrar nav ao rolar
        if (currentScroll > lastScroll && currentScroll > 500) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;

        // Active section
        updateActiveLink();
    });

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Fechar menu mobile
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop &&
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ==================== PROJECTS OBSERVER ====================
function initProjectsObserver() {
    const projectItems = document.querySelectorAll('.project-item');

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projectItems.forEach(item => {
        observer.observe(item);
    });

    // Hover effect para os projetos
    projectItems.forEach(item => {
        const shapes = item.querySelectorAll('.project-shape');

        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.05;
                const moveX = (x - rect.width / 2) * speed;
                const moveY = (y - rect.height / 2) * speed;

                shape.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
            });
        });

        item.addEventListener('mouseleave', () => {
            shapes.forEach(shape => {
                shape.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    });
}

// ==================== CONTADORES ANIMADOS ====================
function initCounters() {
    const counters = document.querySelectorAll('.stat-value');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        const easeOutQuad = progress * (2 - progress);
        const current = Math.floor(easeOutQuad * (end - start) + start);

        element.textContent = current;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    };

    window.requestAnimationFrame(step);
}

// ==================== CURSOR CUSTOMIZADO ====================
function initCursor() {
    // Criar cursor customizado
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        const distX = mouseX - cursorX;
        const distY = mouseY - cursorY;

        cursorX += distX * 0.1;
        cursorY += distY * 0.1;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Efeitos hover
    const hoverElements = document.querySelectorAll('a, button, .project-item');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });

    // Adicionar estilos
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(255, 140, 0, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transform: translate(-50%, -50%);
            transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
            mix-blend-mode: difference;
        }

        .cursor-dot {
            position: fixed;
            width: 6px;
            height: 6px;
            background: #ff8c00;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10001;
            transform: translate(-50%, -50%);
            transition: transform 0.2s ease;
        }

        .custom-cursor.cursor-hover {
            width: 60px;
            height: 60px;
            border-color: #ff8c00;
        }

        .cursor-dot.cursor-hover {
            transform: translate(-50%, -50%) scale(1.5);
        }

        * {
            cursor: none !important;
        }

        @media (max-width: 768px) {
            .custom-cursor,
            .cursor-dot {
                display: none;
            }
            * {
                cursor: auto !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== SOCIAL ICONS INTERACTION ====================
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        const platform = this.getAttribute('data-platform');
        this.style.setProperty('--platform-color', getComputedStyle(this).getPropertyValue('--orange'));
    });

    icon.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = -(x - centerX) / 10;

        this.style.transform = `translateY(-10px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
    });
});

// ==================== PARALLAX DIVIDER ====================
window.addEventListener('scroll', () => {
    const divider = document.querySelector('.parallax-divider');
    if (!divider) return;

    const rect = divider.getBoundingClientRect();
    const scrollPercent = 1 - (rect.top / window.innerHeight);

    if (scrollPercent > 0 && scrollPercent < 1) {
        const dividerText = divider.querySelector('.divider-text');
        if (dividerText) {
            dividerText.style.opacity = scrollPercent;
            dividerText.style.transform = `translateY(${(1 - scrollPercent) * 50}px)`;
        }
    }
});

// ==================== FRAME CORNERS ANIMATION ====================
const frameCorners = document.querySelectorAll('.frame-corner');
frameCorners.forEach((corner, index) => {
    corner.style.animation = `cornerPulse 2s ease-in-out ${index * 0.2}s infinite`;
});

const frameStyle = document.createElement('style');
frameStyle.textContent = `
    @keyframes cornerPulse {
        0%, 100% {
            opacity: 0.5;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(frameStyle);

// ==================== PERFORMANCE & SMOOTH SCROLLING ====================
// Debounce para otimização
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Otimizar resize
window.addEventListener('resize', debounce(() => {
    initCreativeCanvas();
}, 250));

// ==================== CONSOLE MESSAGE ====================
console.log(
    '%c🔥 PORTFÓLIO ARTÍSTICO 🔥',
    'color: #ff8c00; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(255, 140, 0, 0.3);'
);
console.log(
    '%cCódigo é Arte | Arte é Código',
    'color: #ffa500; font-size: 14px; font-style: italic;'
);
console.log(
    '%cDesenvolvido com paixão e café ☕',
    'color: #ff6b00; font-size: 12px;'
);

// ==================== EASTER EGG ====================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    console.log('%c🎉 KONAMI CODE ATIVADO! 🎉', 'color: #ff8c00; font-size: 20px; font-weight: bold;');

    document.body.style.animation = 'rainbow 3s linear infinite';

    const easterStyle = document.createElement('style');
    easterStyle.id = 'easter-egg-style';
    easterStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(easterStyle);

    setTimeout(() => {
        document.body.style.animation = '';
        const eggStyle = document.getElementById('easter-egg-style');
        if (eggStyle) eggStyle.remove();
    }, 5000);
}
