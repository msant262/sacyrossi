// Material Design 3 - Sacy Rossi Website JavaScript

class SacyWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.setupNavigation();
        this.setupFAB();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupTimelineAnimated(); // NOVO: timeline animada
    }

    setupEventListeners() {
        // Smooth scrolling para links de navegação
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });

        // FAB menu interactions
        const fabContainer = document.querySelector('.fab-container');
        if (fabContainer) {
            fabContainer.addEventListener('mouseenter', () => {
                this.showFABOptions();
            });

            fabContainer.addEventListener('mouseleave', () => {
                this.hideFABOptions();
            });
        }

        // FAB option clicks
        document.querySelectorAll('.fab-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = option.getAttribute('data-tooltip')?.toLowerCase();
                this.handlePlatformClick(platform);
            });
        });

        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Intersection Observer para animações
        this.setupIntersectionObserver();

        // Parallax effect para shapes
        this.setupParallaxEffect();

        // Keyboard navigation
        this.setupKeyboardNavigation();
    }

    setupAnimations() {
        // Animações de entrada para elementos
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up', 'animate-in');
                    // Remover o observer, mas NÃO remover classe nem alterar visibilidade
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Elementos para animar
        const animateElements = document.querySelectorAll(`
            .hero-text, .hero-card, .text-card, .timeline-content, 
            .platform-card, .social-card, .visual-card, .highlight-card
        `);

        animateElements.forEach(el => {
            // Garantir que os elementos estejam visíveis por padrão
            el.style.opacity = '1';
            el.style.transform = 'none';
            observer.observe(el);
        });
    }

    setupNavigation() {
        // Navegação ativa baseada na seção visível
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveNavLink(id);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    updateActiveNavLink(activeId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    setupFAB() {
        // FAB hover effects
        const fabMain = document.querySelector('.fab-main');
        if (fabMain) {
            fabMain.addEventListener('mouseenter', () => {
                fabMain.style.transform = 'scale(1.1) rotate(180deg)';
            });

            fabMain.addEventListener('mouseleave', () => {
                fabMain.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    }

    showFABOptions() {
        const fabOptions = document.querySelector('.fab-options');
        if (fabOptions) {
            fabOptions.style.opacity = '1';
            fabOptions.style.pointerEvents = 'all';
            fabOptions.style.transform = 'translateY(-10px)';
        }
    }

    hideFABOptions() {
        const fabOptions = document.querySelector('.fab-options');
        if (fabOptions) {
            fabOptions.style.opacity = '0';
            fabOptions.style.pointerEvents = 'none';
            fabOptions.style.transform = 'translateY(0)';
        }
    }

    handlePlatformClick(platform) {
        const urls = {
            'twitch': 'https://www.twitch.tv/sacy',
            'youtube': 'https://www.youtube.com/@Sacyadc',
            'instagram': 'https://www.instagram.com/sacyrossi/',
            'kick': 'https://kick.com/sacy'
        };

        if (urls[platform]) {
            window.open(urls[platform], '_blank');
        }
    }

    setupMobileMenu() {
        const mobileMenu = document.querySelector('.nav');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');

        if (!mobileMenu || !mobileToggle) return;

        // Adicionar/remover classe para controle do menu mobile baseado no tamanho da tela
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                mobileMenu.classList.add('nav-mobile');
            } else {
                mobileMenu.classList.remove('nav-mobile', 'nav-open');
                this.closeMobileMenu();
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Executa na inicialização
    }

    toggleMobileMenu() {
        const mobileMenu = document.querySelector('.nav');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');

        if (!mobileMenu || !mobileToggle) return;

        const isOpen = mobileMenu.classList.contains('nav-open');

        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const mobileMenu = document.querySelector('.nav');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');

        mobileMenu.classList.add('nav-open');
        mobileToggle.classList.add('nav-toggle-open');

        // Animar hamburger para X
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';

        // Prevenir scroll do body
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const mobileMenu = document.querySelector('.nav');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');

        mobileMenu.classList.remove('nav-open');
        mobileToggle.classList.remove('nav-toggle-open');

        // Resetar hamburger
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';

        // Restaurar scroll do body
        document.body.style.overflow = '';
    }

    setupScrollEffects() {
        // Header scroll effect
        const header = document.querySelector('.header');
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            // Remover o efeito de esconder a navbar ao rolar
            // header.style.transform = 'translateY(-100%)';
            header.style.transform = 'translateY(0)';
        });
    }

    setupIntersectionObserver() {
        // Observer para elementos que precisam de animação
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observar elementos
        const elements = document.querySelectorAll('.timeline-content, .platform-card, .social-card');
        elements.forEach(el => observer.observe(el));
    }

    setupParallaxEffect() {
        // Efeito parallax para shapes no hero
        const shapes = document.querySelectorAll('.shape');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    }

    setupKeyboardNavigation() {
        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            // ESC para fechar menu mobile
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }

            // Setas para navegar entre seções
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateSections(e.key === 'ArrowDown' ? 1 : -1);
            }
        });
    }

    navigateSections(direction) {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentSection = this.getCurrentSection(sections);
        
        if (currentSection) {
            const currentIndex = sections.indexOf(currentSection);
            const nextIndex = currentIndex + direction;
            
            if (nextIndex >= 0 && nextIndex < sections.length) {
                this.smoothScrollTo(sections[nextIndex]);
            }
        }
    }

    getCurrentSection(sections) {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        for (let section of sections) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                return section;
            }
        }
        
        return sections[0];
    }

    smoothScrollTo(target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    setupTimelineAnimated() {
        // Expansão/colapso dos cards
        const cards = document.querySelectorAll('.timeline-card');
        cards.forEach(card => {
            const header = card.querySelector('.timeline-card-header');
            const toggle = card.querySelector('.timeline-toggle');
            // Expande/colapsa ao clicar no header ou botão
            [header, toggle].forEach(el => {
                if (el) {
                    el.addEventListener('click', (e) => {
                        e.stopPropagation();
                        // Fecha outros cards
                        cards.forEach(c => { if (c !== card) c.classList.remove('expanded'); });
                        // Alterna o card clicado
                        card.classList.toggle('expanded');
                    });
                }
            });
        });

        // Animação de entrada dos cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('.timeline-card').forEach(card => observer.observe(card));
    }

    // Utilitários
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// CSS adicional para funcionalidades JavaScript
const additionalCSS = `
    /* Mobile menu styles */
    .nav-mobile {
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(20px);
        padding: 2rem;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-in-out;
        flex-direction: column;
        gap: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .nav-mobile.nav-open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    }

    .nav-mobile .nav-link {
        padding: 1rem;
        border-radius: 0.5rem;
        text-align: center;
        font-size: 1.1rem;
    }

    /* Header scroll effects */
    .header {
        transition: all 0.3s ease-in-out;
    }

    .header-scrolled {
        background: rgba(0, 0, 0, 0.95) !important;
        backdrop-filter: blur(20px);
    }

    /* Animation classes */
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }

    .fade-in-up.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    /* FAB animations */
    .fab-main {
        transition: all 0.3s ease-in-out;
    }

    .fab-options {
        transition: all 0.3s ease-in-out;
    }

    /* Mobile toggle animations */
    .mobile-menu-toggle span {
        transition: all 0.3s ease-in-out;
    }

    .nav-toggle-open span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .nav-toggle-open span:nth-child(2) {
        opacity: 0;
    }

    .nav-toggle-open span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .nav-mobile {
            top: 80px;
        }
    }
`;

// Injetar CSS adicional
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new SacyWebsite();
});

// Adicionar classe de carregamento
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Preloader (opcional)
window.addEventListener('beforeunload', () => {
    document.body.classList.add('unloading');
});

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 