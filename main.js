/* ========================================
   KALE BODUR DEKORASYON - Ana JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // PRELOADER
    // ========================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.style.display = 'none';
                // AOS başlat
                initAOS();
                // Counter animasyonu başlat
                initCounters();
            }, 500);
        }, 1000);
    });

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Header scroll efekti
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top butonu
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // AOS kontrol
        checkAOS();
    });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========================================
    // MOBILE NAVIGATION
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Overlay oluştur
    const navOverlay = document.createElement('div');
    navOverlay.classList.add('nav-overlay');
    document.body.appendChild(navOverlay);

    function toggleNav() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    hamburger.addEventListener('click', toggleNav);
    navOverlay.addEventListener('click', toggleNav);

    // Nav linklere tıklayınca menüyü kapat
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleNav();
            }
        });
    });

    // ========================================
    // ACTIVE NAV LINK ON SCROLL
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ========================================
    // HERO SLIDER
    // ========================================
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000);

    // ========================================
    // HERO PARTICLES
    // ========================================
    const particlesContainer = document.getElementById('particles');

    function createParticles() {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // ========================================
    // COUNTER ANIMATION
    // ========================================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        let countersStarted = false;

        function startCounters() {
            if (countersStarted) return;

            const heroStats = document.querySelector('.hero-stats');
            if (!heroStats) return;

            const rect = heroStats.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                countersStarted = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current) + (target > 99 ? '+' : target === 100 ? '%' : '+');
                    }, 16);
                });
            }
        }

        window.addEventListener('scroll', startCounters);
        startCounters(); // İlk yüklemede kontrol
    }

    // ========================================
    // AOS (Animate On Scroll) - Kendi implementasyonumuz
    // ========================================
    function initAOS() {
        const aosElements = document.querySelectorAll('[data-aos]');
        aosElements.forEach(el => {
            const delay = el.getAttribute('data-aos-delay') || 0;
            el.style.transitionDelay = delay + 'ms';
        });
        checkAOS();
    }

    function checkAOS() {
        const aosElements = document.querySelectorAll('[data-aos]');
        aosElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.85) {
                el.classList.add('aos-animate');
            }
        });
    }

    // ========================================
    // GALLERY FILTER
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktif buton güncelle
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ========================================
    // LIGHTBOX
    // ========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let lightboxIndex = 0;
    let visibleItems = [];

    function openLightbox(index) {
        visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
        lightboxIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    function updateLightboxContent() {
        if (visibleItems[lightboxIndex]) {
            const placeholder = visibleItems[lightboxIndex].querySelector('.gallery-placeholder');
            const clone = placeholder.cloneNode(true);
            lightboxContent.innerHTML = '';
            lightboxContent.appendChild(clone);
        }
    }

    function prevLightbox() {
        lightboxIndex = (lightboxIndex - 1 + visibleItems.length) % visibleItems.length;
        updateLightboxContent();
    }

    function nextLightbox() {
        lightboxIndex = (lightboxIndex + 1) % visibleItems.length;
        updateLightboxContent();
    }

    // Galeri itemlere tıklama
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const visItems = Array.from(galleryItems).filter(i => !i.classList.contains('hidden'));
            const visIndex = visItems.indexOf(item);
            openLightbox(visIndex);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevLightbox);
    lightboxNext.addEventListener('click', nextLightbox);

    // ESC tuşu ile kapat
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
    });

    // Lightbox dışına tıklayınca kapat
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // ========================================
    // TESTIMONIALS SLIDER
    // ========================================
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testPrev = document.getElementById('testPrev');
    const testNext = document.getElementById('testNext');
    const testDotsContainer = document.getElementById('testDots');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    let testimonialInterval;

    // Dots oluştur
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('test-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        testDotsContainer.appendChild(dot);
    });

    const testDots = document.querySelectorAll('.test-dot');

    function goToTestimonial(index) {
        currentTestimonial = index;
        testimonialsTrack.style.transform = `translateX(-${index * 100}%)`;
        testDots.forEach(d => d.classList.remove('active'));
        testDots[index].classList.add('active');
        resetTestimonialInterval();
    }

    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonialCards.length;
        goToTestimonial(next);
    }

    function prevTestimonial() {
        const prev = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        goToTestimonial(prev);
    }

    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(nextTestimonial, 6000);
    }

    testNext.addEventListener('click', nextTestimonial);
    testPrev.addEventListener('click', prevTestimonial);

    // Otomatik geçiş
    testimonialInterval = setInterval(nextTestimonial, 6000);

    // Touch/Swipe desteği
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialsTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialsTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextTestimonial();
            else prevTestimonial();
        }
    }

    // ========================================
    // CONTACT FORM
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', (e) => {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        // Validasyon
        if (!name || !phone || !service || !message) {
            e.preventDefault();
            showFormMessage('Lütfen zorunlu alanları doldurun.', 'error');
            return;
        }

        // Telefon format kontrolü
        const phoneRegex = /^[0-9+\s()-]{10,15}$/;
        if (!phoneRegex.test(phone)) {
            e.preventDefault();
            showFormMessage('Lütfen geçerli bir telefon numarası girin.', 'error');
            return;
        }

        // Email format kontrolü (opsiyonel)
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                showFormMessage('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }
        }

        // Validasyon geçtiyse, _next değerini mevcut sayfa URL'si olarak ayarla
        const nextInput = contactForm.querySelector('input[name="_next"]');
        if (nextInput) {
            nextInput.value = window.location.href;
        }

        // Buton animasyonu göster
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Gönderiliyor...</span>';
        submitBtn.disabled = true;

        // Form FormSubmit.co'ya gönderilecek (varsayılan davranış engellenmiyor)
    });

    function showFormMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
    }

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // FADE IN ANIMATION KEYFRAME INJECTION
    // ========================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // TILT EFFECT (Service Cards)
    // ========================================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========================================
    // TYPED EFFECT FOR HERO (Optional)
    // ========================================
    // Sayfa yükleme tamamlandığında ilk AOS kontrolü
    setTimeout(() => {
        checkAOS();
    }, 100);

    // ========================================
    // PARALLAX ON SCROLL (Subtle)
    // ========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });

    // ========================================
    // YEAR AUTO UPDATE
    // ========================================
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // Footer yılını güncelle
    const footerCopyright = document.querySelector('.footer-bottom p');
    if (footerCopyright) {
        footerCopyright.innerHTML = `&copy; ${currentYear} Karataş Dekorasyon ve Tadilat. Tüm hakları saklıdır.`;
    }

});
