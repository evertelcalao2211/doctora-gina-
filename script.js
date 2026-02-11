
// ===========================================
// JAVASCRIPT COMPLETO CON TODOS LOS EFECTOS - VERSIÓN FUNCIONAL
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Página Abogados Consultores MR - Efectos completos activados');
    
    // INICIALIZAR TODAS LAS FUNCIONALIDADES
    initNavbarScroll();
    initMenuHamburguesa();
    initSmoothScroll();
    initServiceCards();
    initStatsCounter();
    initContactForm();
    initScrollAnimations(); // ← NUEVO: efectos de aparición CORREGIDOS
    initCurrentYear();
    initVideoControls();
});

// ===========================================
// 1. NAVEGACIÓN CON SCROLL
// ===========================================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===========================================
// 2. MENÚ HAMBURGUESA COMPLETO
// ===========================================
function initMenuHamburguesa() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!menuToggle || !navMenu) return;
    
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// ===========================================
// 3. SCROLL SUAVE
// ===========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ===========================================
// 4. TARJETAS DE SERVICIOS CON HOVER
// ===========================================
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Para desktop: efecto hover
        if (window.innerWidth > 768) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        }
        
        // Para móvil: toggle con click
        card.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.stopPropagation();
                this.classList.toggle('active');
            }
        });
    });
    
    // Cerrar tarjetas activas al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.service-card')) {
            serviceCards.forEach(card => card.classList.remove('active'));
        }
    });
}

// ===========================================
// 5. CONTADORES ANIMADOS (ESTADÍSTICAS)
// ===========================================
function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const suffix = counter.textContent.includes('%') ? '%' : '';
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                
                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        counter.textContent = Math.floor(count) + suffix;
                        setTimeout(updateCounter, 16);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===========================================
// 6. FORMULARIO DE CONTACTO CON VALIDACIÓN
// ===========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación simple
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (!name || !phone || !email) {
            alert('Por favor complete todos los campos requeridos.');
            return;
        }
        
        // Simular envío
        alert('✅ Consulta enviada con éxito. Nos contactaremos en menos de 24 horas.');
        
        // Resetear formulario
        form.reset();
        
        // En producción, aquí iría fetch() o AJAX
        // fetch('tu-script.php', { method: 'POST', body: new FormData(form) })
    });
}

// ===========================================
// 7. EFECTOS DE APARICIÓN AL SCROLL (CORREGIDO)
// ===========================================
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .about-card, .case-card, .stat-item, .testimonial'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir clase para animación - USAR CLASE CORRECTA
                entry.target.classList.add('fade-in-visible'); // ← CLASE CORRECTA
                
                // También añadir clase para CSS si es necesario
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    elementsToAnimate.forEach(element => {
        // Configurar estado inicial VISIBLE, no invisible
        element.style.opacity = '1'; // ← HACER VISIBLE DESDE EL INICIO
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// ===========================================
// 8. AÑO ACTUAL EN FOOTER
// ===========================================
function initCurrentYear() {
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach(element => {
        element.textContent = currentYear;
    });
}

// ===========================================
// 9. CONTROLES DE VIDEO
// ===========================================
function initVideoControls() {
    const heroVideo = document.getElementById('heroVideo');
    if (!heroVideo) return;
    
    // Intentar autoplay
    heroVideo.play().catch(e => {
        console.log('Autoplay no permitido:', e);
    });
    
    // Pausar cuando no es visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroVideo.play();
            } else {
                heroVideo.pause();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(heroVideo);
}

// ===========================================
// 10. BOTÓN WHATSAPP FLOTANTE (OPCIONAL)
// ===========================================
function initWhatsAppFloat() {
    // Crear botón
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/573012594188?text=Hola,%20me%20interesa%20una%20consulta%20legal';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.title = 'Consultar por WhatsApp';
    
    // Estilos
    Object.assign(whatsappBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        backgroundColor: '#25D366',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
        zIndex: '1000',
        textDecoration: 'none'
    });
    
    document.body.appendChild(whatsappBtn);
    
    // Efecto hover
    whatsappBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    whatsappBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Descomentar si quieres el botón de WhatsApp:
// initWhatsAppFloat();

console.log('🎯 JavaScript completo cargado - Todos los efectos activados');





// ===========================================
// EFECTOS PARA SECCIÓN  DE BOTONES DE PAGO Y CONSULTA DE PROCESOS ACCIONES RÁPIDAS
// ===========================================
function initActionsSection() {
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        // Efecto de entrada
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Efecto hover dinámico
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.action-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
            
            // Efecto de brillo
            this.style.boxShadow = '0 30px 60px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.action-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        // Animación de aparición al scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    }, entry.target === card ? 0 : 200);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
}

// Llamar la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initActionsSection();
});