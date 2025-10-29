/**
 * Gestionnaire d'animations avancées pour le portfolio
 * @author Vincent Berthet
 */

class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupPortfolioAnimations();
        this.setupHoverEffects();
        this.setupTypingAnimation();
        this.setupPreloaderAnimation();
    }

    /**
     * Configuration des animations de scroll
     */
    setupScrollAnimations() {
        // Intersection Observer pour les animations de révélation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Ajouter un délai progressif pour les éléments multiples
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            });
        }, observerOptions);

        // Observer les éléments à animer
        document.querySelectorAll('.portfolio-item, .bio-section, .contact-section').forEach(el => {
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        });
    }

    /**
     * Configuration des animations du portfolio
     */
    setupPortfolioAnimations() {
        // Animation d'apparition des projets
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('animate-in');
        });

        // Animation de filtrage améliorée
        const filters = document.querySelectorAll('.filter');
        filters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();

                // Animation de transition
                const container = document.querySelector('#portfolioContent');
                container.style.opacity = '0.5';
                container.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    container.style.opacity = '1';
                    container.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }

    /**
     * Configuration des effets de hover
     */
    setupHoverEffects() {
        // Effet de parallaxe sur les cartes de projet
        const projectCards = document.querySelectorAll('.portfolio-item');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
            });

            card.addEventListener('mouseleave', (e) => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });

            // Effet de parallaxe au mouvement de la souris
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });

        // Effet de ripple sur les boutons
        const buttons = document.querySelectorAll('.button, .btn');
        buttons.forEach(button => {
            button.classList.add('btn-ripple');
            button.addEventListener('click', this.createRippleEffect);
        });
    }

    /**
     * Créer un effet de ripple
     */
    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * Configuration de l'animation de typing améliorée
     */
    setupTypingAnimation() {
        // Améliorer l'animation du curseur
        const typingElement = document.querySelector('.typing');
        if (typingElement) {
            // Ajouter une classe pour l'animation personnalisée
            typingElement.classList.add('typing-enhanced');
        }
    }

    /**
     * Configuration de l'animation du preloader
     */
    setupPreloaderAnimation() {
        window.addEventListener('load', () => {
            const preloader = document.querySelector('#preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.transform = 'scale(1.1)';

                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
        });
    }

    /**
     * Animation de révélation de texte
     */
    revealText(element, delay = 0) {
        setTimeout(() => {
            element.classList.add('text-reveal');
        }, delay);
    }

    /**
     * Animation de chargement des projets
     */
    animatePortfolioLoad() {
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    /**
     * Animation de transition entre sections
     */
    smoothSectionTransition(targetSection) {
        const currentSection = document.querySelector('.active-section');
        if (currentSection) {
            currentSection.classList.remove('active-section');
            currentSection.style.opacity = '0';
            currentSection.style.transform = 'translateY(20px)';
        }

        setTimeout(() => {
            targetSection.classList.add('active-section');
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Initialisation des animations
document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
});

// Animation de la navigation sticky
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-top-area');
    const scrolled = window.pageYOffset;

    if (scrolled > 100) {
        header.classList.add('navigation-background');
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.classList.remove('navigation-background');
        header.style.backdropFilter = 'none';
    }
});

// Animation de retour en haut de page
const scrollToTop = document.querySelector('.scroll-to-top');
if (scrollToTop) {
    scrollToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animation de révélation progressive des éléments
const revealElements = document.querySelectorAll('.reveal-on-scroll');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));
