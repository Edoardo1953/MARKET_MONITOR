document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State
    let monitorItems = JSON.parse(localStorage.getItem('commodities_monitor')) || [];
    const commodityData = [
        // METALLI (Preziosi & Industriali)
        { name: 'Oro (Gold)', symbol: 'XAU/USD', price: 2150.34, change: 0.45, category: 'Metalli' },
        { name: 'Argento (Silver)', symbol: 'XAG/USD', price: 24.82, change: -0.12, category: 'Metalli' },
        { name: 'Rame (Copper)', symbol: 'HG', price: 4.12, change: 0.84, category: 'Metalli' },
        { name: 'Platino', symbol: 'PL', price: 915.20, change: -0.56, category: 'Metalli' },
        { name: 'Palladio', symbol: 'PA', price: 984.45, change: 2.15, category: 'Metalli' },
        { name: 'Alluminio', symbol: 'AL', price: 2240.50, change: 0.32, category: 'Metalli' },
        { name: 'Nichel', symbol: 'NI', price: 17250.00, change: -1.20, category: 'Metalli' },
        { name: 'Zinco', symbol: 'ZN', price: 2480.00, change: 0.45, category: 'Metalli' },
        { name: 'Piombo', symbol: 'PB', price: 2050.00, change: -0.15, category: 'Metalli' },
        { name: 'Stagno', symbol: 'SN', price: 28450.00, change: 1.10, category: 'Metalli' },
        { name: 'Litio (Carbonato)', symbol: 'LI', price: 14200.00, change: -2.30, category: 'Metalli' },
        { name: 'Ferro (Iron Ore)', symbol: 'FE', price: 108.45, change: -0.75, category: 'Metalli' },

        // ENERGIA
        { name: 'Petrolio WTI', symbol: 'WTI', price: 81.42, change: 1.24, category: 'Energia' },
        { name: 'Petrolio Brent', symbol: 'BRENT', price: 86.15, change: 1.05, category: 'Energia' },
        { name: 'Gas Naturale', symbol: 'NG', price: 1.84, change: -3.52, category: 'Energia' },
        { name: 'Gasolio Riscald.', symbol: 'HO', price: 2.72, change: 0.95, category: 'Energia' },
        { name: 'Benzina RBOB', symbol: 'RB', price: 2.68, change: 1.50, category: 'Energia' },
        { name: 'Etanolo', symbol: 'ETH', price: 1.58, change: 0.12, category: 'Energia' },
        { name: 'Uranio (U3O8)', symbol: 'URL', price: 88.50, change: 0.45, category: 'Energia' },
        { name: 'Carbone (Coal)', symbol: 'COAL', price: 132.20, change: -1.05, category: 'Energia' },

        // AGRICOLTURA & SOFTS
        { name: 'Grano (Wheat)', symbol: 'ZW', price: 542.15, change: -1.42, category: 'Agricoltura' },
        { name: 'Mais (Corn)', symbol: 'ZC', price: 432.50, change: -0.85, category: 'Agricoltura' },
        { name: 'Semi di Soia', symbol: 'ZS', price: 1185.75, change: 0.25, category: 'Agricoltura' },
        { name: 'Caffè Arabica', symbol: 'KC', price: 185.30, change: 0.65, category: 'Agricoltura' },
        { name: 'Zucchero #11', symbol: 'SB', price: 21.82, change: -2.10, category: 'Agricoltura' },
        { name: 'Cotone', symbol: 'CT', price: 92.45, change: 1.15, category: 'Agricoltura' },
        { name: 'Cacao', symbol: 'CC', price: 8450.00, change: 4.52, category: 'Agricoltura' },
        { name: 'Succo D\'Arancia', symbol: 'OJ', price: 362.15, change: 2.10, category: 'Agricoltura' },
        { name: 'Legname (Lumber)', symbol: 'LB', price: 585.00, change: -1.50, category: 'Agricoltura' },
        { name: 'Riso Greggio', symbol: 'RR', price: 18.45, change: 0.15, category: 'Agricoltura' },
        { name: 'Bestiame Vivo', symbol: 'LC', price: 1.86, change: 0.42, category: 'Agricoltura' }
    ];

    // 2. DOM Elements
    const searchInput = document.getElementById('commoditySearch');
    const searchResults = document.getElementById('searchResults');
    const monitorList = document.getElementById('monitorList');
    const monitorCount = document.getElementById('monitorCount');
    const refreshBtn = document.getElementById('refreshData');

    // 3. Functions
    let dragSrcEl = null;

    function renderMonitor() {
        if (monitorItems.length === 0) {
            monitorList.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-oil-well"></i>
                    <p>La tua lista è vuota. Usa la barra di ricerca per aggiungere commodities.</p>
                </div>
            `;
            monitorCount.textContent = '0';
            return;
        }

        monitorCount.textContent = monitorItems.length;
        monitorList.innerHTML = '';
        
        monitorItems.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'commodity-row';
            row.setAttribute('draggable', true);
            row.setAttribute('data-index', index);
            
            const changeClass = item.change >= 0 ? 'positive' : 'negative';
            const changeIcon = item.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
            
            row.innerHTML = `
                <div class="drag-handle" title="Trascina per riordinare">
                    <i class="fa-solid fa-grip-vertical"></i>
                </div>
                <div class="clickable-area" style="flex: 1; display:flex; justify-content: space-between; align-items: center; cursor: pointer;">
                    <div class="commodity-info">
                        <span class="commodity-name">${item.name}</span>
                        <span class="commodity-symbol">${item.symbol}</span>
                    </div>
                    <div class="commodity-price-area">
                        <div class="price-box">
                            <div class="price-value">$${item.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                            <div class="price-change ${changeClass}">
                                <i class="fa-solid ${changeIcon}"></i>
                                ${Math.abs(item.change).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                </div>
                <button class="remove-commodity" data-symbol="${item.symbol}" title="Rimuovi">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            
            // Redirect to detail page
            row.querySelector('.clickable-area').addEventListener('click', () => {
                window.location.href = `commodity_detail.html?symbol=${encodeURIComponent(item.symbol)}`;
            });
            
            // Drag and Drop Listeners
            row.addEventListener('dragstart', handleDragStart);
            row.addEventListener('dragover', handleDragOver);
            row.addEventListener('dragenter', handleDragEnter);
            row.addEventListener('dragleave', handleDragLeave);
            row.addEventListener('drop', handleDrop);
            row.addEventListener('dragend', handleDragEnd);

            row.querySelector('.remove-commodity').addEventListener('click', (e) => {
                const sym = e.currentTarget.getAttribute('data-symbol');
                removeCommodity(sym);
            });
            
            monitorList.appendChild(row);
        });
    }

    // Drag and Drop Handlers
    function handleDragStart(e) {
        this.style.opacity = '0.4';
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
        this.classList.add('dragging');
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('drag-over');
    }

    function handleDragLeave(e) {
        this.classList.remove('drag-over');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (dragSrcEl !== this) {
            const fromIndex = parseInt(dragSrcEl.getAttribute('data-index'));
            const toIndex = parseInt(this.getAttribute('data-index'));
            
            // Reorder the array
            const temp = monitorItems[fromIndex];
            monitorItems.splice(fromIndex, 1);
            monitorItems.splice(toIndex, 0, temp);
            
            saveMonitor();
            renderMonitor();
        }
        return false;
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';
        this.classList.remove('dragging');
        const rows = document.querySelectorAll('.commodity-row');
        rows.forEach(row => row.classList.remove('drag-over'));
    }

    function addCommodity(item) {
        if (!monitorItems.some(i => i.symbol === item.symbol)) {
            monitorItems.push(item);
            saveMonitor();
            renderMonitor();
        }
        searchInput.value = '';
        searchResults.classList.add('hidden');
    }

    function removeCommodity(symbol) {
        monitorItems = monitorItems.filter(i => i.symbol !== symbol);
        saveMonitor();
        renderMonitor();
    }

    function saveMonitor() {
        localStorage.setItem('commodities_monitor', JSON.stringify(monitorItems));
    }

    function simulatePrices() {
        // Randomly adjust prices for visual effect
        monitorItems.forEach(item => {
            const movement = (Math.random() - 0.5) * 0.005; // 0.5% max change
            item.price *= (1 + movement);
            item.change += movement * 100;
        });
        renderMonitor();
        
        // Brief glow to show update
        const rows = document.querySelectorAll('.commodity-row');
        rows.forEach(r => {
            r.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.3)';
            setTimeout(() => r.style.boxShadow = 'none', 1000);
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    let activeCategory = 'all';

    // 3. Functions
    function renderSearchResults(query = '', category = 'all') {
        const filtered = commodityData.filter(item => {
            const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || 
                               item.symbol.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = category === 'all' || item.category === category;
            return matchesQuery && matchesCategory;
        });

        if (filtered.length > 0) {
            searchResults.innerHTML = '';
            filtered.forEach(item => {
                const el = document.createElement('div');
                el.className = 'search-item';
                el.innerHTML = `
                    <div class="info" style="cursor: pointer; flex: 1;">
                        <span class="name">${item.name}</span>
                        <div class="meta">
                            <span class="symbol">${item.symbol}</span>
                            <span class="category-tag">${item.category}</span>
                        </div>
                    </div>
                    <div class="add-btn" style="cursor: pointer;" title="Aggiungi ai preferiti">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                `;
                
                // Clicking the info area opens details (examining)
                el.querySelector('.info').addEventListener('click', (e) => {
                    e.stopPropagation();
                    window.location.href = `commodity_detail.html?symbol=${encodeURIComponent(item.symbol)}`;
                });

                // Clicking the + button adds it to the list
                el.querySelector('.add-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    addCommodity(item);
                });

                searchResults.appendChild(el);
            });
            searchResults.classList.remove('hidden');
        } else {
            searchResults.innerHTML = `<div class="no-results">Nessuna commodity trovata</div>`;
            searchResults.classList.remove('hidden');
        }
    }

    // 4. Listeners
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        renderSearchResults(query, activeCategory);
    });

    searchInput.addEventListener('focus', () => {
        const query = searchInput.value.trim();
        renderSearchResults(query, activeCategory);
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-category');
            renderSearchResults(searchInput.value.trim(), activeCategory);
        });
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target) && !e.target.closest('.category-filters')) {
            searchResults.classList.add('hidden');
        }
    });

    refreshBtn.addEventListener('click', () => {
        const icon = refreshBtn.querySelector('i');
        icon.classList.add('fa-spin');
        simulatePrices();
        setTimeout(() => icon.classList.remove('fa-spin'), 1000);
    });

    // 5. Initial Render
    renderMonitor();
});
