document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DevTrack: Elite System Initialized ', 'background: #f1c40f; color: #000; font-weight: bold; padding: 5px;');

    // --- 1. Data Definitions (Realistic Simulation) ---
    const tasksData = {
        1: { title: "إصلاح ميكانيكا التمرير (Scroll)", status: "To Do", priority: "High", team: "Frontend Unit", desc: "هناك تأخير (lag) ملحوظ عند محاولة التمرير في النسخة المحمولة خاصة في متصفحات Safari. يجب مراجعة مكتبة smooth-scroll والمستمعين (listeners) المرتبطين بها." },
        2: { title: "تفعيل نظام الإشعارات اللحظية", status: "In Progress", priority: "Medium", team: "Cloud Team", desc: "ربط الخدمة بـ Firebase Cloud Messaging. نحتاج لتجربة إرسال إشعارات عندما يتم تعليق شخص ما على مهمة." },
        3: { title: "تحسين سرعة الاستجابة", status: "In Progress", priority: "High", team: "Backend Core", desc: "تقليل زمن استجابة الـ API من 400ms إلى 150ms كحد أقصى عبر تحسين استعلامات الـ SQL وإضافة Redis Cache." },
        4: { title: "تحديث واجهة الـ Glassmorphism", status: "Done", priority: "Low", team: "UI/UX Dept", desc: "تم تحديث كافة الحواف لتكون أنعم، وإضافة شفافية خلفية (backdrop-filter) بنسبة 15% لزيادة الطابع العصري." }
    };

    const bugsList = [
        { id: "BUG-201", module: "Authentication Core", type: "Security", desc: "ثغرة XSS محتملة في حقل البحث المرتبط بـ AuthModule.js", status: "Resolved", priority: "Critical", team: "Security Unit" },
        { id: "BUG-202", module: "UI Rendering", type: "Performance", desc: "تأخير في معالجة الصور بدقة 4K في واجهة الـ Glassmorphism", status: "Pending", priority: "High", team: "Frontend Unit" },
        { id: "BUG-203", module: "Legacy Compatibility", type: "UI/UX", desc: "خطأ في عرض الظلال (Backdrop blur) في متصفحات الويب القديمة", status: "Resolved", priority: "Low", team: "Design Dept" },
        { id: "BUG-204", module: "Data Persistence", type: "Backend API", desc: "فشل في رفع ملفات JSON الضخمة (>10MB) إلى السيرفر", status: "Pending", priority: "Medium", team: "Backend Core" },
        { id: "BUG-205", module: "Notification Service", type: "Integration", desc: "تأخير في استلام إشعارات الـ Firebase على أجهزة Android", status: "Testing", priority: "High", team: "Mobile Ops" }
    ];

    const codesRep = [
        { name: "src/components/SmoothScroll.tsx", branch: "feature/scroll-fix", duty: "تحسين أداء التمرير (Scroll) في الأجهزة المحمولة", lang: "React", status: "Reviewing", progress: "85%", update: "منذ ساعتين", team: "Frontend Unit" },
        { name: "services/FirebaseWorker.ts", branch: "feature/realtime-push", duty: "خلفية إشعارات Firebase و Service Worker", lang: "TypeScript", status: "Testing", progress: "60%", update: "اليوم 10:00 ص", team: "Cloud Team" },
        { name: "core/api/RateLimiter.go", branch: "hotfix/api-latency", duty: "نظام تحديد الطلبات وتقليل زمن الاستجابة", lang: "Go", status: "Approved", progress: "100%", update: "أمس", team: "Backend Core" },
        { name: "styles/glassmorphism.css", branch: "design/ui-update-v3", duty: "تطوير تأثيرات الشفافية والظلال على مختلف الشاشات", lang: "CSS3", status: "Merged", progress: "100%", update: "25 مارس", team: "Design Dept" },
        { name: "tests/XssSanitizer.spec.ts", branch: "security/auth-patch", duty: "وحدة تنظيف المدخلات وسد ثغرات XSS", lang: "Jest", status: "Approved", progress: "100%", update: "منذ 4 ساعات", team: "Security Unit" }
    ];

    const teamMembers = [
        { name: "ياسين العبد", role: "Lead Core Backend", team: "Backend Core", tasks: 45, prs: 13, efficiency: 99, img: "https://i.pravatar.cc/150?u=yaseen" },
        { name: "ريم طارق", role: "Sr. Frontend Dev", team: "Frontend Unit", tasks: 28, prs: 8, efficiency: 97, img: "https://i.pravatar.cc/150?u=reem" },
        { name: "خالد سعيد", role: "Cloud Infra Engineer", team: "Cloud Team", tasks: 32, prs: 5, efficiency: 96, img: "https://i.pravatar.cc/150?u=khaled" },
        { name: "ندى حسين", role: "SecOps Specialist", team: "Security Unit", tasks: 19, prs: 2, efficiency: 100, img: "https://i.pravatar.cc/150?u=nada" },
        { name: "ليلى محمود", role: "Product Designer", team: "Design Dept", tasks: 50, prs: 0, efficiency: 95, img: "https://i.pravatar.cc/150?u=laila2" }
    ];

    // Mobile Drawer Logic
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

    // --- 2. Main Logic: Section Switching ---
    const sidebarItems = document.querySelectorAll('.dev-item');
    const sections = document.querySelectorAll('.content-section');

    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-section');
            
            // Close mobile drawer if active
            if(sideNav && sideNav.classList.contains('active')) {
                sideNav.classList.remove('active');
                menuOverlay.classList.remove('active');
            }
            
            // Switch Active Items
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Switch Sections
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(`section-${target}`).classList.add('active');

            // Populate Data if needed
            if (target === 'bugs') populateBugs();
            if (target === 'codes') populateCodes();
            if (target === 'team') populateTeam();
        });
    });

    // --- 3. Requirement 3: Dynamic Progress Calculation ---
    function updateProgress() {
        const totalCards = document.querySelectorAll('.kanban-card').length;
        const doneCards = document.querySelectorAll('.kanban-card.done').length;
        const percentage = totalCards > 0 ? Math.round((doneCards / totalCards) * 100) : 0;
        
        const progFill = document.getElementById('progress-fill');
        const progText = document.getElementById('total-progress');
        const doneCountText = document.getElementById('done-count');
        
        if (progFill && progText) {
            progFill.style.width = `${percentage}%`;
            progText.innerText = `${percentage}%`;
        }

        if (doneCountText) {
            doneCountText.innerText = doneCards;
        }

        // Update counters in column titles
        document.querySelectorAll('.kanban-col').forEach(col => {
            const count = col.querySelectorAll('.kanban-card').length;
            col.querySelector('.counter').innerText = count;
        });
    }
    updateProgress();

    // --- 4. Modal Management & Logic ---
    const modal = document.getElementById('task-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.close-modal');

    // Expose close function to window
    window.closeTaskModal = function() {
        if (modal) modal.style.display = 'none';
    };

    // Expose move logic to window
    window.moveToNext = function(id) {
        const card = document.querySelector(`[data-task-id="${id}"]`);
        if (!card || card.classList.contains('done')) return;

        const todoCol = document.getElementById('col-todo').querySelector('.cards-area');
        const progCol = document.getElementById('col-progress').querySelector('.cards-area');
        const doneCol = document.getElementById('col-done').querySelector('.cards-area');

        // Robust column detection
        const currentCol = card.closest('.kanban-col');
        if (!currentCol) return;

        if (currentCol.id === 'col-todo') {
            progCol.appendChild(card);
            showToast('تم نقل المهمة إلى مرحلة البرمجة النشطة');
        } else if (currentCol.id === 'col-progress') {
            doneCol.appendChild(card);
            card.classList.add('done');
            showToast('تم إعتماد المهمة بنجاح ✅');
        }
        
        updateProgress();
        closeTaskModal();
    };

    // Global Event Listener for Kanban Cards (Event Delegation)
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.kanban-card');
        if (card) {
            const taskId = card.getAttribute('data-task-id');
            const data = tasksData[taskId];
            if (!data) return;

            modalBody.innerHTML = `
                <div class="modal-task-tag ${card.querySelector('.card-tag').classList[1]}">
                    ${data.priority} Priority | ${data.team}
                </div>
                <h1 class="modal-task-title">${data.title}</h1>
                <div class="modal-task-meta">
                    <span><i class="fas fa-info-circle"></i> الحالة: <b style="color:var(--primary)">${card.classList.contains('done') ? 'مكتمل' : 'نشط'}</b></span>
                    <span><i class="fas fa-calendar"></i> التاريخ: مارس 25, 2026</span>
                </div>
                <div class="modal-task-desc">
                    <p>${data.desc}</p>
                    <div class="modal-note">
                        <i class="fas fa-shield-check"></i> تم مراجعة هذا العمل برمجياً ولتأكيد المعايير العالمية (Standard ISO-9001).
                    </div>
                </div>
                <div class="modal-actions">
                    ${!card.classList.contains('done') ? 
                        `<button class="dev-btn btn-primary" onclick="moveToNext('${taskId}')"><i class="fas fa-arrow-left"></i> نقل للمرحلة التالية</button>` : 
                        `<button class="dev-btn btn-disabled" disabled><i class="fas fa-check-double"></i> المهمة منتهية</button>`
                    }
                    <button class="dev-btn btn-secondary" onclick="closeTaskModal()"><i class="fas fa-times"></i> إغلاق النافذة</button>
                </div>
            `;
            modal.style.display = 'block';
        }

        // Close modal when clicking 'X' or outside
        if (e.target === closeModalBtn || e.target === modal) {
            closeTaskModal();
        }
    });

    function showToast(msg) {
        console.log('Notification:', msg);
        // Simple visual feedback instead of alert
        const toast = document.createElement('div');
        toast.className = 'dev-toast';
        toast.innerHTML = `<i class="fas fa-info-circle"></i> ${msg}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // --- 5. Requirement 4 & 5: Populate Tables ---
    function populateBugs() {
        const body = document.getElementById('bugs-table-body');
        body.innerHTML = bugsList.map(bug => `
            <tr>
                <td style="font-family: 'JetBrains Mono'; color: #ef4444; font-weight:bold;">${bug.id}</td>
                <td><span class="tag" style="background:rgba(59, 130, 246, 0.1); color:#3b82f6;">${bug.module}</span></td>
                <td><b>${bug.type}</b></td>
                <td style="color: #a1a1aa; font-size: 0.85rem;">${bug.desc}</td>
                <td><span class="status-badge ${bug.status === 'Resolved' ? 'status-resolved' : 'status-pending'}">${bug.status}</span></td>
                <td><span class="priority-indicator ${bug.priority.toLowerCase()}">${bug.priority}</span></td>
                <td><i class="fas fa-users-viewfinder"></i> ${bug.team}</td>
            </tr>
        `).join('');
    }

    function populateCodes() {
        const body = document.getElementById('codes-table-body');
        body.innerHTML = codesRep.map(c => {
            let statusClass = '';
            if(c.status === 'Approved' || c.status === 'Merged') statusClass = 'status-resolved';
            else if(c.status === 'Testing' || c.status === 'Reviewing') statusClass = 'status-pending';
            else statusClass = 'status-critical'; // Fallback

            let langIcon = '';
            if(c.lang === 'React') langIcon = '<i class="fab fa-react" style="color:#61dafb"></i>';
            else if(c.lang === 'TypeScript') langIcon = '<i class="fab fa-js" style="color:#3178c6"></i>';
            else if(c.lang === 'Go') langIcon = '<i class="fab fa-golang" style="color:#00ADD8"></i>';
            else if(c.lang === 'CSS3') langIcon = '<i class="fab fa-css3-alt" style="color:#264de4"></i>';
            else if(c.lang === 'Jest') langIcon = '<i class="fas fa-vial" style="color:#15c213"></i>';
            else langIcon = '<i class="fas fa-code"></i>';

            return `
            <tr>
                <td style="font-family: 'JetBrains Mono'; color: #3b82f6; font-size: 0.85rem;"><i class="fas fa-file-code" style="color:var(--text-muted)"></i> ${c.name}</td>
                <td><span class="branch-tag"><i class="fas fa-code-branch"></i> ${c.branch}</span></td>
                <td style="font-size: 0.8rem; color: #a1a1aa; max-width: 250px; line-height: 1.5;">${c.duty}</td>
                <td><span class="tech-tag">${langIcon} ${c.lang}</span></td>
                <td><span class="status-badge ${statusClass}">${c.status}</span></td>
                <td>
                    <div style="display:flex; flex-direction:column; gap:5px;">
                        <div class="prog-bar-container" style="height: 6px; width: 100%; background: rgba(255,255,255,0.05);">
                            <div class="prog-bar-fill" style="width: ${c.progress}; box-shadow:none;"></div>
                        </div>
                        <small style="color:var(--text-muted); font-size:0.7rem;"><i class="far fa-clock"></i> ${c.update} | ${c.progress}</small>
                    </div>
                </td>
                <td style="font-size: 0.8rem;"><i class="fas fa-users-viewfinder" style="color:var(--text-muted)"></i> ${c.team}</td>
            </tr>
            `;
        }).join('');
    }

    // --- 6. Requirement 6: Populate Team ---
    function populateTeam() {
        const grid = document.getElementById('team-grid');
        grid.innerHTML = teamMembers.map((m, index) => `
            <div class="team-card">
                <div class="team-badge">${m.team}</div>
                <img src="${m.img}" class="team-img" alt="${m.name}">
                <h4>${m.name}</h4>
                <span class="team-role"><i class="fas fa-laptop-code"></i> ${m.role}</span>
                <div class="team-stats">
                    <div class="stat-item"><b>${m.tasks}</b><small>مهام (Sprint)</small></div>
                    <div class="stat-item"><b>${m.prs}</b><small>دمج (PR)</small></div>
                    <div class="stat-item"><b style="color:var(--primary)">${m.efficiency}%</b><small>معدل الجودة</small></div>
                </div>
                <button class="dev-btn btn-secondary start-chat-btn" data-id="${index}" style="width:100%; justify-content:center; margin-top:20px; font-size:0.85rem;"><i class="fas fa-paper-plane"></i> بدء محادثة مشفرة</button>
            </div>
        `).join('');

        // Attach Chat Events
        document.querySelectorAll('.start-chat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const memberIndex = btn.getAttribute('data-id');
                openChat(teamMembers[memberIndex]);
            });
        });
    }

    // --- 8. Context-Aware Encrypted Chat Logic ---
    const chatInterface = document.getElementById('chat-interface');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatRepliesContainer = document.getElementById('chat-quick-replies');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    let currentChatUser = null;

    // Simulated Knowledge Base tied to project data
    const chatScenarios = {
        "Backend Core": {
            intro: "أنا فريق السيرفر.. كيف أُساهم في استقرار الـ API؟",
            options: [
                { q: "ما التقدم في تقليل زمن استجابة الـ API؟", a: "لقد قمنا بتحسين استعلامات الـ SQL وتفعيل Redis (تحديث الكود RateLimiter.go). الزمن الآن 150ms في الفرع hotfix/api-latency." },
                { q: "هل حُلت مشكلة رفع ملفات الـ JSON الضخمة؟", a: "فيما يخص البلاغ (BUG-204)، نعم. قمنا بتقسيم الملفات (Chunking) لتفادي خطأ 500. جاري الاختبار." }
            ]
        },
        "Frontend Unit": {
            intro: "مرحباً! فريق تطوير الواجهة معك. كيف أساعدك اليوم؟",
            options: [
                { q: "هل عالجت مشكلة تأخير التمرير (Scroll)؟", a: "بالتأكيد. أصلحنا مستمعات SmoothScroll.tsx في فرع feature/scroll-fix، التمرير الآن سلس وحقيقي." },
                { q: "وماذا بخصوص استهلاك الذاكرة في صور 4K؟", a: "بالنسبة للبلاغ (BUG-202)، قمت ببرمجة Lazy Loading ذكي يمنع تحميل الصور حتى يصل إليها المستخدم." }
            ]
        },
        "Cloud Team": {
            intro: "أهلاً بك، مسؤول الخدمات السحابية معك.",
            options: [
                { q: "هل انتهى ربط إشعارات Firebase اللحظية؟", a: "الخدمة تعمل! في ملف FirebaseWorker.ts.. استلام الإشعارات يتم في أقل من ثانية لأجهزة Android والحالة الآن (Testing)." },
                { q: "ما هي حالة السيرفرات حالياً؟", a: "متصلة بالكامل ومحمية بنسبة 96%. كل شيء مستقر." }
            ]
        },
        "Security Unit": {
            intro: "القسم الأمني جاهز لإفادتك بأي تفاصيل.",
            options: [
                { q: "هل تم سد ثغرة XSS في حقل البحث؟", a: "نعم، البلاغ (BUG-201) حُول إلى Resolved. تم دمج كود XssSanitizer.ts لمنع إدراج السكربتات الخبيثة." },
                { q: "ما مدى أمان جلسات المستخدمين؟", a: "البيانات مشفرة، والتوثيق يتم وفق معايير الآيزو (ISO-9001)." }
            ]
        },
        "Design Dept": {
            intro: "أهلاً، قسم التصميم وواجهة المستخدم.",
            options: [
                { q: "كيف نعالج أخطاء الخطوط في Edge؟", a: "البلاغ القديم (BUG-203) تم حله في الإصدار الجديد من styles/glassmorphism.css بوضع خطوط احتياطية." },
                { q: "هل تم تفعيل تأثيرات الغبش (Blur) بالكامل؟", a: "نعم، كافة الواجهات اعتمدت نظام Glassmorphism." }
            ]
        }
    };

    function openChat(user) {
        currentChatUser = user;
        document.getElementById('chat-name').innerText = user.name;
        document.getElementById('chat-pfp').src = user.img;
        chatMessages.innerHTML = '';
        chatRepliesContainer.style.display = 'none';
        chatInterface.style.display = 'flex';
        
        // System Auth Message
        addMessage(`[System] تم تفعيل التشفير (RSA-4096) مع فريق ${user.team}`, 'system', true);
        
        setTimeout(() => {
            const scenario = chatScenarios[user.team] || { intro: "أهلاً، كيف أساعدك اليوم؟", options: [] };
            addMessage(scenario.intro, 'received');
            
            if(scenario.options.length > 0) {
                renderQuickReplies(scenario.options);
            }
        }, 1200);
    }

    function renderQuickReplies(options) {
        chatRepliesContainer.innerHTML = '';
        chatRepliesContainer.style.display = 'flex';
        
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply-btn';
            btn.innerText = opt.q;
            btn.onclick = () => {
                chatRepliesContainer.style.display = 'none'; // Hide replies after choice
                addMessage(opt.q, 'sent'); // User sends msg
                simulateBotReply(opt.a); // Bot answers
            };
            chatRepliesContainer.appendChild(btn);
        });
    }

    function simulateBotReply(replyText) {
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.id = typingId;
        typingDiv.className = 'chat-msg msg-received';
        typingDiv.innerHTML = '<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            document.getElementById(typingId)?.remove();
            addMessage(replyText, 'received');
        }, 2000 + Math.random() * 1000); // 2-3s delay simulating real typing
    }

    if(closeChatBtn) {
        closeChatBtn.onclick = () => { chatInterface.style.display = 'none'; };
    }

    function addMessage(text, type, isSystem = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg msg-${type}`;
        if(isSystem) msgDiv.classList.add('msg-system');
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSend() {
        const text = chatInput.value.trim();
        if(text && currentChatUser) {
            chatRepliesContainer.style.display = 'none';
            addMessage(text, 'sent');
            chatInput.value = '';
            simulateBotReply("علمت بذلك، جاري إضافتها إلى خطة الـ Sprint القادم للمراجعة والمناقشة.");
        }
    }

    if(sendBtn) sendBtn.onclick = handleSend;
    if(chatInput) {
        chatInput.onkeypress = (e) => {
            if(e.key === 'Enter') handleSend();
        };
    }

    // --- 9. Requirement 7: Settings Interaction ---
    const saveSettings = document.querySelector('.save-btn');
    if (saveSettings) {
        saveSettings.onclick = () => {
            showToast('تم حفظ التكوينات وتكاملات النظام بنجاح! 🚀 المزامنة جارية...');
        };
    }

    // --- 10. Global Search Logic (DevTrack) ---
    const dtSearchInput = document.getElementById('dt-search-input');
    const dtSearchResults = document.getElementById('dt-search-results');
    if (dtSearchInput && dtSearchResults) {
        const dtSearchable = [
            { label: 'مهمة: إصلاح ميكانيكا التمرير', desc: '#DT-001 | أولوية: عالية | Frontend Unit', icon: 'fa-layer-group', section: 'home' },
            { label: 'مهمة: تفعيل نظام الإشعارات', desc: '#DT-002 | قيد البرمجة | Cloud Team', icon: 'fa-bolt', section: 'home' },
            { label: 'بلاغ: BUG-201 | XSS Security', desc: 'حلّ - Security Unit', icon: 'fa-bug', section: 'bugs' },
            { label: 'بلاغ: BUG-204 | Backend API', desc: 'معلق - Backend Core', icon: 'fa-bug', section: 'bugs' },
            { label: 'RateLimiter.go | Backend Core', desc: 'Approved - 100%', icon: 'fa-file-code', section: 'codes' },
            { label: 'FirebaseWorker.ts | Cloud Team', desc: 'Testing - 60%', icon: 'fa-file-code', section: 'codes' },
            { label: 'ياسين العبد - Lead Backend', desc: 'Backend Core | كفاءة 99%', icon: 'fa-user', section: 'team' },
            { label: 'ريم طارق - Frontend Dev', desc: 'Frontend Unit | كفاءة 97%', icon: 'fa-user', section: 'team' },
            { label: 'إعدادات المشروع', desc: 'API Token, Webhooks, CI/CD', icon: 'fa-cogs', section: 'settings' },
        ];

        dtSearchInput.addEventListener('input', () => {
            const term = dtSearchInput.value.trim().toLowerCase();
            if (term.length < 1) { dtSearchResults.style.display = 'none'; return; }

            const results = dtSearchable.filter(item =>
                item.label.toLowerCase().includes(term) || item.desc.toLowerCase().includes(term)
            );

            if (results.length === 0) {
                dtSearchResults.innerHTML = `<div style="padding:15px; color:var(--text-muted); text-align:center;"><i class="fas fa-search"></i> لا توجد نتائج لـ "${term}"</div>`;
            } else {
                dtSearchResults.innerHTML = results.map(r => `
                    <div onclick="dtNavigate('${r.section}')" style="padding:12px 15px; cursor:pointer; display:flex; align-items:center; gap:12px; border-bottom:1px solid rgba(255,255,255,0.05); transition:0.2s;" onmouseover="this.style.background='rgba(241,196,15,0.06)'" onmouseout="this.style.background='transparent'">
                        <i class="fas ${r.icon}" style="color:var(--primary); font-size:1rem; width:18px;"></i>
                        <div>
                            <div style="font-weight:700; font-size:0.88rem; color:var(--text-main);">${r.label}</div>
                            <div style="font-size:0.72rem; color:var(--text-muted);">${r.desc}</div>
                        </div>
                    </div>
                `).join('');
            }
            dtSearchResults.style.display = 'block';
        });

        document.addEventListener('click', (e) => {
            if (!dtSearchInput.closest('div').contains(e.target)) dtSearchResults.style.display = 'none';
        });

        window.dtNavigate = (section) => {
            dtSearchInput.value = '';
            dtSearchResults.style.display = 'none';
            const targetItem = document.querySelector(`.dev-item[data-section="${section}"]`);
            if (targetItem) targetItem.click();
        };
    }

    // --- 11. Notification Bell Logic (DevTrack) ---
    const dtBellBtn = document.getElementById('dt-bell-btn');
    const dtNotifDropdown = document.getElementById('dt-notif-dropdown');
    const dtBellBadge = document.getElementById('dt-bell-badge');
    const dtMarkRead = document.getElementById('dt-mark-read');
    let dtUnread = 2;

    if (dtBellBtn && dtNotifDropdown) {
        dtBellBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dtNotifDropdown.style.display !== 'none';
            dtNotifDropdown.style.display = isOpen ? 'none' : 'flex';
            const appsDD = document.getElementById('apps-dropdown');
            if (appsDD) appsDD.style.display = 'none';
        });
        document.addEventListener('click', (e) => {
            if (!dtBellBtn.contains(e.target)) dtNotifDropdown.style.display = 'none';
        });
        if (dtMarkRead) {
            dtMarkRead.addEventListener('click', () => {
                dtUnread = 0;
                if (dtBellBadge) dtBellBadge.style.display = 'none';
                document.querySelectorAll('#dt-notif-list > div').forEach(el => {
                    el.style.background = 'transparent';
                    el.style.borderColor = 'transparent';
                });
                showToast('تم تحديد جميع الإشعارات كمقروءة ✅');
                dtNotifDropdown.style.display = 'none';
            });
        }
    }

    // --- 12. App Switcher Logic ---
    const appSwitcherBtn = document.getElementById('app-switcher-btn');
    const appsDropdown = document.getElementById('apps-dropdown');
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
});
