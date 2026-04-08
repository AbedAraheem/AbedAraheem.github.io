document.addEventListener('DOMContentLoaded', () => {
    // Global State
    let globalTasks = [
        { id: 1, title: 'مشروع تقنيات الويب (React Component Tree)', course: 'تطوير تطبيقات الويب', deadline: 'غداً، 10:00 ص', priority: 'high', status: 'pending' },
        { id: 2, title: 'تحليل المتطلبات لنظام مستشفى', course: 'تحليل وتصميم النظم', deadline: 'الخميس، 12:00 م', priority: 'medium', status: 'pending' },
        { id: 3, title: 'حل مسائل الخوارزميات (Complexity Analysis)', course: 'خوارزميات وهياكل بيانات', deadline: '28 مارس 2026', priority: 'low', status: 'completed' },
        { id: 4, title: 'تصميم قاعدة بيانات لمتجر إلكتروني', course: 'قواعد البيانات العلائقية', deadline: '30 مارس 2026', priority: 'medium', status: 'pending' },
        { id: 5, title: 'بحث عن أمن الحوسبة السحابية', course: 'أمن المعلومات والشبكات', deadline: '02 أبريل 2026', priority: 'low', status: 'pending' }
    ];
    let globalNotifications = [
        { id: 1, text: 'موعد تسليم مشروع تقنيات الويب غداً!', time: 'منذ ساعتين', read: false },
        { id: 2, text: 'تمت إضافة درجات امتحان هندسة البرمجيات.', time: 'منذ 5 ساعات', read: false },
        { id: 3, text: 'تذكير: محاضرة الخوارزميات تبدأ بعد 30 دقيقة.', time: 'أمس', read: false }
    ];
    const coursesData = [
        { id: 1, name: 'تطوير تطبيقات الويب الحديثة', prof: 'د. يوسف الشرافي', progress: 75, lectures: 24, icon: 'fa-code' },
        { id: 2, name: 'خوارزميات وهياكل بيانات', prof: 'م. مروان الكسيح', progress: 45, lectures: 32, icon: 'fa-project-diagram' },
        { id: 3, name: 'هندسة البرمجيات المتقدمة', prof: 'د. أحمد صقر', progress: 90, lectures: 18, icon: 'fa-laptop-code' },
        { id: 4, name: 'تحليل وتصميم النظم', prof: 'م. سمر التلمس', progress: 20, lectures: 12, icon: 'fa-sitemap' },
        { id: 5, name: 'قواعد البيانات العلائقية', prof: 'د. خالد عبد الله', progress: 60, lectures: 28, icon: 'fa-database' },
        { id: 6, name: 'أمن المعلومات والشبكات', prof: 'م. إبراهيم الجمل', progress: 10, lectures: 15, icon: 'fa-shield-halved' }
    ];

    // 1. Mobile Sidebar Drawer Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sideNav = document.getElementById('side-nav');
    const menuOverlay = document.getElementById('menu-overlay');

    if(mobileMenuBtn && sideNav && menuOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            sideNav.classList.add('active');
            menuOverlay.classList.add('active');
        });
        menuOverlay.addEventListener('click', () => {
            sideNav.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    }

    // 2. Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const contentView = document.getElementById('content-view');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Close drawer specifically on mobile when clicking a link
            if(sideNav && sideNav.classList.contains('active')) {
                sideNav.classList.remove('active');
                menuOverlay.classList.remove('active');
            }
            const view = item.getAttribute('data-view');
            
            if (view === 'dashboard') {
                window.location.reload(); 
            } else if (view === 'courses') {
                renderCoursesView();
            } else if (view === 'grades') {
                renderGradesView();
            } else if (view === 'schedule') {
                renderScheduleView();
            } else if (view === 'assignments') {
                renderAssignmentsView();
            } else if (view === 'profile') {
                renderProfileView();
            } else {
                contentView.innerHTML = `
                    <div class="glass flex-center" style="min-height: 400px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px;">
                        <i class="fas fa-tools" style="font-size: 4rem; color: var(--primary);"></i>
                        <h2>قسم "${item.querySelector('span').innerText}" قيد التطوير</h2>
                        <button class="btn-action" onclick="location.reload()">العودة</button>
                    </div>`;
            }
        });
    });

    const bannerBtn = document.querySelector('.welcome-banner .btn-action');
    if (bannerBtn) {
        bannerBtn.addEventListener('click', () => {
            const scheduleNav = document.querySelector('[data-view="schedule"]');
            if (scheduleNav) scheduleNav.click();
        });
    }

    // Global Search Logic
    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            let resultsHTML = '';
            // Search Courses
            const foundCourses = coursesData.filter(c => c.name.toLowerCase().includes(query));
            if (foundCourses.length > 0) {
                resultsHTML += '<div class="search-category">المواد الدراسية</div>';
                foundCourses.forEach(c => {
                    resultsHTML += `<div class="search-item" onclick="document.querySelector('[data-view=courses]').click(); document.getElementById('search-results').style.display='none';"><i class="fas ${c.icon}"></i> <span>${c.name}</span></div>`;
                });
            }
            // Search Tasks
            const foundTasks = globalTasks.filter(t => t.title.toLowerCase().includes(query) || t.course.toLowerCase().includes(query));
            if (foundTasks.length > 0) {
                resultsHTML += '<div class="search-category">المهام والمشاريع</div>';
                foundTasks.forEach(t => {
                    resultsHTML += `<div class="search-item" onclick="document.querySelector('[data-view=assignments]').click(); document.getElementById('search-results').style.display='none';"><i class="fas fa-list-check"></i> <span>${t.title}</span></div>`;
                });
            }
            
            if (resultsHTML === '') {
                resultsHTML = '<div class="search-item" style="color:var(--text-muted); justify-content:center;">لا توجد نتائج مطابقة</div>';
            }
            searchResults.innerHTML = resultsHTML;
            searchResults.style.display = 'block';
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    // Notifications Logic
    const notifBell = document.getElementById('notifications-bell');
    const notifDropdown = document.getElementById('notifications-dropdown');
    const notifBadge = document.getElementById('notifications-badge');
    const notifList = document.getElementById('notifications-list');
    const markAllReadBtn = document.getElementById('mark-all-read');

    function updateNotifications() {
        if (!notifList) return;
        const unreadCount = globalNotifications.filter(n => !n.read).length;
        if (unreadCount > 0) {
            notifBadge.textContent = unreadCount;
            notifBadge.style.display = 'block';
        } else {
            notifBadge.style.display = 'none';
        }

        if (globalNotifications.length === 0) {
            notifList.innerHTML = '<div style="padding: 15px; text-align: center; color: var(--text-muted);">لا توجد إشعارات</div>';
            return;
        }

        notifList.innerHTML = globalNotifications.map((n, idx) => `
            <div class="notif-item ${n.read ? 'read' : 'unread'}" data-idx="${idx}">
                <div class="notif-icon"><i class="fas fa-bell"></i></div>
                <div class="notif-content">
                    <p>${n.text}</p>
                    <span>${n.time}</span>
                </div>
                ${!n.read ? '<div class="unread-dot"></div>' : ''}
            </div>
        `).join('');

        document.querySelectorAll('.notif-item').forEach(item => {
            item.addEventListener('click', function() {
                const idx = this.dataset.idx;
                if (!globalNotifications[idx].read) {
                    globalNotifications[idx].read = true;
                    updateNotifications();
                }
            });
        });
    }

    if (notifBell && notifDropdown) {
        updateNotifications();
        notifBell.addEventListener('click', () => {
            notifDropdown.style.display = notifDropdown.style.display === 'none' ? 'block' : 'none';
        });
        document.addEventListener('click', (e) => {
            if (!notifBell.contains(e.target) && !notifDropdown.contains(e.target)) {
                notifDropdown.style.display = 'none';
            }
        });
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                globalNotifications.forEach(n => n.read = true);
                updateNotifications();
            });
        }
    }

    // Add Task Logic
    const taskModal = document.getElementById('task-modal');
    const closeTaskModal = document.getElementById('close-task-modal');
    const addTaskForm = document.getElementById('add-task-form');

    if (taskModal && closeTaskModal) {
        closeTaskModal.addEventListener('click', () => {
            taskModal.classList.remove('active');
        });
        window.addEventListener('click', (e) => {
            if (e.target === taskModal) taskModal.classList.remove('active');
        });
    }

    if (addTaskForm) {
        addTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('task-title').value;
            const course = document.getElementById('task-course').value;
            const deadlineRaw = document.getElementById('task-deadline').value;
            const priority = document.getElementById('task-priority').value;

            const d = new Date(deadlineRaw);
            const deadline = d.toLocaleDateString('ar-EG') + ' ' + d.toLocaleTimeString('ar-EG', {hour: '2-digit', minute:'2-digit'});

            const newTask = {
                id: globalTasks.length + 1,
                title,
                course,
                deadline,
                priority,
                status: 'pending'
            };

            globalTasks.unshift(newTask);
            
            globalNotifications.unshift({
                id: globalNotifications.length + 1,
                text: `تمت إضافة مهمة جديدة: ${title}`,
                time: 'الآن',
                read: false
            });
            updateNotifications();

            addTaskForm.reset();
            taskModal.classList.remove('active');
            
            const activeNav = document.querySelector('.nav-item.active');
            if(activeNav && activeNav.getAttribute('data-view') === 'assignments') {
                renderAssignmentsView(window.currentTaskFilter || 'all');
            } else {
                 document.querySelector('[data-view=assignments]').click();
            }
        });
    }

    function renderCoursesView() {

        let gridHTML = '<div class="courses-grid">';
        coursesData.forEach((c, index) => {
            gridHTML += `
                <div class="course-card">
                    <div class="course-badge">نشط</div>
                    <div class="course-icon-large"><i class="fas ${c.icon}"></i></div>
                    <h3>${c.name}</h3>
                    <div class="course-prof"><i class="fas fa-user-tie"></i> <span>${c.prof}</span></div>
                    <div class="course-stats-row"><span>نسبة الإنجاز</span><span>${c.progress}%</span></div>
                    <div class="progress-container"><div class="progress-bar" style="width: ${c.progress}%; background: var(--gradient);"></div></div>
                    <div class="course-footer">
                        <div class="lecture-count"><i class="fas fa-play-circle"></i> ${c.lectures} محاضرة</div>
                        <button class="course-link enter-course-btn" style="background:none; border:none; cursor:pointer;" data-index="${index}">دخول المادة <i class="fas fa-chevron-left"></i></button>
                    </div>
                </div>`;
        });
        gridHTML += '</div>';
        contentView.innerHTML = `<div class="courses-view-header" style="margin-bottom: 30px;"><h1>المواد الدراسية</h1><p>لديك 6 مواد مسجلة.</p></div>${gridHTML}`;

        contentView.querySelectorAll('.enter-course-btn').forEach(btn => {
            btn.addEventListener('click', () => renderCourseContentView(coursesData[btn.dataset.index]));
        });
    }

    function renderCourseContentView(course) {
        const units = [
            { title: 'الوحدة الأولى: المفاهيم الأساسية', lessons: [{ title: 'مقدمة في ' + course.name, type: 'video', time: '15:00' }, { title: 'المفردات والمتطلبات', type: 'pdf', time: '2.5 MB' }] },
            { title: 'الوحدة الثانية: التطبيقات العملية', lessons: [{ title: 'إعداد بيئة العمل', type: 'video', time: '25:00' }, { title: 'تمرين عملي رقم 1', type: 'task', time: 'ساعة' }] }
        ];
        let unitsHTML = '';
        units.forEach(u => {
            let lessonsHTML = '';
            u.lessons.forEach(l => {
                const icon = l.type === 'video' ? 'fa-play' : (l.type === 'pdf' ? 'fa-file-pdf' : 'fa-list-check');
                lessonsHTML += `
                    <div class="lesson-item">
                        <i class="fas ${icon}"></i>
                        <div class="lesson-info"><h4>${l.title}</h4><span>${l.type === 'video' ? 'درس مرئي' : (l.type === 'pdf' ? 'ملف PDF' : 'مهمة')}</span></div>
                        <div class="lesson-meta"><i class="fas fa-clock"></i> ${l.time}</div>
                    </div>`;
            });
            unitsHTML += `<div class="unit-card"><div class="unit-header"><h3>${u.title}</h3><span>${u.lessons.length} عناصر</span></div><div class="lesson-list">${lessonsHTML}</div></div>`;
        });
        contentView.innerHTML = `
            <div class="course-content-view">
                <button class="btn-action" style="margin-bottom:20px;" onclick="document.querySelector('[data-view=courses]').click()"><i class="fas fa-arrow-right"></i> العودة للمواد</button>
                <div class="course-content-header"><h1>${course.name}</h1><p>المحاضر: ${course.prof} | تقدمك: ${course.progress}%</p></div>
                <div class="tabs-nav"><button class="tab-btn active">المحتوى التعليمي</button><button class="tab-btn">المهام والمشاريع</button><button class="tab-btn">المصادر</button></div>
                ${unitsHTML}
            </div>`;
    }

    function renderGradesView() {
        const gradesData = [
            { name: 'تطوير تطبيقات الويب', hour: 3, grade: 'A+', percent: 96, status: 'ممتاز مرتفع' },
            { name: 'خوارزميات وهياكل بيانات', hour: 4, grade: 'A', percent: 92, status: 'ممتاز' },
            { name: 'هندسة البرمجيات', hour: 3, grade: 'B+', percent: 88, status: 'جيد جداً مرتفع' },
            { name: 'قواعد البيانات العلائقية', hour: 3, grade: 'A', percent: 94, status: 'ممتاز' },
            { name: 'أمن المعلومات والشبكات', hour: 3, grade: 'B', percent: 82, status: 'جيد جداً' },
            { name: 'تحليل النظم وتصميمها', hour: 3, grade: 'A-', percent: 90, status: 'ممتاز' }
        ];
        let tableRows = '';
        gradesData.forEach((g, index) => {
            const badgeClass = g.percent >= 90 ? 'grade-excellent' : (g.percent >= 80 ? 'grade-vgood' : 'grade-good');
            tableRows += `
                <tr>
                    <td style="font-weight: 700;">${g.name}</td>
                    <td>${g.hour} س.م</td>
                    <td><span class="grade-letter">${g.grade}</span></td>
                    <td><span class="grade-badge ${badgeClass}">${g.status}</span></td>
                    <td><div class="course-progress-mini"><div class="course-progress-inner" style="width: ${g.percent}%;"></div></div></td>
                    <td><button class="btn-action details-btn" data-index="${index}" style="padding: 5px 12px; font-size: 0.8rem; margin: 0;">التفاصيل</button></td>
                </tr>`;
        });
        contentView.innerHTML = `
            <div class="grades-header" style="margin-bottom: 30px;"><h1>نتائج الاختبارات</h1></div>
            <div class="grades-summary">
                <div class="gpa-card glass"><p>المعدل التراكمي (GPA)</p><h2>94.2%</h2><span>ممتاز مرتفع</span></div>
                <div class="glass flex-center" style="display:flex; flex-direction:column; justify-content:center; align-items:center;"><p style="color:var(--text-muted)">الساعات</p><h2>19 ساعة</h2></div>
                <div class="glass flex-center" style="display:flex; flex-direction:column; justify-content:center; align-items:center;"><p style="color:var(--text-muted)">الترتيب</p><h2>2 من 150</h2></div>
            </div>
            <div class="grades-table-container"><table class="grades-table"><thead><tr><th>اسم المادة</th><th>الساعات</th><th>الدرجة</th><th>التقدير</th><th>الإنجاز</th><th>إجراءات</th></tr></thead><tbody>${tableRows}</tbody></table></div>
            <div id="modal-container" class="modal-overlay"></div>`;
        contentView.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', () => showSubjectDetails(gradesData[btn.dataset.index]));
        });
    }

    function showSubjectDetails(course) {
        const modalContainer = document.getElementById('modal-container');
        const details = {
            description: `هذه المادة (${course.name}) تركز على المهارات العملية والنظرية المتقدمة وفق المعايير العالمية.`,
            assessment: [{ title: 'الحضور', weight: 10, score: 10 }, { title: 'المشاريع', weight: 20, score: 19 }, { title: 'نصفي', weight: 30, score: 28 }, { title: 'نهائي', weight: 40, score: 38 }],
            outcomes: ['إتقان المفاهيم', 'حل المشكلات', 'تطبيق المعايير']
        };
        let assessmentHTML = '';
        details.assessment.forEach(a => {
            assessmentHTML += `<div class="assessment-item"><span><label>${a.title}</label><b>${a.score}/${a.weight}</b></span><div class="course-progress-mini" style="width: 100%; height:8px;"><div class="course-progress-inner" style="width: ${(a.score/a.weight)*100}%; background: var(--gradient);"></div></div></div>`;
        });
        modalContainer.innerHTML = `
            <div class="modal-content glass">
                <button class="close-modal">&times;</button>
                <div class="modal-header"><h2>تفاصيل مادة: ${course.name}</h2></div>
                <div class="modal-body">
                    <div class="detail-section"><h4>الوصف</h4><p style="color:var(--text-muted);">${details.description}</p></div>
                    <div class="detail-section"><h4>توزيع الدرجات</h4><div class="assessment-bars">${assessmentHTML}</div></div>
                </div>
            </div>`;
        modalContainer.classList.add('active');
        modalContainer.querySelector('.close-modal').onclick = () => modalContainer.classList.remove('active');
    }

    function renderScheduleView() {
        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
        const hours = ['08:00', '10:00', '12:00', '02:00'];
        
        // Full Schedule Data for all 6 subjects
        const scheduleData = [
            { day: 0, hour: '08:00', name: 'تطوير ويب', prof: 'د. يوسف', room: 'قاعة 101' },
            { day: 1, hour: '08:00', name: 'الخوارزميات', prof: 'م. مروان', room: 'مختبر A' },
            { day: 2, hour: '08:00', name: 'تطوير ويب', prof: 'د. يوسف', room: 'قاعة 101' },
            { day: 3, hour: '08:00', name: 'تحليل نظم', prof: 'م. سمر', room: 'قاعة 202' },
            { day: 4, hour: '08:00', name: 'هندسة برمجيات', prof: 'د. أحمد', room: 'قاعة 205' },
            
            { day: 0, hour: '10:00', name: 'أمن شبكات', prof: 'م. إبراهيم', room: 'مختبر C' },
            { day: 1, hour: '10:00', name: 'الخوارزميات', prof: 'م. مروان', room: 'مختبر A' },
            { day: 2, hour: '10:00', name: 'قواعد بيانات', prof: 'د. خالد', room: 'مختبر B' },
            { day: 3, hour: '10:00', name: 'تحليل نظم', prof: 'م. سمر', room: 'قاعة 202' },
            { day: 4, hour: '10:00', name: 'هندسة برمجيات', prof: 'د. أحمد', room: 'قاعة 205' },

            { day: 0, hour: '12:00', name: 'قواعد بيانات', prof: 'د. خالد', room: 'مختبر B' },
            { day: 2, hour: '12:00', name: 'أمن شبكات', prof: 'م. إبراهيم', room: 'مختبر C' }
        ];

        let headerHTML = '<div></div>';
        days.forEach(d => headerHTML += `<div class="day-header">${d}</div>`);
        
        let gridHTML = '';
        hours.forEach(h => {
            gridHTML += `<div class="time-row"><div class="hour-label">${h}</div>`;
            for (let d = 0; d < 5; d++) {
                const item = scheduleData.find(s => s.day === d && s.hour === h);
                gridHTML += item ? `<div class="slot occupied"><h4>${item.name}</h4><p>${item.prof}</p><p><i class="fas fa-location-dot"></i> ${item.room}</p></div>` : `<div class="slot"></div>`;
            }
            gridHTML += `</div>`;
        });

        // Full Final Exams List for all 6 subjects
        const examsData = [
            { name: 'هندسة البرمجيات المتقدمة', date: '28 مايو', time: '09:00 AM' },
            { name: 'تطوير تطبيقات الويب الحديثة', date: '30 مايو', time: '11:00 AM' },
            { name: 'خوارزميات وهياكل بيانات', date: '02 يونيو', time: '09:00 AM' },
            { name: 'قواعد البيانات العلائقية', date: '04 يونيو', time: '12:00 PM' },
            { name: 'تحليل وتصميم النظم', date: '07 يونيو', time: '10:00 AM' },
            { name: 'أمن المعلومات والشبكات', date: '10 يونيو', time: '09:00 AM' }
        ];

        let examsHTML = '';
        examsData.forEach(e => {
            examsHTML += `
                <div class="exam-card glass">
                    <div class="exam-info">
                        <h5>${e.name}</h5>
                        <span><i class="fas fa-clock"></i> ${e.time}</span>
                    </div>
                    <div class="exam-date-badge">${e.date}</div>
                </div>`;
        });

        contentView.innerHTML = `
            <div class="schedule-view-container">
                <div class="section-header" style="margin-bottom: 30px;">
                    <h1>جدول المحاضرات الفصلي</h1>
                    <p>الفصل الأكاديمي الحالي - عام 2026</p>
                </div>
                <div class="schedule-grid">${headerHTML}${gridHTML}</div>
                
                <div class="exam-calendar" style="margin-top:50px;">
                    <h2><i class="fas fa-calendar-alt" style="color:#f59e0b"></i> جدول الاختبارات النهائية (Final Exams)</h2>
                    <p style="color:var(--text-muted); margin-bottom: 20px;">قائمة كاملة بمواعيد اختبارات نهاية الفصل لجميع المواد المسجلة</p>
                    <div class="exam-grid">
                        ${examsHTML}
                    </div>
                </div>
            </div>`;
    }

    function renderProfileView() {
        contentView.innerHTML = `
            <div class="profile-view">
                <div class="profile-header-card">
                    <div class="profile-avatar-large"><i class="fas fa-user-graduate"></i></div>
                    <div class="profile-meta">
                        <h2>عبد الرحيم الهباش</h2>
                        <p><i class="fas fa-id-card"></i> الرقم الجامعي: 202210489 | <i class="fas fa-university"></i> كلية الهندسة وتكنولوجيا المعلومات</p>
                    </div>
                </div>
                <div class="profile-grid">
                    <div class="info-card">
                        <h3><i class="fas fa-user"></i> المعلومات الشخصية</h3>
                        <div class="info-list">
                            <div class="info-item"><span class="info-label">الاسم الكامل</span><span class="info-value">عبد الرحيم الهباش</span></div>
                            <div class="info-item"><span class="info-label">البريد الإلكتروني</span><span class="info-value">abood.habbash@mail.com</span></div>
                            <div class="info-item"><span class="info-label">رقم الهاتف</span><span class="info-value">+970 59-xxxx-xxx</span></div>
                            <div class="info-item"><span class="info-label">تاريخ الميلاد</span><span class="info-value">12 يونيو 2002</span></div>
                        </div>
                    </div>
                    <div class="info-card">
                        <h3><i class="fas fa-graduation-cap"></i> المعلومات الأكاديمية</h3>
                        <div class="info-list">
                            <div class="info-item"><span class="info-label">التخصص</span><span class="info-value">هندسة البرمجيات</span></div>
                            <div class="info-item"><span class="info-label">المستوى الدراسي</span><span class="info-value"><span class="academic-badge">السنة الرابعة</span></span></div>
                            <div class="info-item"><span class="info-label">الحالة الأكاديمية</span><span class="info-value">منتظم</span></div>
                            <div class="info-item"><span class="info-label">الساعات المنجزة</span><span class="info-value">115 ساعة معتمدة</span></div>
                        </div>
                    </div>
                </div>
                <div class="info-card" style="margin-top:25px;">
                    <h3><i class="fas fa-chart-line"></i> ملخص الأداء الأكاديمي</h3>
                    <div class="info-grid" style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                        <div style="text-align:center;"><h4>94.2%</h4><p class="info-label">المعدل التراكمي</p></div>
                        <div style="text-align:center;"><h4>19</h4><p class="info-label">ساعات الفصل الحالي</p></div>
                        <div style="text-align:center;"><h4>A+</h4><p class="info-label">أعلى درجة مسجلة</p></div>
                    </div>
                </div>
            </div>`;
    }

    window.currentTaskFilter = 'all';

    function renderAssignmentsView(filter = 'all') {
        window.currentTaskFilter = filter;
        
        const filteredTasks = globalTasks.filter(task => {
            if (filter === 'all') return true;
            return task.status === filter;
        });

        let assignmentsHTML = '';
        
        if (filteredTasks.length === 0) {
            assignmentsHTML = '<div class="glass flex-center" style="display:flex; justify-content:center; padding: 40px; color: var(--text-muted);">لا توجد مهام مطابقة.</div>';
        } else {
            filteredTasks.forEach(task => {
                const statusClass = task.status === 'completed' ? 'fa-check-circle fas' : 'fa-circle far';
                const statusStyle = task.status === 'completed' ? 'opacity: 0.6;' : '';
                const checkColor = task.status === 'completed' ? 'color: #10b981;' : '';

                assignmentsHTML += `
                    <div class="task-item glass task-row-item" data-id="${task.id}" style="${statusStyle}">
                        <div class="task-check" style="${checkColor}"><i class="${statusClass}"></i></div>
                        <div class="task-details">
                            <h4>${task.title}</h4>
                            <p style="font-size: 0.8rem; color: var(--primary); margin: 4px 0;">${task.course}</p>
                            <span><i class="fas fa-clock"></i> ${task.deadline}</span>
                        </div>
                        <div class="priority ${task.priority}">${task.priority === 'high' ? 'عالية' : (task.priority === 'medium' ? 'متوسطة' : 'عادية')}</div>
                    </div>`;
            });
        }

        contentView.innerHTML = `
            <div class="assignments-view">
                <div class="section-header" style="margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h1>المهام والمشاريع</h1>
                        <p>تتبع مواعيد تسليم أعمالك الأكاديمية</p>
                    </div>
                    <button class="btn-action" id="open-new-task-btn" style="margin: 0;"><i class="fas fa-plus"></i> مهمة جديدة</button>
                </div>
                
                <div class="filters-bar" style="margin-bottom: 25px; display: flex; gap: 15px;">
                    <button class="glass filter-btn ${filter === 'all' ? 'active' : ''}" data-filter="all" style="padding: 8px 20px; border-radius: 12px; cursor: pointer;">الكل</button>
                    <button class="glass filter-btn ${filter === 'pending' ? 'active' : ''}" data-filter="pending" style="padding: 8px 20px; border-radius: 12px; cursor: pointer;">قيد التنفيذ</button>
                    <button class="glass filter-btn ${filter === 'completed' ? 'active' : ''}" data-filter="completed" style="padding: 8px 20px; border-radius: 12px; cursor: pointer;">المكتملة</button>
                </div>

                <div class="task-list" style="display: grid; gap: 15px;">
                    ${assignmentsHTML}
                </div>
            </div>`;

        // Filter Logic
        contentView.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const f = e.target.getAttribute('data-filter');
                renderAssignmentsView(f);
            });
        });

        // Add Task Modal Trigger
        const triggerBtn = document.getElementById('open-new-task-btn');
        if (triggerBtn && taskModal) {
            triggerBtn.addEventListener('click', () => {
                taskModal.classList.add('active');
            });
        }

        // Toggle Task Completion Listners
        contentView.querySelectorAll('.task-row-item').forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                const taskId = parseInt(item.getAttribute('data-id'));
                const t = globalTasks.find(x => x.id === taskId);
                if (t) {
                    t.status = t.status === 'completed' ? 'pending' : 'completed';
                    if (t.status === 'completed') {
                         globalNotifications.unshift({
                            id: globalNotifications.length + 1,
                            text: `تم إنجاز المهمة: ${t.title}`,
                            time: 'الآن',
                            read: false
                        });
                        updateNotifications();
                    }
                    renderAssignmentsView(window.currentTaskFilter);
                }
            });
        });
    }

    // --- App Switcher Logic (Education Portal) ---
    const eduAppSwitcherBtn = document.getElementById('edu-app-switcher-btn');
    const eduAppsDropdown = document.getElementById('edu-apps-dropdown');
    if (eduAppSwitcherBtn && eduAppsDropdown) {
        eduAppSwitcherBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            eduAppsDropdown.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!eduAppSwitcherBtn.contains(e.target) && !eduAppsDropdown.contains(e.target)) {
                eduAppsDropdown.classList.remove('active');
            }
        });
    }
});
