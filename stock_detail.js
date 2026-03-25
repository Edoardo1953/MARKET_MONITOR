document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Definitions (Stock Catalog)
    const stockCatalog = [
        { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', price: 172.62, change: 0.45 },
        { symbol: 'NVDA', name: 'NVIDIA Corp.', exchange: 'NASDAQ', price: 924.30, change: 3.12 },
        { symbol: 'TSLA', name: 'Tesla, Inc.', exchange: 'NASDAQ', price: 175.45, change: -1.24 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', exchange: 'NASDAQ', price: 416.42, change: 0.85 },
        { symbol: 'AMZN', name: 'Amazon.com', exchange: 'NASDAQ', price: 178.10, change: 1.15 },
        { symbol: 'GOOGL', name: 'Alphabet A', exchange: 'NASDAQ', price: 152.45, change: 2.10 },
        { symbol: 'META', name: 'Meta Platforms', exchange: 'NASDAQ', price: 502.30, change: 1.85 },
        { symbol: 'ENI', name: 'Eni S.p.A.', exchange: 'Borsa Italiana', price: 15.24, change: 0.45 },
        { symbol: 'RACE', name: 'Ferrari N.V.', exchange: 'Borsa Italiana', price: 384.20, change: 1.24 },
        { symbol: 'ISP', name: 'Intesa Sanpaolo', exchange: 'Borsa Italiana', price: 3.12, change: -0.35 },
        { symbol: 'MC.PA', name: 'LVMH', exchange: 'Euronext Paris', price: 845.20, change: 1.25 },
        { symbol: 'TTE.PA', name: 'TotalEnergies', exchange: 'Euronext Paris', price: 62.45, change: 0.45 },
        { symbol: 'SAN.PA', name: 'Sanofi', exchange: 'Euronext Paris', price: 89.30, change: -0.15 },
        { symbol: 'OR.PA', name: 'L\'Oréal', exchange: 'Euronext Paris', price: 432.10, change: 0.85 },
        { symbol: 'AIR.PA', name: 'Airbus', exchange: 'Euronext Paris', price: 154.20, change: 2.10 },
        { symbol: 'SAP', name: 'SAP SE', exchange: 'XETRA', price: 174.20, change: 1.45 },
        { symbol: 'SIE', name: 'Siemens AG', exchange: 'XETRA', price: 168.30, change: 0.85 },
        { symbol: 'SHEL', name: 'Shell', exchange: 'London SE', price: 26.45, change: 0.85 },
        { symbol: 'AZN', name: 'AstraZeneca', exchange: 'London SE', price: 104.20, change: 1.24 }
    ];

    // 2. State & Identification
    const params = new URLSearchParams(window.location.search);
    const symbol = params.get('symbol') || 'AAPL';
    const exchangeKey = params.get('exchange') || 'nasdaq';
    
    const stock = stockCatalog.find(s => s.symbol === symbol) || stockCatalog[0];

    // 3. Populate Header UI
    document.getElementById('stockName').textContent = stock.name;
    document.getElementById('stockTicker').textContent = stock.symbol;
    document.getElementById('stockExchange').textContent = stock.exchange;
    document.getElementById('latestPrice').textContent = `$${stock.price.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    
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
            default:
                tableTitle.textContent = `Analisi Short-term ${stock.symbol}`;
                ['Gen 26', 'Feb 26', 'Mar 26'].forEach((m, i) => {
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

    const initialData = generateChartData('5y');
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
                tooltip: { callbacks: { label: (ctx) => `Price: $${ctx.parsed.y.toLocaleString(undefined, {minimumFractionDigits: 2})}` } }
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
            stockChart.data.labels = newData.labels;
            stockChart.data.datasets[0].data = newData.data;
            stockChart.data.datasets[0].pointRadius = newData.pointRadii;
            stockChart.update();
        });
    });
});
