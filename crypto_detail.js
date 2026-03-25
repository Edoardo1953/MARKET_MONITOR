document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Definitions
    const cryptoGroups = {
        'Major': 'Mercato Principale (BTC, ETH, SOL)',
        'Altcoins': 'Altcoins Ecosystem (ADA, DOT, LINK)',
        'Memes': 'High Volatility Assets (DOGE, SHIB, PEPE)'
    };

    const cryptoCatalog = [
        { name: 'Bitcoin', symbol: 'BTC/USD', price: 65240.50, change: 2.45, category: 'Major' },
        { name: 'Ethereum', symbol: 'ETH/USD', price: 3480.12, change: 1.85, category: 'Major' },
        { name: 'Solana', symbol: 'SOL/USD', price: 178.45, change: 5.12, category: 'Major' },
        { name: 'Binance Coin', symbol: 'BNB/USD', price: 592.30, change: 0.84, category: 'Major' },
        { name: 'Cardano', symbol: 'ADA/USD', price: 0.62, change: -1.20, category: 'Altcoins' },
        { name: 'Ripple', symbol: 'XRP/USD', price: 0.61, change: -0.45, category: 'Altcoins' },
        { name: 'Avalanche', symbol: 'AVAX/USD', price: 54.20, change: 3.15, category: 'Altcoins' },
        { name: 'Polkadot', symbol: 'DOT/USD', price: 9.25, change: 1.05, category: 'Altcoins' },
        { name: 'Chainlink', symbol: 'LINK/USD', price: 18.40, change: 2.30, category: 'Altcoins' },
        { name: 'Polygon', symbol: 'MATIC/USD', price: 1.05, change: -2.10, category: 'Altcoins' },
        { name: 'Litecoin', symbol: 'LTC/USD', price: 88.50, change: 0.12, category: 'Altcoins' },
        { name: 'Near Protocol', symbol: 'NEAR/USD', price: 7.15, change: 4.56, category: 'Altcoins' },
        { name: 'Dogecoin', symbol: 'DOGE/USD', price: 0.175, change: 12.45, category: 'Memes' },
        { name: 'Shiba Inu', symbol: 'SHIB/USD', price: 0.000028, change: 8.12, category: 'Memes' },
        { name: 'Pepe', symbol: 'PEPE/USD', price: 0.000008, change: 15.30, category: 'Memes' },
        { name: 'Bonk', symbol: 'BONK/USD', price: 0.000024, change: 6.75, category: 'Memes' }
    ];

    // 2. State & Parsing
    const params = new URLSearchParams(window.location.search);
    const symbol = params.get('symbol');
    
    // Find current object in catalog
    const crypto = cryptoCatalog.find(c => c.symbol === symbol) || 
                   { name: symbol || 'Crypto Ignota', symbol: symbol, price: 0, change: 0, category: 'Major' };

    // 3. UI Update (Title area)
    document.getElementById('cryptoName').textContent = crypto.name;
    document.getElementById('cryptoMarket').textContent = cryptoGroups[crypto.category] || 'Digital Asset Market';
    document.getElementById('latestPrice').textContent = `$${crypto.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: (crypto.price < 1 ? 6 : 2)})}`;
    
    const changeEl = document.getElementById('priceChange');
    changeEl.textContent = `${crypto.change >= 0 ? '+' : ''}${crypto.change.toFixed(2)}%`;
    changeEl.className = `detail-change ${crypto.change >= 0 ? 'positive' : 'negative'}`;

    // 4. Historical Data Generation (Main logic to provide consistent table/chart)
    const tableBody = document.getElementById('tableBody');
    const tableTitle = document.getElementById('tableTitle');

    // Store base data to reuse across ranges
    let annualRecords = [];
    const yearsBase = [2026, 2025, 2024, 2023, 2022];
    
    yearsBase.forEach((year, index) => {
        let basePrice;
        if (crypto.symbol.includes('BTC')) {
            // Updated trend to match user's specific values for realism and consistency
            const btcTrend = { 2026: 62615.42, 2025: 68917.80, 2024: 28540.00, 2023: 16420.00, 2022: 46210.00 };
            basePrice = btcTrend[year] || crypto.price;
        } else {
            // Default volatile trend for other cryptos
            basePrice = crypto.price * (1 - (index * 0.1 * (Math.random() > 0.4 ? 1 : -0.5)));
        }
        
        const open = basePrice * (0.95 + Math.random() * 0.1);
        const close = basePrice;
        const low = Math.min(open, close) * (0.8 + Math.random() * 0.2);
        const high = Math.max(open, close) * (1.05 + Math.random() * 0.3);
        const varPct = (((close - open) / open) * 100).toFixed(2);
        
        annualRecords.push({ period: String(year), open, close, low, high, varPct });
    });

    function updateTable(range) {
        tableBody.innerHTML = '';
        let records = [];
        
        switch(range) {
            case '5y':
                tableTitle.textContent = "Dati Storici (Ultimi 5 Anni)";
                records = annualRecords;
                break;
            case '1y':
                tableTitle.textContent = "Dati Storici (Ultimo Anno per Mese)";
                const m1y = ['Apr 25', 'Mag 25', 'Giu 25', 'Lug 25', 'Ago 25', 'Set 25', 'Ott 25', 'Nov 25', 'Dic 25', 'Gen 26', 'Feb 26', 'Mar 26'];
                m1y.forEach((m, i) => {
                    // For Bitcoin, ensure we bridge the gap between 68k (2025) and 62k (2026)
                    let priceMid;
                    if (crypto.symbol.includes('BTC')) {
                        // Descending trend from 69k to 62k (Marzo 26)
                        priceMid = 68917 - (i * 600) + (Math.random() * 200);
                    } else {
                        priceMid = crypto.price * (0.75 + (i * 0.022));
                    }
                    records.push(mockRecord(m, priceMid));
                });
                records.reverse();
                break;
            case '6m':
                tableTitle.textContent = "Dati Storici (Ultimi 6 Mesi)";
                const m6m = ['Ott 25', 'Nov 25', 'Dic 25', 'Gen 26', 'Feb 26', 'Mar 26'];
                m6m.forEach((m, i) => {
                   const priceMid = crypto.price * (0.85 + (i * 0.026));
                   records.push(mockRecord(m, priceMid));
                });
                records.reverse();
                break;
            case '3m':
                tableTitle.textContent = "Dati Storici (Ultimo Trimestre)";
                const m3m = ['Gen 26', 'Feb 26', 'Mar 26'];
                m3m.forEach((m, i) => {
                    const priceMid = crypto.price * (0.92 + (i * 0.03));
                    records.push(mockRecord(m, priceMid));
                });
                records.reverse();
                break;
            case '1m':
                tableTitle.textContent = "Dati Storici (Mensile per Settimana)";
                for (let i = 0; i < 4; i++) {
                    const priceMid = crypto.price * (0.96 + (i * 0.012));
                    records.push(mockRecord(`Mar 26 (W${i+1})`, priceMid));
                }
                records.reverse();
                break;
        }

        records.forEach(rec => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${rec.period}</td>
                <td>$${rec.close.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: (rec.close < 1 ? 6 : 2)})}</td>
                <td>$${rec.open.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: (rec.open < 1 ? 6 : 2)})}</td>
                <td class="${rec.varPct >= 0 ? 'price-up' : 'price-down'}">${rec.varPct >= 0 ? '+' : ''}${rec.varPct}%</td>
                <td>$${rec.low.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: (rec.low < 1 ? 6 : 2)})}</td>
                <td>$${rec.high.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: (rec.high < 1 ? 6 : 2)})}</td>
            `;
            tableBody.appendChild(row);
        });

        return records;
    }

    function mockRecord(label, base) {
        const o = base * (0.9 + Math.random() * 0.2);
        const c = base;
        const l = Math.min(o, c) * (0.85 + Math.random() * 0.1);
        const h = Math.max(o, c) * (1.05 + Math.random() * 0.1);
        const v = (((c - o) / o) * 100).toFixed(2);
        return { period: label, open: o, close: c, low: l, high: h, varPct: v };
    }

    // 5. Chart.js Render
    const ctx = document.getElementById('cryptoChart').getContext('2d');
    
    function generateChartData(range) {
        const tableRecords = updateTable(range);
        const labels = [];
        const data = [];
        const pointRadii = [];
        
        // Reverse table records to get chronological order (past to present)
        const periods = [...tableRecords].reverse();
        
        periods.forEach((rec, idx) => {
            if (idx > 0) {
                // Filler points represent weekly volatility
                let fillersCount = 4; // one per week between monthly marks
                if (range === '1m') fillersCount = 2;
                if (range === '5y') fillersCount = 1; 

                const prevPrice = periods[idx-1].close;
                const currPrice = rec.close;
                
                for (let i = 1; i < fillersCount; i++) {
                    const ratio = i / fillersCount;
                    // Slightly higher noise for crypto weekly view
                    const noise = (Math.random() - 0.5) * (crypto.price * 0.025); 
                    labels.push(""); 
                    data.push(prevPrice + (currPrice - prevPrice) * ratio + noise);
                    pointRadii.push(3); // Small but visible blue point for weekly crypto data
                }
            }
            
            // Highlighted period point
            labels.push(rec.period);
            data.push(rec.close);
            pointRadii.push(7); 
        });

        return { labels, data, pointRadii };
    }

    const initialData = generateChartData('5y');

    const chartConfig = {
        type: 'line',
        data: {
            labels: initialData.labels,
            datasets: [{
                label: crypto.name,
                data: initialData.data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointRadius: initialData.pointRadii,
                pointBackgroundColor: '#3b82f6', // All points blue filled as requested
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
                tooltip: {
                    callbacks: {
                        label: (context) => `Prezzo: $${context.parsed.y.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: (crypto.price < 1 ? 6 : 2)})}`
                    }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { 
                        color: '#94a3b8',
                        callback: (value) => '$' + value.toLocaleString()
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            }
        }
    };

    let cryptoChart = new Chart(ctx, chartConfig);

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const range = e.target.getAttribute('data-range');
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const newData = generateChartData(range);
            cryptoChart.data.labels = newData.labels;
            cryptoChart.data.datasets[0].data = newData.data;
            cryptoChart.data.datasets[0].pointRadius = newData.pointRadii; // Assign updated radii
            cryptoChart.update();
        });
    });

    // Color customization removed as per "azzurro" request to maintain stylistic consistency


    // Export Action
    document.getElementById('exportData').addEventListener('click', () => {
        const btn = document.getElementById('exportData');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Esportazione...';
        
        setTimeout(() => {
            alert('Esportazione Crypto Data completata con successo!');
            btn.innerHTML = originalText;
        }, 1500);
    });
});
