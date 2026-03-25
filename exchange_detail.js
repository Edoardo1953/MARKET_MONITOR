document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Definitions
    const exchangeCatalog = {
        'nyse': { name: 'NYSE', fullName: 'New York Stock Exchange', country: 'Stati Uniti', flag: 'fi fi-us', index: 'S&P 500', price: 6626.65, change: 1.07, basePrice: 6500, currency: '$' },
        'nasdaq': { name: 'NASDAQ', fullName: 'NASDAQ Stock Market', country: 'Stati Uniti', flag: 'fi fi-us', index: 'Nasdaq 100', price: 24042.23, change: 0.95, basePrice: 23500, currency: '$' },
        'borit': { name: 'Borsa Italiana', fullName: 'Borsa Italiana S.p.A.', country: 'Italia', flag: 'fi fi-it', index: 'FTSE MIB', price: 43369.53, change: 0.42, basePrice: 42000, currency: '€' },
        'lse': { name: 'London SE', fullName: 'London Stock Exchange', country: 'Regno Unito', flag: 'fi fi-gb', index: 'FTSE 100', price: 10075.76, change: 1.05, basePrice: 9800, currency: '£' },
        'dax': { name: 'Deutsche Börse', fullName: 'Frankfurt Stock Exchange', country: 'Germania', flag: 'fi fi-de', index: 'DAX 40', price: 22960.37, change: 1.43, basePrice: 22000, currency: '€' },
        'cac': { name: 'Euronext Paris', fullName: 'Euronext Paris (CAC)', country: 'Francia', flag: 'fi fi-fr', index: 'CAC 40', price: 7858.02, change: 1.47, basePrice: 7700, currency: '€' },
        'tse': { name: 'Tokyo SE', fullName: 'Tokyo Stock Exchange', country: 'Giappone', flag: 'fi fi-jp', index: 'Nikkei 225', price: 53749.62, change: 1.45, basePrice: 50000, currency: '¥' },
        'hkex': { name: 'HKEX', fullName: 'Hong Kong Exchanges', country: 'Hong Kong', flag: 'fi fi-hk', index: 'Hang Seng', price: 25335.95, change: 0.75, basePrice: 24000, currency: 'HK$' },
        'bovespa': { name: 'B3 Bovespa', fullName: 'Brasil Bolsa Balcão', country: 'Brasile', flag: 'fi fi-br', index: 'Ibovespa', price: 184493.48, change: 0.35, basePrice: 180000, currency: 'R$' },
        'tsx': { name: 'Toronto SE', fullName: 'Toronto Stock Exchange', country: 'Canada', flag: 'fi fi-ca', index: 'S&P/TSX', price: 25850.40, change: 0.22, basePrice: 25000, currency: 'C$' },
        'asx': { name: 'ASX', fullName: 'Australian Securities Exchange', country: 'Australia', flag: 'fi fi-au', index: 'S&P/ASX 200', price: 8450.12, change: 0.55, basePrice: 8200, currency: 'A$' },
        'sse': { name: 'Shanghai SE', fullName: 'Shanghai Stock Exchange', country: 'Cina', flag: 'fi fi-cn', index: 'SSE Composite', price: 3450.60, change: -0.45, basePrice: 3400, currency: '¥' },
        'six': { name: 'SIX Swiss', fullName: 'SIX Swiss Exchange', country: 'Svizzera', flag: 'fi fi-ch', index: 'SMI', price: 12450.80, change: 0.35, basePrice: 12000, currency: 'CHF' },
        'ibex': { name: 'Bolsa Madrid', fullName: 'Bolsa de Madrid (IBEX)', country: 'Spagna', flag: 'fi fi-es', index: 'IBEX 35', price: 17169.90, change: 1.54, basePrice: 16500, currency: '€' },
        'eurnex': { name: 'Euronext AMS', fullName: 'Euronext Amsterdam', country: 'Paesi Bassi', flag: 'fi fi-nl', index: 'AEX', price: 945.45, change: 0.85, basePrice: 900, currency: '€' }
    };

    const stockConstituents = {
        'nyse': [
            { symbol: 'JPM', name: 'JPMorgan Chase', price: 245.30, change: 0.75 },
            { symbol: 'WMT', name: 'Walmart Inc.', price: 82.84, change: 0.35 },
            { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 479.33, change: 0.12 },
            { symbol: 'LLY', name: 'Eli Lilly', price: 911.72, change: 1.45 },
            { symbol: 'V', name: 'Visa Inc.', price: 303.76, change: 0.25 },
            { symbol: 'MA', name: 'Mastercard Inc.', price: 498.93, change: 0.85 },
            { symbol: 'HD', name: 'Home Depot', price: 352.40, change: -0.15 }
        ],
        'nasdaq': [
            { symbol: 'AAPL', name: 'Apple Inc.', price: 252.95, change: 0.45 },
            { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 179.43, change: 3.12 },
            { symbol: 'MSFT', name: 'Microsoft Corp.', price: 374.68, change: 0.85 },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 292.54, change: 2.10 },
            { symbol: 'AMZN', name: 'Amazon.com', price: 207.10, change: 1.15 },
            { symbol: 'META', name: 'Meta Platforms', price: 603.75, change: 1.85 },
            { symbol: 'TSLA', name: 'Tesla, Inc.', price: 215.45, change: -1.24 },
            { symbol: 'AVGO', name: 'Broadcom Inc.', price: 318.29, change: 1.10 },
            { symbol: 'COST', name: 'Costco Wholesale', price: 973.82, change: 0.45 }
        ],
        'borit': [
            { symbol: 'ENI', name: 'Eni S.p.A.', price: 23.26, change: 0.45 },
            { symbol: 'RACE', name: 'Ferrari N.V.', price: 412.30, change: 1.25 },
            { symbol: 'ISP', name: 'Intesa Sanpaolo', price: 4.12, change: 0.85 },
            { symbol: 'STLAM', name: 'Stellantis N.V.', price: 26.45, change: -1.24 },
            { symbol: 'LDO', name: 'Leonardo S.p.A.', price: 24.80, change: 2.15 }
        ],
        'cac': [
            { symbol: 'MC.PA', name: 'LVMH', price: 466.65, change: -1.25 },
            { symbol: 'TTE.PA', name: 'TotalEnergies', price: 76.00, change: 0.85 },
            { symbol: 'SAN.PA', name: 'Sanofi', price: 77.77, change: -0.15 },
            { symbol: 'OR.PA', name: 'L\'Oréal', price: 348.40, change: -0.45 },
            { symbol: 'AIR.PA', name: 'Airbus', price: 160.92, change: 1.15 },
            { symbol: 'RMS.PA', name: 'Hermès', price: 1649.50, change: -2.10 }
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
    document.getElementById('indexPrice').textContent = ex.price.toLocaleString(undefined, {minimumFractionDigits: 2}) + ' ' + ex.currency;
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
                    records.push(mockRecord(m, ex.price * (0.88 + (i * 0.02))));
                });
                records.reverse();
                break;
            case '6m':
                tableTitle.textContent = `Andamento 6 Mesi ${ex.index}`;
                ['Ott 25', 'Nov 25', 'Dic 25', 'Gen 26', 'Feb 26', 'Mar 26'].forEach((m, i) => {
                    records.push(mockRecord(m, ex.price * (0.92 + (i * 0.015))));
                });
                records.reverse();
                break;
            case '3m':
                tableTitle.textContent = `Analisi Trimestrale ${ex.index}`;
                ['Gen 26', 'Feb 26', 'Mar 26'].forEach((m, i) => {
                    records.push(mockRecord(m, ex.price * (0.95 + (i * 0.025))));
                });
                records.reverse();
                break;
            case '1m':
                tableTitle.textContent = `Dettaglio Ultimo Mese ${ex.index}`;
                ['Sett 1', 'Sett 2', 'Sett 3', 'Ultima'].forEach((w, i) => {
                    records.push(mockRecord(w, ex.price * (0.98 + (i * 0.007))));
                });
                records.reverse();
                break;
            default:
                tableTitle.textContent = `Analisi Short-term ${ex.index}`;
                ['Feb 26', 'Mar 26'].forEach((m, i) => {
                    records.push(mockRecord(m, ex.price * (0.97 + (i * 0.02))));
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

    // Default to 1M
    const initialData = generateChartData('1m');
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
                tooltip: { callbacks: { label: (ctx) => `Quota: ${ctx.parsed.y.toLocaleString(undefined, {minimumFractionDigits: 2})} ${ex.currency}` } }
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
                    <div class="mini-price">${s.price.toLocaleString(undefined, {minimumFractionDigits: 2})} ${ex.currency}</div>
                    <div class="mini-change ${s.change >= 0 ? 'price-up' : 'price-down'}">${s.change >= 0 ? '+' : ''}${s.change.toFixed(2)}%</div>
                </div>
            `;
            stocksList.appendChild(row);
        });
    }

    stockSearchInput.addEventListener('input', (e) => {
        renderStocks(e.target.value);
    });

    // 7. Refresh Logic
    const refreshBtn = document.getElementById('refreshBtn');

    async function updateConstituentsFromAPI() {
        const apiKey = TwelveDataAPI.getApiKey();
        if (!apiKey || constituents.length === 0) return false;

        try {
            const symbolsStr = constituents.map(s => s.symbol).join(',');
            const response = await fetch(`https://api.twelvedata.com/quote?symbol=${symbolsStr}&apikey=${apiKey}`);
            const data = await response.json();
            
            if (data.status === "error") throw new Error(data.message);

            const results = constituents.length === 1 ? { [constituents[0].symbol]: data } : data;

            constituents.forEach(s => {
                const real = results[s.symbol];
                if (real && real.close) {
                    s.price = parseFloat(real.close);
                    s.change = parseFloat(real.percent_change || 0);
                }
            });

            // Media dei cambiamenti
            const avgChange = constituents.reduce((acc, s) => acc + s.change, 0) / constituents.length;
            ex.change = avgChange;
            ex.price *= (1 + (avgChange / 1000));

            renderStocks(stockSearchInput.value);
            document.getElementById('indexPrice').textContent = ex.price.toLocaleString(undefined, {minimumFractionDigits: 2}) + ' ' + ex.currency;
            
            const changeEl = document.getElementById('indexChange');
            changeEl.textContent = `${ex.change >= 0 ? '+' : ''}${ex.change.toFixed(2)}%`;
            changeEl.className = `summary-change ${ex.change >= 0 ? 'positive' : 'negative'}`;

            return true;
        } catch (error) {
            console.error("Twelve Data Exchange Fetch Error:", error);
            return false;
        }
    }

    let hasRealPriceData = false;
    let hasRealHistoryData = false;

    async function updateChartFromAPI(range = '1m') {
        const apiKey = TwelveDataAPI.getApiKey();
        if (!apiKey) return false;

        const indexMap = {
            'S&P 500': 'SPX',
            'Nasdaq 100': 'NDX',
            'FTSE MIB': 'FTSEMIB',
            'FTSE 100': 'FTSE',
            'DAX 40': 'DAX',
            'CAC 40': 'PX1',
            'Nikkei 225': 'N225',
            'Hang Seng': 'HSI',
            'Ibovespa': 'IBOV',
            'IBEX 35': 'IBEX',
            'AEX': 'AEX'
        };

        const symbol = indexMap[ex.index];
        if (!symbol) return false;

        let interval = '1day';
        let outputsize = 30;
        if (range === '1y') { interval = '1week'; outputsize = 52; }
        else if (range === '6m') { interval = '1week'; outputsize = 26; }
        else if (range === '3m') { interval = '1day'; outputsize = 90; }

        try {
            const series = await TwelveDataAPI.getTimeSeries(symbol, interval, outputsize);
            if (!series) throw new Error("No series data");

            const tableBody = document.getElementById('historyTableBody');
            const tableTitle = document.getElementById('tableTitle');
            tableBody.innerHTML = '';
            tableTitle.textContent = `Dati Storici Reali: ${ex.index} (${range.toUpperCase()})`;

            const chartLabels = [];
            const chartData = [];
            
            series.forEach(v => {
                const dateStr = v.datetime.split('-').slice(1).reverse().join('/');
                chartLabels.push(dateStr);
                chartData.push(v.close);

                const row = document.createElement('tr');
                const varPct = (((v.close - v.open) / v.open) * 100).toFixed(2);
                row.innerHTML = `
                    <td>${v.datetime}</td>
                    <td>${v.close.toLocaleString()}</td>
                    <td>${v.open.toLocaleString()}</td>
                    <td class="${varPct >= 0 ? 'price-up' : 'price-down'}">${varPct >= 0 ? '+' : ''}${varPct}%</td>
                    <td>${v.low.toLocaleString()}</td>
                    <td>${v.high.toLocaleString()}</td>
                `;
                tableBody.prepend(row);
            });

            exchangeChart.data.labels = chartLabels;
            exchangeChart.data.datasets[0].data = chartData;
            exchangeChart.data.datasets[0].pointRadius = 3; 
            exchangeChart.update();

            hasRealHistoryData = true;
            return true;
        } catch (error) {
            console.error("Twelve Data Index History Error:", error);
            return false;
        }
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', async () => {
            const icon = refreshBtn.querySelector('i');
            icon.classList.add('fa-spin');
            
            const constituentsSuccess = await updateConstituentsFromAPI();
            if (constituentsSuccess) hasRealPriceData = true;

            const activeBtn = document.querySelector('.filter-btn.active');
            const range = activeBtn ? activeBtn.getAttribute('data-range') : '1m';
            
            const chartSuccess = await updateChartFromAPI(range);
            
            // Se fallisce l'API e NON abbiamo dati reali precedenti, usiamo la simulazione
            if (!hasRealPriceData && !hasRealHistoryData) {
                setTimeout(() => {
                    constituents.forEach(s => {
                        const fluctuation = (Math.random() - 0.5) * (s.price * 0.005);
                        s.price += fluctuation;
                    });
                    const idxFluc = (Math.random() - 0.5) * (ex.price * 0.002);
                    ex.price += idxFluc;
                    document.getElementById('indexPrice').textContent = ex.price.toLocaleString(undefined, {minimumFractionDigits: 2});
                    renderStocks(stockSearchInput.value);
                    
                    const newData = generateChartData(range);
                    exchangeChart.data.labels = newData.labels;
                    exchangeChart.data.datasets[0].data = newData.data;
                    exchangeChart.update();
                    
                    icon.classList.remove('fa-spin');
                }, 800);
            } else {
                // Se abbiamo dati reali, l'update è già stato fatto dall'API (o manteniamo il dato precedente)
                icon.classList.remove('fa-spin');
                if (!chartSuccess && hasRealHistoryData) {
                    console.log("Mantenimento grafico reale precedente causa limite API");
                }
            }
        });
    }

    renderStocks();
    updateConstituentsFromAPI().then(s => hasRealPriceData = s);
    updateChartFromAPI('1m').then(s => hasRealHistoryData = s);
});
