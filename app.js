// ==========================================================================
// INITIAL MOCK DATA (IF LOCAL STORAGE IS EMPTY)
// ==========================================================================
const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: "Dipirona Monoidratada 500mg",
        quantity: "10 Comprimidos",
        brand: "Medley",
        category: "medicamentos",
        type: "generico",
        priceOriginal: 9.90,
        priceCurrent: 9.90,
        discount: 0,
        dosage: "500mg",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        name: "Paracetamol 750mg Analgésico",
        quantity: "20 Comprimidos",
        brand: "EMS",
        category: "medicamentos",
        type: "generico",
        priceOriginal: 18.50,
        priceCurrent: 18.50,
        discount: 0,
        dosage: "750mg",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        name: "Protetor Solar Facial La Roche-Posay Anthelios SPF 60",
        quantity: "50g",
        brand: "La Roche-Posay",
        category: "beleza",
        type: "outros",
        priceOriginal: 89.90,
        priceCurrent: 89.90,
        discount: 0,
        dosage: "50g",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        name: "Vitamina C Redoxon Tripla Ação Efervescente",
        quantity: "30 Comprimidos Efervescentes",
        brand: "Bayer",
        category: "vitaminas",
        type: "referencia",
        priceOriginal: 45.00,
        priceCurrent: 45.00,
        discount: 0,
        dosage: "1g",
        image: "https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?w=300&auto=format&fit=crop&q=60"
    },
    {
        id: 5,
        name: "Desodorante Clinique Clinical Creme Antitranspirante",
        quantity: "48g",
        brand: "Clinique",
        category: "cuidados",
        type: "outros",
        priceOriginal: 32.90,
        priceCurrent: 32.90,
        discount: 0,
        dosage: "48g",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=60"
    },
    {
        id: 6,
        name: "Fralda Pampers Confort Sec G",
        quantity: "60 Unidades",
        brand: "P&G",
        category: "bebe",
        type: "outros",
        priceOriginal: 79.90,
        priceCurrent: 79.90,
        discount: 0,
        dosage: "Tamanho G",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=60"
    },
    {
        id: 7,
        name: "Sabonete Líquido Dove Nutrição Profunda",
        quantity: "250ml",
        brand: "Dove",
        category: "cuidados",
        type: "outros",
        priceOriginal: 16.90,
        priceCurrent: 16.90,
        discount: 0,
        dosage: "250ml",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=60"
    },
    {
        id: 8,
        name: "Shampoo Pantene Hidratação Extrema",
        quantity: "400ml",
        brand: "Pantene",
        category: "cuidados",
        type: "outros",
        priceOriginal: 22.90,
        priceCurrent: 22.90,
        discount: 0,
        dosage: "400ml",
        image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&auto=format&fit=crop&q=60"
    }
];

const DEFAULT_PROMOTIONS = [
    {
        id: "promo_1",
        productId: 5,
        type: "bogo",
        value: 0,
        valueTake: 3,
        valuePay: 2,
        active: true
    },
    {
        id: "promo_2",
        productId: 1,
        type: "discount",
        value: 20,
        valueTake: 0,
        valuePay: 0,
        active: true
    }
];

const DEFAULT_CUSTOMERS = [
    { id: "c1", name: "Maria Oliveira", email: "maria.o@example.com", totalSpent: 1450.90, ordersCount: 12, cashbackBalance: 15.00 },
    { id: "c2", name: "Carlos Eduardo", email: "carlos.edu@example.com", totalSpent: 980.50, ordersCount: 8, cashbackBalance: 5.50 },
    { id: "c3", name: "Ana Clara Silva", email: "anaclara@example.com", totalSpent: 2150.00, ordersCount: 22, cashbackBalance: 42.00 },
    { id: "c4", name: "João Pedro Mendes", email: "jpmendes@example.com", totalSpent: 620.30, ordersCount: 4, cashbackBalance: 0.00 },
    { id: "c5", name: "Beatriz Costa", email: "biacosta@example.com", totalSpent: 3100.80, ordersCount: 15, cashbackBalance: 120.00 }
];

const SALES_HISTORY_DATA = [
    { day: "Seg", sales: 1200 },
    { day: "Ter", sales: 1850 },
    { day: "Qua", sales: 1400 },
    { day: "Qui", sales: 2100 },
    { day: "Sex", sales: 1900 },
    { day: "Sáb", sales: 2800 },
    { day: "Dom", sales: 3148 }
];

// ==========================================================================
// STATE MANAGEMENT
// ==========================================================================
const state = {
    products: DEFAULT_PRODUCTS,
    promotions: DEFAULT_PROMOTIONS,
    customers: DEFAULT_CUSTOMERS,
    cart: [],
    cep: '',
    activeCategory: 'todos',
    searchQuery: '',
    selectedTypes: [],
    selectedBrands: [],
    selectedDosages: [],
    maxPrice: 150,
    currentSlide: 0,
    isAdmin: false,
    currentUser: null,
    adminPassword: 'admin123'
};

// Safe JSON parser helper
function safeJSONParse(key, fallback) {
    try {
        const item = localStorage.getItem(key);
        if (!item) return fallback;
        if (item.startsWith('{') || item.startsWith('[')) {
            return JSON.parse(item);
        }
        return { email: item, role: 'customer' }; 
    } catch (e) {
        console.error("Error parsing localStorage key " + key, e);
        return fallback;
    }
}

// Load state with robust parsing
state.products = safeJSONParse('farmacia_products', DEFAULT_PRODUCTS);
state.promotions = safeJSONParse('farmacia_promotions', DEFAULT_PROMOTIONS);
state.customers = safeJSONParse('farmacia_customers', DEFAULT_CUSTOMERS);
state.cart = safeJSONParse('farmacia_cart', []);
state.cep = localStorage.getItem('farmacia_cep') || '';
state.currentUser = safeJSONParse('farmacia_user', null);
state.adminPassword = localStorage.getItem('farmacia_admin_password') || 'admin123';

