document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Structure (Highly Populated for Level 3)
    const exchangeData = {
        'nyse': { name: 'NYSE', index: 'S&P 500', flag: 'fi fi-us' },
        'nasdaq': { name: 'NASDAQ', index: 'Nasdaq 100', flag: 'fi fi-us' },
        'borit': { name: 'Borsa Italiana', index: 'FTSE MIB', flag: 'fi fi-it' },
        'lse': { name: 'London SE', index: 'FTSE 100', flag: 'fi fi-gb' },
        'dax': { name: 'Deutsche Börse', index: 'DAX 40', flag: 'fi fi-de' },
        'cac': { name: 'Euronext Paris', index: 'CAC 40', flag: 'fi fi-fr' }
    };

    const stockCatalog = {
        'nyse': [
            { symbol: 'AAPL', name: 'Apple Inc.', price: 172.62, change: 0.45, info: 'Consumer Electronics' },
            { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 924.30, change: 3.12, info: 'Semiconductors' },
            { symbol: 'TSLA', name: 'Tesla, Inc.', price: 175.45, change: -1.24, info: 'Electric Vehicles' },
            { symbol: 'MSFT', name: 'Microsoft Corp.', price: 416.42, change: 0.85, info: 'Software & Services' },
            { symbol: 'AMZN', name: 'Amazon.com', price: 178.10, change: 1.15, info: 'E-commerce' },
            { symbol: 'JPM', name: 'JPMorgan Chase', price: 195.30, change: 0.75, info: 'Banking' },
            { symbol: 'WMT', name: 'Walmart Inc.', price: 60.84, change: 0.35, info: 'Retail' },
            { symbol: 'KO', name: 'Coca-Cola Co.', price: 61.12, change: 0.15, info: 'Beverages' },
            { symbol: 'DIS', name: 'Walt Disney', price: 112.50, change: -0.45, info: 'Entertainment' },
            { symbol: 'XOM', name: 'Exxon Mobil', price: 116.20, change: 0.65, info: 'Oil & Gas' },
            { symbol: 'V', name: 'Visa Inc.', price: 278.45, change: 0.25, info: 'Payments' },
            { symbol: 'COST', name: 'Costco Wholesale', price: 725.30, change: 0.95, info: 'Retail' }
        ],
        'nasdaq': [
            { symbol: 'GOOGL', name: 'Alphabet A', price: 152.45, change: 2.10, info: 'Internet Services' },
            { symbol: 'META', name: 'Meta Platforms', price: 502.30, change: 1.85, info: 'Social Media' },
            { symbol: 'AMD', name: 'AMD', price: 184.20, change: 4.12, info: 'Processors' },
            { symbol: 'NFLX', name: 'Netflix, Inc.', price: 625.50, change: 0.45, info: 'Streaming' },
            { symbol: 'ADBE', name: 'Adobe Inc.', price: 504.12, change: -2.30, info: 'Software' },
            { symbol: 'INTC', name: 'Intel Corp.', price: 42.15, change: -0.85, info: 'Semiconductors' },
            { symbol: 'PYPL', name: 'PayPal', price: 64.30, change: 1.10, info: 'Fintech' },
            { symbol: 'CSCO', name: 'Cisco Systems', price: 48.20, change: 0.15, info: 'Networking' },
            { symbol: 'TXN', name: 'Texas Instruments', price: 172.45, change: 0.65, info: 'Hardware' }
        ],
        'borit': [
            { symbol: 'ENI', name: 'Eni S.p.A.', price: 15.24, change: 0.45, info: 'Energia' },
            { symbol: 'RACE', name: 'Ferrari N.V.', price: 384.20, change: 1.24, info: 'Luxury/Auto' },
            { symbol: 'ISP', name: 'Intesa Sanpaolo', price: 3.12, change: -0.35, info: 'Banche' },
            { symbol: 'STLAM', name: 'Stellantis N.V.', price: 26.45, change: 0.84, info: 'Automotive' },
            { symbol: 'LDO', name: 'Leonardo S.p.A.', price: 21.30, change: 4.52, info: 'Aerospazio/Difesa' },
            { symbol: 'MONC', name: 'Moncler S.p.A.', price: 68.15, change: -1.15, info: 'Luxury' },
            { symbol: 'UCG', name: 'Unicredit S.p.A.', price: 34.12, change: 2.10, info: 'Banche' },
            { symbol: 'PRY', name: 'Prysmian S.p.A.', price: 48.50, change: 1.10, info: 'Cavi/Energia' },
            { symbol: 'SRN', name: 'Snam S.p.A.', price: 4.45, change: 0.25, info: 'Infrastructure' },
            { symbol: 'BMPS', name: 'Banca MPS', price: 4.12, change: 1.45, info: 'Banche' }
        ],
        'cac': [
            { symbol: 'MC.PA', name: 'LVMH', price: 845.20, change: 1.25, info: 'Luxury Goods' },
            { symbol: 'TTE.PA', name: 'TotalEnergies', price: 62.45, change: 0.45, info: 'Energy/Oil' },
            { symbol: 'SAN.PA', name: 'Sanofi', price: 89.30, change: -0.15, info: 'Pharmaceuticals' },
            { symbol: 'OR.PA', name: 'L\'Oréal', price: 432.10, change: 0.85, info: 'Cosmetics' },
            { symbol: 'AIR.PA', name: 'Airbus', price: 154.20, change: 2.10, info: 'Aerospace' },
            { symbol: 'BNP.PA', name: 'BNP Paribas', price: 64.32, change: 1.12, info: 'Banking' },
            { symbol: 'RMS.PA', name: 'Hermès', price: 2345.00, change: 1.45, info: 'Luxury' },
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
                    <div style="font-weight:700;">$${s.price.toFixed(2)}</div>
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
                    <div style="font-weight:700;">$${s.price.toFixed(2)}</div>
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

    // 6. Init
    renderMonitor();
    renderAllStocks();
});
