document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Definitions
    const exchangeCatalog = {
        'nyse': { name: 'NYSE', fullName: 'New York Stock Exchange', country: 'Stati Uniti', flag: 'fi fi-us', index: 'S&P 500', price: 5241.50, change: 1.24, basePrice: 5000 },
        'nasdaq': { name: 'NASDAQ', fullName: 'NASDAQ Stock Market', country: 'Stati Uniti', flag: 'fi fi-us', index: 'Nasdaq 100', price: 18125.40, change: 2.10, basePrice: 16000 },
        'borit': { name: 'Borsa Italiana', fullName: 'Borsa Italiana S.p.A.', country: 'Italia', flag: 'fi fi-it', index: 'FTSE MIB', price: 34320.15, change: -0.32, basePrice: 32000 },
        'lse': { name: 'London SE', fullName: 'London Stock Exchange', country: 'Regno Unito', flag: 'fi fi-gb', index: 'FTSE 100', price: 7935.60, change: 0.15, basePrice: 7500 },
        'dax': { name: 'Deutsche Börse', fullName: 'Frankfurt Stock Exchange', country: 'Germania', flag: 'fi fi-de', index: 'DAX 40', price: 18450.80, change: 0.84, basePrice: 17000 },
        'cac': { name: 'Euronext Paris', fullName: 'Euronext Paris (CAC)', country: 'Francia', flag: 'fi fi-fr', index: 'CAC 40', price: 8205.12, change: 0.45, basePrice: 7800 },
        'tse': { name: 'Tokyo SE', fullName: 'Tokyo Stock Exchange', country: 'Giappone', flag: 'fi fi-jp', index: 'Nikkei 225', price: 40850.30, change: 1.12, basePrice: 35000 },
        'hkex': { name: 'HKEX', fullName: 'Hong Kong Exchanges', country: 'Hong Kong', flag: 'fi fi-hk', index: 'Hang Seng', price: 16820.15, change: -1.45, basePrice: 18000 },
        'bovespa': { name: 'B3 Bovespa', fullName: 'Brasil Bolsa Balcão', country: 'Brasile', flag: 'fi fi-br', index: 'Ibovespa', price: 128450.20, change: 0.85, basePrice: 120000 },
        'tsx': { name: 'Toronto SE', fullName: 'Toronto Stock Exchange', country: 'Canada', flag: 'fi fi-ca', index: 'S&P/TSX', price: 21850.40, change: 0.12, basePrice: 20000 },
        'asx': { name: 'ASX', fullName: 'Australian Securities Exchange', country: 'Australia', flag: 'fi fi-au', index: 'S&P/ASX 200', price: 7850.12, change: 0.35, basePrice: 7000 },
        'sse': { name: 'Shanghai SE', fullName: 'Shanghai Stock Exchange', country: 'Cina', flag: 'fi fi-cn', index: 'SSE Composite', price: 3045.60, change: -0.15, basePrice: 2800 },
        'six': { name: 'SIX Swiss', fullName: 'SIX Swiss Exchange', country: 'Svizzera', flag: 'fi fi-ch', index: 'SMI', price: 11450.80, change: 0.45, basePrice: 10000 },
        'ibex': { name: 'Bolsa Madrid', fullName: 'Bolsa de Madrid (IBEX)', country: 'Spagna', flag: 'fi fi-es', index: 'IBEX 35', price: 10840.20, change: 0.15, basePrice: 9000 },
        'eurnex': { name: 'Euronext AMS', fullName: 'Euronext Amsterdam', country: 'Paesi Bassi', flag: 'fi fi-nl', index: 'AEX', price: 890.45, change: 0.25, basePrice: 800 }
    };

    const stockConstituents = {
        'nyse': [
            { symbol: 'AAPL', name: 'Apple Inc.', price: 172.62, change: 0.45 },
            { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 924.30, change: 3.12 },
            { symbol: 'TSLA', name: 'Tesla, Inc.', price: 175.45, change: -1.24 },
            { symbol: 'JPM', name: 'JPMorgan Chase', price: 195.30, change: 0.75 },
            { symbol: 'WMT', name: 'Walmart Inc.', price: 60.84, change: 0.35 }
        ],
        'nasdaq': [
            { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 152.45, change: 2.10 },
            { symbol: 'MSFT', name: 'Microsoft Corp.', price: 416.42, change: 0.85 },
            { symbol: 'META', name: 'Meta Platforms', price: 502.30, change: 1.85 },
            { symbol: 'AMD', name: 'AMD', price: 184.20, change: 4.12 },
            { symbol: 'NFLX', name: 'Netflix, Inc.', price: 625.50, change: 0.45 }
        ],
        'borit': [
            { symbol: 'ENI', name: 'Eni S.p.A.', price: 15.24, change: 0.45 },
            { symbol: 'RACE', name: 'Ferrari N.V.', price: 384.20, change: 1.24 },
            { symbol: 'ISP', name: 'Intesa Sanpaolo', price: 3.12, change: -0.35 },
            { symbol: 'STLAM', name: 'Stellantis N.V.', price: 26.45, change: 0.84 },
            { symbol: 'LDO', name: 'Leonardo S.p.A.', price: 21.30, change: 4.52 }
        ],
        'cac': [
            { symbol: 'MC.PA', name: 'LVMH', price: 845.20, change: 1.25 },
            { symbol: 'TTE.PA', name: 'TotalEnergies', price: 62.45, change: 0.45 },
            { symbol: 'SAN.PA', name: 'Sanofi', price: 89.30, change: -0.15 },
            { symbol: 'OR.PA', name: 'L\'Oréal', price: 432.10, change: 0.85 },
            { symbol: 'AIR.PA', name: 'Airbus', price: 154.20, change: 2.10 },
            { symbol: 'BNP.PA', name: 'BNP Paribas', price: 64.32, change: 1.12 }
        ],
        'dax': [
            { symbol: 'SAP', name: 'SAP SE', price: 174.20, change: 1.45 },
            { symbol: 'SIE', name: 'Siemens AG', price: 168.30, change: 0.85 },
            { symbol: 'ALV', name: 'Allianz SE', price: 254.12, change: 0.35 },
            { symbol: 'DTE', name: 'Deutsche Telekom', price: 22.15, change: -0.15 },
            { symbol: 'MBG', name: 'Mercedes-Benz', price: 72.45, change: 1.12 }
        ],
        'lse': [
            { symbol: 'SHEL', name: 'Shell', price: 26.45, change: 0.85 },
            { symbol: 'AZN', name: 'AstraZeneca', price: 104.20, change: 1.24 },
            { symbol: 'HSBA', name: 'HSBC', price: 6.12, change: 0.45 },
            { symbol: 'ULVR', name: 'Unilever', price: 38.15, change: -0.15 },
            { symbol: 'BP', name: 'BP', price: 5.12, change: 1.10 }
        ],
        'tse': [
            { symbol: '7203', name: 'Toyota Motor', price: 3840.50, change: 1.45 },
            { symbol: '6758', name: 'Sony Group', price: 12850.20, change: 0.85 },
            { symbol: '7974', name: 'Nintendo', price: 8240.15, change: 2.15 },
            { symbol: '9984', name: 'SoftBank Group', price: 9120.45, change: -1.24 }
        ],
        'hkex': [
            { symbol: '0700', name: 'Tencent Holdings', price: 304.20, change: 1.12 },
            { symbol: '9988', name: 'Alibaba Group', price: 72.45, change: -0.85 },
            { symbol: '3690', name: 'Meituan', price: 94.30, change: 2.45 },
            { symbol: '1299', name: 'AIA Group', price: 54.12, change: 0.35 }
        ],
        'ibex': [
            { symbol: 'SAN.MC', name: 'Banco Santander', price: 4.12, change: 1.24 },
            { symbol: 'IBE.MC', name: 'Iberdrola', price: 11.45, change: 0.45 },
            { symbol: 'TEF.MC', name: 'Telefónica', price: 3.84, change: -0.15 },
            { symbol: 'ITX.MC', name: 'Inditex', price: 42.30, change: 1.12 }
        ],
        'eurnex': [
            { symbol: 'ASML.AS', name: 'ASML Holding', price: 890.45, change: 2.15 },
            { symbol: 'PRX.AS', name: 'Prosus', price: 32.12, change: 0.85 },
            { symbol: 'INGA.AS', name: 'ING Group', price: 15.45, change: 1.24 },
            { symbol: 'ADYEN.AS', name: 'Adyen', price: 1450.30, change: -3.45 }
        ]
    };

    // 2. State & Parsing
    const params = new URLSearchParams(window.location.search);
    const exKey = params.get('exchange') || 'borit';
    const ex = exchangeCatalog[exKey] || exchangeCatalog['borit'];
    const constituents = stockConstituents[exKey] || [];

    // 3. Header UI
    document.getElementById('exchangeName').textContent = ex.name;
    document.getElementById('exchangeFullName').textContent = ex.fullName;
    document.getElementById('exchangeFlag').className = ex.flag + ' exchange-flag-header';
    document.getElementById('indexPrice').textContent = ex.price.toLocaleString(undefined, {minimumFractionDigits: 2});
    document.getElementById('exchangeIndexName').textContent = ex.index;
    
    const changeEl = document.getElementById('indexChange');
    changeEl.textContent = `${ex.change >= 0 ? '+' : ''}${ex.change.toFixed(2)}%`;
    changeEl.className = `summary-change ${ex.change >= 0 ? 'positive' : 'negative'}`;

    document.querySelectorAll('.exchange-name-inline').forEach(el => el.textContent = ex.name);

    // Link Search button to Level 3
    document.getElementById('searchStocksLink').href = `stock_search.html?exchange=${exKey}`;

    // 4. Historical Index Data (Table + Chart)
    const tableBody = document.getElementById('tableBody');
    const tableTitle = document.getElementById('tableTitle');
    let annualRecords = [];
    const yearsBase = [2026, 2025, 2024, 2023, 2022];
    
    yearsBase.forEach((year, index) => {
        const bp = ex.price * (1 - (index * 0.08 * (Math.random() > 0.5 ? 1 : -0.2)));
        const o = bp * (0.95 + Math.random() * 0.1);
        const c = bp;
        const l = Math.min(o, c) * 0.95;
        const h = Math.max(o, c) * 1.05;
        const v = (((c - o) / o) * 100).toFixed(2);
        annualRecords.push({ period: String(year), open: o, close: c, low: l, high: h, varPct: v });
    });

    function updateTable(range) {
        tableBody.innerHTML = '';
        let records = [];
        
        switch(range) {
            case '5y':
                tableTitle.textContent = `Andamento Storico ${ex.index} (5 Anni)`;
                records = annualRecords;
                break;
            case '1y':
                tableTitle.textContent = `Andamento Mensile ${ex.index} (1 Anno)`;
                ['Apr 25', 'Giu 25', 'Ago 25', 'Ott 25', 'Dic 25', 'Mar 26'].forEach((m, i) => {
                    records.push(mockRecord(m, ex.price * (0.85 + (i * 0.03))));
                });
                records.reverse();
                break;
            default:
                tableTitle.textContent = `Analisi Short-term ${ex.index}`;
                ['Gen 26', 'Feb 26', 'Mar 26'].forEach((m, i) => {
                    records.push(mockRecord(m, ex.price * (0.95 + (i * 0.02))));
                });
                records.reverse();
                break;
        }

        records.forEach(rec => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${rec.period}</td>
                <td>${rec.close.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td>${rec.open.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td class="${rec.varPct >= 0 ? 'price-up' : 'price-down'}">${rec.varPct >= 0 ? '+' : ''}${rec.varPct}%</td>
                <td>${rec.low.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td>${rec.high.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
            `;
            tableBody.appendChild(row);
        });
        return records;
    }

    function mockRecord(label, base) {
        const o = base * (0.98 + Math.random() * 0.04);
        const c = base;
        const l = Math.min(o, c) * 0.98;
        const h = Math.max(o, c) * 1.02;
        const v = (((c - o) / o) * 100).toFixed(2);
        return { period: label, open: o, close: c, low: l, high: h, varPct: v };
    }

    // 5. Chart.js & Main Rendering
    const ctx = document.getElementById('exchangeChart').getContext('2d');
    
    function generateChartData(range) {
        const tableRecords = updateTable(range);
        const labels = [];
        const data = [];
        const pointRadii = [];
        const periods = [...tableRecords].reverse();
        
        periods.forEach((rec, idx) => {
            if (idx > 0) {
                let fillersCount = 4; // Weekly data points
                const prevPrice = periods[idx-1].close;
                const currPrice = rec.close;
                for (let i = 1; i < fillersCount; i++) {
                    const ratio = i / fillersCount;
                    const noise = (Math.random() - 0.5) * (ex.price * 0.012);
                    labels.push(""); 
                    data.push(prevPrice + (currPrice - prevPrice) * ratio + noise);
                    pointRadii.push(3); // Small weekly points
                }
            }
            labels.push(rec.period);
            data.push(rec.close);
            pointRadii.push(7); // Period highlighted markers
        });
        return { labels, data, pointRadii };
    }

    const initialData = generateChartData('5y');
    const exchangeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: initialData.labels,
            datasets: [{
                label: ex.index,
                data: initialData.data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointRadius: initialData.pointRadii,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointBorderWidth: 1.5,
                pointHoverRadius: 9
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: (ctx) => `Quota: ${ctx.parsed.y.toLocaleString(undefined, {minimumFractionDigits: 2})}` } }
            },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
            }
        }
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const range = e.target.getAttribute('data-range');
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const newData = generateChartData(range);
            exchangeChart.data.labels = newData.labels;
            exchangeChart.data.datasets[0].data = newData.data;
            exchangeChart.data.datasets[0].pointRadius = newData.pointRadii;
            exchangeChart.update();
        });
    });

    // 6. Stocks List & Search (Level 2 Extension)
    const stocksList = document.getElementById('stocksList');
    const stockSearchInput = document.getElementById('stockSearch');

    function renderStocks(query = '') {
        stocksList.innerHTML = '';
        const filtered = constituents.filter(s => 
            s.symbol.toLowerCase().includes(query.toLowerCase()) || 
            s.name.toLowerCase().includes(query.toLowerCase())
        );

        if (filtered.length === 0 && constituents.length > 0) {
            stocksList.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 20px;">Nessun titolo trovato.</div>`;
            return;
        }

        filtered.forEach(s => {
            const row = document.createElement('a');
            row.href = `stock_detail.html?symbol=${s.symbol}&exchange=${exKey}`;
            row.className = 'stock-row-mini';
            row.innerHTML = `
                <div class="mini-identity">
                    <span class="mini-symbol">${s.symbol}</span>
                    <span class="mini-name">${s.name}</span>
                </div>
                <div class="mini-data">
                    <div class="mini-price">$${s.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                    <div class="mini-change ${s.change >= 0 ? 'price-up' : 'price-down'}">${s.change >= 0 ? '+' : ''}${s.change.toFixed(2)}%</div>
                </div>
            `;
            stocksList.appendChild(row);
        });
    }

    stockSearchInput.addEventListener('input', (e) => {
        renderStocks(e.target.value);
    });

    // Initial render of top constituents
    renderStocks();
});
