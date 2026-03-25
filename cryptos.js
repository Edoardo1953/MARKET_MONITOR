document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State
    let monitorItems = JSON.parse(localStorage.getItem('cryptos_monitor')) || [];
    const cryptoData = [
        // MAJOR
        { name: 'Bitcoin', symbol: 'BTC/USD', price: 65240.50, change: 2.45, category: 'Major' },
        { name: 'Ethereum', symbol: 'ETH/USD', price: 3480.12, change: 1.85, category: 'Major' },
        { name: 'Solana', symbol: 'SOL/USD', price: 178.45, change: 5.12, category: 'Major' },
        { name: 'Binance Coin', symbol: 'BNB/USD', price: 592.30, change: 0.84, category: 'Major' },

        // ALTCOINS
        { name: 'Cardano', symbol: 'ADA/USD', price: 0.62, change: -1.20, category: 'Altcoins' },
        { name: 'Ripple', symbol: 'XRP/USD', price: 0.61, change: -0.45, category: 'Altcoins' },
        { name: 'Avalanche', symbol: 'AVAX/USD', price: 54.20, change: 3.15, category: 'Altcoins' },
        { name: 'Polkadot', symbol: 'DOT/USD', price: 9.25, change: 1.05, category: 'Altcoins' },
        { name: 'Chainlink', symbol: 'LINK/USD', price: 18.40, change: 2.30, category: 'Altcoins' },
        { name: 'Polygon', symbol: 'MATIC/USD', price: 1.05, change: -2.10, category: 'Altcoins' },
        { name: 'Litecoin', symbol: 'LTC/USD', price: 88.50, change: 0.12, category: 'Altcoins' },
        { name: 'Near Protocol', symbol: 'NEAR/USD', price: 7.15, change: 4.56, category: 'Altcoins' },

        // MEMES
        { name: 'Dogecoin', symbol: 'DOGE/USD', price: 0.175, change: 12.45, category: 'Memes' },
        { name: 'Shiba Inu', symbol: 'SHIB/USD', price: 0.000028, change: 8.12, category: 'Memes' },
        { name: 'Pepe', symbol: 'PEPE/USD', price: 0.000008, change: 15.30, category: 'Memes' },
        { name: 'Bonk', symbol: 'BONK/USD', price: 0.000024, change: 6.75, category: 'Memes' }
    ];

    // 2. DOM Elements
    const searchInput = document.getElementById('cryptoSearch');
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
                    <i class="fa-brands fa-bitcoin"></i>
                    <p>La tua lista è vuota. Usa la barra di ricerca per aggiungere cryptos.</p>
                </div>
            `;
            monitorCount.textContent = '0';
            return;
        }

        monitorCount.textContent = monitorItems.length;
        monitorList.innerHTML = '';
        
        monitorItems.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'commodity-row'; // reusing css class for consistency
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
                            <div class="price-value">$${item.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: (item.price < 1 ? 6 : 2)})}</div>
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
                window.location.href = `crypto_detail.html?symbol=${encodeURIComponent(item.symbol)}`;
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
                removeCrypto(sym);
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

    function addCrypto(item) {
        if (!monitorItems.some(i => i.symbol === item.symbol)) {
            monitorItems.push(item);
            saveMonitor();
            renderMonitor();
        }
        searchInput.value = '';
        searchResults.classList.add('hidden');
    }

    function removeCrypto(symbol) {
        monitorItems = monitorItems.filter(i => i.symbol !== symbol);
        saveMonitor();
        renderMonitor();
    }

    function saveMonitor() {
        localStorage.setItem('cryptos_monitor', JSON.stringify(monitorItems));
    }

    function simulatePrices() {
        monitorItems.forEach(item => {
            const movement = (Math.random() - 0.5) * 0.015; // 1.5% max change (cryptos are volatile)
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
        const filtered = cryptoData.filter(item => {
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
                    <div class="add-btn" style="cursor: pointer;" title="Aggiungi">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                `;
                
                el.querySelector('.info').addEventListener('click', (e) => {
                    e.stopPropagation();
                    window.location.href = `crypto_detail.html?symbol=${encodeURIComponent(item.symbol)}`;
                });

                el.querySelector('.add-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    addCrypto(item);
                });

                searchResults.appendChild(el);
            });
            searchResults.classList.remove('hidden');
        } else {
            searchResults.innerHTML = `<div class="no-results">Nessuna crypto trovata</div>`;
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

    renderMonitor();
});
