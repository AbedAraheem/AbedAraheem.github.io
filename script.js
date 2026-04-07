// -- State Management & Selectors --
const header = document.querySelector('header');
const menuBtn = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById('back-to-top');
const sections = document.querySelectorAll('section');
const navLinksList = document.querySelectorAll('.nav-links a');
const appSwitcherBtn = document.getElementById('app-switcher-btn');
const appsDropdown = document.getElementById('apps-dropdown');
const contactForm = document.getElementById('contact-form');
const submitBtn = contactForm?.querySelector('button[type="submit"]');
const formMessage = document.getElementById('form-message');

// -- Utilities --
const throttle = (callback, delay) => {
    let lastCall = 0;
    return (...args) => {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return callback(...args);
    };
};

// -- Scroll Operations --
const handleScroll = () => {
    const scrollY = window.scrollY;

    // 1. Sticky Navbar
    header.classList.toggle('scrolled', scrollY > 50);

    // 2. Reveal Animations
    document.querySelectorAll('.reveal').forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            el.classList.add('active');
        }
    });

    // 3. Back to Top Button
    if (backToTopBtn) {
        backToTopBtn.style.display = scrollY > 500 ? 'flex' : 'none';
    }

    // 4. Active Link Highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navLinksList.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) {
            a.classList.add('active');
        }
    });
};

window.addEventListener('scroll', throttle(handleScroll, 100));
window.addEventListener('load', handleScroll);

// -- Navigation Logic --
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu on click
navLinksList.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// -- App Switcher Logic --
if (appSwitcherBtn && appsDropdown) {
    appSwitcherBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        appsDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!appSwitcherBtn.contains(e.target) && !appsDropdown.contains(e.target)) {
            appsDropdown.classList.remove('active');
        }
    });
}

// -- Form Submission --
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Loading State
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'جاري الإرسال... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        if (formMessage) {
            formMessage.style.display = 'none';
            formMessage.className = ''; // Clear previous classes
        }

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('https://formsubmit.co/ajax/0595732675geehe@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success === "true" || result.success === true) {
                formMessage.textContent = 'تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.';
                formMessage.classList.add('success');
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Error occurred');
            }
        } catch (error) {
            formMessage.classList.add('error');
            if (error.message.includes("web server") || location.protocol === 'file:') {
                formMessage.textContent = 'تنبيه: لا يمكن إرسال الرسائل عند فتح الملف محلياً. يرجى تشغيل الموقع باستخدام خادم محلي.';
            } else {
                formMessage.textContent = 'عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.';
            }
        } finally {
            formMessage.style.display = 'block';
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