// Helper to format/extract first name from email or user input
function getUserFirstName(user) {
    if (!user || !user.email) return 'Minha Conta';
    const email = user.email;
    const namePart = email.split('@')[0];
    const firstPart = namePart.split('.')[0].split('_')[0].split('-')[0];
    return firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
}

// ==========================================================================
// CORE INITIALIZER (RUNS SAFELY REGARDLESS OF DOM STATE)
// ==========================================================================
function initApp() {
    console.log('[BioSaude] initApp() starting...');
    runSafeInit(initCarousel, "Carousel");
    runSafeInit(initCEP, "CEP");
    runSafeInit(initCart, "Cart");
    runSafeInit(initAuth, "Authentication");
    runSafeInit(rebuildFiltersUI, "Filters UI Builder");
    runSafeInit(renderProducts, "Storefront Products");
    runSafeInit(initAdminPanel, "Admin Panel Setup");
    runSafeInit(initAdminPromos, "Admin Promos Setup");
    runSafeInit(initAdminCustomers, "Admin Customers Setup");
    runSafeInit(initModalOverlayClicks, "Modal Overlay Clicks");
    
    // Auto-login view switch if saved user is admin
    if (state.currentUser && state.currentUser.role === 'admin') {
        state.isAdmin = true;
        const adminView = document.getElementById('admin-view');
        const storefrontView = document.getElementById('storefront-view');
        if (adminView && storefrontView) {
            adminView.style.display = 'flex';
            storefrontView.style.display = 'none';
            runSafeInit(renderAdminProductsTable, "Admin Products Table");
            runSafeInit(drawSalesChart, "Sales Chart");
        }
    }
    
    safeLucideInit();
    console.log('[BioSaude] initApp() completed successfully.');
}

function safeLucideInit() {
    try {
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        } else {
            console.warn('[BioSaude] Lucide not loaded yet, retrying in 500ms...');
            setTimeout(() => {
                try {
                    if (typeof lucide !== 'undefined' && lucide.createIcons) {
                        lucide.createIcons();
                        console.log('[BioSaude] Lucide icons loaded on retry.');
                    }
                } catch (e2) {
                    console.error('[BioSaude] Lucide retry failed', e2);
                }
            }, 500);
        }
    } catch (e) {
        console.error('[BioSaude] Lucide load failed', e);
    }
}

// Close modals when clicking the dark overlay background
function initModalOverlayClicks() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            // Only close if clicking directly on the overlay, not its children
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
}

// Ensure the code runs immediately if DOM is already parsed
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // Small delay to ensure Lucide script has loaded
    setTimeout(initApp, 50);
}

function runSafeInit(fn, name) {
    try {
        fn();
    } catch (e) {
        console.error(`[Error in ${name} Initialization]:`, e);
    }
}

// ==========================================================================
// AUTHENTICATION & LOGIN/LOGOUT
// ==========================================================================
function initAuth() {
    console.log('[BioSaude] initAuth() starting...');
    const accountBtn = document.getElementById('account-btn');
    const accountBtnText = document.getElementById('account-btn-text');
    const loginModal = document.getElementById('login-modal');
    const closeLoginModal = document.getElementById('close-login-modal');
    const loginForm = document.getElementById('login-form');
    const loginFeedback = document.getElementById('login-feedback');
    
    console.log('[BioSaude] accountBtn:', !!accountBtn, '| loginModal:', !!loginModal, '| loginForm:', !!loginForm);
    
    if (!accountBtn || !loginModal || !loginForm) {
        console.error('[BioSaude] CRITICAL: Authentication DOM elements missing!', { accountBtn: !!accountBtn, loginModal: !!loginModal, loginForm: !!loginForm });
        return;
    }
    
    // Update button display text
    updateAccountButtonText();
    
    // Direct click trigger logic
    accountBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('[BioSaude] Account button clicked. currentUser:', state.currentUser);
        
        if (state.currentUser) {
            // Already logged in: Click performs logout
            if (confirm(`Deseja desconectar a conta de ${getUserFirstName(state.currentUser)}?`)) {
                state.currentUser = null;
                state.isAdmin = false;
                localStorage.removeItem('farmacia_user');
                
                updateAccountButtonText();
                
                const adminView = document.getElementById('admin-view');
                const storefrontView = document.getElementById('storefront-view');
                if (adminView) adminView.style.display = 'none';
                if (storefrontView) storefrontView.style.display = 'flex';
                
                showGlobalNotification('Desconectado com sucesso!');
            }
        } else {
            // Not logged in: Show login panel
            console.log('[BioSaude] Opening login modal...');
            loginModal.classList.add('active');
            if (loginFeedback) loginFeedback.style.display = 'none';
            // Focus on email input for UX
            const emailInput = document.getElementById('login-email');
            if (emailInput) setTimeout(() => emailInput.focus(), 100);
        }
    });
    
    if (closeLoginModal) {
        closeLoginModal.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });
    }
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('login-email');
        const passInput = document.getElementById('login-password');
        if (!emailInput || !passInput) return;
        
        const email = emailInput.value.trim();
        const pass = passInput.value;
        
        if (loginFeedback) loginFeedback.style.display = 'block';
        
        // ADMIN TRIGGER LOGIC
        if (email.toLowerCase() === 'admin@biosaude.com') {
            if (pass === state.adminPassword) {
                state.isAdmin = true;
                state.currentUser = { email: email, role: 'admin' };
                localStorage.setItem('farmacia_user', JSON.stringify(state.currentUser));
                
                if (loginFeedback) {
                    loginFeedback.className = 'login-feedback-message success';
                    loginFeedback.textContent = 'Autenticado como Admin! Redirecionando...';
                }
                
                updateAccountButtonText();
                
                setTimeout(() => {
                    loginModal.classList.remove('active');
                    const adminView = document.getElementById('admin-view');
                    const storefrontView = document.getElementById('storefront-view');
                    if (adminView) adminView.style.display = 'flex';
                    if (storefrontView) storefrontView.style.display = 'none';
                    
                    renderAdminProductsTable();
                    drawSalesChart();
                    loginForm.reset();
                }, 1000);
            } else {
                if (loginFeedback) {
                    loginFeedback.className = 'login-feedback-message error';
                    loginFeedback.textContent = 'Senha incorreta para o administrador.';
                }
            }
        } else {
            // Simulated Client User sign in (Passwords are NOT stored/visible)
            state.currentUser = { email: email, role: 'customer' };
            localStorage.setItem('farmacia_user', JSON.stringify(state.currentUser));
            
            if (loginFeedback) {
                loginFeedback.className = 'login-feedback-message success';
                loginFeedback.textContent = 'Conectado com sucesso!';
            }
            
            updateAccountButtonText();
            
            setTimeout(() => {
                loginModal.classList.remove('active');
                loginForm.reset();
            }, 1000);
        }
    });
}

