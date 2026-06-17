document.addEventListener('DOMContentLoaded', function() {

    // ===== Плавная прокрутка для навигации =====
    const navLinks = document.querySelectorAll('.nav__menu a, .footer__col a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== Кнопки WhatsApp и VK =====
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    if (whatsappBtn) {
        const phoneNumber = '79110370000';
        const message = 'Здравствуйте! Хочу записаться на ремонт одежды.';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        whatsappBtn.href = url;
        whatsappBtn.target = '_blank';
    }

    const vkBtn = document.querySelector('.btn-vk');
    if (vkBtn) {
        // Замените на реальную ссылку VK
        vkBtn.href = 'https://vk.com/igolochka_solidarnosti';
        vkBtn.target = '_blank';
    }

    // ===== Подсветка активного пункта меню при скролле =====
    const sections = document.querySelectorAll('section[id], header, footer');
    const navItems = document.querySelectorAll('.nav__menu li a');

    function highlightNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.style.borderBottomColor = 'transparent';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.borderBottomColor = '#e67e22';
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // ===== Анимация появления карточек услуг =====
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(card);
    });

    // ===== Копирование номера телефона =====
    const phoneLinks = document.querySelectorAll('.contact-phone, .footer__col a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const phone = this.textContent.replace(/[^0-9+]/g, '');
            if (navigator.clipboard && phone) {
                navigator.clipboard.writeText(phone).then(() => {
                    console.log('Номер скопирован: ' + phone);
                }).catch(err => console.warn('Не удалось скопировать', err));
            }
        });
    });

    console.log('Иголочка Солидарности — Сайт успешно загружен!');
});