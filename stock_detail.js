document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Definitions (Stock Catalog)
    const stockCatalog = [
        // NASDAQ / NYSE
        { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', price: 252.95, change: 0.45 },
        { symbol: 'NVDA', name: 'NVIDIA Corp.', exchange: 'NASDAQ', price: 179.43, change: 3.12 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', exchange: 'NASDAQ', price: 374.68, change: 0.85 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', price: 292.54, change: 2.10 },
        { symbol: 'AMZN', name: 'Amazon.com', exchange: 'NASDAQ', price: 207.10, change: 1.15 },
        { symbol: 'META', name: 'Meta Platforms', exchange: 'NASDAQ', price: 603.75, change: 1.85 },
        { symbol: 'TSLA', name: 'Tesla, Inc.', exchange: 'NASDAQ', price: 215.45, change: -1.24 },
        { symbol: 'AVGO', name: 'Broadcom Inc.', exchange: 'NASDAQ', price: 318.29, change: 1.10 },
        { symbol: 'COST', name: 'Costco Wholesale', exchange: 'NASDAQ', price: 973.82, change: 0.45 },
        { symbol: 'JPM', name: 'JPMorgan Chase', exchange: 'NYSE', price: 245.30, change: 0.75 },
        { symbol: 'WMT', name: 'Walmart Inc.', exchange: 'NYSE', price: 82.84, change: 0.35 },
        { symbol: 'BRK.B', name: 'Berkshire Hathaway', exchange: 'NYSE', price: 479.33, change: 0.12 },
        { symbol: 'LLY', name: 'Eli Lilly', exchange: 'NYSE', price: 911.72, change: 1.45 },
        { symbol: 'V', name: 'Visa Inc.', exchange: 'NYSE', price: 303.76, change: 0.25 },
        { symbol: 'MA', name: 'Mastercard Inc.', exchange: 'NYSE', price: 498.93, change: 0.85 },

        // Borsa Italiana
        { symbol: 'ENI', name: 'Eni S.p.A.', exchange: 'Borsa Italiana', price: 23.26, change: 0.45 },
        { symbol: 'RACE', name: 'Ferrari N.V.', exchange: 'Borsa Italiana', price: 412.20, change: 1.24 },
        { symbol: 'ISP', name: 'Intesa Sanpaolo', exchange: 'Borsa Italiana', price: 4.12, change: 0.85 },
        { symbol: 'STLAM', name: 'Stellantis N.V.', exchange: 'Borsa Italiana', price: 26.45, change: -1.24 },
        { symbol: 'LDO', name: 'Leonardo S.p.A.', exchange: 'Borsa Italiana', price: 24.80, change: 2.15 },

        // Euronext Paris (CAC)
        { symbol: 'MC.PA', name: 'LVMH', exchange: 'Euronext Paris', price: 466.65, change: -1.25 },
        { symbol: 'TTE.PA', name: 'TotalEnergies', exchange: 'Euronext Paris', price: 76.00, change: 0.85 },
        { symbol: 'SAN.PA', name: 'Sanofi', exchange: 'Euronext Paris', price: 77.77, change: -0.15 },
        { symbol: 'OR.PA', name: 'L\'Oréal', exchange: 'Euronext Paris', price: 348.40, change: -0.45 },
        { symbol: 'AIR.PA', name: 'Airbus', exchange: 'Euronext Paris', price: 160.92, change: 1.15 },
        { symbol: 'BNP.PA', name: 'BNP Paribas', exchange: 'Euronext Paris', price: 83.35, change: 1.12 },

        // Deutsche Börse (DAX)
        { symbol: 'SAP', name: 'SAP SE', exchange: 'Deutsche Börse', price: 174.20, change: 1.45 },
        { symbol: 'SIE', name: 'Siemens AG', exchange: 'Deutsche Börse', price: 168.30, change: 0.85 },
        { symbol: 'ALV', name: 'Allianz SE', exchange: 'Deutsche Börse', price: 254.12, change: 0.35 },
        { symbol: 'DTE', name: 'Deutsche Telekom', exchange: 'Deutsche Börse', price: 22.15, change: -0.15 },
        { symbol: 'MBG', name: 'Mercedes-Benz', exchange: 'Deutsche Börse', price: 72.45, change: 1.12 },

        // London SE (FTSE)
        { symbol: 'SHEL', name: 'Shell', exchange: 'London SE', price: 26.45, change: 0.85 },
        { symbol: 'AZN', name: 'AstraZeneca', exchange: 'London SE', price: 104.20, change: 1.24 },
        { symbol: 'HSBA', name: 'HSBC', exchange: 'London SE', price: 6.12, change: 0.45 },
        { symbol: 'ULVR', name: 'Unilever', exchange: 'London SE', price: 38.15, change: -0.15 },
        { symbol: 'BP', name: 'BP', exchange: 'London SE', price: 5.12, change: 1.10 },

        // Tokyo SE (Nikkei)
        { symbol: '7203', name: 'Toyota Motor', exchange: 'Tokyo SE', price: 3840.50, change: 1.45 },
        { symbol: '6758', name: 'Sony Group', exchange: 'Tokyo SE', price: 12850.20, change: 0.85 },
        { symbol: '7974', name: 'Nintendo', exchange: 'Tokyo SE', price: 8240.15, change: 2.15 },
        { symbol: '9984', name: 'SoftBank Group', exchange: 'Tokyo SE', price: 9120.45, change: -1.24 },

        // HKEX (Hang Seng)
        { symbol: '0700', name: 'Tencent Holdings', exchange: 'HKEX', price: 304.20, change: 1.12 },
        { symbol: '9988', name: 'Alibaba Group', exchange: 'HKEX', price: 72.45, change: -0.85 },
        { symbol: '3690', name: 'Meituan', exchange: 'HKEX', price: 94.30, change: 2.45 },
        { symbol: '1299', name: 'AIA Group', exchange: 'HKEX', price: 54.12, change: 0.35 },

        // IBEX 35
        { symbol: 'SAN.MC', name: 'Banco Santander', exchange: 'Bolsa Madrid', price: 4.12, change: 1.24 },
        { symbol: 'IBE.MC', name: 'Iberdrola', exchange: 'Bolsa Madrid', price: 11.45, change: 0.45 },
        { symbol: 'TEF.MC', name: 'Telefónica', exchange: 'Bolsa Madrid', price: 3.84, change: -0.15 },
        { symbol: 'ITX.MC', name: 'Inditex', exchange: 'Bolsa Madrid', price: 42.30, change: 1.12 },

        // Euronext Amsterdam (AEX)
        { symbol: 'ASML.AS', name: 'ASML Holding', exchange: 'Euronext AMS', price: 890.45, change: 2.15 },
        { symbol: 'PRX.AS', name: 'Prosus', exchange: 'Euronext AMS', price: 32.12, change: 0.85 },
        { symbol: 'INGA.AS', name: 'ING Group', exchange: 'Euronext AMS', price: 15.45, change: 1.24 },
        { symbol: 'ADYEN.AS', name: 'Adyen', exchange: 'Euronext AMS', price: 1450.30, change: -3.45 }
    ];

    // 2. State & Identification
    const params = new URLSearchParams(window.location.search);
    const symbol = params.get('symbol') || 'AAPL';
    const exchangeKey = params.get('exchange') || 'nasdaq';
    
    // Currency mapping helper
    const getCurrency = (key) => {
        const mapping = {
            'nyse': '$', 'nasdaq': '$', 'borit': '€', 'lse': '£', 
            'dax': '€', 'cac': '€', 'tse': '¥', 'hkex': 'HK$', 
            'tsx': 'C$', 'asx': 'A$', 'sse': '¥', 'six': 'CHF', 
            'ibex': '€', 'eurnex': '€'
        };
        return mapping[key] || '$';
    };
    const currency = getCurrency(exchangeKey);

    // Load custom stocks from localStorage
    const customStocks = JSON.parse(localStorage.getItem('custom_stocks')) || [];
    const fullCatalog = [...stockCatalog, ...customStocks];

    const stock = fullCatalog.find(s => s.symbol === symbol) || stockCatalog[0];

    // 3. Populate Header UI
    document.getElementById('stockName').textContent = stock.name;
    document.getElementById('stockTicker').textContent = stock.symbol;
    document.getElementById('stockExchange').textContent = stock.exchange;
    document.getElementById('latestPrice').textContent = `${stock.price.toLocaleString(undefined, {minimumFractionDigits: 2})} ${currency}`;
    
    const changeEl = document.getElementById('priceChange');
    changeEl.textContent = `${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%`;
    changeEl.className = `detail-change ${stock.change >= 0 ? 'positive' : 'negative'}`;

    // Fix back link to Level 3
    document.getElementById('backLink').href = `stock_search.html?exchange=${exchangeKey}`;

    // 4. Historical Data Generation
    const tableBody = document.getElementById('tableBody');
    const tableTitle = document.getElementById('tableTitle');
    let annualRecords = [];
    const yearsBase = [2026, 2025, 2024, 2023, 2022];
    
    yearsBase.forEach((year, index) => {
        const bp = stock.price * (1 - (index * 0.1));
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
                tableTitle.textContent = `Dati Storici ${stock.symbol} (Annuali)`;
                records = annualRecords;
                break;
            case '1y':
                tableTitle.textContent = `Dati Mensili ${stock.symbol} (1 Anno)`;
                ['Apr 25', 'Giu 25', 'Ago 25', 'Ott 25', 'Dic 25', 'Mar 26'].forEach((m, i) => {
                    records.push(mockRecord(m, stock.price * (0.8 + (i * 0.04))));
                });
                records.reverse();
                break;
            case '6m':
                tableTitle.textContent = `Andamento 6 Mesi ${stock.symbol}`;
                ['Ott 25', 'Nov 25', 'Dic 25', 'Gen 26', 'Feb 26', 'Mar 26'].forEach((m, i) => {
                    records.push(mockRecord(m, stock.price * (0.9 + (i * 0.02))));
                });
                records.reverse();
                break;
            case '3m':
                tableTitle.textContent = `Analisi Trimestrale ${stock.symbol}`;
                ['Gen 26', 'Feb 26', 'Mar 26'].forEach((m, i) => {
                    records.push(mockRecord(m, stock.price * (0.94 + (i * 0.03))));
                });
                records.reverse();
                break;
            case '1m':
                tableTitle.textContent = `Dettaglio Ultimo Mese ${stock.symbol}`;
                ['Sett 1', 'Sett 2', 'Sett 3', 'Ultima'].forEach((w, i) => {
                    records.push(mockRecord(w, stock.price * (0.98 + (i * 0.008))));
                });
                records.reverse();
                break;
            default:
                tableTitle.textContent = `Analisi Short-term ${stock.symbol}`;
                ['Feb 26', 'Mar 26'].forEach((m, i) => {
                    records.push(mockRecord(m, stock.price * (0.95 + (i * 0.02))));
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

    // 5. Chart.js Implementation
    const ctx = document.getElementById('stockChart').getContext('2d');
    
    async function updateChartWithRealData(range) {
        let interval = "1day";
        let outputsize = 30;
        
        switch(range) {
            case '5y': interval = "1month"; outputsize = 60; break;
            case '1y': interval = "1week"; outputsize = 52; break;
            case '6m': interval = "1day"; outputsize = 180; break;
            case '3m': interval = "1day"; outputsize = 90; break;
            case '1m': interval = "1day"; outputsize = 30; break;
        }

        const realData = await TwelveDataAPI.getTimeSeries(stock.symbol, interval, outputsize);
        
        if (realData) {
            // Update UI with latest close if possible
            const latest = realData[realData.length - 1];
            stock.price = latest.close;
            document.getElementById('latestPrice').textContent = `${stock.price.toLocaleString(undefined, {minimumFractionDigits: 2})} ${currency}`;

            // Update Table with real records
            tableBody.innerHTML = '';
            tableTitle.textContent = `Dati Reali Twelve Data (${range.toUpperCase()})`;
            
            // Show only a subset in table to avoid bloat
            const tableSubset = [...realData].reverse().slice(0, 15);
            tableSubset.forEach(rec => {
                const varPct = (((rec.close - rec.open) / rec.open) * 100).toFixed(2);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${rec.datetime.split(' ')[0]}</td>
                    <td>${rec.close.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    <td>${rec.open.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    <td class="${varPct >= 0 ? 'price-up' : 'price-down'}">${varPct >= 0 ? '+' : ''}${varPct}%</td>
                    <td>${rec.low.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    <td>${rec.high.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                `;
                tableBody.appendChild(row);
            });

            // Update Chart
            stockChart.data.labels = realData.map(d => d.datetime.split(' ')[0]);
            stockChart.data.datasets[0].data = realData.map(d => d.close);
            stockChart.data.datasets[0].pointRadius = realData.map((_, i) => i === realData.length - 1 ? 7 : 0);
            stockChart.update();
            return true;
        }
        return false;
    }

    function generateChartData(range) {
        const tableRecords = updateTable(range);
        const labels = [];
        const data = [];
        const pointRadii = [];
        const periods = [...tableRecords].reverse();
        
        periods.forEach((rec, idx) => {
            if (idx > 0) {
                let fillersCount = 4;
                const prevPrice = periods[idx-1].close;
                const currPrice = rec.close;
                for (let i = 1; i < fillersCount; i++) {
                    const ratio = i / fillersCount;
                    const noise = (Math.random() - 0.5) * (stock.price * 0.015);
                    labels.push(""); 
                    data.push(prevPrice + (currPrice - prevPrice) * ratio + noise);
                    pointRadii.push(3);
                }
            }
            labels.push(rec.period);
            data.push(rec.close);
            pointRadii.push(7);
        });
        return { labels, data, pointRadii };
    }

    const initialData = generateChartData('1m');
    const stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: initialData.labels,
            datasets: [{
                label: stock.symbol,
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
                tooltip: { callbacks: { label: (ctx) => `Price: ${ctx.parsed.y.toLocaleString(undefined, {minimumFractionDigits: 2})} ${currency}` } }
            },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
            }
        }
    });

    // 6. Refresh Logic
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', async () => {
            const icon = refreshBtn.querySelector('i');
            icon.classList.add('fa-spin');
            
            // Aggiorna prima con API se possibile
            const activeBtn = document.querySelector('.filter-btn.active');
            const range = activeBtn ? activeBtn.getAttribute('data-range') : '1m';
            
            const success = await updateChartWithRealData(range);
            
            if (!success) {
                // Fallback a simulazione
                setTimeout(() => {
                    const fluctuation = (Math.random() - 0.5) * (stock.price * 0.005);
                    stock.price += fluctuation;
                    document.getElementById('latestPrice').textContent = `${stock.price.toLocaleString(undefined, {minimumFractionDigits: 2})} ${currency}`;
                    
                    const newData = generateChartData(range);
                    stockChart.data.labels = newData.labels;
                    stockChart.data.datasets[0].data = newData.data;
                    stockChart.update();
                    icon.classList.remove('fa-spin');
                }, 800);
            } else {
                icon.classList.remove('fa-spin');
            }
        });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const range = e.target.getAttribute('data-range');
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const icon = refreshBtn ? refreshBtn.querySelector('i') : null;
            if (icon) icon.classList.add('fa-spin');

            const success = await updateChartWithRealData(range);
            
            if (!success) {
                const newData = generateChartData(range);
                stockChart.data.labels = newData.labels;
                stockChart.data.datasets[0].data = newData.data;
                stockChart.data.datasets[0].pointRadius = newData.pointRadii;
                stockChart.update();
            }
            
            if (icon) icon.classList.remove('fa-spin');
        });
    });

    // Attempt initial real-world load
    updateChartWithRealData('1m');
});
