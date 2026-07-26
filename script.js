// =============================================
// AUTO PRIME - OFICINA MECÂNICA
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- HEADER SCROLL ----
    const header = document.getElementById('header');

    const handleScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ---- MOBILE MENU ----
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = nav.querySelectorAll('a');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ---- FAQ ACCORDION ----
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-item__question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ---- ANIMATED COUNTERS ----
    const counters = document.querySelectorAll('[data-count]');

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();

        const update = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            el.textContent = target >= 100
                ? current.toLocaleString()
                : current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target >= 100
                    ? target.toLocaleString()
                    : target;
            }
        };

        requestAnimationFrame(update);
    };

    // ---- SCROLL ANIMATIONS ----
    const animElements = document.querySelectorAll('.servico-card, .diferencial-card, .avaliacao-card, .marca-item, .ad-card, .galeria-item, .pagamento-item, .sobre__image, .sobre__content');

    animElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animElements.forEach(el => observer.observe(el));

    // ---- COUNTER OBSERVER ----
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counters.forEach(animateCounter);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero__stats');
    if (heroStats) {
        counterObserver.observe(heroStats);
    }

    // ---- GALLERY LIGHTBOX ----
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    galeriaItems.forEach(item => {
        item.addEventListener('click', () => {
            const style = item.getAttribute('style') || '';
            const match = style.match(/url\(['"]?(.*?)['"]?\)/);
            const imgUrl = match ? match[1] : '';
            const caption = item.querySelector('span')?.textContent || '';

            if (imgUrl) {
                lightboxImg.src = imgUrl;
                lightboxCaption.textContent = caption;
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ---- SERVICE CARDS CLICK ----
    document.querySelectorAll('.servico-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.servico-card__link') || e.target.closest('a')) return;
            const link = card.querySelector('.servico-card__link');
            if (link) link.click();
        });
    });

    // ---- CONTACT FORM ----
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const servico = document.getElementById('servico').value;
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !telefone || !servico) {
            alert('Por favor, preencha os campos obrigatórios: nome, telefone e serviço.');
            return;
        }

        const texto = `Olá, gostaria de solicitar um orçamento!
        
Nome: ${nome}
Telefone: ${telefone}
Serviço: ${servico}
${mensagem ? 'Mensagem: ' + mensagem : ''}`;

        const url = `https://wa.me/5511999999999?text=${encodeURIComponent(texto)}`;
        window.open(url, '_blank');
    });

});
