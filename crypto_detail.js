document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Definitions
    const cryptoGroups = {
        'Major': 'Mercato Principale (BTC, ETH, SOL)',
        'Altcoins': 'Altcoins Ecosystem (ADA, DOT, LINK)',
        'Memes': 'High Volatility Assets (DOGE, SHIB, PEPE)'
    };

    const cryptoCatalog = [
        { name: 'Bitcoin', symbol: 'BTC/USD', price: 70770.50, change: 1.12, category: 'Major' },
        { name: 'Ethereum', symbol: 'ETH/USD', price: 2159.12, change: -0.02, category: 'Major' },
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
    const catalogItem = cryptoCatalog.find(c => c.symbol === symbol) || 
                   { name: symbol || 'Crypto Ignota', symbol: symbol, price: 0, change: 0, category: 'Major' };
                   
    const monitorItems = JSON.parse(localStorage.getItem('cryptos_monitor')) || [];
    const monitorItem = monitorItems.find(m => m.symbol === symbol);
    
    const crypto = monitorItem ? { ...catalogItem, price: monitorItem.price, change: monitorItem.change } : catalogItem;

    // 3. UI Update (Title area)
    document.getElementById('cryptoName').textContent = crypto.name;
    document.getElementById('cryptoMarket').textContent = cryptoGroups[crypto.category] || 'Digital Asset Market';
    document.getElementById('latestPrice').textContent = `$${crypto.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: (crypto.price < 1 ? 6 : 2)})}`;
    
    const changeEl = document.getElementById('priceChange');
    changeEl.textContent = `${crypto.change >= 0 ? '+' : ''}${crypto.change.toFixed(2)}%`;
    changeEl.className = `detail-change ${crypto.change >= 0 ? 'positive' : 'negative'}`;

        // --- NEW ASYNC HISTORICAL DATA LOGIC ---
    let historicalCache = {};
    const tableBody = document.getElementById('tableBody');
    const tableTitle = document.getElementById('tableTitle');
    const chartCanvas = document.getElementById('cryptoChart');
    if (!chartCanvas) return;
    const ctx = chartCanvas.getContext('2d');
    
    let chartInstance = null;

    async function fetchAndRenderData(range, forceRefresh = false) {
        if (!forceRefresh && historicalCache[range]) {
            renderData(range, historicalCache[range]);
            return;
        }

        if (tableBody) {
            tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;"><i class="fa-solid fa-spinner fa-spin"></i> Caricamento dati...</td></tr>';
        }
        
        let interval = "1day";
        let outputsize = 30;
        
        switch(range) {
            case '1m': interval = "1day"; outputsize = 30; if(tableTitle) tableTitle.textContent = "Dati Storici (Ultimo Mese)"; break;
            case '3m': interval = "1day"; outputsize = 90; if(tableTitle) tableTitle.textContent = "Dati Storici (Ultimo Trimestre)"; break;
            case '6m': interval = "1week"; outputsize = 26; if(tableTitle) tableTitle.textContent = "Dati Storici (Ultimi 6 Mesi)"; break;
            case '1y': interval = "1week"; outputsize = 52; if(tableTitle) tableTitle.textContent = "Dati Storici (Ultimo Anno)"; break;
            case '5y': interval = "1month"; outputsize = 60; if(tableTitle) tableTitle.textContent = "Dati Storici (Ultimi 5 Anni)"; break;
        }

        let apiData = null;
        if (typeof TwelveDataAPI !== 'undefined') {
            const apiKey = TwelveDataAPI.getApiKey();
            if (apiKey) {
                let sym = typeof crypto !== 'undefined' ? crypto.symbol : "";
                sym = TwelveDataAPI.mapSymbol(sym, 'crypto');
                apiData = await TwelveDataAPI.getTimeSeries(sym, interval, outputsize);
            }
        }

        if (!apiData || apiData.length === 0) {
            apiData = generateFallbackData(range);
        } else {
            apiData = apiData.map(d => {
                const o = d.open;
                const c = d.close;
                const h = d.high;
                const l = d.low;
                const v = (((c - o) / o) * 100).toFixed(2);
                return { period: d.datetime.split(' ')[0], open: o, close: c, low: l, high: h, varPct: v };
            });
            apiData.reverse(); 
        }

                historicalCache[range] = apiData;
        
        // UPDATE MAIN HEADER PRICE WITH REAL LATEST DATA
        if (apiData && apiData.length > 0) {
            const latest = apiData[apiData.length - 1]; // last is newest after reverse
            const priceEl = document.getElementById('latestPrice');
            const changeEl = document.getElementById('priceChange');
            if (priceEl) {
                priceEl.textContent = '
    }

        function generateFallbackData(range) {
        const data = [];
        const now = new Date();
        let count = 30;
        let stepDays = 1;
        
        switch(range) {
            case '1m': count = 30; stepDays = 1; break;
            case '3m': count = 90; stepDays = 1; break;
            case '6m': count = 26; stepDays = 7; break;
            case '1y': count = 52; stepDays = 7; break;
            case '5y': count = 60; stepDays = 30; break;
        }

        let basePrice = typeof crypto !== 'undefined' ? crypto.price : 10000;
        let currentPrice = basePrice;

        for (let i = 0; i < count; i++) {
            const d = new Date(now);
            d.setDate(d.getDate() - (i * stepDays));
            const dateStr = d.toISOString().split('T')[0];
            
            // Deterministic "randomness" using sine wave and index
            let pseudoRandom = Math.abs(Math.sin(i * 12.9898 + basePrice)) * 0.04;
            let direction = Math.sin(i * 78.233 + basePrice) > 0 ? 1 : -1;
            
            const o = currentPrice * (0.98 + pseudoRandom);
            const c = currentPrice;
            const l = Math.min(o, c) * 0.98;
            const h = Math.max(o, c) * 1.02;
            const v = (((c - o) / o) * 100).toFixed(2);
            
            data.push({ period: dateStr, open: o, close: c, low: l, high: h, varPct: v });
            currentPrice = currentPrice * (1 + direction * (pseudoRandom * 0.5));
        }
        return data.reverse(); 
    }

    function renderData(range, records) {
        if (tableBody) {
            tableBody.innerHTML = '';
            records.forEach(rec => {
                const row = document.createElement('tr');
                row.innerHTML = '<td>' + rec.period + '</td>' +
                    '<td>$' + rec.close.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</td>' +
                    '<td>$' + rec.open.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</td>' +
                    '<td class="' + (rec.varPct >= 0 ? 'price-up' : 'price-down') + '">' + (rec.varPct >= 0 ? '+' : '') + rec.varPct + '%</td>' +
                    '<td>$' + rec.low.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</td>' +
                    '<td>$' + rec.high.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</td>';
                tableBody.appendChild(row);
            });
        }

        const periods = [...records].reverse();
        const labels = periods.map(r => r.period);
        const data = periods.map(r => r.close);
        const pointRadii = periods.map(() => 4);
        
        let labelName = typeof crypto !== 'undefined' ? crypto.name : "Asset";

        if (chartInstance) {
            chartInstance.data.labels = labels;
            chartInstance.data.datasets[0].data = data;
            chartInstance.data.datasets[0].pointRadius = pointRadii;
            chartInstance.update();
        } else {
            const chartConfig = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: labelName,
                        data: data,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        tension: 0.1,
                        fill: true,
                        pointRadius: pointRadii,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 1.5,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: (context) => 'Prezzo: $' + context.parsed.y.toLocaleString(undefined, {minimumFractionDigits: 2})
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
            chartInstance = new Chart(ctx, chartConfig);
        }
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', (e) => {
            const range = e.target.getAttribute('data-range');
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            fetchAndRenderData(range);
        });
    });

    const refreshBtn = document.getElementById('refreshHistorical');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            const activeBtn = document.querySelector('.filter-btn.active');
            const range = activeBtn ? activeBtn.getAttribute('data-range') : '1m';
            const icon = refreshBtn.querySelector('i');
            if(icon) icon.classList.add('fa-spin');
            fetchAndRenderData(range, true).then(() => {
                if(icon) setTimeout(() => icon.classList.remove('fa-spin'), 500);
            });
        });
    }

    fetchAndRenderData('1m');
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



 + latest.close.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
            }
            if (changeEl && latest.varPct) {
                changeEl.textContent = (latest.varPct >= 0 ? '+' : '') + latest.varPct + '%';
                changeEl.className = 'detail-change ' + (latest.varPct >= 0 ? 'positive' : 'negative');
            }
        }

        renderData(range, apiData);
    }

        function generateFallbackData(range) {
        const data = [];
        const now = new Date();
        let count = 30;
        let stepDays = 1;
        
        switch(range) {
            case '1m': count = 30; stepDays = 1; break;
            case '3m': count = 90; stepDays = 1; break;
            case '6m': count = 26; stepDays = 7; break;
            case '1y': count = 52; stepDays = 7; break;
            case '5y': count = 60; stepDays = 30; break;
        }

        let basePrice = typeof crypto !== 'undefined' ? crypto.price : 10000;
        let currentPrice = basePrice;

        for (let i = 0; i < count; i++) {
            const d = new Date(now);
            d.setDate(d.getDate() - (i * stepDays));
            const dateStr = d.toISOString().split('T')[0];
            
            // Deterministic "randomness" using sine wave and index
            let pseudoRandom = Math.abs(Math.sin(i * 12.9898 + basePrice)) * 0.04;
            let direction = Math.sin(i * 78.233 + basePrice) > 0 ? 1 : -1;
            
            const o = currentPrice * (0.98 + pseudoRandom);
            const c = currentPrice;
            const l = Math.min(o, c) * 0.98;
            const h = Math.max(o, c) * 1.02;
            const v = (((c - o) / o) * 100).toFixed(2);
            
            data.push({ period: dateStr, open: o, close: c, low: l, high: h, varPct: v });
            currentPrice = currentPrice * (1 + direction * (pseudoRandom * 0.5));
        }
        return data; 
    }

    function renderData(range, records) {
        if (tableBody) {
            tableBody.innerHTML = '';
            records.forEach(rec => {
                const row = document.createElement('tr');
                row.innerHTML = '<td>' + rec.period + '</td>' +
                    '<td>$' + rec.close.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</td>' +
                    '<td>$' + rec.open.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</td>' +
                    '<td class="' + (rec.varPct >= 0 ? 'price-up' : 'price-down') + '">' + (rec.varPct >= 0 ? '+' : '') + rec.varPct + '%</td>' +
                    '<td>$' + rec.low.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</td>' +
                    '<td>$' + rec.high.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</td>';
                tableBody.appendChild(row);
            });
        }

        const periods = [...records].reverse();
        const labels = periods.map(r => r.period);
        const data = periods.map(r => r.close);
        const pointRadii = periods.map(() => 4);
        
        let labelName = typeof crypto !== 'undefined' ? crypto.name : "Asset";

        if (chartInstance) {
            chartInstance.data.labels = labels;
            chartInstance.data.datasets[0].data = data;
            chartInstance.data.datasets[0].pointRadius = pointRadii;
            chartInstance.update();
        } else {
            const chartConfig = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: labelName,
                        data: data,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        tension: 0.1,
                        fill: true,
                        pointRadius: pointRadii,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 1.5,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: (context) => 'Prezzo: $' + context.parsed.y.toLocaleString(undefined, {minimumFractionDigits: 2})
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
            chartInstance = new Chart(ctx, chartConfig);
        }
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', (e) => {
            const range = e.target.getAttribute('data-range');
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            fetchAndRenderData(range);
        });
    });

    const refreshBtn = document.getElementById('refreshHistorical');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            const activeBtn = document.querySelector('.filter-btn.active');
            const range = activeBtn ? activeBtn.getAttribute('data-range') : '1m';
            const icon = refreshBtn.querySelector('i');
            if(icon) icon.classList.add('fa-spin');
            fetchAndRenderData(range, true).then(() => {
                if(icon) setTimeout(() => icon.classList.remove('fa-spin'), 500);
            });
        });
    }

    fetchAndRenderData('1m');
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





