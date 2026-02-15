// script.js - Site Portfólio Jorge Berto

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== EFEITO DE DIGITAÇÃO (TYPED TEXT) =====
    const typedTextElement = document.querySelector('.typed-text');
    const cursorElement = document.querySelector('.cursor');
    
    if (typedTextElement) {
        const phrases = [
            'Criando experiências digitais',
            'Aprendiz contínuo',
            'Futuro profissional'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnded = false;
        
        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                isEnded = true;
                setTimeout(typeEffect, 2000); // Pausa antes de apagar
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                isEnded = true;
                setTimeout(typeEffect, 500);
                return;
            }
            
            const typingSpeed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, isEnded ? typingSpeed : typingSpeed);
            isEnded = false;
        }
        
        typeEffect();
    }
    
    // ===== MENU MOBILE (HAMBURGUER) =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Troca ícone
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navMenu.classList.remove('active');
            if (hamburger) {
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Scroll suave manual (complementar)
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== ANIMAÇÕES DE ENTRADA COM INTERSECTION OBSERVER =====
    const animatedElements = document.querySelectorAll('.fade-in-up:not(.animated)');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
    
    // ===== DESTAQUE DO MENU ATIVO DURANTE SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    
    function highlightMenu() {
        const scrollPosition = window.scrollY + 100; // Offset para melhor ativação
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightMenu);
    
    // ===== EFEITO DE SCROLL SUAVE PARA LINKS DO HEADER =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== HOVER EFEITOS NOS CARDS (CSS já cobre, mas podemos adicionar interatividade extra) =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Efeito extra via JS se desejar
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset
            this.style.transform = '';
        });
    });
    
    // ===== FORMULÁRIO DE CONTATO (placeholder - apenas simulação) =====
    const contactButtons = document.querySelectorAll('.btn-footer, .btn-secondary[href="#contato"]');
    
    contactButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.classList.contains('btn-footer')) {
                e.preventDefault();
                alert('Funcionalidade de envio de mensagem será implementada em breve! Por enquanto, utilize os links de contato direto.');
            }
        });
    });
    
    // ===== ADICIONA CLASSE SCROLLED AO HEADER =====
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 25, 41, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 25, 41, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // ===== ANIMAÇÃO DE PROGRESSO DAS HABILIDADES =====
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const progress = this.querySelector('.skill-progress');
            if (progress) {
                progress.style.background = 'linear-gradient(135deg, #00E5FF, #00B8D4)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const progress = this.querySelector('.skill-progress');
            if (progress) {
                progress.style.background = 'linear-gradient(135deg, #00E5FF, #00B8D4)';
            }
        });
    });
    
    // ===== PREVENIR COMPORTAMENTO PADRÃO DOS LINKS PLACEHOLDER =====
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Link placeholder clicado - substituir pelo URL real');
        });
    });
    
    // ===== INICIALIZAR ANIMAÇÕES COM DELAY =====
    function setAnimationDelay() {
        const elements = document.querySelectorAll('[data-delay]');
        elements.forEach(el => {
            const delay = el.getAttribute('data-delay');
            el.style.animationDelay = `${delay}ms`;
        });
    }
    
    setAnimationDelay();
    
    console.log('Site Portfólio Jorge Berto carregado com sucesso!');
});