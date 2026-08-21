document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State
    let monitorItems = JSON.parse(localStorage.getItem('commodities_monitor')) || [];
    const commodityData = [
        // METALLI (Preziosi & Industriali)
        { name: 'Oro (Gold)', symbol: 'XAU/USD', price: 4474.20, change: 1.25, category: 'Metalli', unitInfo: 'USD per Oncia (1 Oncia = 31.10 grammi)' },
        { name: 'Argento (Silver)', symbol: 'XAG/USD', price: 73.17, change: 3.45, category: 'Metalli', unitInfo: 'USD per Oncia (1 Oncia = 31.10 grammi)' },
        { name: 'Rame (Copper)', symbol: 'HG', price: 5.51, change: 1.62, category: 'Metalli', unitInfo: 'USD per Libbra (1 Libbra = 453.59 grammi)' },
        { name: 'Platino', symbol: 'PL', price: 1120.45, change: 0.85, category: 'Metalli', unitInfo: 'USD per Oncia (1 Oncia = 31.10 grammi)' },
        { name: 'Palladio', symbol: 'PA', price: 1245.30, change: -0.45, category: 'Metalli', unitInfo: 'USD per Oncia (1 Oncia = 31.10 grammi)' },
        { name: 'Alluminio', symbol: 'AL', price: 2650.80, change: 0.22, category: 'Metalli', unitInfo: 'USD per Tonnellata Metrica (1 TM = 1000 Kg)' },
        { name: 'Nichel', symbol: 'NI', price: 18450.00, change: -1.12, category: 'Metalli', unitInfo: 'USD per Tonnellata Metrica (1 TM = 1000 Kg)' },
        { name: 'Zinco', symbol: 'ZN', price: 2940.00, change: 0.65, category: 'Metalli', unitInfo: 'USD per Tonnellata Metrica (1 TM = 1000 Kg)' },
        { name: 'Piombo', symbol: 'PB', price: 2180.00, change: -0.35, category: 'Metalli', unitInfo: 'USD per Tonnellata Metrica (1 TM = 1000 Kg)' },
        { name: 'Stagno', symbol: 'SN', price: 31200.00, change: 1.45, category: 'Metalli', unitInfo: 'USD per Tonnellata Metrica (1 TM = 1000 Kg)' },
        { name: 'Litio (Carbonato)', symbol: 'LI', price: 16800.00, change: -2.15, category: 'Metalli', unitInfo: 'USD per Tonnellata Metrica (1 TM = 1000 Kg)' },
        { name: 'Ferro (Iron Ore)', symbol: 'FE', price: 124.30, change: 0.45, category: 'Metalli', unitInfo: 'USD per Tonnellata Metrica (1 TM = 1000 Kg)' },

        // ENERGIA
        { name: 'Petrolio WTI', symbol: 'WTI', price: 87.68, change: -5.10, category: 'Energia', unitInfo: 'USD per Barile (1 Barile = 159 litri)' },
        { name: 'Petrolio Brent', symbol: 'BRENT', price: 98.28, change: -5.90, category: 'Energia', unitInfo: 'USD per Barile (1 Barile = 159 litri)' },
        { name: 'Gas Naturale', symbol: 'NG', price: 2.93, change: -0.47, category: 'Energia', unitInfo: 'USD per MMBtu (1 MMBtu = ~28.26 metri cubi)' },
        { name: 'Gasolio Riscald.', symbol: 'HO', price: 2.72, change: 0.95, category: 'Energia', unitInfo: 'USD per Gallone (1 Gallone = 3.785 litri)' },
        { name: 'Benzina RBOB', symbol: 'RB', price: 2.68, change: 1.50, category: 'Energia', unitInfo: 'USD per Gallone (1 Gallone = 3.785 litri)' },
        { name: 'Etanolo', symbol: 'ETH', price: 1.58, change: 0.12, category: 'Energia', unitInfo: 'USD per Gallone (1 Gallone = 3.785 litri)' },
        { name: 'Uranio (U3O8)', symbol: 'URL', price: 88.50, change: 0.45, category: 'Energia', unitInfo: 'USD per Libbra (1 Libbra = 453.59 grammi)' },
        { name: 'Carbone (Coal)', symbol: 'COAL', price: 132.20, change: -1.05, category: 'Energia', unitInfo: 'USD per Tonnellata Metrica (1 TM = 1000 Kg)' },

        // AGRICOLTURA & SOFTS
        { name: 'Grano (Wheat)', symbol: 'ZW', price: 542.15, change: -1.42, category: 'Agricoltura', unitInfo: 'USd (Centesimi) per Staio (1 Staio = ~27.2 Kg)' },
        { name: 'Mais (Corn)', symbol: 'ZC', price: 432.50, change: -0.85, category: 'Agricoltura', unitInfo: 'USd (Centesimi) per Staio (1 Staio = ~25.4 Kg)' },
        { name: 'Semi di Soia', symbol: 'ZS', price: 1185.75, change: 0.25, category: 'Agricoltura', unitInfo: 'USd (Centesimi) per Staio (1 Staio = ~27.2 Kg)' },
        { name: 'Caffè Arabica', symbol: 'KC', price: 185.30, change: 0.65, category: 'Agricoltura', unitInfo: 'USd (Centesimi) per Libbra (1 Libbra = 453.59 grammi)' },
        { name: 'Zucchero #11', symbol: 'SB', price: 21.82, change: -2.10, category: 'Agricoltura', unitInfo: 'USd (Centesimi) per Libbra (1 Libbra = 453.59 grammi)' },
        { name: 'Cotone', symbol: 'CT', price: 92.45, change: 1.15, category: 'Agricoltura', unitInfo: 'USd (Centesimi) per Libbra (1 Libbra = 453.59 grammi)' },
        { name: 'Cacao', symbol: 'CC', price: 8450.00, change: 4.52, category: 'Agricoltura', unitInfo: 'USD per Tonnellata Metrica (1 TM = 1000 Kg)' },
        { name: 'Succo D\'Arancia', symbol: 'OJ', price: 362.15, change: 2.10, category: 'Agricoltura', unitInfo: 'USd (Centesimi) per Libbra (1 Libbra = 453.59 grammi)' },
        { name: 'Legname (Lumber)', symbol: 'LB', price: 585.00, change: -1.50, category: 'Agricoltura', unitInfo: 'USD per 1000 Piedi lineari' },
        { name: 'Riso Greggio', symbol: 'RR', price: 18.45, change: 0.15, category: 'Agricoltura', unitInfo: 'USD per Cento Libbre (1 CWT = 45.36 Kg)' },
        { name: 'Bestiame Vivo', symbol: 'LC', price: 1.86, change: 0.42, category: 'Agricoltura', unitInfo: 'USd (Centesimi) per Libbra (1 Libbra = 453.59 grammi)' }
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
            
            // Get original data for unitInfo just in case it's not in localStorage
            const originalData = commodityData.find(c => c.symbol === item.symbol) || {};
            const unitInfo = item.unitInfo || originalData.unitInfo || '';
            
            row.innerHTML = `
                <div class="drag-handle" title="Trascina per riordinare">
                    <i class="fa-solid fa-grip-vertical"></i>
                </div>
                <div class="clickable-area" style="flex: 1; display:flex; justify-content: space-between; align-items: center; cursor: pointer;">
                    <div class="commodity-info">
                        <span class="commodity-name">${item.name}</span>
                        <div class="commodity-meta" style="position: relative;">
                            <span class="commodity-symbol">${item.symbol}</span>
                            ${unitInfo ? `
                            <i class="fa-solid fa-circle-info unit-info-icon"></i>
                            <div class="unit-banner" style="display: none;">
                                <span class="banner-text">${unitInfo}</span>
                                <i class="fa-solid fa-xmark banner-close" title="Chiudi"></i>
                            </div>
                            ` : ''}
                        </div>
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

            // Banner toggle logic
            const infoIcon = row.querySelector('.unit-info-icon');
            if (infoIcon) {
                const banner = row.querySelector('.unit-banner');
                const closeBtn = row.querySelector('.banner-close');
                
                infoIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Hide all other banners first
                    document.querySelectorAll('.unit-banner').forEach(b => b.style.display = 'none');
                    banner.style.display = 'flex';
                });
                
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    banner.style.display = 'none';
                });
            }
            
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
        monitorItems.forEach(item => {
            const movement = (Math.random() - 0.5) * 0.005;
            item.price *= (1 + movement);
            item.change += movement * 100;
        });
        renderMonitor();
        const rows = document.querySelectorAll('.commodity-row');
        rows.forEach(r => {
            r.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.3)';
            setTimeout(() => r.style.boxShadow = 'none', 1000);
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    let activeCategory = 'all';

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
                    <div class="info" style="cursor: pointer; flex: 1; display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding-right: 15px;">
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <span class="name">${item.name}</span>
                            <div class="meta" style="position: relative;">
                                <span class="symbol">${item.symbol}</span>
                                ${item.unitInfo ? `
                                <i class="fa-solid fa-circle-info unit-info-icon"></i>
                                <div class="unit-banner" style="display: none;">
                                    <span class="banner-text">${item.unitInfo}</span>
                                    <i class="fa-solid fa-xmark banner-close" title="Chiudi"></i>
                                </div>
                                ` : ''}
                                <span class="category-tag">${item.category}</span>
                            </div>
                        </div>
                        <div class="price-value" style="font-size: 1.1rem; color: white;">
                            $${item.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </div>
                    </div>
                    <div class="add-btn" style="cursor: pointer; flex-shrink: 0;" title="Aggiungi">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                `;
                el.querySelector('.info').addEventListener('click', (e) => {
                    e.stopPropagation();
                    window.location.href = `commodity_detail.html?symbol=${encodeURIComponent(item.symbol)}`;
                });
                
                const infoIcon = el.querySelector('.unit-info-icon');
                if (infoIcon) {
                    const banner = el.querySelector('.unit-banner');
                    const closeBtn = el.querySelector('.banner-close');
                    
                    infoIcon.addEventListener('click', (e) => {
                        e.stopPropagation();
                        // Hide all other banners
                        document.querySelectorAll('.unit-banner').forEach(b => b.style.display = 'none');
                        banner.style.display = 'flex';
                    });
                    
                    closeBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        banner.style.display = 'none';
                    });
                }

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

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target) && !e.target.closest('.category-filters')) {
            searchResults.classList.add('hidden');
        }
        
        // Hide all unit banners if clicked outside
        if (!e.target.closest('.unit-banner') && !e.target.closest('.unit-info-icon')) {
            document.querySelectorAll('.unit-banner').forEach(b => b.style.display = 'none');
        }
    });

    async function updatePricesFromAPI() {
        const apiKey = TwelveDataAPI.getApiKey();
        if (!apiKey || monitorItems.length === 0) return false;

        try {
            const mappedSymbols = monitorItems.map(item => {
                if (['WTI', 'BRENT', 'NG', 'HG', 'PL', 'PA'].includes(item.symbol)) {
                    return `${item.symbol}/USD`;
                }
                return item.symbol;
            });
            const symbolsStr = mappedSymbols.join(',');
            const response = await fetch(`https://api.twelvedata.com/quote?symbol=${symbolsStr}&apikey=${apiKey}`);
            const data = await response.json();
            if (data.status === "error") throw new Error(data.message);
            const results = mappedSymbols.length === 1 ? { [mappedSymbols[0]]: data } : data;
            monitorItems.forEach((item, idx) => {
                const targetSym = mappedSymbols[idx];
                const real = results[targetSym];
                if (real && real.close) {
                    item.price = parseFloat(real.close);
                    item.change = parseFloat(real.percent_change || 0);
                }
            });
            saveMonitor();
            renderMonitor();
            return true;
        } catch (error) {
            console.error("Twelve Data Commodity Fetch Error:", error);
            return false;
        }
    }

    refreshBtn.addEventListener('click', async () => {
        const icon = refreshBtn.querySelector('i');
        icon.classList.add('fa-spin');
        const success = await updatePricesFromAPI();
        if (!success) simulatePrices();
        setTimeout(() => icon.classList.remove('fa-spin'), 1000);
    });

    renderMonitor();
    updatePricesFromAPI();
});
