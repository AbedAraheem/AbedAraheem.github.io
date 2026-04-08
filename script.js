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
            hero_job: "مهندس برمجيات",
            hero_tagline: "مهندس برمجيات شغوف بتطوير الحلول الرقمية الحديثة وبناء تطبيقات ويب عالية الأداء تجمع بين التصميم الجميل والكفاءة التقنية.",
            hero_btn_projects: "مشاهدة مشاريعي",
            hero_btn_cv: "تحميل CV",
            hero_btn_contact: "تواصل معي",
            about_title: "نبذة عني",
            about_p1: "أنا خريج تخصص نظم معلومات إدارية من جامعة الأقصى – دفعة 2026، ومهندس برمجيات شغوف بتطوير الحلول الرقمية وبناء تطبيقات الويب الحديثة. أمتلك خبرة تمتد لثلاث سنوات في مجال العمل الحر (Freelancing) في تصميم وتطوير مواقع الويب وتطبيقاتها، حيث عملت على إنشاء واجهات مستخدم احترافية وتطوير أنظمة ويب تلبي احتياجات العملاء بكفاءة عالية.",
            about_p2: "أمتلك خبرة عملية في تحليل المشكلات التقنية ومعالجة الأخطاء البرمجية (Debugging)، إضافة إلى القدرة على فهم متطلبات المشاريع وتحويلها إلى حلول برمجية عملية وفعالة. أسعى دائمًا إلى تطوير مهاراتي التقنية وموااكية أحدث التقنيات في عالم تطوير البرمجيات، مع التركيز على بناء تطبيقات سريعة وآمنة وقابلة للتوسع.",
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
            nav_logo: "Abdul-Rahim",
            nav_home: "Home",
            nav_about: "About",
            nav_skills: "Skills",
            nav_projects: "Projects",
            nav_contact: "Contact",
            hero_welcome: 'Hi, I am <span class="gradient-text">Abdul-Rahim Al-Habbash</span>',
            hero_job: "Software Engineer",
            hero_tagline: "A passionate software engineer focused on developing modern digital solutions and building high-performance web applications that combine beautiful design with technical efficiency.",
            hero_btn_projects: "View My Works",
            hero_btn_cv: "Download CV",
            hero_btn_contact: "Contact Me",
            about_title: "About Me",
            about_p1: "I am a graduate in Management Information Systems from Al-Aqsa University – Class of 2026, and a software engineer passionate about developing digital solutions and modern web applications. I have three years of experience in freelancing, designing and developing websites and applications, where I created professional user interfaces and web systems with high efficiency.",
            about_p2: "I have practical experience in analyzing technical problems and debugging, in addition to the ability to understand project requirements and transform them into practical and effective software solutions. I always strive to develop my technical skills and keep pace with the latest technologies in the software world.",
            about_p3: "I believe that programming is not just writing code, but an art of transforming ideas into innovative digital solutions that contribute to business development and improve the user experience.",
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
