/**
 * @fileoverview Final Stable UI Engine V3.0
 * Unified logic for Internationalization & Component Control
 */

document.addEventListener('DOMContentLoaded', () => {
    // Component Selectors
    const htmlMeta = {
        html: document.documentElement,
        body: document.body,
        title: document.title,
        metaDesc: document.getElementById('meta-description')
    };

    const ui = {
        navbar: document.getElementById('navbar'),
        mobileToggle: document.getElementById('mobile-menu-toggle'),
        navLinks: document.querySelector('.nav-links'),
        appBtn: document.getElementById('app-switcher-btn'),
        appDropdown: document.getElementById('apps-dropdown'),
        langBtn: document.getElementById('lang-switcher'),
        backTop: document.getElementById('back-to-top')
    };

    // Advanced Dictionary
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
            nav_switcher_title: "تبديل المشاريع",
            hero_welcome: 'أهلاً، أنا <span class="gradient-text">عبد الرحيم خالد الهباش</span>',
            hero_job: "مهندس برمجيات",
            hero_tagline: "مهندس برمجيات شغوف بتطوير الحلول الرقمية الحديثة وبناء تطبيقات ويب عالية الأداء تجمع بين التصميم الجميل والكفاءة التقنية.",
            hero_btn_projects: "عرض السيرة الذاتية",
            hero_btn_cv: "تحميل CV",
            hero_btn_contact: "تواصل معي",
            about_title: "نبذة عني",
            about_p1: "خريج جامعة الأقصى – دفعة 2026، متخصص في بناء حلول ويب متقدمة بخبرة 3 سنوات في تطوير البرمجيات والعمل الحر.",
            about_p2: "أمتلك خبرة عملية في تحليل المشكلات التقنية ومعالجة الأخطاء البرمجية، وقدرة عالية على فهم متطلبات المشاريع وتحويلها لواقع رقمي.",
            about_p3: "ليست البرمجة كوداً فقط، بل هي فن تحويل الرؤية إلى حلول ذكية تخدم الأعمال وتحسن تجربة المستخدم.",
            stat_years: "سنوات خبرة",
            stat_projects: "مشروع مكتمل",
            stat_satisfaction: "رضا العملاء",
            skills_title: "مهاراتي التقنية",
            projects_title: "مشاريعي الاحترافية",
            p1_title: "بوابة التعليم الذكية (SmartEdu)",
            p1_desc: "منصة تعليمية متكاملة لإدارة الطلاب والمهام بتصميم زجاجي (Glassmorphism).",
            p2_title: "منصة التاجر B2B",
            p2_desc: "لوحة تحكم تجارية متقدمة تمكن التجار من إدارة العمليات والمخزون بدقة.",
            p3_title: "نظام DevTrack",
            p3_desc: "نظام موجه للمطورين لإدارة المهام وتتبع الأخطاء البرمجية (Kanban Style).",
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
            placeholder_msg: "كيف يمكنني مساعدتك؟",
            footer_copy: "&copy; 2026 عبد الرحيم خالد الهباش. جميع الحقوق محفوظة."
        },
        en: {
            site_title: "Abdul-Rahim Al-Habbash | Software Engineer",
            meta_desc: "Personal portfolio of Abdul-Rahim Al-Habbash - Software Engineer and Web Developer.",
            nav_logo: "Abdul-Rahim",
            nav_home: "Home",
            nav_about: "About",
            nav_skills: "Skills",
            nav_projects: "Projects",
            nav_contact: "Contact",
            nav_switcher_title: "Project Switcher",
            hero_welcome: 'Hi, I am <span class="gradient-text">Abdul-Rahim Al-Habbash</span>',
            hero_job: "Software Engineer",
            hero_tagline: "Dedicated software engineer building modern digital products and high-performance web applications with a focus on UI/UX.",
            hero_btn_projects: "View My Portfolio",
            hero_btn_cv: "Download CV",
            hero_btn_contact: "Get In Touch",
            about_title: "My Story",
            about_p1: "Al-Aqsa University Graduate Class of 2026. I specialize in crafting advanced web solutions with 3+ years of experience in coding and design.",
            about_p2: "Strong expertise in technical analysis and debugging. I excel at translating complex business needs into high-quality digital products.",
            about_p3: "Coding is more than syntax; it's the art of converting vision into intelligent solutions that grow businesses.",
            stat_years: "Years Experience",
            stat_projects: "Successful Projects",
            stat_satisfaction: "Client Satisfaction",
            skills_title: "Technical Stack",
            projects_title: "Professional Portfolio",
            p1_title: "Smart Education Portal",
            p1_desc: "A full-scale educational management system featuring a modern Glassmorphism UI.",
            p2_title: "B2B Merchant Platform",
            p2_desc: "Advanced commercial dashboard for B2B inventory tracking and operational analytics.",
            p3_title: "DevTrack System",
            p3_desc: "Developer-centric Kanban system for agile task management and code bug tracking.",
            app_home: "Home",
            app_edu: "Edu Portal",
            app_b2b: "Merchant B2B",
            app_devtrack: "DevTrack",
            contact_title: "Contact Me",
            contact_name: "Full Name",
            contact_email: "Email Address",
            contact_msg: "Message Content",
            contact_submit: "Send Now",
            placeholder_name: "e.g., John Doe",
            placeholder_msg: "How can I help you today?",
            footer_copy: "&copy; 2026 Abdul-Rahim Al-Habbash. All Rights Reserved."
        }
    };

    // --- Core Language Logic ---
    let currentLang = localStorage.getItem('preferredLang') || 'ar';

    const renderLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('preferredLang', lang);

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) el.innerHTML = translations[lang][key];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) el.placeholder = translations[lang][key];
        });

        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (translations[lang][key]) el.title = translations[lang][key];
        });

        // Direction & UI State
        htmlMeta.html.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
        htmlMeta.html.setAttribute('lang', lang);
        htmlMeta.body.classList.toggle('lang-en', lang === 'en');
        document.title = translations[lang].site_title;
        if (htmlMeta.metaDesc) htmlMeta.metaDesc.setAttribute('content', translations[lang].meta_desc);
        if (ui.langBtn) ui.langBtn.textContent = lang === 'en' ? 'العربية' : 'English';

        // Flip Directional Icons
        document.querySelectorAll('.flip-icon').forEach(icon => {
            if (lang === 'en') {
                icon.classList.replace('fa-arrow-left', 'fa-arrow-right');
            } else {
                icon.classList.replace('fa-arrow-right', 'fa-arrow-left');
            }
        });
    };

    // Initialize 
    renderLanguage(currentLang);

    if (ui.langBtn) {
        ui.langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            renderLanguage(currentLang === 'ar' ? 'en' : 'ar');
        });
    }

    // --- UI Interactions ---

    // Scroll Logic
    window.addEventListener('scroll', () => {
        ui.navbar?.classList.toggle('scrolled', window.scrollY > 40);
        ui.backTop?.classList.toggle('show', window.scrollY > 400);
    });

    // Mobile Menu
    if (ui.mobileToggle && ui.navLinks) {
        ui.mobileToggle.addEventListener('click', () => {
            ui.navLinks.classList.toggle('active');
            ui.mobileToggle.querySelector('i').classList.toggle('fa-bars');
            ui.mobileToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // App Switcher Dropdown Logic (High Stability)
    if (ui.appBtn && ui.appDropdown) {
        ui.appBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            ui.appDropdown.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!ui.appDropdown.contains(e.target) && !ui.appBtn.contains(e.target)) {
                ui.appDropdown.classList.remove('active');
            }
        });
    }

    // Form Processing (Simulated Async)
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formFeedback.style.display = 'block';
            formFeedback.textContent = currentLang === 'ar' ? 'جاري إرسال رسالتك...' : 'Sending your message...';
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    formFeedback.textContent = currentLang === 'ar' ? 'تم الإرسال بنجاح! شكراً لك.' : 'Sent successfully! Thank you.';
                    contactForm.reset();
                } else throw new Error();
            } catch {
                formFeedback.textContent = currentLang === 'ar' ? 'حدث خطأ غير متوقع.' : 'An error occurred.';
            }
        });
    }

    // Visual Reveals
    const onScrollAnimate = () => {
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('active');
        });
    };
    window.addEventListener('scroll', onScrollAnimate);
    onScrollAnimate();
});