function updateAccountButtonText() {
    const accountBtnText = document.getElementById('account-btn-text');
    if (!accountBtnText) return;
    
    if (state.currentUser) {
        if (state.currentUser.role === 'admin') {
            accountBtnText.textContent = 'Admin';
        } else {
            accountBtnText.textContent = getUserFirstName(state.currentUser);
        }
    } else {
        accountBtnText.textContent = 'Minha Conta';
    }
}

function showGlobalNotification(text) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = 'var(--secondary)';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = 'var(--border-radius-sm)';
    toast.style.boxShadow = 'var(--box-shadow-lg)';
    toast.style.zIndex = '9999';
    toast.style.fontSize = '13px';
    toast.style.fontWeight = '700';
    toast.textContent = text;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2500);
}

// ==========================================================================
// ADMIN DASHBOARD CORE FUNCTIONALITIES & CRUD
// ==========================================================================
function initAdminPanel() {
    const navButtons = document.querySelectorAll('.admin-nav-btn[data-target]');
    const logoutBtn = document.getElementById('admin-logout-btn');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const target = btn.dataset.target;
            document.querySelectorAll('.admin-section').forEach(sec => {
                sec.classList.remove('active');
            });
            
            const targetSec = document.getElementById(target);
            if (targetSec) targetSec.classList.add('active');
            
            if (target === 'admin-dashboard') {
                drawSalesChart();
            }
        });
    });
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            state.currentUser = null;
            state.isAdmin = false;
            localStorage.removeItem('farmacia_user');
            
            updateAccountButtonText();
            
            const adminView = document.getElementById('admin-view');
            const storefrontView = document.getElementById('storefront-view');
            if (adminView) adminView.style.display = 'none';
            if (storefrontView) storefrontView.style.display = 'flex';
            
            rebuildFiltersUI();
            renderProducts();
            renderPromoProducts();
            showGlobalNotification('Sessão encerrada!');
        });
    }
    
    const crudForm = document.getElementById('product-crud-form');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    
    if (crudForm) {
        crudForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveProductFromForm();
        });
    }
    
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', () => {
            resetCrudForm();
        });
    }
    
    const changePasswordForm = document.getElementById('change-password-form');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            changeAdminPassword();
        });
    }
}

