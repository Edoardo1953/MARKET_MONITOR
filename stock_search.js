document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Structure (Highly Populated for Level 3)
    const exchangeData = {
        'nyse': { name: 'NYSE', index: 'S&P 500', flag: 'fi fi-us', currency: '$' },
        'nasdaq': { name: 'NASDAQ', index: 'Nasdaq 100', flag: 'fi fi-us', currency: '$' },
        'borit': { name: 'Borsa Italiana', index: 'FTSE MIB', flag: 'fi fi-it', currency: '€' },
        'lse': { name: 'London SE', index: 'FTSE 100', flag: 'fi fi-gb', currency: '£' },
        'dax': { name: 'Deutsche Börse', index: 'DAX 40', flag: 'fi fi-de', currency: '€' },
        'cac': { name: 'Euronext Paris', index: 'CAC 40', flag: 'fi fi-fr', currency: '€' },
        'tse': { name: 'Tokyo SE', index: 'Nikkei 225', flag: 'fi fi-jp', currency: '¥' },
        'hkex': { name: 'HKEX', index: 'Hang Seng', flag: 'fi fi-hk', currency: 'HK$' },
        'tsx': { name: 'Toronto SE', index: 'S&P/TSX', flag: 'fi fi-ca', currency: 'C$' },
        'eurnex': { name: 'Euronext AMS', index: 'AEX', flag: 'fi fi-nl', currency: '€' }
    };

    const stockCatalog = {
        'nyse': [
            { symbol: 'JPM', name: 'JPMorgan Chase', price: 245.30, change: 0.75, info: 'Banking' },
            { symbol: 'WMT', name: 'Walmart Inc.', price: 82.84, change: 0.35, info: 'Retail' },
            { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 479.33, change: 0.12, info: 'Conglomerate' },
            { symbol: 'LLY', name: 'Eli Lilly', price: 911.72, change: 1.45, info: 'Healthcare' },
            { symbol: 'V', name: 'Visa Inc.', price: 303.76, change: 0.25, info: 'Payments' },
            { symbol: 'MA', name: 'Mastercard Inc.', price: 498.93, change: 0.85, info: 'Financials' },
            { symbol: 'KO', name: 'Coca-Cola Co.', price: 61.12, change: 0.15, info: 'Beverages' },
            { symbol: 'DIS', name: 'Walt Disney', price: 112.50, change: -0.45, info: 'Entertainment' },
            { symbol: 'XOM', name: 'Exxon Mobil', price: 116.20, change: 0.65, info: 'Oil & Gas' },
            { symbol: 'HD', name: 'Home Depot', price: 352.40, change: -0.15, info: 'Home Improvement' }
        ],
        'nasdaq': [
            { symbol: 'AAPL', name: 'Apple Inc.', price: 252.95, change: 0.45, info: 'Technology' },
            { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 179.43, change: 3.12, info: 'Semiconductors' },
            { symbol: 'MSFT', name: 'Microsoft Corp.', price: 374.68, change: 0.85, info: 'Software' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 292.54, change: 2.10, info: 'Internet Services' },
            { symbol: 'AMZN', name: 'Amazon.com', price: 207.10, change: 1.15, info: 'E-commerce' },
            { symbol: 'META', name: 'Meta Platforms', price: 603.75, change: 1.85, info: 'Social Media' },
            { symbol: 'TSLA', name: 'Tesla, Inc.', price: 215.45, change: -1.24, info: 'Automotive' },
            { symbol: 'AVGO', name: 'Broadcom Inc.', price: 318.29, change: 1.10, info: 'Hardware' },
            { symbol: 'COST', name: 'Costco Wholesale', price: 973.82, change: 0.45, info: 'Retail' },
            { symbol: 'AMD', name: 'AMD', price: 184.20, change: 4.12, info: 'Processors' },
            { symbol: 'ADBE', name: 'Adobe Inc.', price: 504.12, change: -2.30, info: 'Software' }
        ],
        'borit': [
            { symbol: 'ENI', name: 'Eni S.p.A.', price: 23.26, change: 0.45, info: 'Energia' },
            { symbol: 'RACE', name: 'Ferrari N.V.', price: 412.20, change: 1.24, info: 'Luxury/Auto' },
            { symbol: 'ISP', name: 'Intesa Sanpaolo', price: 4.12, change: -0.35, info: 'Banche' },
            { symbol: 'STLAM', name: 'Stellantis N.V.', price: 26.45, change: 0.84, info: 'Automotive' },
            { symbol: 'LDO', name: 'Leonardo S.p.A.', price: 24.80, change: 4.52, info: 'Aerospazio/Difesa' },
            { symbol: 'MONC', name: 'Moncler S.p.A.', price: 68.15, change: -1.15, info: 'Luxury' },
            { symbol: 'UCG', name: 'Unicredit S.p.A.', price: 34.12, change: 2.10, info: 'Banche' },
            { symbol: 'PRY', name: 'Prysmian S.p.A.', price: 48.50, change: 1.10, info: 'Cavi/Energia' },
            { symbol: 'SRN', name: 'Snam S.p.A.', price: 4.45, change: 0.25, info: 'Infrastructure' },
            { symbol: 'BMPS', name: 'Banca MPS', price: 4.12, change: 1.45, info: 'Banche' }
        ],
        'cac': [
            { symbol: 'MC.PA', name: 'LVMH', price: 466.65, change: -1.25, info: 'Luxury Goods' },
            { symbol: 'TTE.PA', name: 'TotalEnergies', price: 76.00, change: 0.85, info: 'Energy/Oil' },
            { symbol: 'SAN.PA', name: 'Sanofi', price: 77.77, change: -0.15, info: 'Pharmaceuticals' },
            { symbol: 'OR.PA', name: 'L\'Oréal', price: 348.40, change: -0.45, info: 'Cosmetics' },
            { symbol: 'AIR.PA', name: 'Airbus', price: 160.92, change: 1.15, info: 'Aerospace' },
            { symbol: 'BNP.PA', name: 'BNP Paribas', price: 83.35, change: 1.12, info: 'Banking' },
            { symbol: 'RMS.PA', name: 'Hermès', price: 1649.50, change: -2.10, info: 'Luxury' },
            { symbol: 'BN.PA', name: 'Danone', price: 58.12, change: -0.35, info: 'Food Products' }
        ],
        'dax': [
            { symbol: 'SAP', name: 'SAP SE', price: 174.20, change: 1.45, info: 'Software' },
            { symbol: 'SIE', name: 'Siemens AG', price: 168.30, change: 0.85, info: 'Industrial' },
            { symbol: 'ALV', name: 'Allianz SE', price: 254.12, change: 0.35, info: 'Insurance' },
            { symbol: 'DTE', name: 'Deutsche Telekom', price: 22.15, change: -0.15, info: 'Telecom' },
            { symbol: 'MBG', name: 'Mercedes-Benz', price: 72.45, change: 1.12, info: 'Automotive' }
        ],
        'lse': [
            { symbol: 'SHEL', name: 'Shell', price: 26.45, change: 0.85, info: 'Energy' },
            { symbol: 'AZN', name: 'AstraZeneca', price: 104.20, change: 1.24, info: 'Pharma' },
            { symbol: 'HSBA', name: 'HSBC', price: 6.12, change: 0.45, info: 'Banking' },
            { symbol: 'ULVR', name: 'Unilever', price: 38.15, change: -0.15, info: 'Consumer Goods' },
            { symbol: 'BP', name: 'BP', price: 5.12, change: 1.10, info: 'Energy' }
        ],
        'tse': [
            { symbol: '7203', name: 'Toyota Motor', price: 3840.50, change: 1.45, info: 'Automotive' },
            { symbol: '6758', name: 'Sony Group', price: 12850.20, change: 0.85, info: 'Electronics' },
            { symbol: '7974', name: 'Nintendo', price: 8240.15, change: 2.15, info: 'Entertainment' },
            { symbol: '9984', name: 'SoftBank Group', price: 9120.45, change: -1.24, info: 'Investment' }
        ],
        'hkex': [
            { symbol: '0700', name: 'Tencent Holdings', price: 304.20, change: 1.12, info: 'Technology' },
            { symbol: '9988', name: 'Alibaba Group', price: 72.45, change: -0.85, info: 'E-commerce' },
            { symbol: '3690', name: 'Meituan', price: 94.30, change: 2.45, info: 'Technology' },
            { symbol: '1299', name: 'AIA Group', price: 54.12, change: 0.35, info: 'Insurance' }
        ],
        'ibex': [
            { symbol: 'SAN.MC', name: 'Banco Santander', price: 4.12, change: 1.24, info: 'Banking' },
            { symbol: 'IBE.MC', name: 'Iberdrola', price: 11.45, change: 0.45, info: 'Utilities' },
            { symbol: 'TEF.MC', name: 'Telefónica', price: 3.84, change: -0.15, info: 'Telecom' },
            { symbol: 'ITX.MC', name: 'Inditex', price: 42.30, change: 1.12, info: 'Retail' }
        ],
        'eurnex': [
            { symbol: 'ASML.AS', name: 'ASML Holding', price: 890.45, change: 2.15, info: 'Technology' },
            { symbol: 'PRX.AS', name: 'Prosus', price: 32.12, change: 0.85, info: 'Technology' },
            { symbol: 'INGA.AS', name: 'ING Group', price: 15.45, change: 1.24, info: 'Banking' },
            { symbol: 'ADYEN.AS', name: 'Adyen', price: 1450.30, change: -3.45, info: 'Fintech' }
        ]
    };

    // 2. State
    const params = new URLSearchParams(window.location.search);
    const exKey = params.get('exchange') || 'borit';
    const ex = exchangeData[exKey] || exchangeData['borit'];
    const stocks = stockCatalog[exKey] || [];
    
    // Manage Favorites/Monitor via LocalStorage
    let myMonitor = JSON.parse(localStorage.getItem(`marketMonitor_stocks_${exKey}`)) || [];

    // 3. UI Init
    document.getElementById('exchangeName').textContent = ex.name + ' - RICERCA';
    document.getElementById('exchangeIndex').textContent = `Titoli del listino ${ex.index}`;
    document.getElementById('exchangeCode').textContent = ex.name;
    document.getElementById('exchangeFlag').className = ex.flag;
    document.getElementById('backToExchange').href = `exchange_detail.html?exchange=${exKey}`;

    const searchInput = document.getElementById('stockSearchInput');
    const allStocksList = document.getElementById('allStocksList');
    const monitorList = document.getElementById('monitorList');
    const monitorCount = document.getElementById('monitorCount');

    // 4. Render Functions
    function renderAllStocks(query = '') {
        allStocksList.innerHTML = '';
        const filtered = stocks.filter(s => 
            s.symbol.toLowerCase().includes(query.toLowerCase()) || 
            s.name.toLowerCase().includes(query.toLowerCase())
        );

        if (filtered.length === 0 && query.length > 0) {
            const addCard = document.createElement('div');
            addCard.className = 'exchange-card add-new-stock';
            addCard.style.borderStyle = 'dashed';
            addCard.style.justifyContent = 'center';
            addCard.style.cursor = 'pointer';
            addCard.innerHTML = `
                <div style="text-align:center; padding: 10px;">
                    <i class="fa-solid fa-plus-circle" style="font-size: 24px; color: var(--accent-primary); margin-bottom: 10px;"></i>
                    <p style="font-size: 13px; font-weight: 600;">"${query}" non in lista.</p>
                    <p style="font-size: 11px; color: var(--text-muted);">Clicca per aggiungerlo al mercato ${ex.name}</p>
                </div>
            `;
            addCard.onclick = () => registerNewStock(query);
            allStocksList.appendChild(addCard);
        }

        filtered.forEach(s => {
            const isFav = myMonitor.some(f => f.symbol === s.symbol);
            const card = document.createElement('div');
            card.className = 'exchange-card';
            card.innerHTML = `
                <div class="exchange-info" style="cursor:pointer;" onclick="window.location.href='stock_detail.html?symbol=${s.symbol}&exchange=${exKey}'">
                    <h3 class="exchange-name">${s.symbol}</h3>
                    <div class="exchange-country">${s.name}</div>
                    <div class="badge-count" style="margin-top:5px;">${s.info}</div>
                </div>
                <div class="exchange-data" style="text-align:right; margin-right:15px; cursor:pointer;" onclick="window.location.href='stock_detail.html?symbol=${s.symbol}&exchange=${exKey}'">
                    <div style="font-weight:700;">${s.price.toFixed(2)} ${ex.currency}</div>
                    <div style="font-size:11px; color:${s.change >= 0 ? '#10b981' : '#ef4444'}">${s.change >= 0 ? '+' : ''}${s.change.toFixed(2)}%</div>
                </div>
                <div class="fav-btn ${isFav ? 'active' : ''}" data-symbol="${s.symbol}">
                    <i class="fa-${isFav ? 'solid' : 'regular'} fa-star"></i>
                </div>
            `;
            allStocksList.appendChild(card);
        });

        // Add Event Listeners for Stars
        document.querySelectorAll('.fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(btn.getAttribute('data-symbol'));
            });
        });
    }

    function registerNewStock(query) {
        const name = prompt(`Inserisci il nome completo per il titolo "${query}":`, query);
        if (!name) return;

        const priceStr = prompt(`Inserisci il prezzo attuale in ${ex.currency}:`, "100.00");
        const price = parseFloat(priceStr) || 100.00;

        const newStock = {
            symbol: query.toUpperCase(),
            name: name,
            price: price,
            change: (Math.random() * 2 - 1),
            info: 'Titolo Registrato',
            exchange: ex.name // Store exchange name for detail page mapping
        };

        stocks.push(newStock);
        
        // Save to localStorage so detail page can find it
        const customStocks = JSON.parse(localStorage.getItem('custom_stocks')) || [];
        customStocks.push(newStock);
        localStorage.setItem('custom_stocks', JSON.stringify(customStocks));
        
        // Auto-add to monitor
        toggleFavorite(newStock.symbol);
        
        renderAllStocks(query);
        alert(`Il titolo ${newStock.symbol} è stato registrato nel mercato ${ex.name} e aggiunto al tuo monitor!`);
    }

    function renderMonitor() {
        monitorList.innerHTML = '';
        if (myMonitor.length === 0) {
            monitorList.innerHTML = `<div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">Nessun titolo nel tuo monitor. Usa la stella ★ per aggiungerli.</div>`;
            monitorCount.textContent = '0';
            return;
        }

        monitorCount.textContent = myMonitor.length;
        myMonitor.forEach(s => {
            const card = document.createElement('div');
            card.className = 'exchange-card';
            card.innerHTML = `
                <div class="exchange-info" style="cursor:pointer;" onclick="window.location.href='stock_detail.html?symbol=${s.symbol}&exchange=${exKey}'">
                    <h3 class="exchange-name">${s.symbol}</h3>
                    <div class="exchange-country">${s.name}</div>
                </div>
                <div class="exchange-data" style="text-align:right; margin-right:15px; cursor:pointer;" onclick="window.location.href='stock_detail.html?symbol=${s.symbol}&exchange=${exKey}'">
                    <div style="font-weight:700;">${s.price.toFixed(2)} ${ex.currency}</div>
                </div>
                <div class="fav-btn active" data-symbol="${s.symbol}">
                    <i class="fa-solid fa-star"></i>
                </div>
            `;
            monitorList.appendChild(card);
        });

        // Add Event Listeners for Stars
        monitorList.querySelectorAll('.fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(btn.getAttribute('data-symbol'));
            });
        });
    }

    function toggleFavorite(symbol) {
        const index = myMonitor.findIndex(f => f.symbol === symbol);
        if (index > -1) {
            myMonitor.splice(index, 1);
        } else {
            const stock = stocks.find(s => s.symbol === symbol);
            if (stock) myMonitor.push(stock);
        }
        localStorage.setItem(`marketMonitor_stocks_${exKey}`, JSON.stringify(myMonitor));
        renderMonitor();
        renderAllStocks(searchInput.value);
    }

    // 5. Search
    searchInput.addEventListener('input', (e) => {
        renderAllStocks(e.target.value);
    });

    async function updatePricesFromAPI() {
        const apiKey = TwelveDataAPI.getApiKey();
        if (!apiKey) return false;

        // Raccogliamo i simboli da aggiornare (quelli nel monitor + quelli visibili se pochi)
        const monitorSymbols = myMonitor.map(s => s.symbol);
        const visibleSymbols = stocks.slice(0, 10).map(s => s.symbol); // Limitiamo per non sforare i limiti API free
        const allSymbols = [...new Set([...monitorSymbols, ...visibleSymbols])];

        if (allSymbols.length === 0) return false;

        try {
            const symbolsStr = allSymbols.join(',');
            const response = await fetch(`https://api.twelvedata.com/quote?symbol=${symbolsStr}&apikey=${apiKey}`);
            const data = await response.json();
            
            if (data.status === "error") throw new Error(data.message);

            const results = allSymbols.length === 1 ? { [allSymbols[0]]: data } : data;

            // Aggiorna il catalogo generale
            stocks.forEach(s => {
                const real = results[s.symbol];
                if (real && real.close) {
                    s.price = parseFloat(real.close);
                    s.change = parseFloat(real.percent_change || 0);
                }
            });

            // Sincronizza il monitor
            myMonitor.forEach(f => {
                const match = stocks.find(s => s.symbol === f.symbol);
                if (match) {
                    f.price = match.price;
                    f.change = match.change;
                }
            });

            localStorage.setItem(`marketMonitor_stocks_${exKey}`, JSON.stringify(myMonitor));
            renderAllStocks(searchInput.value);
            renderMonitor();
            return true;
        } catch (error) {
            console.error("Twelve Data Search Fetch Error:", error);
            return false;
        }
    }

    // 7. Refresh Logic
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', async () => {
            const icon = refreshBtn.querySelector('i');
            icon.classList.add('fa-spin');
            
            const success = await updatePricesFromAPI();
            
            if (!success) {
                setTimeout(() => {
                    stocks.forEach(s => {
                        const fluctuation = (Math.random() - 0.5) * (s.price * 0.008);
                        s.price += fluctuation;
                    });
                    myMonitor.forEach(f => {
                        const match = stocks.find(s => s.symbol === f.symbol);
                        if (match) f.price = match.price;
                    });
                    icon.classList.remove('fa-spin');
                    renderAllStocks(searchInput.value);
                    renderMonitor();
                }, 800);
            } else {
                icon.classList.remove('fa-spin');
            }
        });
    }

    // 6. Init
    renderMonitor();
    renderAllStocks();
    updatePricesFromAPI();
});
