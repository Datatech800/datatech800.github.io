// Hero usa efecto jitter estático; sin typewriter.

// --- About ---
const aboutLine1 = document.querySelector('.about-line-1');
const aboutLine2 = document.querySelector('.about-line-2');
if (aboutLine1) aboutLine1.textContent = 'Web development student || Web ecosystem (Frontend & Backend)';
if (aboutLine2) aboutLine2.textContent = 'Passionate about technology and software development. I dedicate my training to building web applications, integrating user interfaces with server-side logic and relational databases. Currently expanding my skills across different programming languages and software tools.';

// --- Services ---
const svcTexts = document.querySelectorAll('#services-card .svc-text');
const servicesLines = [
    'FRONTEND',
    '-Responsive web layout design (HTML, CSS, JS, mobile-first approach)',
    '-Landing pages and web platforms with interactive user interfaces (JS, form handling, validation)',
    'BACKEND',
    '-Server-side logic with PHP (form processing, data handling)',
    '-Integration and connectivity with MySQL / relational databases',
    '-Authentication architecture (user login / registration)'
];
svcTexts.forEach((el, i) => {
    if (servicesLines[i] !== undefined) {
        el.textContent = servicesLines[i];
    }
});

// --- Contact ---
const contactTextEl = document.querySelector('.contact-text');
const contactText = 'datatech.contacto@gmail.com';
if (contactTextEl) contactTextEl.textContent = contactText;

// --- Copiar dirección de correo al portapapeles ---
const copyBtn = document.querySelector('.copy-btn');

async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
        try {
            await copyToClipboard(contactText);
            copyBtn.textContent = 'COPIED!';
        } catch (err) {
            copyBtn.textContent = 'ERROR';
        }
        setTimeout(() => {
            copyBtn.textContent = 'COPY';
        }, 2000);
    });
}

// --- Scroll-spy de la barra lateral ---
const verticalLinks = document.querySelectorAll('.vertical-nav a');
const sectionIds = ['home', 'about', 'services'];

verticalLinks.forEach(link => link.classList.remove('active'));
const firstLink = document.querySelector('.vertical-nav a[href="#home"]');
if (firstLink) firstLink.classList.add('active');

const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            verticalLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector('.vertical-nav a[href="#' + entry.target.id + '"]');
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) spyObserver.observe(el);
});

// --- Títulos (tech-title) ---
const techTitles = document.querySelectorAll('.tech-title');
techTitles.forEach(h => {
    const textEl = h.querySelector('.tt-text');
    if (textEl && h.dataset.text) {
        textEl.textContent = h.dataset.text;
    }
});

// --- Menú hamburguesa del navbar ---
const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');

function setMenu(open) {
    navbar.classList.toggle('open', open);
    if (navToggle) navToggle.setAttribute('aria-expanded', String(open));
}

if (navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setMenu(!navbar.classList.contains('open'));
    });
}

navbar.querySelectorAll('.nav-links a').forEach(link => {
    if (!link.classList.contains('nav-link')) link.classList.add('nav-link');

    if (!link.dataset.navBound) {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                if (typeof setMenu === 'function') {
                    setMenu(false);
                }
                if (target) {
                    setTimeout(() => {
                        const navbarHeight = document.querySelector('.navbar')?.getBoundingClientRect().height || 70;
                        const offset = navbarHeight + 16;
                        const top = target.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top, behavior: 'smooth' });
                    }, 350);
                }
            } else {
                if (typeof setMenu === 'function') {
                    setMenu(false);
                }
            }
        }, { passive: false });
        link.dataset.navBound = '1';
    }
});

// --- Invertir colores del botón al hacer scroll ---
window.addEventListener('scroll', () => {
    navToggle.classList.toggle('scrolled', window.scrollY > 10);
});
