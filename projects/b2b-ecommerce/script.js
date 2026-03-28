document.addEventListener('DOMContentLoaded', () => {
    const dynamicView = document.getElementById('dynamic-view');
    const viewSubtitle = document.getElementById('view-subtitle');
    const topBtn = document.getElementById('top-btn');
    const pageHeaderTitle = document.querySelector('.welcome-text h1');
    const navLinks = document.querySelectorAll('.nav-link');

    // Names Correction
    const userNameAR = "م. عبد الرحيم خالد الهباش";
    const userNameEN = "Eng. Abdu Al-Rahim Khalid Al-Habbash";

    // 1. Inventory Database (Dynamic)
    let inventoryList = [
        { name: 'MacBook Pro M2', cat: 'أجهزة لابتوب', qty: 45, price: '$2,499' },
        { name: 'iPhone 15 Pro', cat: 'هواتف ذكية', qty: 12, price: '$1,199' },
        { name: 'iPad Air 5', cat: 'أجهزة تابلت', qty: 30, price: '$599' }
    ];

    function getStockStatus(qty) {
        if (qty <= 0) return '<span class="status-badge shipped" style="background:rgba(239,68,68,0.1);color:#ef4444">نفذ</span>';
        if (qty < 10) return '<span class="status-badge pending">منخفض</span>';
        return '<span class="status-badge delivered">متوفر</span>';
    }

    window.filterInventory = (term) => {
        const filtered = inventoryList.filter(i => i.name.toLowerCase().includes(term.toLowerCase()) || i.cat.includes(term));
        document.getElementById('inventory-tbody').innerHTML = generateInventoryRows(filtered);
    };

    function generateInventoryRows(list) {
        return list.map(item => `
            <tr>
                <td><strong>${item.name}</strong></td>
                <td>${item.cat}</td>
                <td style="font-family:'Outfit'">${item.qty} وحدة</td>
                <td style="font-family:'Outfit'">${item.price}</td>
                <td>${getStockStatus(item.qty)}</td>
            </tr>
        `).join('');
    }

    function renderInventoryView() {
        return `
            <div class="paper">
                <div class="card-title">قائمة المنتجات والمخزون الحالية</div>
                <input type="text" class="search-input" placeholder="بحث بالاسم أو الفئة..." onkeyup="filterInventory(this.value)">
                <table class="orders-table">
                    <thead><tr><th>المنتج</th><th>الفئة</th><th>الكمية</th><th>السعر</th><th>الحالة</th></tr></thead>
                    <tbody id="inventory-tbody">${generateInventoryRows(inventoryList)}</tbody>
                </table>
            </div>
        `;
    }

    // 2. Customer Database (Dynamic)
    let customersList = [
        { id: 'CUST-001', name: 'م. خالد أحمد', job: 'مدير مشتريات', company: 'شركة التقنية الدولية', date: '22 مارس 2026', totalOrders: 15, ltv: '$45,000', vip: true },
        { id: 'CUST-002', name: 'أ. سارة سليم', job: 'مديرة تسويق', company: 'مؤسسة الرواد المبدعين', date: '20 مارس 2026', totalOrders: 4, ltv: '$5,200', vip: false }
    ];

    window.filterCustomers = (term) => {
        const filtered = customersList.filter(c => c.name.includes(term) || c.company.includes(term));
        document.getElementById('customers-tbody').innerHTML = generateCustomerRows(filtered);
    };

    function generateCustomerRows(list) {
        return list.map(c => `
            <tr class="customer-row" onclick="openCustomer360('${c.id}')">
                <td><strong>${c.name}</strong> ${c.vip ? '<i class="fas fa-crown" style="color:#f59e0b; font-size:0.8rem;" title="عميل VIP"></i>' : ''}</td>
                <td>${c.job}</td>
                <td><span class="status-badge delivered" style="background:rgba(255,255,255,0.05); border:1px solid var(--border); color:var(--text-dark);">${c.company}</span></td>
                <td style="font-size: 0.85rem; color: var(--text-light);"><i class="far fa-calendar-alt"></i> ${c.date}</td>
            </tr>
        `).join('');
    }

    function renderCustomersView() {
        return `
            <div class="paper">
                <div class="card-title">قاعدة بيانات العملاء</div>
                <input type="text" class="search-input" placeholder="ابحث باسم العميل أو الشركة..." onkeyup="filterCustomers(this.value)">
                <table class="orders-table">
                    <thead><tr><th>الاسم الكامل</th><th>المسمى الوظيفي</th><th>جهة العمل</th><th>تاريخ الإضافة</th></tr></thead>
                    <tbody id="customers-tbody">${generateCustomerRows(customersList)}</tbody>
                </table>
            </div>
        `;
    }

    // Helper to simulate realistic dates
    const genDate = (daysAgo) => { const d = new Date(); d.setDate(d.getDate() - daysAgo); return d; };

    let ordersList = [
        { id: '#ORD-9006', client: 'الشركة الذكية', product: 'خوادم AWS (سنة)', total: '$12,000', status: 'delivered', statusText: 'تم التسليم', dateObj: genDate(0) },
        { id: '#ORD-9005', client: 'المهندس للتجارة', product: 'مكاتب ذكية', total: '$3,400', status: 'pending', statusText: 'معلق', dateObj: genDate(1) },
        { id: '#ORD-9004', client: 'مدارس المجد', product: 'آيباد للتعليم (50)', total: '$25,000', status: 'delivered', statusText: 'تم التسليم', dateObj: genDate(2) },
        { id: '#ORD-9003', client: 'شركة التقنية الحديثة', product: 'لابتوبات Dell XPS', total: '$4,500', status: 'shipped', statusText: 'تم الشحن', dateObj: genDate(4) },
        { id: '#ORD-9002', client: 'مؤسسة الرواد', product: 'شاشات سامسونج 4K', total: '$2,100', status: 'pending', statusText: 'معلق', dateObj: genDate(5) },
        { id: '#ORD-9001', client: 'مكتبة آفاق', product: 'طابعات HP Laser', total: '$1,200', status: 'delivered', statusText: 'تم التسليم', dateObj: genDate(6) }
    ];

    window.toggleOrderStatus = (id) => {
        const order = ordersList.find(o => o.id === id);
        if(!order) return;
        
        if(order.status === 'pending') { order.status = 'shipped'; order.statusText = 'تم الشحن'; }
        else if(order.status === 'shipped') { order.status = 'delivered'; order.statusText = 'تم التسليم'; }
        else { order.status = 'pending'; order.statusText = 'معلق'; }
        
        const activeKey = document.querySelector('.nav-link.active').getAttribute('data-content');
        if (activeKey === 'orders') {
            dynamicView.innerHTML = renderOrdersView();
        } else if (activeKey === 'dashboard') {
            initDashboardChart(); // refreshes dashboard state
        }
        showToast(`تم تحديث مسار الطلبية ${id} بنجاح! 📦`);
    };

    function renderOrdersView() {
        let rows = ordersList.map(o => `
            <tr>
                <td style="font-family:'Outfit',sans-serif; font-weight:700;">${o.id}</td>
                <td>${o.client}</td>
                <td>${o.product}</td>
                <td style="font-family:'Outfit',sans-serif;">${o.total}</td>
                <td><span class="status-badge ${o.status}" title="انقر لتحديث مسار الشحنة" onclick="toggleOrderStatus('${o.id}')">${o.statusText} <i class="fas fa-sync-alt" style="font-size:0.6rem; margin-right:5px;"></i></span></td>
            </tr>
        `).join('');
        return `<div class="paper"><div class="card-title">خط سير الطلبات (Pipeline)</div><table class="orders-table"><thead><tr><th>رقم الطلب</th><th>العميل</th><th>المنتج</th><th>القيمة</th><th>الحالة (تفاعلي)</th></tr></thead><tbody>${rows}</tbody></table></div>`;
    }

    // View Templates
    const views = {
        dashboard: {
            title: 'لوحة التاجر المركزية',
            subtitle: `أهلاً ${userNameAR}، إليك نظرة على أداء مبيعاتك لليوم.`,
            btn: '<i class="fas fa-plus"></i> إضافة منتج جديد',
            content: null // populated on start
        },
        inventory: {
            title: 'إدارة المخزون',
            subtitle: 'تتبع كميات المنتجات المتوفرة والمباعة في مستودعاتك.',
            btn: '<i class="fas fa-plus"></i> توريد جديد',
            content: null // dynamically rendered
        },
        orders: {
            title: 'إدارة الطلبات المتقدمة',
            subtitle: 'مراجعة وتعديل مسار تتبع الشحنات والطلبات بشكل تفاعلي.',
            btn: '<i class="fas fa-download"></i> تصدير الطلبات',
            content: null // dynamically rendered
        },
        customers: {
            title: 'قاعدة بيانات العملاء',
            subtitle: 'إدارة وتوثيق سجلات العملاء والشركات.',
            btn: '<i class="fas fa-user-plus"></i> إضافة عميل',
            content: null // dynamically rendered
        },
        reports: {
            title: 'التقارير والتحليلات',
            subtitle: 'خيارات تحميل تقارير الأداء السنوية بمختلف اللغات.',
            btn: '<i class="fas fa-file-invoice"></i> اختر لغة التقرير',
            content: `
                <div class="details-grid" style="grid-template-columns: 1fr 1fr;">
                    <div class="paper" style="text-align:center; padding: 40px;">
                        <i class="fas fa-file-pdf" style="font-size: 3rem; color: #10b981; margin-bottom: 20px;"></i>
                        <h3 style="margin-bottom:15px">تقرير الأداء (العربية)</h3>
                        <button class="btn btn-primary" onclick="handleReportAR()" style="width:100%">تحميل الآن</button>
                    </div>
                    <div class="paper" style="text-align:center; padding: 40px;">
                        <i class="fas fa-file-invoice" style="font-size: 3rem; color: #0ea5e9; margin-bottom: 20px;"></i>
                        <h3 style="margin-bottom:15px">Performance Report (EN)</h3>
                        <button class="btn btn-primary" onclick="handleReportEN()" style="width:100%; background:#0ea5e9">Download</button>
                    </div>
                </div>
                <!-- Template for HTML2PDF -->
                <div id="report-template" style="display:none; padding:40px; font-family:'Cairo', sans-serif; direction: rtl; background:white;">
                    <h1 style="text-align:center; color:#10b981">منصة التاجر - تقرير إحصائي</h1>
                    <p style="text-align:center">التاريخ: ${new Date().toLocaleDateString('ar-EG')}</p><hr>
                    <p><strong>المبرمج المسؤول:</strong> ${userNameAR}</p>
                    <p>1. المبيعات: مرتفعة ($124,560.80)</p>
                    <p>2. حالة المستودع: مستقرة</p>
                </div>
            `
        }
    };

    // Dashboard Real-time Calculation Logic
    function getWeeklySalesData() {
        const labels = [];
        const data = [];
        const daysAr = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        
        for(let i = 6; i >= 0; i--) {
            const d = new Date(); d.setDate(d.getDate() - i);
            labels.push(daysAr[d.getDay()]);
            
            let sum = 0;
            ordersList.forEach(o => {
                // If order date matches this specific day
                if(o.dateObj.getDate() === d.getDate() && o.dateObj.getMonth() === d.getMonth()) {
                    if(o.status !== 'cancelled') {
                        sum += parseFloat(o.total.replace(/[\$,]/g, ''));
                    }
                }
            });
            data.push(sum);
        }
        return { labels, data };
    }

    function updateDashboardDOM() {
        // Calculate Totals based on real data
        const totalSalesSum = ordersList.reduce((acc, curr) => acc + parseFloat(curr.total.replace(/[\$,]/g, '')), 0);
        const netProfitSum = totalSalesSum * 0.35; // Example 35% margin
        
        const salesEl = document.getElementById('dash-total-sales');
        const ordersEl = document.getElementById('dash-total-orders');
        const profitEl = document.getElementById('dash-net-profit');

        if(salesEl) salesEl.innerText = '$' + totalSalesSum.toLocaleString();
        if(ordersEl) ordersEl.innerText = ordersList.length;
        if(profitEl) profitEl.innerText = '$' + netProfitSum.toLocaleString();

        // Update Recent Orders table dynamically
        const recentOrdersTbody = document.querySelector('.orders-table-container tbody');
        if(recentOrdersTbody) {
            recentOrdersTbody.innerHTML = ordersList.slice(0,3).map(o => `
                <tr>
                    <td style="font-family:'Outfit',sans-serif; font-weight:700;">${o.id}</td>
                    <td>${o.client}</td>
                    <td>${o.product}</td>
                    <td style="font-family:'Outfit'">${o.total}</td>
                    <td><span class="status-badge ${o.status}" title="تحديث الحالة" onclick="toggleOrderStatus('${o.id}')">${o.statusText} <i class="fas fa-sync-alt" style="font-size:0.6rem; margin-right:5px;"></i></span></td>
                </tr>
            `).join('');
        }
    }

    // Chart Analytics Initialization
    let salesChartInstance = null;
    function initDashboardChart() {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return;
        
        if (salesChartInstance) salesChartInstance.destroy();

        const isDark = document.body.classList.contains('dark-theme');
        const gridColor = isDark ? '#334155' : '#e2e8f0';
        const textColor = isDark ? '#94a3b8' : '#64748b';

        // Update DOM stats and recent orders
        updateDashboardDOM();
        
        // Fetch real-calculated weekly sales
        const chartData = getWeeklySalesData();

        salesChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'النموذج التحليلي للمبيعات ($)',
                    data: chartData.data,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: { left: 20, right: 20, top: 10, bottom: 10 }
                },
                plugins: { 
                    legend: { display: false },
                    tooltip: {
                        titleFont: { family: 'Cairo', size: 14 },
                        bodyFont: { family: 'Outfit', size: 14 }
                    }
                },
                scales: {
                    x: { 
                        grid: { color: gridColor, drawBorder: false }, 
                        ticks: { color: textColor, font:{family:'Cairo', size: 12} } 
                    },
                    y: { 
                        position: 'left',
                        grid: { color: gridColor, drawBorder: false }, 
                        ticks: { 
                            color: textColor, 
                            font:{family:'Outfit', size: 13, weight: 'bold'},
                            padding: 10,
                            callback: function(value) {
                                // Formatting the number to look like $15K or $15,000
                                return '$' + value.toLocaleString();
                            }
                        } 
                    }
                }
            }
        });
    }

    // Save initial DOM for Dashboard
    views.dashboard.content = dynamicView.innerHTML;
    initDashboardChart(); // First Load Chart

    // Modals
    const productModal = document.getElementById('product-modal');
    const customerModal = document.getElementById('customer-modal');
    const toast = document.getElementById('toast');
    const customer360Modal = document.getElementById('customer-360-modal');

    // Theme Switcher Logic
    const themeBtn = document.getElementById('theme-btn');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const icon = themeBtn.querySelector('i');
            if(document.body.classList.contains('dark-theme')){
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
            if (document.querySelector('.nav-link.active').getAttribute('data-content') === 'dashboard') {
                initDashboardChart();
            }
        });
    }

    // Mobile Sidebar Drawer Logic
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

    // Nav Logic
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.classList.contains('exit')) return;
            e.preventDefault();
            navLinks.forEach(n => n.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu if open
            if(sideNav && sideNav.classList.contains('active')) {
                sideNav.classList.remove('active');
                menuOverlay.classList.remove('active');
            }
            
            const key = link.getAttribute('data-content');
            
            // Refresh Dynamic Content
            if (key === 'inventory') views.inventory.content = renderInventoryView();
            if (key === 'customers') views.customers.content = renderCustomersView();
            if (key === 'orders') views.orders.content = renderOrdersView();
            
            const target = views[key];
            if (target) {
                pageHeaderTitle.innerText = target.title;
                viewSubtitle.innerText = target.subtitle;
                topBtn.innerHTML = target.btn;
                
                dynamicView.style.opacity = '0';
                setTimeout(() => {
                    dynamicView.innerHTML = target.content;
                    dynamicView.style.opacity = '1';
                    if(key === 'dashboard') initDashboardChart();
                }, 150);
            }
        });
    });

    // Top Action Button
    topBtn.addEventListener('click', () => {
        const key = document.querySelector('.nav-link.active').getAttribute('data-content');
        if (key === 'dashboard' || key === 'inventory') productModal.classList.add('active');
        else if (key === 'customers') customerModal.classList.add('active');
        else if (key === 'orders') handleExportOrders();
    });

    // Close Modals
    document.querySelectorAll('.close-btn, .btn-secondary').forEach(b => {
        b.addEventListener('click', () => {
            productModal.classList.remove('active');
            customerModal.classList.remove('active');
            if(customer360Modal) customer360Modal.classList.remove('active');
        });
    });

    // Customer 360 View Implementation
    window.openCustomer360 = (id) => {
        const c = customersList.find(x => x.id === id);
        if(!c) return;
        
        document.getElementById('customer-360-content').innerHTML = `
            <div style="text-align:center; margin-bottom: 20px;">
                <div style="width:80px; height:80px; background:var(--bg-light); color:var(--primary); border:2px solid var(--primary); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2.5rem; margin:0 auto 15px;">
                    <i class="fas fa-user-tie"></i>
                </div>
                <h3>${c.name} ${c.vip ? '<i class="fas fa-crown" style="color:#f59e0b; font-size:1rem; margin-right:5px;" title="VIP"></i>' : ''}</h3>
                <p style="color:var(--text-light); margin-top:5px; font-weight:700;">${c.job} في ${c.company}</p>
            </div>
            
            <div class="profile-stat-blocks">
                <div class="profile-block">
                    <h5>إجمالي الطلبات</h5>
                    <b>${c.totalOrders} <i class="fas fa-box" style="font-size:0.8rem;"></i></b>
                </div>
                <div class="profile-block">
                    <h5>القيمة الدائمة (LTV)</h5>
                    <b style="color:#0ea5e9">${c.ltv}</b>
                </div>
                <div class="profile-block">
                    <h5>تاريخ الانضمام</h5>
                    <b style="font-size:1.1rem; margin-top:5px; display:inline-block; font-family:'Cairo';">${c.date}</b>
                </div>
            </div>
            <hr style="border:0; border-top:1px solid var(--border); margin: 25px 0;">
            <h4 style="margin-bottom:15px; color:var(--text-dark);">سجل النشاط الحديث</h4>
            <ul style="list-style:none; padding:0; color:var(--text-light); font-size:0.95rem; font-weight:700;">
                <li style="margin-bottom:12px;"><i class="fas fa-check-circle" style="color:var(--primary); margin-left:8px;"></i> قام بتأكيد استلام الطلب الأخير أمس بنجاح.</li>
                <li style="margin-bottom:12px;"><i class="fas fa-headset" style="color:var(--secondary); margin-left:8px;"></i> استفسار بخصوص دفعة شاشات 4K تم حله.</li>
                <li><i class="fas fa-envelope-open" style="color:#f59e0b; margin-left:8px;"></i> قام بقراءة إيميل العروض الترويجية الخاص بك.</li>
            </ul>
        `;
        customer360Modal.classList.add('active');
    };

    // Forms Processing
    document.getElementById('add-product-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const priceVal = document.getElementById('p-price').value;
        const newItem = {
            name: document.getElementById('p-name').value,
            cat: document.getElementById('p-category').selectedOptions[0].text,
            qty: parseInt(document.getElementById('p-qty').value),
            price: `$${parseFloat(priceVal).toLocaleString()}`
        };
        inventoryList.unshift(newItem); // Add to inventory
        productModal.classList.remove('active');
        
        // Live UI Refresh if on inventory
        const activeKey = document.querySelector('.nav-link.active').getAttribute('data-content');
        if (activeKey === 'inventory') {
            dynamicView.innerHTML = renderInventoryView();
        }
        
        showToast(`تم توريد "${newItem.name}" بنجاح وتحديث المخزن! ✅`);
        e.target.reset();
    });

    document.getElementById('add-customer-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newCust = {
            name: document.getElementById('c-name').value,
            job: document.getElementById('c-job').value,
            company: document.getElementById('c-company').value,
            date: new Date().toLocaleDateString('ar-EG', { year:'numeric', month:'long', day:'numeric' })
        };
        customersList.unshift(newCust);
        customerModal.classList.remove('active');
        if (document.querySelector('.nav-link.active').getAttribute('data-content') === 'customers') {
            dynamicView.innerHTML = renderCustomersView();
        }
        showToast('تمت إضافة العميل الهباش وتوثيقه بنجاح! ✅');
        e.target.reset();
    });

    // Shared Functions
    window.handleReportAR = () => {
        const element = document.getElementById('report-template');
        element.style.display = 'block';
        showToast('جارٍ معالجة التقرير العربي للمهندس الهباش...');
        html2pdf().from(element).set({
            margin: 1, filename: 'Performance_Report_AR.pdf', html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }).save().then(() => { element.style.display = 'none'; showToast('تم تحميل التقرير بنجاح! ✅'); });
    };

    window.handleReportEN = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        showToast('Generating English PDF...');
        doc.setFontSize(20); doc.text("Merchant Platform - Statistical Report", 20, 20);
        doc.setFontSize(12); doc.text(`Author: ${userNameEN}`, 20, 35);
        doc.line(20, 42, 190, 42);
        doc.text("Project performance reflects high stability and growth.", 20, 55);
        doc.save("Merchant_Platform_Report_EN.pdf");
        showToast('English Report Downloaded! ✅');
    };

    function handleExportOrders() {
        showToast('جارٍ تصدير بيانات الطلبات...');
        setTimeout(() => {
            const blob = new Blob(["#ORD,Customer,Date,Total\n#ORD-9001,Abood Academy,2026-03-24,$1200"], {type:'text/csv'});
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "Orders.csv";
            link.click();
            showToast('تم تنزيل ملف الإكسل (CSV) بنجاح! ✅');
        }, 1000);
    }

    function showToast(m) {
        toast.innerText = m;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // --- Global Search Logic (B2B) ---
    const globalSearchInput = document.getElementById('global-search-input');
    if (globalSearchInput) {
        // Searchable items across B2B modules
        const searchableItems = [
            { label: 'MacBook Pro M2', desc: 'منتج - أجهزة لابتوب', icon: 'fa-laptop', section: 'inventory' },
            { label: 'iPhone 15 Pro', desc: 'منتج - هواتف ذكية', icon: 'fa-mobile-alt', section: 'inventory' },
            { label: 'iPad Air 5', desc: 'منتج - أجهزة تابلت', icon: 'fa-tablet-alt', section: 'inventory' },
            { label: 'م. خالد أحمد', desc: 'عميل VIP - شركة التقنية الدولية', icon: 'fa-user-tie', section: 'customers' },
            { label: 'أ. سارة سليم', desc: 'عميلة - مؤسسة الرواد المبدعين', icon: 'fa-user', section: 'customers' },
            { label: 'الطلبات الحالية', desc: 'عرض خط سير الطلبات الكامل', icon: 'fa-shopping-cart', section: 'orders' },
            { label: 'تقارير الأداء', desc: 'تحليلات المبيعات السنوية', icon: 'fa-chart-pie', section: 'reports' },
            { label: 'إضافة منتج جديد', desc: 'فتح نموذج توريد منتج', icon: 'fa-plus-circle', section: 'inventory' },
        ];

        // Create a dropdown for search results
        const searchWrapper = globalSearchInput.closest('div');
        const searchDropdown = document.createElement('div');
        searchDropdown.id = 'b2b-search-results';
        searchDropdown.style.cssText = 'display:none; position:absolute; top:100%; right:0; width:100%; min-width:300px; background:var(--bg-light); border:1px solid var(--border); border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.15); z-index:9999; max-height:300px; overflow-y:auto; margin-top:5px;';
        searchWrapper.style.position = 'relative';
        searchWrapper.appendChild(searchDropdown);

        globalSearchInput.addEventListener('input', () => {
            const term = globalSearchInput.value.trim().toLowerCase();
            if (term.length < 1) { searchDropdown.style.display = 'none'; return; }

            const results = searchableItems.filter(item =>
                item.label.toLowerCase().includes(term) || item.desc.toLowerCase().includes(term)
            );

            if (results.length === 0) {
                searchDropdown.innerHTML = `<div style="padding:15px; color:var(--text-light); text-align:center;"><i class="fas fa-search"></i> لا توجد نتائج لـ "${term}"</div>`;
            } else {
                searchDropdown.innerHTML = results.map(r => `
                    <div onclick="navigateFromSearch('${r.section}')" style="padding:12px 15px; cursor:pointer; display:flex; align-items:center; gap:12px; border-bottom:1px solid var(--border); transition:0.2s;" onmouseover="this.style.background='rgba(16,185,129,0.08)'" onmouseout="this.style.background='transparent'">
                        <i class="fas ${r.icon}" style="color:var(--primary); font-size:1.1rem; width:20px;"></i>
                        <div>
                            <div style="font-weight:700; font-size:0.9rem; color:var(--text-dark);">${r.label}</div>
                            <div style="font-size:0.75rem; color:var(--text-light);">${r.desc}</div>
                        </div>
                    </div>
                `).join('');
            }
            searchDropdown.style.display = 'block';
        });

        document.addEventListener('click', (e) => {
            if (!searchWrapper.contains(e.target)) searchDropdown.style.display = 'none';
        });

        window.navigateFromSearch = (section) => {
            globalSearchInput.value = '';
            searchDropdown.style.display = 'none';
            // Simulate nav click
            const targetLink = document.querySelector(`.nav-link[data-content="${section}"]`);
            if (targetLink) targetLink.click();
        };
    }

    // --- Notification Bell Logic (B2B) ---
    const b2bBellBtn = document.getElementById('b2b-bell-btn');
    const b2bNotifDropdown = document.getElementById('b2b-notif-dropdown');
    const b2bBellBadge = document.getElementById('b2b-bell-badge');
    const b2bMarkRead = document.getElementById('b2b-mark-read');
    let b2bUnread = 1;

    if (b2bBellBtn && b2bNotifDropdown) {
        b2bBellBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = b2bNotifDropdown.style.display !== 'none';
            b2bNotifDropdown.style.display = isOpen ? 'none' : 'flex';
            // Also close apps dropdown if open
            const appsDD = document.getElementById('apps-dropdown');
            if (appsDD) appsDD.style.display = 'none';
        });
        document.addEventListener('click', (e) => {
            if (!b2bBellBtn.contains(e.target)) b2bNotifDropdown.style.display = 'none';
        });
        if (b2bMarkRead) {
            b2bMarkRead.addEventListener('click', () => {
                b2bUnread = 0;
                if (b2bBellBadge) b2bBellBadge.style.display = 'none';
                document.querySelectorAll('#b2b-notif-list .notif-item').forEach(el => {
                    el.style.background = 'transparent';
                    el.style.borderColor = 'transparent';
                });
                showToast('تم تحديد جميع الإشعارات كمقروءة ✅');
                b2bNotifDropdown.style.display = 'none';
            });
        }
        // Inject live notification when a new product is added
        const origAddProduct = document.getElementById('add-product-form');
        if (origAddProduct) {
            origAddProduct.addEventListener('submit', () => {
                setTimeout(() => {
                    const list = document.getElementById('b2b-notif-list');
                    if (list) {
                        b2bUnread++;
                        const item = document.createElement('div');
                        item.className = 'notif-item';
                        item.style.cssText = 'padding:10px; background:rgba(16,185,129,0.1); border-radius:8px; border-right:3px solid var(--primary); cursor:pointer;';
                        item.innerHTML = `<b style="font-size:0.9rem; color:var(--text-dark);"><i class="fas fa-box" style="color:var(--primary);"></i> تم إضافة منتج جديد!</b><p style="font-size:0.75rem; color:var(--text-light); margin-top:5px;">تم توريد المنتج وتحديث المخزون بنجاح.</p>`;
                        list.prepend(item);
                        if (b2bBellBadge) { b2bBellBadge.style.display = 'flex'; b2bBellBadge.textContent = b2bUnread; }
                    }
                }, 100);
            });
        }
    }

    // --- App Switcher Logic ---
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

    dynamicView.style.transition = 'opacity 0.2s ease-in-out';
});
