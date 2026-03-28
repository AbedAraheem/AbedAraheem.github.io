// Sticky Navbar
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu on click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });
});

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
// To check the scroll position on page load
reveal();

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        if (backToTopBtn) backToTopBtn.style.display = 'flex';
    } else {
        if (backToTopBtn) backToTopBtn.style.display = 'none';
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navLinksList.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// Form Submission with AJAX
const contactForm = document.getElementById('contact-form');
const submitBtn = document.querySelector('#contact-form button[type="submit"]');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // منع انتقال الصفحة لصفحة formsubmit

        // تعطيل الزر وإظهار حالة التحميل
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'جاري الإرسال... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        // إخفاء أي رسالة سابقة
        if (formMessage) formMessage.style.display = 'none';

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // الطلب بتقنية AJAX
        fetch('https://formsubmit.co/ajax/0595732675geehe@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === "true" || data.success === true) {
                    // في حالة النجاح
                    if (formMessage) {
                        formMessage.textContent = 'تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.';
                        formMessage.style.display = 'block';
                        formMessage.style.backgroundColor = '#d4edda';
                        formMessage.style.color = '#155724';
                        formMessage.style.border = '1px solid #c3e6cb';
                    }
                    contactForm.reset(); // تفريغ الحقول
                } else {
                    // في حالة وجود خطأ
                    if (formMessage) {
                        if (data.message && data.message.includes("web server")) {
                            formMessage.textContent = 'تنبيه: لا يمكن إرسال الرسائل عند فتح الملف محلياً. يرجى تشغيل الموقع باستخدام خادم محلي (Local Server) أو رفعه على الإنترنت.';
                        } else {
                            formMessage.textContent = 'عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.';
                        }
                        formMessage.style.display = 'block';
                        formMessage.style.backgroundColor = '#f8d7da';
                        formMessage.style.color = '#721c24';
                        formMessage.style.border = '1px solid #f5c6cb';
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                if (formMessage) {
                    formMessage.textContent = 'حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت.';
                    formMessage.style.display = 'block';
                    formMessage.style.backgroundColor = '#f8d7da';
                    formMessage.style.color = '#721c24';
                    formMessage.style.border = '1px solid #f5c6cb';
                }
            })
            .finally(() => {
                // إرجاع الزر لحالته الطبيعية
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// App Switcher Logic
const appSwitcherBtn = document.getElementById('app-switcher-btn');
const appsDropdown = document.getElementById('apps-dropdown');
if (appSwitcherBtn && appsDropdown) {
    appSwitcherBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (appsDropdown.style.display === 'none') {
             appsDropdown.style.display = 'grid';
        } else {
             appsDropdown.style.display = 'none';
        }
    });
    document.addEventListener('click', (e) => {
        if (!appSwitcherBtn.contains(e.target) && !appsDropdown.contains(e.target)) {
            appsDropdown.style.display = 'none';
        }
    });
}