// Draw SVG Sales performance charts
function drawSalesChart() {
    const wrapper = document.getElementById('sales-chart-wrapper');
    if (!wrapper) return;
    
    const width = wrapper.clientWidth || 600;
    const height = 240;
    const paddingLeft = 50;
    const paddingBottom = 40;
    const paddingTop = 20;
    const paddingRight = 20;
    
    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;
    
    const maxSales = Math.max(...SALES_HISTORY_DATA.map(d => d.sales)) * 1.1;
    
    const points = SALES_HISTORY_DATA.map((d, index) => {
        const x = paddingLeft + (index / (SALES_HISTORY_DATA.length - 1)) * chartWidth;
        const y = height - paddingBottom - (d.sales / maxSales) * chartHeight;
        return { x, y, day: d.day, sales: d.sales };
    });
    
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        const cpX1 = points[i-1].x + (points[i].x - points[i-1].x) / 2;
        const cpY1 = points[i-1].y;
        const cpX2 = points[i-1].x + (points[i].x - points[i-1].x) / 2;
        const cpY2 = points[i].y;
        pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i].x} ${points[i].y}`;
    }
    
    const fillD = `${pathD} L ${points[points.length-1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;
    
    let svgContent = `
        <svg class="svg-chart" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--primary)" stop-opacity="0.2"/>
                    <stop offset="100%" stop-color="var(--primary)" stop-opacity="0.0"/>
                </linearGradient>
            </defs>
            <line x1="${paddingLeft}" y1="${paddingTop}" x2="${width - paddingRight}" y2="${paddingTop}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4"/>
            <line x1="${paddingLeft}" y1="${paddingTop + chartHeight/2}" x2="${width - paddingRight}" y2="${paddingTop + chartHeight/2}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4"/>
            <line x1="${paddingLeft}" y1="${height - paddingBottom}" x2="${width - paddingRight}" y2="${height - paddingBottom}" stroke="#cbd5e1" stroke-width="1.5"/>
            <path d="${fillD}" fill="url(#chartGradient)"/>
            <path d="${pathD}" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round"/>
            <text x="${paddingLeft - 10}" y="${paddingTop + 4}" fill="#64748b" font-size="10" font-weight="600" text-anchor="end">R$ ${(maxSales).toFixed(0)}</text>
            <text x="${paddingLeft - 10}" y="${paddingTop + chartHeight/2 + 4}" fill="#64748b" font-size="10" font-weight="600" text-anchor="end">R$ ${(maxSales/2).toFixed(0)}</text>
            <text x="${paddingLeft - 10}" y="${height - paddingBottom + 4}" fill="#64748b" font-size="10" font-weight="600" text-anchor="end">R$ 0</text>
    `;
    
    points.forEach(pt => {
        svgContent += `
            <circle cx="${pt.x}" cy="${pt.y}" r="4.5" fill="white" stroke="var(--primary)" stroke-width="2"/>
            <text x="${pt.x}" y="${height - paddingBottom + 18}" fill="#64748b" font-size="10" font-weight="700" text-anchor="middle">${pt.day}</text>
            <text x="${pt.x}" y="${pt.y - 10}" fill="#0f172a" font-size="9" font-weight="800" text-anchor="middle">R$ ${pt.sales}</text>
        `;
    });
    
    svgContent += `</svg>`;
    wrapper.innerHTML = svgContent;
}

// CRUD: Listing Products
function renderAdminProductsTable() {
    const tableBody = document.getElementById('admin-products-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    state.products.forEach(prod => {
        const tr = document.createElement('tr');
        
        let promoText = '-';
        if (prod.leve3Pague2) {
            promoText = '<span style="color: var(--accent-red); font-weight: 700">Leve 3 Pague 2</span>';
        } else if (prod.discount > 0) {
            promoText = `<span style="color: var(--accent-orange); font-weight: 700">${prod.discount}% OFF</span>`;
        }
        
        tr.innerHTML = `
            <td>
                <div class="table-product-cell">
                    <span class="table-product-name">${prod.name}</span>
                    <span class="table-product-meta">${prod.quantity} - ${prod.dosage} (${prod.category})</span>
                </div>
            </td>
            <td>${prod.brand}</td>
            <td>
                <div class="table-product-cell">
                    <span style="font-weight: 700">R$ ${prod.priceCurrent.toFixed(2)}</span>
                    ${prod.priceOriginal ? `<span style="font-size:10px; text-decoration:line-through; color:var(--text-light)">De: R$ ${prod.priceOriginal.toFixed(2)}</span>` : ''}
                </div>
            </td>
            <td>${promoText}</td>
            <td>
                <div class="table-actions">
                    <button class="table-btn edit" data-id="${prod.id}" title="Editar Produto">
                        <i data-lucide="edit-3"></i>
                    </button>
                    <button class="table-btn delete" data-id="${prod.id}" title="Excluir Produto">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </td>
        `;
        
        tr.querySelector('.table-btn.edit').addEventListener('click', () => editProductFromTable(prod.id));
        tr.querySelector('.table-btn.delete').addEventListener('click', () => deleteProductFromTable(prod.id));
        
        tableBody.appendChild(tr);
    });
    
    try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e) {}
}

function saveProductFromForm() {
    const editIdVal = document.getElementById('edit-product-id').value;
    const name = document.getElementById('prod-name').value.trim();
    const qty = document.getElementById('prod-qty').value.trim();
    const brand = document.getElementById('prod-brand').value.trim();
    const dosage = document.getElementById('prod-dosage').value.trim();
    const category = document.getElementById('prod-category').value;
    const type = document.getElementById('prod-type').value;
    const priceOriginalVal = parseFloat(document.getElementById('prod-price').value);
    const discountVal = parseInt(document.getElementById('prod-discount').value) || 0;
    const imageUrl = document.getElementById('prod-image').value.trim();
    const leve3Pague2 = document.getElementById('prod-promo-type').checked;
    
    let priceCurrent = priceOriginalVal;
    let priceOriginal = null;
    
    if (discountVal > 0) {
        priceOriginal = priceOriginalVal;
        priceCurrent = priceOriginalVal - (priceOriginalVal * (discountVal / 100));
    }
    
    let fallbackImg = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=60';
    if (category === 'beleza') fallbackImg = 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&auto=format&fit=crop&q=60';
    if (category === 'vitaminas') fallbackImg = 'https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?w=300&auto=format&fit=crop&q=60';
    if (category === 'cuidados') fallbackImg = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=60';
    if (category === 'bebe') fallbackImg = 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=60';
    
    const finalImage = imageUrl || fallbackImg;
    
    if (editIdVal) {
        const id = parseInt(editIdVal);
        const index = state.products.findIndex(p => p.id === id);
        if (index !== -1) {
            state.products[index] = {
                id,
                name,
                quantity: qty,
                brand,
                category,
                type,
                priceOriginal,
                priceCurrent,
                discount: discountVal,
                dosage,
                image: finalImage,
                leve3Pague2
            };
            showGlobalNotification('Produto atualizado!');
        }
    } else {
        const newId = state.products.length > 0 ? Math.max(...state.products.map(p => p.id)) + 1 : 1;
        state.products.push({
            id: newId,
            name,
            quantity: qty,
            brand,
            category,
            type,
            priceOriginal,
            priceCurrent,
            discount: discountVal,
            dosage,
            image: finalImage,
            leve3Pague2
        });
        showGlobalNotification('Produto adicionado com sucesso!');
    }
    
    localStorage.setItem('farmacia_products', JSON.stringify(state.products));
    resetCrudForm();
    renderAdminProductsTable();
}

