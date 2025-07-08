document.addEventListener('DOMContentLoaded', function() {
    // Configurações do observador
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Observador para animações de entrada
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos para animar
    const animateElements = document.querySelectorAll('.section-header, .about-content, .timeline-item, .achievement-card, .streaming-content, .social-card, .stat');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Contador animado para estatísticas
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (target >= 1000 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (target >= 1000 ? '+' : '');
            }
        }
        
        updateCounter();
    }
    
    // Observador para estatísticas
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target.querySelector('h3');
                const text = statElement.textContent;
                const target = parseInt(text.replace(/\D/g, ''));
                
                if (!isNaN(target)) {
                    animateCounter(statElement, target);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observar elementos de estatísticas
    const statElements = document.querySelectorAll('.stat');
    statElements.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Efeito parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroShapes = document.querySelector('.hero-shapes');
        
        if (hero && heroShapes) {
            const rate = scrolled * -0.3;
            heroShapes.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Hover effects para cards
    const cards = document.querySelectorAll('.achievement-card, .social-card, .timeline-content, .stat');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
    });
    
    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remover preloader se existir
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    });
    
    // Typing effect para o título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplicar typing effect ao título se estiver visível
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const titleObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const originalText = 'SACY ROSSI';
                    typeWriter(heroTitle, originalText, 150);
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        titleObserver.observe(heroTitle);
    }
    
    // Efeito de partículas flutuantes
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(229, 9, 20, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle 8s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.appendChild(particle);
            
            // Remover partícula após animação
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 8000);
        }
    }
    
    // Criar partículas periodicamente
    setInterval(createParticle, 3000);
    
    // Adicionar CSS para animação de partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(100vh) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) scale(1);
                opacity: 0;
            }
        }
        
        .floating-particle {
            z-index: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Navegação suave para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu mobile toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Efeito de destaque para seção ativa no menu
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // Adicionar estilo para link ativo
    const activeLinkStyle = document.createElement('style');
    activeLinkStyle.textContent = `
        .nav a.active {
            color: var(--primary-red) !important;
        }
        
        .nav a.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(activeLinkStyle);
    
    // Efeito de hover para botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animação de scroll para timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
    
    // Efeito de destaque para achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.achievement-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.achievement-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Animação de entrada para social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Efeito de pulse para o banner campeão
    const championBanner = document.querySelector('.champion-banner');
    if (championBanner) {
        setInterval(() => {
            championBanner.style.transform = 'scale(1.02)';
            setTimeout(() => {
                championBanner.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
    
    // Console log personalizado
    console.log('%c🎮 Sacy Rossi - Site Oficial', 'color: #e50914; font-size: 20px; font-weight: bold;');
    console.log('%cEx Pro Player & Streamer Oficial MIBR', 'color: #fff; font-size: 14px;');
    console.log('%cCampeão do Masters 2022 de Valorant', 'color: #e50914; font-size: 12px;');
    
    // Preloader (se necessário)
    function createPreloader() {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="preloader-logo">SACY ROSSI</div>
                <div class="preloader-spinner"></div>
            </div>
        `;
        
        const preloaderStyle = document.createElement('style');
        preloaderStyle.textContent = `
            .preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--accent-black);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .preloader-content {
                text-align: center;
            }
            
            .preloader-logo {
                font-family: 'Orbitron', sans-serif;
                font-size: 2rem;
                font-weight: 900;
                color: var(--primary-red);
                margin-bottom: 2rem;
                letter-spacing: 2px;
            }
            
            .preloader-spinner {
                width: 50px;
                height: 50px;
                border: 3px solid var(--accent-gray);
                border-top: 3px solid var(--primary-red);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(preloaderStyle);
        document.body.appendChild(preloader);
        
        // Remover preloader após carregamento
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1000);
        });
    }
    
    // Criar preloader apenas se a página ainda não carregou
    if (document.readyState !== 'complete') {
        createPreloader();
    }
    
    // Smooth scroll para o topo
    function createScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-red);
            color: var(--text-white);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 1.2rem;
        `;
        
        document.body.appendChild(scrollButton);
        
        // Mostrar/ocultar botão baseado no scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        });
        
        // Scroll para o topo
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    createScrollToTop();
}); 