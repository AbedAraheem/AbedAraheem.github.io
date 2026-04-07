/**
 * @fileoverview Professional i18n Engine & UI Controller
 * Version 2.1 - Fixed App Switcher & Smooth UI
 */

document.addEventListener('DOMContentLoaded', () => {
    // Core Elements
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const appSwitcherBtn = document.getElementById('app-switcher-btn');
    const appsDropdown = document.getElementById('apps-dropdown');
    const backToTopBtn = document.getElementById('back-to-top');
    const langSwitcher = document.getElementById('lang-switcher');
    const html = document.documentElement;
    const metaDesc = document.getElementById('meta-description');

    // High-Fidelity Translation Objects
    const translations = {
        ar: {
            site_title: "عبد الرحيم خالد الهباش | مهندس برمجيات",
            meta_desc: "الموقع الشخصي للمهندس عبد الرحيم خالد الهباش - مهندس برمجيات متخصص في تطوير حلول الويب الحديثة.",
            nav_logo: "عبد الرحيم",
            nav_home: "الرئيسية",
            nav_about: "نبذة عني",
            nav_skills: "المهارات",
            nav_projects: "المشاريع",
            nav_contact: "تواصل معي",
            hero_welcome: 'أهلاً، أنا <span class="gradient-text">عبد الرحيم خالد الهباش</span>',
            hero_job: "مهندس برمجيات",
            hero_tagline: "مهندس برمجيات شغوف بتطوير الحلول الرقمية الحديثة وبناء تطبيقات ويب عالية الأداء تجمع بين التصميم الجميل والكفاءة التقنية.",
            hero_btn_projects: "مشاهدة مشاريعي",
            hero_btn_cv: "تحميل CV",
            hero_btn_contact: "تواصل معي",
            about_title: "نبذة عني",
            about_p1: "أنا خريج تخصص نظم معلومات إدارية من جامعة الأقصى – دفعة 2026، ومهندس برمجيات شغوف بتطوير الحلول الرقمية وبناء تطبيقات الويب الحديثة. أمتلك خبرة تمتد لثلاث سنوات في مجال العمل الحر (Freelancing) في تصميم وتطوير مواقع الويب وتطبيقاتها.",
            about_p2: "أمتلك خبرة عملية في تحليل المشكلات التقنية ومعالجة الأخطاء البرمجية (Debugging)، إضافة إلى القدرة على فهم متطلبات المشاريع وتحويلها إلى حلول برمجية عملية وفعالة.",
            about_p3: "أؤمن بأن البرمجة ليست مجرد كتابة كود، بل هي فن تحويل الأفكار إلى حلول رقمية مبتكرة تسهم في تطوير الأعمال وتحسين تجربة المستخدم.",
            stat_years: "سنوات خبرة",
            stat_projects: "مشروع مكتمل",
            stat_satisfaction: "رضا العملاء",
            skills_title: "مهاراتي التقنية",
            projects_title: "مشاريعي الاحترافية",
            p1_title: "بوابة التعليم الذكية (SmartEdu)",
            p1_desc: "منصة تعليمية متكاملة لإدارة الطلاب والدرجات والمهام الدراسية بتصميم عصري (Glassmorphism).",
            p2_title: "منصة التاجر (Merchant Platform)",
            p2_desc: "لوحة تحكم تجارية متقدمة (B2B) تتيح للتجار مراقبة المبيعات والمخزون والتقارير بدقة عالية.",
            p3_title: "نظام تتبع المهام (DevTrack)",
            p3_desc: "نظام احترافي موجه للمطورين لإدارة المهام (Kanban) وتتبع الأخطاء البرمجية (Bug Tracking).",
            app_home: "الرئيسية",
            app_edu: "بوابة التعليم",
            app_b2b: "منصة التاجر B2B",
            app_devtrack: "نظام DevTrack",
            contact_title: "تواصل معي",
            contact_name: "الاسم",
            contact_email: "البريد الإلكتروني",
            contact_msg: "الرسالة",
            contact_submit: "إرسال الرسالة",
            placeholder_name: "أدخل اسمك الكامل",
            placeholder_msg: "اكتب رسالتك هنا...",
            footer_copy: "&copy; 2026 عبد الرحيم خالد الهباش. جميع الحقوق محفوظة."
        },
        en: {
            site_title: "Abdul-Rahim Al-Habbash | Software Engineer",
            meta_desc: "Personal portfolio of Abdul-Rexim Al-Habbash - Software Engineer specializing in modern web solutions.",
            nav_logo: "Abdul-Rahim",
            nav_home: "Home",
            nav_about: "About",
            nav_skills: "Skills",
            nav_projects: "Projects",
            nav_contact: "Contact",
            hero_welcome: 'Hi, I am <span class="gradient-text">Abdul-Rahim Al-Habbash</span>',
            hero_job: "Software Engineer",
            hero_tagline: "Passionate software engineer focused on developing modern digital solutions and building high-performance web applications that merge aesthetics with efficiency.",
            hero_btn_projects: "View My Work",
            hero_btn_cv: "Download CV",
            hero_btn_contact: "Get in Touch",
            about_title: "Background",
            about_p1: "Graduate of Management Information Systems from Al-Aqsa University – Class of 2026. I am a software engineer passionate about modern web ecosystem with 3+ years of experience in freelancing and design.",
            about_p2: "Skilled in technical problem-solving and debugging. I excel at translating complex business requirements into high-performance software and technical deliverables.",
            about_p3: "I believe programming is't just coding—it's the art of converting vision into innovative digital reality that drives business growth.",
            stat_years: "Years of Experience",
            stat_projects: "Projects Delivered",
            stat_satisfaction: "Positive Feedback",
            skills_title: "Technical Expertise",
            projects_title: "Featured Projects",
            p1_title: "Smart Education Portal",
            p1_desc: "A comprehensive education management platform for tracking students and grades using Glassmorphism UI.",
            p2_title: "B2B Merchant System",
            p2_desc: "Advanced commercial dashboard for B2B operations with real-time analytics and inventory control.",
            p3_title: "DevTrack Task Manager",
            p3_desc: "Developer-centric Kanban system for task management and bug tracking with a specialized dark theme.",
            app_home: "Portfolio Home",
            app_edu: "SmartEdu Portal",
            app_b2b: "B2B Merchant",
            app_devtrack: "DevTrack",
            contact_title: "Start a Conversation",
            contact_name: "Full Name",
            contact_email: "Email Address",
            contact_msg: "Message Content",
            contact_submit: "Send Message",
            placeholder_name: "e.g. John Doe",
            placeholder_msg: "What's on your mind?...",
            footer_copy: "&copy; 2026 Abdul-Rahim Al-Habbash. Built with Passion."
        }
    };

    // --- High-Resolution Language Logic ---
    let currentLang = localStorage.getItem('preferredLang') || 'ar';

    const updateLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('preferredLang', lang);

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (el.tagName === 'TITLE') {
                    document.title = translations[lang][key];
                } else if (el.id === 'meta-description') {
                    el.setAttribute('content', translations[lang][key]);
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });

        // Placeholder Translation
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) el.placeholder = translations[lang][key];
        });

        // Layout & Directional Re-flow
        if (lang === 'en') {
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', 'en');
            document.body.classList.add('lang-en');
            langSwitcher.textContent = 'العربية';
            // Flip icons that indicate direction
            document.querySelectorAll('.flip-icon').forEach(icon => {
                icon.classList.remove('fa-arrow-left');
                icon.classList.add('fa-arrow-right');
            });
        } else {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
            document.body.classList.remove('lang-en');
            langSwitcher.textContent = 'English';
            // Flip back
            document.querySelectorAll('.flip-icon').forEach(icon => {
                icon.classList.remove('fa-arrow-right');
                icon.classList.add('fa-arrow-left');
            });
        }
    };

    // Initialize
    if (langSwitcher) {
        updateLanguage(currentLang);
        langSwitcher.addEventListener('click', (e) => {
            e.preventDefault();
            updateLanguage(currentLang === 'ar' ? 'en' : 'ar');
        });
    }

    // --- Standard UI Controllers (Optimized) ---
    window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
        if (backToTopBtn) backToTopBtn.classList.toggle('show', window.scrollY > 300);
    });

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
            mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // App Switcher Dropdown (Fixed with 'active' class)
    if (appSwitcherBtn && appsDropdown) {
        appSwitcherBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            appsDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!appsDropdown.contains(e.target) && !appSwitcherBtn.contains(e.target)) {
                appsDropdown.classList.remove('active');
            }
        });
    }

    // Contact Form (Async with i18n feedback)
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formMessage.style.display = 'block';
            formMessage.textContent = currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
            formMessage.className = 'status-info';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    formMessage.textContent = currentLang === 'ar' ? 'تم الإرسال بنجاح!' : 'Sent successfully!';
                    formMessage.className = 'status-success';
                    contactForm.reset();
                } else throw new Error();
            } catch {
                formMessage.textContent = currentLang === 'ar' ? 'حدث خطأ. حاول مجدداً.' : 'Error. Try again.';
                formMessage.className = 'status-error';
            }
        });
    }

    // Scroll Reveal (Improved Performance)
    const reveal = () => {
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('active');
        });
    };
    window.addEventListener('scroll', reveal);
    reveal();
});
