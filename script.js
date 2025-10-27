// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initNavigation();
    initThemeToggle();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initStats();
    initContactForm();
    initCodeRain();
});

// ==================== SISTEMA DE PARTÍCULAS ====================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.3;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();
        animationFrameId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    // Efeito de mouse
    canvas.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                particle.x -= dx / distance * 2;
                particle.y -= dy / distance * 2;
            }
        });
    });
}

// ==================== NAVEGAÇÃO ====================
function initNavigation() {
    const nav = document.querySelector('.nav-floating');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;

        // Active section highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
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
            }

            // Close mobile menu
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// ==================== TEMA DARK/LIGHT ====================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    });
}

// ==================== EFEITO DE DIGITAÇÃO ====================
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    if (!typingElement) return;

    const texts = [
        'Transformando ideias em código | Criando experiências digitais únicas',
        'Full Stack Developer | UI/UX Enthusiast',
        'Código limpo | Performance | Escalabilidade'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ==================== ANIMAÇÕES DE SCROLL ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

// ==================== BARRAS DE HABILIDADES ====================
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target.querySelector('.skill-progress');
                const skillValue = entry.target.getAttribute('data-skill');

                setTimeout(() => {
                    skillBar.style.width = skillValue + '%';
                }, 200);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        observer.observe(item);
    });
}

// ==================== CONTADOR DE ESTATÍSTICAS ====================
function initStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, start, end, duration) {
    const increment = end / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (end > 99 ? '+' : '');
    }, 16);
}

// ==================== EFEITO DE CHUVA DE CÓDIGO ====================
function initCodeRain() {
    const codeRainContainer = document.querySelector('.code-rain');
    if (!codeRainContainer) return;

    const chars = '01';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'code-column';
        column.style.left = (i * 20) + 'px';
        column.style.animationDelay = Math.random() * 2 + 's';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';

        let text = '';
        for (let j = 0; j < 30; j++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
        }
        column.innerHTML = text;

        codeRainContainer.appendChild(column);
    }

    // Add CSS for code rain
    const style = document.createElement('style');
    style.textContent = `
        .code-rain {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            opacity: 0.1;
            pointer-events: none;
        }
        .code-column {
            position: absolute;
            top: -100%;
            font-family: monospace;
            font-size: 14px;
            color: var(--primary);
            line-height: 1.5;
            animation: fall linear infinite;
        }
        @keyframes fall {
            to {
                top: 100%;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== FORMULÁRIO DE CONTATO ====================
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value
        };

        // Simulação de envio
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.querySelector('span').textContent;

        submitButton.querySelector('span').textContent = 'Enviando...';
        submitButton.disabled = true;

        // Simular delay de envio
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mostrar mensagem de sucesso
        showNotification('Mensagem enviada com sucesso!', 'success');

        // Reset form
        form.reset();
        submitButton.querySelector('span').textContent = originalText;
        submitButton.disabled = false;

        console.log('Form data:', formData);
    });

    // Validação em tempo real
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    if (field.hasAttribute('required') && value === '') {
        isValid = false;
    }

    if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }

    if (isValid) {
        field.classList.remove('error');
        field.style.borderColor = '';
    } else {
        field.classList.add('error');
        field.style.borderColor = 'var(--secondary)';
    }

    return isValid;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease-out, slideOut 0.3s ease-out 2.7s;
            box-shadow: var(--shadow-lg);
        }
        .notification-success {
            background: linear-gradient(135deg, #10b981, #059669);
        }
        .notification-error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;

    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', '');
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== EFEITOS DE BOTÃO ====================
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        btn.style.setProperty('--x', x + 'px');
        btn.style.setProperty('--y', y + 'px');
    });
});

// ==================== CURSOR CUSTOMIZADO (OPCIONAL) ====================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animate() {
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;

        followerX += distX / 10;
        followerY += distY / 10;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animate);
    }
    animate();

    // Adicionar estilos do cursor
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor,
        .cursor-follower {
            position: fixed;
            pointer-events: none;
            border-radius: 50%;
            z-index: 10000;
            mix-blend-mode: difference;
        }
        .custom-cursor {
            width: 10px;
            height: 10px;
            background: var(--primary);
            transform: translate(-50%, -50%);
        }
        .cursor-follower {
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary);
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s;
        }
        a:hover ~ .cursor-follower,
        button:hover ~ .cursor-follower {
            width: 60px;
            height: 60px;
        }
    `;
    document.head.appendChild(style);
}

// Descomentar para ativar cursor customizado
// initCustomCursor();

// ==================== EASTER EGG ====================
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    showNotification('Código Konami ativado!', 'success');
    document.body.style.animation = 'rainbow 2s linear infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// ==================== PERFORMANCE MONITOR ====================
if (window.location.search.includes('debug')) {
    const stats = document.createElement('div');
    stats.style.cssText = 'position:fixed;top:10px;left:10px;background:rgba(0,0,0,0.8);color:#0f0;padding:10px;font-family:monospace;z-index:10000;font-size:12px;';
    document.body.appendChild(stats);

    setInterval(() => {
        const perf = performance.getEntriesByType('navigation')[0];
        stats.innerHTML = `
            FPS: ${Math.round(1000 / 16)}<br>
            Load: ${Math.round(perf.loadEventEnd - perf.loadEventStart)}ms<br>
            DOM: ${Math.round(perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart)}ms
        `;
    }, 1000);
}

console.log('%c🚀 Portfólio Interativo', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com paixão e café ☕', 'color: #ec4899; font-size: 14px;');