function editProductFromTable(id) {
    const prod = state.products.find(p => p.id === id);
    if (!prod) return;
    
    document.getElementById('edit-product-id').value = prod.id;
    document.getElementById('prod-name').value = prod.name;
    document.getElementById('prod-qty').value = prod.quantity;
    document.getElementById('prod-brand').value = prod.brand;
    document.getElementById('prod-dosage').value = prod.dosage;
    document.getElementById('prod-category').value = prod.category;
    document.getElementById('prod-type').value = prod.type;
    document.getElementById('prod-price').value = prod.priceOriginal || prod.priceCurrent;
    document.getElementById('prod-discount').value = prod.discount || 0;
    document.getElementById('prod-image').value = prod.image;
    document.getElementById('prod-promo-type').checked = prod.leve3Pague2;
    
    document.getElementById('form-title-text').textContent = 'Editar Produto';
    document.getElementById('save-product-btn').textContent = 'Salvar Alterações';
    
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    if (cancelEditBtn) cancelEditBtn.style.display = 'block';
}

function deleteProductFromTable(id) {
    if (confirm('Deseja realmente remover este produto?')) {
        state.products = state.products.filter(p => p.id !== id);
        localStorage.setItem('farmacia_products', JSON.stringify(state.products));
        renderAdminProductsTable();
        showGlobalNotification('Produto removido.');
    }
}

function resetCrudForm() {
    const crudForm = document.getElementById('product-crud-form');
    if (crudForm) crudForm.reset();
    
    const editId = document.getElementById('edit-product-id');
    if (editId) editId.value = '';
    
    const formTitle = document.getElementById('form-title-text');
    if (formTitle) formTitle.textContent = 'Adicionar Novo Produto';
    
    const saveBtn = document.getElementById('save-product-btn');
    if (saveBtn) saveBtn.textContent = 'Salvar Produto';
    
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    if (cancelEditBtn) cancelEditBtn.style.display = 'none';
}

function changeAdminPassword() {
    const currentPass = document.getElementById('current-pass').value;
    const newPass = document.getElementById('new-pass').value;
    const confirmNewPass = document.getElementById('confirm-new-pass').value;
    
    if (currentPass !== state.adminPassword) {
        alert('Senha atual incorreta.');
        return;
    }
    
    if (newPass.length < 6) {
        alert('A nova senha deve possuir pelo menos 6 caracteres.');
        return;
    }
    
    if (newPass !== confirmNewPass) {
        alert('As senhas não coincidem.');
        return;
    }
    
    state.adminPassword = newPass;
    localStorage.setItem('farmacia_admin_password', newPass);
    
    alert('Senha alterada com sucesso!');
    document.getElementById('change-password-form').reset();
}

// ==========================================================================
// CAROUSEL BANNER CONTROLLER
// ==========================================================================
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (!prevBtn || !nextBtn || slides.length === 0) return;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        state.currentSlide = (index + slides.length) % slides.length;
        
        if (slides[state.currentSlide]) slides[state.currentSlide].classList.add('active');
        if (indicators[state.currentSlide]) indicators[state.currentSlide].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => showSlide(state.currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(state.currentSlide + 1));
    
    indicators.forEach(ind => {
        ind.addEventListener('click', (e) => {
            const slideIndex = parseInt(e.target.dataset.slide);
            showSlide(slideIndex);
        });
    });
    
    setInterval(() => {
        showSlide(state.currentSlide + 1);
    }, 6000);
}

// ==========================================================================
// CEP / POSTAL CODE HANDLER
// ==========================================================================
function initCEP() {
    const cepTrigger = document.getElementById('cep-trigger');
    const cepModal = document.getElementById('cep-modal');
    const closeCepModal = document.getElementById('close-cep-modal');
    const applyCepBtn = document.getElementById('apply-cep-btn');
    const cepInputField = document.getElementById('cep-input-field');
    const cepResults = document.getElementById('cep-results');
    const currentCepEl = document.getElementById('current-cep');
    
    if (!cepTrigger || !cepModal) return;
    
    if (state.cep && currentCepEl) {
        currentCepEl.textContent = state.cep;
    }
    
    cepTrigger.addEventListener('click', () => {
        cepModal.classList.add('active');
        if (cepInputField) cepInputField.value = state.cep;
    });
    
    if (closeCepModal) {
        closeCepModal.addEventListener('click', () => {
            cepModal.classList.remove('active');
            if (cepResults) cepResults.style.display = 'none';
        });
    }
    
    if (applyCepBtn) {
        applyCepBtn.addEventListener('click', () => {
            if (!cepInputField) return;
            const value = cepInputField.value.trim();
            if (value.length >= 8) {
                state.cep = value;
                localStorage.setItem('farmacia_cep', value);
                if (currentCepEl) currentCepEl.textContent = value;
                if (cepResults) cepResults.style.display = 'block';
                
                setTimeout(() => {
                    cepModal.classList.remove('active');
                    if (cepResults) cepResults.style.display = 'none';
                }, 1200);
            } else {
                alert('Por favor, digite um CEP válido.');
            }
        });
    }
}

