// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    initCreativeCanvas();
    initParallax();
    initNavigation();
    initScrollAnimations();
    initProjectsObserver();
    initCounters();
    initCursor();
    // initThreeJSScene(); // Removido temporariamente
    // initGSAPHero(); // Removido temporariamente
    initTypewriter();
});

// ... (rest of the file until initCursor)

// ==================== CURSOR CUSTOMIZADO ====================
function initCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Hover effect for links and buttons
    const links = document.querySelectorAll('a, button, .project-item, .tech-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// ==================== CANVAS CRIATIVO ====================
function initCreativeCanvas() {
    const canvas = document.getElementById('creative-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    let particleColor = { r: 255, g: 59, b: 0 }; // Audi Neon Orange

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Listener para mudança de cor
    canvas.addEventListener('colorchange', (e) => {
        particleColor = e.detail.rgb;
    });

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
            this.baseSize = Math.random() * 3 + 1; // Base size for pulsing
            this.size = this.baseSize;
            this.density = Math.random() * 30 + 1;
            // Faster movement for "Neon Sparks" feel
            this.speedX = Math.random() * 1.5 - 0.75;
            this.speedY = Math.random() * 1.5 - 0.75;
            // Pulse effect
            this.pulseAngle = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.05 + Math.random() * 0.05;
        }

        draw() {
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
            // More intense core
            gradient.addColorStop(0, `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, 1)`);
            gradient.addColorStop(0.4, `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, 0.4)`);
            gradient.addColorStop(1, `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, 0)`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            // Pulse animation
            this.pulseAngle += this.pulseSpeed;
            this.size = this.baseSize + Math.sin(this.pulseAngle) * 1.5;
            if (this.size < 0.5) this.size = 0.5; // Prevent negative size

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
                    ctx.strokeStyle = `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, ${opacity * 0.3})`;
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




// ==================== SOCIAL ICONS INTERACTION ====================
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function () {
        const platform = this.getAttribute('data-platform');
        this.style.setProperty('--platform-color', getComputedStyle(this).getPropertyValue('--orange'));
    });

    icon.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = -(x - centerX) / 10;

        this.style.transform = `translateY(-10px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    icon.addEventListener('mouseleave', function () {
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
    console.log('%c💥 Texto quebrando a página...', 'color: #ffa500; font-size: 14px;');

    // Prevenir múltiplas ativações
    if (document.querySelector('.easter-toast')) return;

    // Toast Notification
    const toast = document.createElement('div');
    toast.className = 'easter-toast';
    toast.textContent = 'KONAMI CODE ATIVADO!';
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.5s ease-in forwards';
        setTimeout(() => toast.remove(), 500);
    }, 3000);

    // Texto quebrando a página - na hero section
    setTimeout(() => {
        const text = 'VAMOS DESENVOLVER JUNTOS?';

        // Criar texto
        const breakingText = document.createElement('div');
        breakingText.className = 'breaking-text';

        // Posicionar na hero section (não fixed, acompanha scroll)
        const heroSection = document.querySelector('.home-section');
        if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            const heroTop = window.scrollY + heroRect.top;
            breakingText.style.top = `${heroTop + (heroRect.height / 2)}px`;
        }

        // Criar cada letra separadamente para efeito de quebra (mais lento)
        const words = text.split(' ');
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('div');
            wordSpan.className = 'breaking-word';
            wordSpan.style.animationDelay = `${wordIndex * 0.25}s`; // Mais lento: 0.15s → 0.25s

            word.split('').forEach((letter, letterIndex) => {
                const letterSpan = document.createElement('span');
                letterSpan.className = 'breaking-letter';
                letterSpan.textContent = letter;
                letterSpan.style.animationDelay = `${wordIndex * 0.25 + letterIndex * 0.1}s`; // Mais lento: 0.05s → 0.1s
                wordSpan.appendChild(letterSpan);
            });

            breakingText.appendChild(wordSpan);
        });

        document.body.appendChild(breakingText);

        // Rainbow suave no fundo
        document.body.style.animation = 'rainbow 10s linear';

        // Remove após 10s
        setTimeout(() => {
            breakingText.style.animation = 'breakingTextOut 0.8s ease-in forwards';
            setTimeout(() => {
                breakingText.remove();
                document.body.style.animation = '';
            }, 800);
            console.log('%c✅ Easter Egg finalizado!', 'color: #00ff00; font-size: 12px;');
        }, 9000);
    }, 500);
}

// ==================== MIND MAP ANIMATION ====================
// Removido - substituído por texto objetivo na seção About
/*
function initMindMap() {
    const mindMapContainer = document.querySelector('.mind-map-container');

    if (!mindMapContainer) return;

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(mindMapContainer);
}
*/

// ==================== INTERNACIONALIZAÇÃO (i18n) ====================
const translations = {
    pt: {
        nav: {
            home: 'Home',
            about: 'Sobre',
            projects: 'Projetos',
            experience: 'Experiência',
            skills: 'Skills',
            contact: 'Contato'
        },
        home: {
            title: 'Performance & Design Digital',
            role: 'Desenvolvedor FullStack',
            subtitle: 'Construo aplicações web com React, Next.js, TypeScript e Node.js.<br>Soluções completas do frontend ao backend.',
            cta: 'Vamos trabalhar juntos?',
            explore: 'EXPLORAR'
        },
        about: {
            title: {
                html: 'Desenvolvedor<br><span class="highlight-orange">Full Stack</span>'
            },
            text1: 'Desenvolvedor com experiência em criar aplicações web completas, do frontend ao backend. Trabalho com React, Next.js, TypeScript, Node.js e PostgreSQL. Implemento integrações com APIs externas, sistemas de autenticação, dashboards em tempo real e plataformas SaaS.',
            text2: 'Foco em escrever código limpo, documentado e testável. Utilizo Git para controle de versão, Docker para containerização e deploy contínuo via Vercel. Experiência com banco de dados relacionais (PostgreSQL), ORMs (Prisma), WebSockets, processamento de arquivos e integração de serviços de terceiros (Supabase, AssemblyAI, Binance API).'
        },
        divider: {
            quote: '"Inovação não é sobre ideias, é sobre execução"'
        },
        projects: {
            title: 'Projetos em Destaque'
        },
        skills: {
            title: 'Tecnologias & Skills'
        },
        contact: {
            title: 'Vamos Trabalhar Juntos',
            subtitle: 'Tem um projeto em mente? Estou sempre aberto a novas oportunidades e colaborações.',
            email: {
                label: 'Email'
            },
            location: {
                label: 'Localização'
            },
            social: {
                title: 'Redes Sociais'
            },
            form: {
                name: 'Nome',
                email: 'Email',
                subject: 'Assunto',
                message: 'Mensagem',
                submit: 'Enviar Mensagem',
                success: 'Mensagem enviada com sucesso!',
                error: 'Erro ao enviar mensagem. Tente novamente.'
            }
        },
        easter: {
            title: '🎮 Easter Egg Secreto!',
            hint: 'Experimente digitar o lendário <strong>Konami Code</strong> para desbloquear uma surpresa especial:',
            tip: 'Use as setas do teclado e depois as teclas B e A!'
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            projects: 'Projects',
            experience: 'Experience',
            skills: 'Skills',
            contact: 'Contact'
        },
        home: {
            title: 'Digital Performance & Design',
            role: 'Full Stack Developer',
            subtitle: 'Building web applications with React, Next.js, TypeScript and Node.js.<br>Complete solutions from frontend to backend.',
            cta: 'Start Project',
            explore: 'EXPLORE'
        },
        about: {
            title: {
                html: 'Developer<br><span class="highlight-orange">Full Stack</span>'
            },
            text1: 'Developer experienced in building complete web applications, from frontend to backend. Working with React, Next.js, TypeScript, Node.js, and PostgreSQL. Implementing external API integrations, authentication systems, real-time dashboards, and SaaS platforms.',
            text2: 'Focus on writing clean, documented, and testable code. Using Git for version control, Docker for containerization, and continuous deployment via Vercel. Experience with relational databases (PostgreSQL), ORMs (Prisma), WebSockets, file processing, and third-party service integration (Supabase, AssemblyAI, Binance API).'
        },
        divider: {
            quote: '"Innovation is not about ideas, it\'s about execution"'
        },
        projects: {
            title: 'Featured Projects'
        },
        skills: {
            title: 'Technologies & Skills'
        },
        contact: {
            title: "Let's Work Together",
            subtitle: 'Have a project in mind? I\'m always open to new opportunities and collaborations.',
            email: {
                label: 'Email'
            },
            location: {
                label: 'Location'
            },
            social: {
                title: 'Social Media'
            },
            form: {
                name: 'Name',
                email: 'Email',
                subject: 'Subject',
                message: 'Message',
                submit: 'Send Message',
                success: 'Message sent successfully!',
                error: 'Error sending message. Please try again.'
            }
        },
        easter: {
            title: '🎮 Secret Easter Egg!',
            hint: 'Try typing the legendary <strong>Konami Code</strong> to unlock a special surprise:',
            tip: 'Use the arrow keys and then B and A keys!'
        }
    }
};

let currentLang = localStorage.getItem('language') || 'pt';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.getAttribute('data-i18n').split('.');
        let translation = translations[lang];

        keys.forEach(key => {
            translation = translation[key];
        });

        if (translation) {
            // Use innerHTML if translation contains HTML tags or if data-i18n includes .html
            if (element.getAttribute('data-i18n').includes('.html') || translation.includes('<br>') || translation.includes('<')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }

            // Update data-word for animated words
            if (element.hasAttribute('data-word')) {
                element.setAttribute('data-word', translation);
            }
        }
    });

    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize language buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
    });
});

// Set initial language
setLanguage(currentLang);

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevenir envio padrão para usar AJAX

        const submitBtn = contactForm.querySelector('.submit-btn');
        const formData = new FormData(contactForm);

        // Adicionar configurações do FormSubmit via FormData
        formData.append('_captcha', 'false');
        formData.append('_template', 'table');

        // Desabilitar botão para evitar envios duplicados
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
            submitBtn.style.cursor = 'not-allowed';
        }

        // Mostrar mensagem de envio
        if (formStatus) {
            formStatus.textContent = '📤 Enviando mensagem...';
            formStatus.style.color = 'var(--orange)';
            formStatus.style.display = 'block';
            formStatus.style.background = 'rgba(255, 140, 0, 0.05)';
            formStatus.style.padding = '1rem';
            formStatus.style.borderRadius = '8px';
            formStatus.style.marginTop = '1rem';
            formStatus.style.transition = 'all 0.3s ease';
        }

        try {
            // Enviar via AJAX usando Fetch API
            const response = await fetch('https://formsubmit.co/adilsonjvr@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Sucesso!
                if (formStatus) {
                    formStatus.textContent = '✓ Mensagem enviada com sucesso! Obrigado pelo contato.';
                    formStatus.style.color = '#00ff88';
                    formStatus.style.background = 'rgba(0, 255, 136, 0.1)';
                }

                // Limpar formulário
                contactForm.reset();

                // Ocultar mensagem após 8 segundos
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.style.opacity = '0';
                        setTimeout(() => {
                            formStatus.style.display = 'none';
                            formStatus.style.opacity = '1';
                        }, 500);
                    }
                }, 8000);

                console.log('✅ Mensagem enviada com sucesso!');
            } else {
                throw new Error('Erro ao enviar mensagem');
            }
        } catch (error) {
            // Erro no envio
            console.error('❌ Erro ao enviar:', error);

            if (formStatus) {
                formStatus.textContent = '❌ Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato por email.';
                formStatus.style.color = '#ff4444';
                formStatus.style.background = 'rgba(255, 68, 68, 0.1)';
            }

            // Ocultar mensagem de erro após 10 segundos
            setTimeout(() => {
                if (formStatus) {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                        formStatus.style.opacity = '1';
                    }, 500);
                }
            }, 10000);
        } finally {
            // Reabilitar botão após 3 segundos
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.cursor = 'pointer';
                }
            }, 3000);
        }
    });
}

// ==================== EASTER EGG MODAL ====================
const easterEggHint = document.getElementById('easter-egg-hint');
const easterEggModal = document.getElementById('easter-egg-modal');
const modalClose = document.getElementById('modal-close');

if (easterEggHint && easterEggModal) {
    // Open modal
    easterEggHint.addEventListener('click', () => {
        easterEggModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    const closeModal = () => {
        easterEggModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);

    // Close on backdrop click
    easterEggModal.addEventListener('click', (e) => {
        if (e.target === easterEggModal) {
            closeModal();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && easterEggModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ==================== COLOR CUSTOMIZER ====================
const colorToggle = document.getElementById('color-toggle');
const colorPanel = document.getElementById('color-panel');
const colorClose = document.getElementById('color-close');
const colorOptions = document.querySelectorAll('.color-option');
const customColorInput = document.getElementById('custom-color');
const colorReset = document.getElementById('color-reset');

// Default color
const DEFAULT_COLOR = '#ff3b00';

// Helper function to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Helper function to lighten/darken color
function adjustColor(hex, percent) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;

    const adjust = (value) => {
        const adjusted = Math.round(value + (255 - value) * (percent / 100));
        return Math.max(0, Math.min(255, adjusted));
    };

    const r = percent > 0 ? adjust(rgb.r) : Math.round(rgb.r * (1 + percent / 100));
    const g = percent > 0 ? adjust(rgb.g) : Math.round(rgb.g * (1 + percent / 100));
    const b = percent > 0 ? adjust(rgb.b) : Math.round(rgb.b * (1 + percent / 100));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Apply color theme
function applyColorTheme(color) {
    const root = document.documentElement;

    // Calculate color variations
    const darkColor = adjustColor(color, -15);
    const lightColor = adjustColor(color, 15);

    const rgb = hexToRgb(color);
    const glowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;

    // Update CSS variables
    root.style.setProperty('--orange-dark', darkColor);
    root.style.setProperty('--orange', color);
    root.style.setProperty('--orange-light', lightColor);
    root.style.setProperty('--orange-glow', glowColor);

    // Update gradients
    root.style.setProperty('--gradient-orange', `linear-gradient(135deg, ${darkColor} 0%, ${color} 50%, ${lightColor} 100%)`);
    root.style.setProperty('--gradient-orange-vertical', `linear-gradient(180deg, ${darkColor} 0%, ${lightColor} 100%)`);
    root.style.setProperty('--gradient-radial', `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1) 0%, transparent 70%)`);

    // Update shadows
    root.style.setProperty('--shadow-orange', `0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`);
    root.style.setProperty('--shadow-orange-lg', `0 0 60px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7)`);

    // Update drop shadows for filters
    root.style.setProperty('--drop-shadow-sm', `drop-shadow(0 4px 10px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2))`);
    root.style.setProperty('--drop-shadow-md', `drop-shadow(0 8px 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4))`);
    root.style.setProperty('--drop-shadow-skills', `0 10px 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`);

    // Update shadow effects para hover
    root.style.setProperty('--shadow-hover-preview', `0 15px 60px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`);
    root.style.setProperty('--shadow-hover-cta', `0 8px 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`);
    root.style.setProperty('--shadow-button-pulse', `0 4px 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`);

    // Update borders com diferentes opacidades
    root.style.setProperty('--border-orange-10', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
    root.style.setProperty('--border-orange-20', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`);
    root.style.setProperty('--border-orange-30', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`);
    root.style.setProperty('--border-orange-50', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`);

    // Update backgrounds com diferentes opacidades
    root.style.setProperty('--bg-orange-02', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.02)`);
    root.style.setProperty('--bg-orange-05', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)`);
    root.style.setProperty('--bg-orange-08', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`);
    root.style.setProperty('--bg-orange-10', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
    root.style.setProperty('--bg-orange-15', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`);
    root.style.setProperty('--bg-orange-20', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`);

    // Update text strokes
    root.style.setProperty('--text-stroke-10', `2px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
    root.style.setProperty('--text-stroke-20', `2px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`);

    // Update shadows específicas para botões
    root.style.setProperty('--shadow-hint-sm', `0 4px 15px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`);
    root.style.setProperty('--shadow-hint-md', `0 6px 25px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`);
    root.style.setProperty('--shadow-hint-lg', `0 6px 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`);
    root.style.setProperty('--shadow-customizer-sm', `0 4px 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`);
    root.style.setProperty('--shadow-customizer-md', `0 6px 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`);
    root.style.setProperty('--shadow-customizer-lg', `0 6px 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7)`);

    // Update shadows compostas
    root.style.setProperty('--shadow-cta-hover', `0 4px 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3), 0 0 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`);
    root.style.setProperty('--shadow-cta-active', `0 6px 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5), 0 0 60px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`);
    root.style.setProperty('--shadow-mega', `0 8px 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6), 0 0 80px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`);

    // Update glow effects for animations
    root.style.setProperty('--glow-light', `drop-shadow(0 0 10px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5))`);
    root.style.setProperty('--glow-strong', `drop-shadow(0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8))`);
    root.style.setProperty('--glow-mega-1', `0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`);
    root.style.setProperty('--glow-mega-2', `0 0 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`);
    root.style.setProperty('--glow-mega-3', `0 0 60px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`);

    // Update gradientes adicionais
    root.style.setProperty('--gradient-radial-02', `radial-gradient(circle at 50% 50%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.02) 0%, transparent 70%)`);
    root.style.setProperty('--gradient-radial-05', `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05) 0%, transparent 70%)`);
    root.style.setProperty('--gradient-radial-20', `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2), transparent)`);
    root.style.setProperty('--gradient-linear-subtle', `linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05) 100%)`);
    root.style.setProperty('--gradient-linear-hover', `linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08) 100%)`);

    // Update parallax layers
    const layer1 = document.querySelector('.layer-1');
    const layer2 = document.querySelector('.layer-2');
    const layer3 = document.querySelector('.layer-3');

    if (layer1) layer1.style.background = `radial-gradient(circle at 20% 30%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05) 0%, transparent 50%)`;
    if (layer2) layer2.style.background = `radial-gradient(circle at 80% 70%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.03) 0%, transparent 50%)`;
    if (layer3) layer3.style.background = `radial-gradient(circle at 50% 50%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.02) 0%, transparent 70%)`;

    // Update custom cursor colors
    const customCursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (customCursor) {
        customCursor.style.borderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
    }

    if (cursorDot) {
        cursorDot.style.background = color;
    }

    // Update canvas particles (if exists)
    const canvas = document.getElementById('creative-canvas');
    if (canvas && canvas.getContext) {
        // Trigger canvas color update by dispatching custom event
        canvas.dispatchEvent(new CustomEvent('colorchange', { detail: { color, rgb } }));
    }

    // Update card borders and strokes
    const elementsToUpdate = [
        { selector: '.project-bg', property: 'borderColor', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` },
        { selector: '.project-index', property: 'webkitTextStroke', value: `2px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` },
        { selector: '.about-number', property: 'webkitTextStroke', value: `2px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)` },
        { selector: '.section-number', property: 'webkitTextStroke', value: `2px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)` },
        { selector: '.stat-box', property: 'borderColor', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` },
        { selector: '.project-tech span', property: 'borderColor', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)` },
        { selector: '.tech-item', property: 'borderColor', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` },
        { selector: '.social-icon', property: 'borderColor', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` },
        { selector: '.sidebar-icon', property: 'borderColor', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)` },
        { selector: '.nav-minimal', property: 'borderBottomColor', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)` },
        { selector: '.contact-item', property: 'borderColor', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)` },
        { selector: '.contact-social', property: 'borderColor', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)` },
        { selector: '.social-link', property: 'borderColor', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` },
        { selector: '.contact-form', property: 'borderColor', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)` },
        { selector: '.form-group input', property: 'borderBottomColor', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` },
        { selector: '.form-group textarea', property: 'borderBottomColor', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` }
    ];

    elementsToUpdate.forEach(({ selector, property, value }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style[property] = value;
        });
    });

    // Save to localStorage
    localStorage.setItem('themeColor', color);

    console.log(`🎨 Tema atualizado para: ${color}`);
}

// Toggle panel
colorToggle.addEventListener('click', () => {
    colorPanel.classList.toggle('active');
});

// Close panel
colorClose.addEventListener('click', () => {
    colorPanel.classList.remove('active');
});

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (!colorToggle.contains(e.target) && !colorPanel.contains(e.target)) {
        colorPanel.classList.remove('active');
    }
});

// Color option selection
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active from all
        colorOptions.forEach(opt => opt.classList.remove('active'));

        // Add active to selected
        option.classList.add('active');

        // Get color and apply
        const color = option.getAttribute('data-color');
        applyColorTheme(color);

        // Update custom color input
        customColorInput.value = color;
    });
});

// Custom color picker
customColorInput.addEventListener('input', (e) => {
    const color = e.target.value;

    // Remove active from preset colors
    colorOptions.forEach(opt => opt.classList.remove('active'));

    // Apply custom color
    applyColorTheme(color);
});

// Reset to default
colorReset.addEventListener('click', () => {
    // Reset to default orange
    applyColorTheme(DEFAULT_COLOR);

    // Update UI
    customColorInput.value = DEFAULT_COLOR;

    // Mark default color as active
    colorOptions.forEach(opt => {
        opt.classList.remove('active');
        if (opt.getAttribute('data-color') === DEFAULT_COLOR) {
            opt.classList.add('active');
        }
    });

    // Show feedback
    const originalText = colorReset.textContent;
    colorReset.textContent = '✓ Resetado!';
    setTimeout(() => {
        colorReset.textContent = originalText;
    }, 1500);
});

// Load saved color on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('themeColor');

    if (savedColor && savedColor !== DEFAULT_COLOR) {
        applyColorTheme(savedColor);
        customColorInput.value = savedColor;

        // Mark corresponding color as active
        let foundPreset = false;
        colorOptions.forEach(opt => {
            if (opt.getAttribute('data-color') === savedColor) {
                opt.classList.add('active');
                foundPreset = true;
            } else {
                opt.classList.remove('active');
            }
        });

        // If not a preset color, keep custom
        if (!foundPreset) {
            colorOptions.forEach(opt => opt.classList.remove('active'));
        }
    }
});
// ==================== TYPEWRITER EFFECT ====================
function initTypewriter() {
    const textElement = document.querySelector('.typewriter-text');
    if (!textElement) return;

    const roles = [
        "Developer Full Stack",
        "Especialista em React",
        "Next.js Expert",
        "Creative Coder"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            charIndex--;
            typeSpeed = 50;
        } else {
            charIndex++;
            typeSpeed = 100;
        }

        textElement.textContent = currentRole.substring(0, charIndex);

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}
