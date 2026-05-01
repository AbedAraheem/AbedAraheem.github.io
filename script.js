/**
 * @fileoverview Main portfolio script with full Internationalization (i18n) support.
 * Manages UI interactions, form submission, and language switching.
 */

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const appSwitcherBtn = document.getElementById('app-switcher-btn');
    const appsDropdown = document.getElementById('apps-dropdown');
    const backToTopBtn = document.getElementById('back-to-top');
    const langSwitcher = document.getElementById('lang-switcher');
    const body = document.body;
    const html = document.documentElement;

    // Translation Dictionary
    const translations = {
        ar: {
            nav_logo: "عبد الرحيم",
            nav_home: "الرئيسية",
            nav_about: "نبذة عني",
            nav_skills: "المهارات",
            nav_projects: "المشاريع",
            nav_contact: "تواصل معي",
            hero_welcome: 'أهلاً، أنا <span class="gradient-text">عبد الرحيم خالد الهباش</span>',
            hero_job: "مهندس برمجيات | خبير في تطبيقات الويب",
            hero_tagline: "مهندس برمجيات متخصص في بناء حلول رقمية قابلة للتوسع وتطبيقات ويب حديثة تجمع بين التصميم الجذاب والكفاءة التقنية العالية.",
            hero_btn_projects: "مشاهدة مشاريعي",
            hero_btn_cv: "تحميل CV",
            hero_btn_contact: "تواصل معي",
            about_title: "نبذة عني",
            about_p1: "أنا مهندس برمجيات (Software Engineer) شغوف ببناء تطبيقات ويب متكاملة (Full-Stack) وحلول رقمية حديثة. خريج تخصص نظم معلومات إدارية من جامعة الأقصى (2026) بمعدل تراكمي 79.2% (جيد). أمتلك خبرة عملية واسعة في العمل الحر، حيث قمت بتنفيذ أكثر من 20 مشروعاً ناجحاً لمختلف القطاعات.",
            about_p2: "أتميز بقدرتي على تحويل المتطلبات المعقدة إلى أنظمة برمجية سهلة الاستخدام وفعالة، مع التركيز على كتابة كود نظيف وقابل للتطوير. لدي خبرة قوية في تحليل الأنظمة، قواعد البيانات، وتطوير الواجهات الأمامية والخلفية باستخدام أحدث التقنيات العالمية.",
            about_p3: "أؤمن بأن التكنولوجيا هي الأداة الأقوى لتطوير الأعمال، لذا أسعى دائماً لتقديم حلول تجمع بين الابتكار والسرعة والأمان لتلبية احتياجات السوق العالمي.",
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
            nav_logo: "Abdul-Rahim",
            nav_home: "Home",
            nav_about: "About",
            nav_skills: "Skills",
            nav_projects: "Projects",
            nav_contact: "Contact",
            hero_welcome: 'Hi, I am <span class="gradient-text">Abdul-Rahim Al-Habbash</span>',
            hero_job: "Full-Stack Software Engineer | Web Specialist",
            hero_tagline: "Results-driven Software Engineer with strong expertise in building scalable web applications and modern digital solutions that balance high performance with premium design.",
            hero_btn_projects: "View My Works",
            hero_btn_cv: "Download CV",
            hero_btn_contact: "Contact Me",
            about_title: "About Me",
            about_p1: "I am a Results-driven Software Engineer with strong expertise in building scalable web applications and modern digital solutions. Holding a Bachelor's degree in Management Information Systems (2026) with a solid academic background (CGPA: 79.2%).",
            about_p2: "I have a proven ability to deliver high-quality products through freelance platforms, with over 20 completed projects across various industries. I specialize in turning complex requirements into user-friendly and efficient software systems.",
            about_p3: "I believe that programming is an art of transforming ideas into innovative digital solutions that contribute to business development and improve the user experience.",
            stat_years: "Years Experience",
            stat_projects: "Projects Completed",
            stat_satisfaction: "Customer Satisfaction",
            skills_title: "Technical Skills",
            projects_title: "Professional Projects",
            p1_title: "SmartEdu Portal",
            p1_desc: "An integrated educational platform for managing students, grades, and academic tasks with a modern design (Glassmorphism).",
            p2_title: "Merchant B2B Platform",
            p2_desc: "An advanced business dashboard (B2B) that allows merchants to monitor sales, inventory, and reports with high accuracy.",
            p3_title: "Task Tracking (DevTrack)",
            p3_desc: "A professional system for developers to manage tasks (Kanban) and track programming errors (Bug Tracking).",
            app_home: "Home",
            app_edu: "Edu Portal",
            app_b2b: "B2B Merchant",
            app_devtrack: "DevTrack",
            contact_title: "Contact Me",
            contact_name: "Name",
            contact_email: "Email",
            contact_msg: "Message",
            contact_submit: "Send Message",
            placeholder_name: "Enter your full name",
            placeholder_msg: "Write your message here...",
            footer_copy: "&copy; 2026 Abdul-Rahim Al-Habbash. All Rights Reserved."
        }
    };

    // --- Language Management ---
    let currentLang = localStorage.getItem('preferredLang') || 'ar';

    const updateLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('preferredLang', lang);

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        // Update Direction and Font
        if (lang === 'en') {
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', 'en');
            body.classList.add('lang-en');
            langSwitcher.textContent = 'العربية';
        } else {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
            body.classList.remove('lang-en');
            langSwitcher.textContent = 'English';
        }
    };

    // Initial language setup
    updateLanguage(currentLang);

    langSwitcher.addEventListener('click', (e) => {
        e.preventDefault();
        updateLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });


    // --- UI Logic ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopBtn.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.classList.remove('show');
        }
    });

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
            mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    if (appSwitcherBtn) {
        appSwitcherBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            appsDropdown.classList.toggle('active');
        });
    }

    document.addEventListener('click', () => {
        if (appsDropdown) appsDropdown.classList.remove('active');
    });

    // Form Submission Logic
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);

            formMessage.style.display = 'block';
            formMessage.textContent = currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
            formMessage.className = 'status-info';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formMessage.textContent = currentLang === 'ar' ? 'تم الإرسال بنجاح! شكراً لتواصلك.' : 'Sent successfully! Thank you.';
                    formMessage.className = 'status-success';
                    contactForm.reset();
                } else {
                    throw new Error();
                }
            } catch (err) {
                formMessage.textContent = currentLang === 'ar' ? 'عذراً، حدث خطأ. حاول مجدداً.' : 'Sorry, an error occurred. Try again.';
                formMessage.className = 'status-error';
            }
        });
    }

    // Scroll Animations (Simple Reveal)
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initial
});