// ==========================================================================
// FILTERS SETUP (BUILD DYNAMIC BRAND AND DOSAGES CHECKBOXES)
// ==========================================================================
function rebuildFiltersUI() {
    const searchInput = document.getElementById('search-input');
    const clearSearch = document.getElementById('clear-search');
    const categoryBadges = document.querySelectorAll('.category-badge');
    const priceRange = document.getElementById('price-range');
    const priceMaxDisplay = document.getElementById('price-max-display');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    
    const brands = [...new Set(state.products.map(p => p.brand))].sort();
    const dosages = [...new Set(state.products.map(p => p.dosage))].sort();
    
    const brandContainer = document.getElementById('brand-filters-container');
    if (brandContainer) {
        brandContainer.innerHTML = '';
        brands.forEach(brand => {
            const label = document.createElement('label');
            label.className = 'filter-label';
            label.innerHTML = `
                <input type="checkbox" name="brand" value="${brand}" class="filter-checkbox">
                <span>${brand}</span>
            `;
            brandContainer.appendChild(label);
        });
    }
    
    const dosageContainer = document.getElementById('dosage-filters-container');
    if (dosageContainer) {
        dosageContainer.innerHTML = '';
        dosages.forEach(dosage => {
            const label = document.createElement('label');
            label.className = 'filter-label';
            label.innerHTML = `
                <input type="checkbox" name="dosage" value="${dosage}" class="filter-checkbox">
                <span>${dosage}</span>
            `;
            dosageContainer.appendChild(label);
        });
    }
    
    if (searchInput && !searchInput.dataset.bound) {
        searchInput.dataset.bound = "true";
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.toLowerCase();
            if (clearSearch) clearSearch.style.display = state.searchQuery ? 'block' : 'none';
            renderProducts();
        });
        
        if (clearSearch) {
            clearSearch.addEventListener('click', () => {
                searchInput.value = '';
                state.searchQuery = '';
                clearSearch.style.display = 'none';
                renderProducts();
            });
        }
        
        categoryBadges.forEach(badge => {
            badge.addEventListener('click', () => {
                categoryBadges.forEach(b => b.classList.remove('active'));
                badge.classList.add('active');
                state.activeCategory = badge.dataset.category;
                renderProducts();
            });
        });
        
        if (priceRange) {
            priceRange.addEventListener('input', (e) => {
                state.maxPrice = parseFloat(e.target.value);
                if (priceMaxDisplay) priceMaxDisplay.textContent = `R$ ${state.maxPrice}`;
                renderProducts();
            });
        }
        
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                document.querySelectorAll('.filter-checkbox').forEach(chk => chk.checked = false);
                if (priceRange) priceRange.value = 150;
                if (priceMaxDisplay) priceMaxDisplay.textContent = 'R$ 150';
                
                state.selectedTypes = [];
                state.selectedBrands = [];
                state.selectedDosages = [];
                state.maxPrice = 150;
                
                renderProducts();
            });
        }

        document.querySelectorAll('.promo-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.dataset.categoryTarget;
                const targetBadge = document.querySelector(`.category-badge[data-category="${cat}"]`);
                if (targetBadge) {
                    targetBadge.click();
                    const vitrineEl = document.getElementById('vitrine');
                    if (vitrineEl) vitrineEl.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    document.querySelectorAll('.filter-checkbox').forEach(chk => {
        chk.removeEventListener('change', handleCheckboxFilterChange);
        chk.addEventListener('change', handleCheckboxFilterChange);
    });
}

function handleCheckboxFilterChange() {
    updateSelectedFilters();
    renderProducts();
}

function updateSelectedFilters() {
    state.selectedTypes = Array.from(document.querySelectorAll('input[name="product-type"]:checked')).map(chk => chk.value);
    state.selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(chk => chk.value);
    state.selectedDosages = Array.from(document.querySelectorAll('input[name="dosage"]:checked')).map(chk => chk.value);
}

// ==========================================================================
// PRODUCT RENDERING (STOREFRONT VIEW)
// ==========================================================================
function renderProducts() {
    const container = document.getElementById('offers-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    const filtered = state.products.filter(prod => {
        const matchesCategory = state.activeCategory === 'todos' || prod.category === state.activeCategory;
        const matchesSearch = prod.name.toLowerCase().includes(state.searchQuery) || 
                              prod.brand.toLowerCase().includes(state.searchQuery);
        const matchesType = state.selectedTypes.length === 0 || state.selectedTypes.includes(prod.type);
        const matchesBrand = state.selectedBrands.length === 0 || state.selectedBrands.includes(prod.brand);
        const matchesDosage = state.selectedDosages.length === 0 || state.selectedDosages.includes(prod.dosage);
        const matchesPrice = prod.priceCurrent <= state.maxPrice;
        
        return matchesCategory && matchesSearch && matchesType && matchesBrand && matchesDosage && matchesPrice;
    });
    
    const resultsText = document.getElementById('results-count-text');
    if (resultsText) {
        resultsText.textContent = filtered.length === 1 ? '1 produto encontrado' : `${filtered.length} produtos encontrados`;
    }
        
    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i data-lucide="info" style="width: 40px; height: 40px; margin-bottom: 10px; color: var(--text-light);"></i>
                <p style="font-weight: 600;">Nenhum produto atende aos filtros selecionados.</p>
            </div>
        `;
        try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e) {}
        return;
    }
    
    filtered.forEach(prod => {
        const card = createProductCard(prod);
        container.appendChild(card);
    });
    
    try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e) {}
}

function getPromotedProduct(prod) {
    // Clone product to avoid mutating original state
    const p = { ...prod, promoBadge: null };
    
    const promo = state.promotions.find(pr => Number(pr.productId) === p.id && pr.active);
    if (!promo) return p;

    if (promo.type === 'discount') {
        p.priceCurrent = p.priceOriginal * (1 - promo.value / 100);
        p.discount = promo.value;
        p.promoBadge = `<span class="badge-info" style="background-color: var(--accent-red-light); color: var(--accent-red)">${promo.value}% OFF Extra</span>`;
    } else if (promo.type === 'bogo') {
        p.promoBadge = `<span class="badge-info" style="background-color: #fef08a; color: #854d0e">Leve ${promo.valueTake} Pague ${promo.valuePay}</span>`;
    } else if (promo.type === 'cashback') {
        p.promoBadge = `<span class="badge-info" style="background-color: #dcfce7; color: #166534">Cashback R$ ${Number(promo.value).toFixed(2)}</span>`;
    }

    p.promoType = promo.type;
    return p;
}

function createProductCard(rawProd) {
    const prod = getPromotedProduct(rawProd);
    
    const card = document.createElement('div');
    card.className = 'product-card';
    
    let badgeMarkup = '';
    if (prod.promoBadge) {
        badgeMarkup = prod.promoBadge;
    } else if (prod.type === 'generico') {
        badgeMarkup = `<span class="badge-info generic">Genérico</span>`;
    }
    
    card.innerHTML = `
        ${prod.discount ? `<span class="discount-tag">${prod.discount}% OFF</span>` : ''}
        <div class="product-image-container">
            <img src="${prod.image}" alt="${prod.name}">
        </div>
        <div class="product-info-block">
            <span class="product-brand">${prod.brand}</span>
            <h4 class="product-name">${prod.name} - ${prod.quantity}</h4>
            <div class="product-badge-info">
                ${badgeMarkup}
            </div>
        </div>
        <div class="product-price-block">
            ${prod.priceOriginal > prod.priceCurrent ? `<div class="price-de">De: R$ ${prod.priceOriginal.toFixed(2)}</div>` : ''}
            <div class="price-por"><span>R$</span> ${prod.priceCurrent.toFixed(2)}</div>
        </div>
        <button class="buy-btn" data-product-id="${prod.id}">
            <i data-lucide="shopping-cart"></i>
            <span>Comprar</span>
        </button>
    `;
    
    const buyBtn = card.querySelector('.buy-btn');
    buyBtn.addEventListener('click', () => {
        addToCart(rawProd, buyBtn); // Pass original, cart calculates promo later if needed
    });
    
    return card;
}

// ==========================================================================
// CART / DRAWER & PROMOTION LOGIC (LEVE 3 PAGUE 2)
// ==========================================================================
function initCart() {
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const continueShopping = document.getElementById('continue-shopping');
    
    if (!cartBtn || !cartDrawer) return;
    
    cartBtn.addEventListener('click', () => cartDrawer.classList.add('active'));
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => cartDrawer.classList.remove('active'));
    if (cartBackdrop) cartBackdrop.addEventListener('click', () => cartDrawer.classList.remove('active'));
    if (continueShopping) continueShopping.addEventListener('click', () => cartDrawer.classList.remove('active'));
    
    updateCartUI();
}

function addToCart(product, button) {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        state.cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('farmacia_cart', JSON.stringify(state.cart));
    updateCartUI();
    
    const btnSpan = button.querySelector('span');
    const btnIcon = button.querySelector('i');
    
    button.classList.add('added');
    if (btnSpan) btnSpan.textContent = 'Adicionado!';
    if (btnIcon) btnIcon.setAttribute('data-lucide', 'check');
    try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e) {}
    
    setTimeout(() => {
        const cartDrawer = document.getElementById('cart-drawer');
        if (cartDrawer) cartDrawer.classList.add('active');
        
        button.classList.remove('added');
        if (btnSpan) btnSpan.textContent = 'Comprar';
        if (btnIcon) btnIcon.setAttribute('data-lucide', 'shopping-cart');
        try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e) {}
    }, 600);
}

function updateCartUI() {
    const cartCountEl = document.getElementById('cart-count');
    const cartEmptyEl = document.getElementById('cart-empty');
    const cartItemsEl = document.getElementById('cart-items');
    const cartSummaryEl = document.getElementById('cart-summary');
    
    if (!cartCountEl) return;
    
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
    
    if (state.cart.length === 0) {
        if (cartEmptyEl) cartEmptyEl.style.display = 'flex';
        if (cartItemsEl) cartItemsEl.style.display = 'none';
        if (cartSummaryEl) cartSummaryEl.style.display = 'none';
        return;
    }
    
    if (cartEmptyEl) cartEmptyEl.style.display = 'none';
    if (cartItemsEl) cartItemsEl.style.display = 'flex';
    if (cartSummaryEl) cartSummaryEl.style.display = 'flex';
    
    if (cartItemsEl) {
        cartItemsEl.innerHTML = '';
        
        state.cart.forEach(rawItem => {
            const item = getPromotedProduct(rawItem);
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <div class="cart-item-price">R$ ${item.priceCurrent.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="qty-btn minus" data-id="${item.id}">-</button>
                            <span class="qty-val">${rawItem.quantity}</span>
                            <button class="qty-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item-btn" data-id="${item.id}">
                            <i data-lucide="trash-2"></i> Excluir
                        </button>
                    </div>
                </div>
            `;
            
            itemEl.querySelector('.qty-btn.minus').addEventListener('click', () => changeQuantity(item.id, -1));
            itemEl.querySelector('.qty-btn.plus').addEventListener('click', () => changeQuantity(item.id, 1));
            itemEl.querySelector('.remove-item-btn').addEventListener('click', () => removeItem(item.id));
            
            cartItemsEl.appendChild(itemEl);
        });
    }
    
    calculateTotals();
    try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e) {}
}

