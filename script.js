/**
 * @fileoverview Starlight UI Engine V4.1
 * Professional Restoration & High-Fidelity i18n
 */

document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const ui = {
        navbar: document.getElementById('navbar'),
        mobileToggle: document.getElementById('mobile-menu-toggle'),
        navLinks: document.querySelector('.nav-links'),
        appBtn: document.getElementById('app-switcher-btn'),
        appDropdown: document.getElementById('apps-dropdown'),
        langBtn: document.getElementById('lang-switcher'),
        backTop: document.getElementById('back-to-top')
    };

    // Professional Dictionary
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
            hero_name: "عبد الرحيم الهباش",
            hero_job: "مهندس برمجيات",
            hero_tagline: "مهندس برمجيات شغوف بتطوير الحلول الرقمية الحديثة التي تجمع بين الجمال والذكاء التقني.",
            hero_btn_projects: "مشاهدة مشاريعي",
            hero_btn_cv: "تحميل CV",
            hero_btn_contact: "تواصل معي",
            about_title: "نبذة عني",
            about_p1: "خريج تخصص نظم معلومات إدارية من جامعة الأقصى – دفعة 2026. مهندس برمجيات شغوف ببناء تطبيقات الويب الحديثة وحل المشكلات التقنية بكفاءة عالية.",
            about_p2: "أمتلك خبرة عملية في تحليل المتطلبات وتحويلها إلى واقع رقمي مبهر، مع التركيز على الأمان وسرعة الأداء.",
            stat_years: "سنوات خبرة",
            stat_projects: "مشروع مكتمل",
            projects_title: "مشاريعي الاحترافية",
            p1_title: "بوابة التعليم",
            p1_desc: "منصة تعليمية متكاملة بتصميم زجاجي عصري.",
            app_home: "الرئيسية",
            app_edu: "بوابة التعليم",
            app_b2b: "منصة التاجر B2B",
            app_devtrack: "نظام DevTrack",
            contact_title: "تواصل معي",
            footer_copy: "&copy; 2026 عبد الرحيم الهباش. جميع الحقوق محفوظة."
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
            hero_tagline: "Passionate software engineer building modern digital solutions that merge aesthetics with technical intelligence.",
            hero_btn_projects: "View My Work",
            hero_btn_cv: "Download CV",
            hero_btn_contact: "Contact Me",
            about_title: "Who I Am",
            about_p1: "Management Information Systems graduate from Al-Aqsa University – Class of 2026. I am dedicated to crafting efficient web ecosystems and solving complex technical challenges.",
            about_p2: "Experienced in translating business needs into stunning digital realities, with a strong focus on security and performance optimization.",
            stat_years: "Years of Experience",
            stat_projects: "Projects Completed",
            projects_title: "Featured Projects",
            p1_title: "Education Portal",
            p1_desc: "A full-featured educational platform with a sleek Glassmorphism UI.",
            app_home: "Portfolio Home",
            app_edu: "Edge Education",
            app_b2b: "Merchant B2B",
            app_devtrack: "DevTrack System",
            contact_title: "Get In Touch",
            footer_copy: "&copy; 2026 Abdul-Rahim Al-Habbash. All Rights Reserved."
        }
    };

    // --- High-Fidelity i18n Core ---
    let currentLang = localStorage.getItem('preferredLang') || 'ar';

    const renderUI = (lang) => {
        currentLang = lang;
        localStorage.setItem('preferredLang', lang);

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'TITLE') document.title = translations[lang][key];
                else el.innerHTML = translations[lang][key];
            }
        });

        // Direction & Body state
        document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
        document.documentElement.setAttribute('lang', lang);
        document.body.classList.toggle('lang-en', lang === 'en');
        if (ui.langBtn) ui.langBtn.textContent = lang === 'en' ? 'العربية' : 'English';

        // Flip Directional Icons SAFELY
        document.querySelectorAll('.flip-icon').forEach(icon => {
            icon.style.transform = lang === 'en' ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    };

    // Initial Execute
    renderUI(currentLang);

    if (ui.langBtn) {
        ui.langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            renderUI(currentLang === 'ar' ? 'en' : 'ar');
        });
    }

    // --- Scroll Behaviors ---
    window.addEventListener('scroll', () => {
        ui.navbar?.classList.toggle('scrolled', window.scrollY > 50);
        ui.backTop?.classList.toggle('show', window.scrollY > 400);
    });

    // --- Navigation Logic ---
    if (ui.mobileToggle && ui.navLinks) {
        ui.mobileToggle.addEventListener('click', () => {
            ui.navLinks.classList.toggle('active');
            ui.mobileToggle.querySelector('i').classList.toggle('fa-bars');
            ui.mobileToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // App Switcher Dropdown (Fixed & Robust)
    if (ui.appBtn && ui.appDropdown) {
        ui.appBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            ui.appDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!ui.appDropdown.contains(e.target) && !ui.appBtn.contains(e.target)) {
                ui.appDropdown.classList.remove('active');
            }
        });
    }

    // Scroll Reveal Logic
    const onScrollReveal = () => {
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 60) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', onScrollReveal);
    onScrollReveal();
});
