/**
 * @fileoverview Starlight UI Engine V4.2
 * Full Content Support & Professional Restoration
 */

document.addEventListener('DOMContentLoaded', () => {
    const ui = {
        navbar: document.getElementById('navbar'),
        mobileToggle: document.getElementById('mobile-menu-toggle'),
        navLinks: document.querySelector('.nav-links'),
        appBtn: document.getElementById('app-switcher-btn'),
        appDropdown: document.getElementById('apps-dropdown'),
        langBtn: document.getElementById('lang-switcher'),
    };

    const translations = {
        ar: {
            site_title: "عبد الرحيم خالد الهباش | مهندس برمجيات",
            meta_desc: "تطوير حلول برمجية مبتكرة وتطبيقات ويب حديثة.",
            nav_logo: "عبد الرحيم",
            nav_home: "الرئيسية",
            nav_about: "نبذة عني",
            nav_skills: "المهارات",
            nav_projects: "المشاريع",
            nav_contact: "تواصل معي",
            hero_welcome_prefix: "أهلاً، أنا",
            hero_name: "عبد الرحيم خالد الهباش",
            hero_job: "مهندس برمجيات",
            hero_tagline: "مهندس برمجيات شغوف بتطوير الحلول الرقمية الحديثة وبناء تطبيقات ويب عالية الأداء تجمع بين التصميم الجميل والكفاءة التقنية.",
            hero_btn_projects: "مشاهدة مشاريعي",
            hero_btn_cv: "تحميل CV",
            hero_btn_contact: "تواصل معي",
            about_title: "نبذة عني",
            about_p1: "أنا خريج تخصص نظم معلومات إدارية من جامعة الأقصى – دفعة 2026، ومهندس برمجيات شغوف بتطوير الحلول الرقمية وبناء تطبيقات الويب الحديثة.",
            about_p2: "أمتلك خبرة عملية في تحليل المشكلات التقنية ومعالجة الأخطاء البرمجية، مع التركيز على بناء تطبيقات سريعة وآمنة وقابلة للتوسع.",
            stat_years: "سنوات خبرة",
            stat_projects: "مشروع مكتمل",
            skills_title: "مهاراتي التقنية",
            projects_title: "مشاريعي الاحترافية",
            p1_title: "بوابة التعليم الذكية (SmartEdu)",
            p1_desc: "منصة تعليمية متكاملة لإدارة الطلاب والدرجات والمهام الدراسية بتصميم عصري.",
            p2_title: "منصة التاجر (Merchant Platform)",
            p2_desc: "لوحة تحكم تجارية متقدمة (B2B) تتيح للتجار مراقبة المبيعات والمخزون.",
            p3_title: "نظام تتبع المهام (DevTrack)",
            p3_desc: "نظام احترافي موجه للمطورين لإدارة المهام وتتبع الأخطاء البرمجية بدقة.",
            app_home: "الرئيسية",
            app_edu: "بوابة التعليم",
            app_b2b: "منصة التاجر B2B",
            app_devtrack: "نظام DevTrack",
            contact_title: "تواصل معي",
            contact_name: "الاسم",
            contact_email: "البريد",
            contact_msg: "الرسالة",
            contact_submit: "إرسال الرسالة",
            placeholder_name: "الاسم الكامل",
            placeholder_msg: "رسالتك...",
            footer_copy: "&copy; 2026 عبد الرحيم خالد الهباش. جميع الحقوق محفوظة."
        },
        en: {
            site_title: "Abdul-Rahim Al-Habbash | Software Engineer",
            meta_desc: "Developing innovative software solutions and modern web applications.",
            nav_logo: "Abdul-Rahim",
            nav_home: "Home",
            nav_about: "About",
            nav_skills: "Skills",
            nav_projects: "Projects",
            nav_contact: "Contact",
            hero_welcome_prefix: "Hi, I am",
            hero_name: "Abdul-Rahim Al-Habbash",
            hero_job: "Software Engineer",
            hero_tagline: "A software engineer passionate about building modern digital solutions and high-performance web apps.",
            hero_btn_projects: "View My Projects",
            hero_btn_cv: "Download CV",
            hero_btn_contact: "Contact Me",
            about_title: "About Me",
            about_p1: "MIS graduate from Al-Aqsa University – Class of 2026. A software engineer dedicated to crafting modern web ecosystems.",
            about_p2: "Experienced in technical problem-solving and debugging, focused on building fast, secure, and scalable applications.",
            stat_years: "Years Experience",
            stat_projects: "Projects Done",
            skills_title: "Technical Skills",
            projects_title: "Professional Projects",
            p1_title: "Smart Education Portal",
            p1_desc: "A comprehensive educational platform for student management with a modern UI.",
            p2_title: "Merchant B2B Platform",
            p2_desc: "Advanced commercial dashboard for merchants to monitor sales and inventory.",
            p3_title: "DevTrack Task System",
            p3_desc: "Professional system for developers to manage tasks and track bugs accurately.",
            app_home: "Home Portal",
            app_edu: "Education Gate",
            app_b2b: "Merchant B2B",
            app_devtrack: "DevTrack Devs",
            contact_title: "Contact Me",
            contact_name: "Name",
            contact_email: "Email",
            contact_msg: "Message",
            contact_submit: "Send Message",
            placeholder_name: "Your Full Name",
            placeholder_msg: "Your message here...",
            footer_copy: "&copy; 2026 Abdul-Rahim Al-Habbash. All Rights Reserved."
        }
    };

    let currentLang = localStorage.getItem('preferredLang') || 'ar';

    const renderUI = (lang) => {
        currentLang = lang;
        localStorage.setItem('preferredLang', lang);

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (el.tagName === 'TITLE') document.title = translations[lang][key];
                else el.innerHTML = translations[lang][key];
            }
        });

        // Placeholder Translation
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) el.placeholder = translations[lang][key];
        });

        document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
        document.body.classList.toggle('lang-en', lang === 'en');
        if (ui.langBtn) ui.langBtn.textContent = lang === 'en' ? 'العربية' : 'English';
        
        // Flip icon logic
        document.querySelectorAll('.flip-icon').forEach(icon => {
            icon.style.transform = lang === 'en' ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    };

    renderUI(currentLang);

    if (ui.langBtn) {
        ui.langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            renderUI(currentLang === 'ar' ? 'en' : 'ar');
        });
    }

    // Standard UI Events
    window.addEventListener('scroll', () => { ui.navbar?.classList.toggle('scrolled', window.scrollY > 50); });

    if (ui.mobileToggle && ui.navLinks) {
        ui.mobileToggle.addEventListener('click', () => {
            ui.navLinks.classList.toggle('active');
            ui.mobileToggle.querySelector('i').classList.toggle('fa-bars');
            ui.mobileToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    if (ui.appBtn && ui.appDropdown) {
        ui.appBtn.addEventListener('click', (e) => { e.stopPropagation(); ui.appDropdown.classList.toggle('active'); });
        document.addEventListener('click', (e) => { if (!ui.appDropdown.contains(e.target)) ui.appDropdown.classList.remove('active'); });
    }

    // Form Handle
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formMessage.style.display = 'block';
            formMessage.textContent = currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
            try {
                const response = await fetch(contactForm.action, { method: 'POST', body: new FormData(contactForm), headers: { 'Accept': 'application/json' } });
                if (response.ok) {
                    formMessage.textContent = currentLang === 'ar' ? 'تم الإرسال بنجاح!' : 'Sent successfully!';
                    contactForm.reset();
                } else throw new Error();
            } catch {
                formMessage.textContent = 'Error / خطأ';
            }
        });
    }

    // Scroll Reveal
    const reveal = () => {
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('active');
        });
    };
    window.addEventListener('scroll', reveal); reveal();
});