function changeQuantity(id, delta) {
    const item = state.cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeItem(id);
            return;
        }
        localStorage.setItem('farmacia_cart', JSON.stringify(state.cart));
        updateCartUI();
    }
}

function removeItem(id) {
    state.cart = state.cart.filter(item => item.id !== id);
    localStorage.setItem('farmacia_cart', JSON.stringify(state.cart));
    updateCartUI();
}

function calculateTotals() {
    let subtotal = 0;
    let promoDiscount = 0;
    
    state.cart.forEach(rawItem => {
        const item = getPromotedProduct(rawItem);
        subtotal += item.priceCurrent * rawItem.quantity;
        
        if (item.promoType === 'bogo') {
            const promo = state.promotions.find(p => Number(p.productId) === item.id && p.active);
            if (promo) {
                const take = Number(promo.valueTake);
                const pay = Number(promo.valuePay);
                const freeItemsPerSet = take - pay;
                const numSets = Math.floor(rawItem.quantity / take);
                
                promoDiscount += (numSets * freeItemsPerSet) * item.priceCurrent;
            }
        }
    });
    
    const total = subtotal - promoDiscount;
    
    const subtotalEl = document.getElementById('cart-subtotal');
    if (subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
    
    const discountRow = document.getElementById('cart-discount-row');
    const discountEl = document.getElementById('cart-discount');
    if (promoDiscount > 0) {
        if (discountRow) discountRow.style.display = 'flex';
        if (discountEl) discountEl.textContent = `-R$ ${promoDiscount.toFixed(2)}`;
    } else {
        if (discountRow) discountRow.style.display = 'none';
    }
    
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = `R$ ${total.toFixed(2)}`;
}

// ==========================================================================
// ADMIN PROMOTIONS
// ==========================================================================
function initAdminPromos() {
    const typeSelect = document.getElementById('promo-type');
    const valueGroup = document.getElementById('promo-value-group');
    const bogoGroup = document.getElementById('promo-bogo-group');
    const valueLabel = document.getElementById('promo-value-label');
    const form = document.getElementById('promo-crud-form');
    
    if (!typeSelect || !form) return;
    
    typeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'bogo') {
            valueGroup.style.display = 'none';
            bogoGroup.style.display = 'flex';
        } else {
            valueGroup.style.display = 'block';
            bogoGroup.style.display = 'none';
            valueLabel.textContent = e.target.value === 'discount' ? 'Valor do Desconto (%)' : 'Valor do Cashback (R$)';
        }
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const productId = document.getElementById('promo-product').value;
        const type = typeSelect.value;
        const newPromo = {
            id: 'promo_' + Date.now(),
            productId: Number(productId),
            type: type,
            value: type === 'bogo' ? 0 : Number(document.getElementById('promo-value').value),
            valueTake: type === 'bogo' ? Number(document.getElementById('promo-take').value) : 0,
            valuePay: type === 'bogo' ? Number(document.getElementById('promo-pay').value) : 0,
            active: true
        };
        
        // Remove existing promo for this product
        state.promotions = state.promotions.filter(p => p.productId !== newPromo.productId);
        state.promotions.push(newPromo);
        
        localStorage.setItem('farmacia_promotions', JSON.stringify(state.promotions));
        renderAdminPromosTable();
        renderProducts(); // Update storefront immediately
        form.reset();
        typeSelect.dispatchEvent(new Event('change'));
        showGlobalNotification('Promoção ativada com sucesso!');
    });
    
    renderAdminPromosTable();
}

function renderAdminPromosTable() {
    // populate select
    const select = document.getElementById('promo-product');
    if (select) {
        select.innerHTML = '<option value="">Selecione um produto...</option>';
        state.products.forEach(p => {
            select.innerHTML += `<option value="${p.id}">${p.name}</option>`;
        });
    }
    
    const tbody = document.getElementById('admin-promos-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const activePromos = state.promotions.filter(p => p.active);
    if (activePromos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center">Nenhuma promoção ativa.</td></tr>`;
        return;
    }
    
    activePromos.forEach(promo => {
        const product = state.products.find(p => p.id === promo.productId);
        if (!product) return;
        
        let ruleText = '';
        if (promo.type === 'discount') ruleText = `${promo.value}% de Desconto`;
        else if (promo.type === 'bogo') ruleText = `Leve ${promo.valueTake} Pague ${promo.valuePay}`;
        else if (promo.type === 'cashback') ruleText = `R$ ${promo.value.toFixed(2)} de Cashback`;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="table-product-cell">
                    <span class="table-product-name">${product.name}</span>
                </div>
            </td>
            <td>${promo.type.toUpperCase()}</td>
            <td><span class="badge-info">${ruleText}</span></td>
            <td>
                <button class="table-btn delete" onclick="deletePromo('${promo.id}')" title="Desativar">
                    <i data-lucide="trash-2"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e) {}
}

window.deletePromo = function(id) {
    if (confirm('Deseja realmente desativar esta promoção?')) {
        state.promotions = state.promotions.filter(p => p.id !== id);
        localStorage.setItem('farmacia_promotions', JSON.stringify(state.promotions));
        renderAdminPromosTable();
        renderProducts();
        showGlobalNotification('Promoção desativada.');
    }
};

// ==========================================================================
// ADMIN CUSTOMERS & CASHBACK
// ==========================================================================
function initAdminCustomers() {
    renderAdminCustomersTable();
}

function renderAdminCustomersTable() {
    const tbody = document.getElementById('admin-customers-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    let totalCashback = 0;
    
    state.customers.forEach(customer => {
        totalCashback += customer.cashbackBalance;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><span class="table-product-name">${customer.name}</span></td>
            <td>${customer.email}</td>
            <td>R$ ${customer.totalSpent.toFixed(2)}</td>
            <td>${customer.ordersCount}</td>
            <td><strong style="color:var(--primary)">R$ ${customer.cashbackBalance.toFixed(2)}</strong></td>
            <td>
                <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px" onclick="giveCashback('${customer.id}')">
                    Dar Cashback
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    const totalCustomersMetric = document.getElementById('total-customers-metric');
    const totalCashbackMetric = document.getElementById('total-cashback-metric');
    if (totalCustomersMetric) totalCustomersMetric.textContent = state.customers.length;
    if (totalCashbackMetric) totalCashbackMetric.textContent = `R$ ${totalCashback.toFixed(2)}`;
}

window.giveCashback = function(customerId) {
    const amount = prompt('Digite o valor do cashback a adicionar (R$):');
    if (amount && !isNaN(amount) && Number(amount) > 0) {
        const customer = state.customers.find(c => c.id === customerId);
        if (customer) {
            customer.cashbackBalance += Number(amount);
            localStorage.setItem('farmacia_customers', JSON.stringify(state.customers));
            renderAdminCustomersTable();
            showGlobalNotification(`R$ ${Number(amount).toFixed(2)} de cashback adicionado para ${customer.name}!`);
        }
    }
};
