document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Definitions (Shared with commodities.js)
    const commodityGroups = {
        'Metalli': 'Mercato Prezzi Metalli (London Metal Exchange / COMEX)',
        'Energia': 'Mercato Energetico Internazionale (NYMEX / ICE)',
        'Agricoltura': 'Mercato Agricolo Globale (CBOT / ICE)'
    };

    const commodityCatalog = [
        // METALLI (Preziosi & Industriali)
        { name: 'Oro (Gold)', symbol: 'XAU/USD', price: 2150.34, change: 0.45, category: 'Metalli' },
        { name: 'Argento (Silver)', symbol: 'XAG/USD', price: 24.82, change: -0.12, category: 'Metalli' },
        { name: 'Rame (Copper)', symbol: 'HG', price: 4.12, change: 0.84, category: 'Metalli' },
        { name: 'Platino', symbol: 'PL', price: 915.20, change: -0.56, category: 'Metalli' },
        { name: 'Palladio', symbol: 'PA', price: 984.45, change: 2.15, category: 'Metalli' },
        { name: 'Alluminio', symbol: 'AL', price: 2240.50, change: 0.32, category: 'Metalli' },
        { name: 'Nichel', symbol: 'NI', price: 17250.00, change: -1.20, category: 'Metalli' },
        { name: 'Zinco', symbol: 'ZN', price: 2480.00, change: 0.45, category: 'Metalli' },
        { name: 'Piombo', symbol: 'PB', price: 2050.00, change: -0.15, category: 'Metalli' },
        { name: 'Stagno', symbol: 'SN', price: 28450.00, change: 1.10, category: 'Metalli' },
        { name: 'Litio (Carbonato)', symbol: 'LI', price: 14200.00, change: -2.30, category: 'Metalli' },
        { name: 'Ferro (Iron Ore)', symbol: 'FE', price: 108.45, change: -0.75, category: 'Metalli' },

        // ENERGIA
        { name: 'Petrolio WTI', symbol: 'WTI', price: 81.42, change: 1.24, category: 'Energia' },
        { name: 'Petrolio Brent', symbol: 'BRENT', price: 86.15, change: 1.05, category: 'Energia' },
        { name: 'Gas Naturale', symbol: 'NG', price: 1.84, change: -3.52, category: 'Energia' },
        { name: 'Gasolio Riscald.', symbol: 'HO', price: 2.72, change: 0.95, category: 'Energia' },
        { name: 'Benzina RBOB', symbol: 'RB', price: 2.68, change: 1.50, category: 'Energia' },
        { name: 'Etanolo', symbol: 'ETH', price: 1.58, change: 0.12, category: 'Energia' },
        { name: 'Uranio (U3O8)', symbol: 'URL', price: 88.50, change: 0.45, category: 'Energia' },
        { name: 'Carbone (Coal)', symbol: 'COAL', price: 132.20, change: -1.05, category: 'Energia' },

        // AGRICOLTURA & SOFTS
        { name: 'Grano (Wheat)', symbol: 'ZW', price: 542.15, change: -1.42, category: 'Agricoltura' },
        { name: 'Mais (Corn)', symbol: 'ZC', price: 432.50, change: -0.85, category: 'Agricoltura' },
        { name: 'Semi di Soia', symbol: 'ZS', price: 1185.75, change: 0.25, category: 'Agricoltura' },
        { name: 'Caffè Arabica', symbol: 'KC', price: 185.30, change: 0.65, category: 'Agricoltura' },
        { name: 'Zucchero #11', symbol: 'SB', price: 21.82, change: -2.10, category: 'Agricoltura' },
        { name: 'Cotone', symbol: 'CT', price: 92.45, change: 1.15, category: 'Agricoltura' },
        { name: 'Cacao', symbol: 'CC', price: 8450.00, change: 4.52, category: 'Agricoltura' },
        { name: 'Succo D\'Arancia', symbol: 'OJ', price: 362.15, change: 2.10, category: 'Agricoltura' },
        { name: 'Legname (Lumber)', symbol: 'LB', price: 585.00, change: -1.50, category: 'Agricoltura' },
        { name: 'Riso Greggio', symbol: 'RR', price: 18.45, change: 0.15, category: 'Agricoltura' },
        { name: 'Bestiame Vivo', symbol: 'LC', price: 1.86, change: 0.42, category: 'Agricoltura' }
    ];

    // 2. State & Parsing
    const params = new URLSearchParams(window.location.search);
    const symbol = params.get('symbol');
    
    // Find current object in catalog or use a default
    const commodity = commodityCatalog.find(c => c.symbol === symbol) || 
                      { name: symbol || 'Commodity Ignota', symbol: symbol, price: 0, change: 0, category: 'Generale' };

    // 3. UI Update (Title area)
    document.getElementById('commodityName').textContent = commodity.name;
    document.getElementById('commodityMarket').textContent = commodityGroups[commodity.category] || 'Mercato Globale';
    document.getElementById('latestPrice').textContent = `$${commodity.price.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    
    const changeEl = document.getElementById('priceChange');
    changeEl.textContent = `${commodity.change >= 0 ? '+' : ''}${commodity.change.toFixed(2)}%`;
    changeEl.className = `detail-change ${commodity.change >= 0 ? 'positive' : 'negative'}`;

    // 4. Historical Data Generation (Main logic to provide consistent table/chart)
    const tableBody = document.getElementById('tableBody');
    const tableTitle = document.getElementById('tableTitle');

    // Store base data to reuse across ranges
    let annualRecords = [];
    const yearsBase = [2026, 2025, 2024, 2023, 2022];
    
    yearsBase.forEach((year, index) => {
        let basePrice;
        if (commodity.symbol === 'BRENT') {
            const brentTrend = { 2026: 86.15, 2025: 82.20, 2024: 78.45, 2023: 94.10, 2022: 50.02 };
            basePrice = brentTrend[year] || commodity.price;
        } else {
            basePrice = commodity.price * (1 - (index * 0.08 * (Math.random() > 0.5 ? 1 : -0.5)));
        }
        
        const open = basePrice * (0.95 + Math.random() * 0.1);
        const close = basePrice;
        const low = Math.min(open, close) * (0.9 + Math.random() * 0.05);
        const high = Math.max(open, close) * (1.05 + Math.random() * 0.05);
        const varPct = (((close - open) / open) * 100).toFixed(2);
        
        annualRecords.push({ period: String(year), open, close, low, high, varPct });
    });

    function updateTable(range) {
        tableBody.innerHTML = '';
        let records = [];
        
        switch(range) {
            case '5y':
                tableTitle.textContent = "Dati Storici (Ultimi 5 Anni)";
                records = annualRecords; // Already generated in reverse order: 2026 -> 2022
                break;
            case '1y':
                tableTitle.textContent = "Dati Storici (Ultimo Anno per Mese)";
                const m1y = ['Apr 25', 'Mag 25', 'Giu 25', 'Lug 25', 'Ago 25', 'Set 25', 'Ott 25', 'Nov 25', 'Dic 25', 'Gen 26', 'Feb 26', 'Mar 26'];
                m1y.forEach((m, i) => {
                    const priceMid = commodity.price * (0.85 + (i * 0.012)); 
                    records.push(mockRecord(m, priceMid));
                });
                records.reverse(); // Now 2026 is at index 0
                break;
            case '6m':
                tableTitle.textContent = "Dati Storici (Ultimi 6 Mesi)";
                const m6m = ['Ott 25', 'Nov 25', 'Dic 25', 'Gen 26', 'Feb 26', 'Mar 26'];
                m6m.forEach((m, i) => {
                   const priceMid = commodity.price * (0.92 + (i * 0.013));
                   records.push(mockRecord(m, priceMid));
                });
                records.reverse();
                break;
            case '3m':
                tableTitle.textContent = "Dati Storici (Ultimo Trimestre)";
                const m3m = ['Gen 26', 'Feb 26', 'Mar 26'];
                m3m.forEach((m, i) => {
                    const priceMid = commodity.price * (0.96 + (i * 0.014));
                    records.push(mockRecord(m, priceMid));
                });
                records.reverse();
                break;
            case '1m':
                tableTitle.textContent = "Dati Storici (Mensile per Settimana)";
                for (let i = 0; i < 4; i++) {
                    const priceMid = commodity.price * (0.97 + (i * 0.007));
                    records.push(mockRecord(`Mar 26 (W${i+1})`, priceMid));
                }
                records.reverse();
                break;
        }

        records.forEach(rec => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${rec.period}</td>
                <td>$${rec.close.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td>$${rec.open.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td class="${rec.varPct >= 0 ? 'price-up' : 'price-down'}">${rec.varPct >= 0 ? '+' : ''}${rec.varPct}%</td>
                <td>$${rec.low.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td>$${rec.high.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
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

    // 5. Chart.js & Main Logic
    const ctx = document.getElementById('commodityChart').getContext('2d');
    
    function generateChartData(range) {
        const tableRecords = updateTable(range);
        const labels = [];
        const data = [];
        const pointRadii = [];
        
        // Reverse table records to get chronological order (past to present)
        const periods = [...tableRecords].reverse();
        
        periods.forEach((rec, idx) => {
            if (idx > 0) {
                // Number of filler points representing weekly intervals
                let fillersCount = 4; // Default to weekly for most ranges
                if (range === '1m') fillersCount = 2; 
                if (range === '5y') fillersCount = 1; // Direct jump or single mid-point for yearly

                const prevPrice = periods[idx-1].close;
                const currPrice = rec.close;
                
                for (let i = 1; i < fillersCount; i++) {
                    const ratio = i / fillersCount;
                    // Lower noise for weekly view
                    const noise = (Math.random() - 0.5) * (commodity.price * 0.012);
                    labels.push(""); 
                    data.push(prevPrice + (currPrice - prevPrice) * ratio + noise);
                    pointRadii.push(3); // Small but visible blue point for weekly data
                }
            }
            
            // Add the real period point
            labels.push(rec.period);
            data.push(rec.close);
            pointRadii.push(7); // Highlighted larger point for the period
        });

        return { labels, data, pointRadii };
    }

    const initialData = generateChartData('5y');

    const chartConfig = {
        type: 'line',
        data: {
            labels: initialData.labels,
            datasets: [{
                label: commodity.name,
                data: initialData.data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                tension: 0.35,
                fill: true,
                pointRadius: initialData.pointRadii,
                pointBackgroundColor: '#3b82f6', // All points blue filled
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
                        label: (context) => `Prezzo: $${context.parsed.y.toLocaleString(undefined, {minimumFractionDigits: 2})}`
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

    let commodityChart = new Chart(ctx, chartConfig);

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const range = e.target.getAttribute('data-range');
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const newData = generateChartData(range);
            commodityChart.data.labels = newData.labels;
            commodityChart.data.datasets[0].data = newData.data;
            commodityChart.data.datasets[0].pointRadius = newData.pointRadii; // Assign updated radii
            commodityChart.update();
        });
    });

    // 6. Export Action
    document.getElementById('exportData').addEventListener('click', () => {
        const btn = document.getElementById('exportData');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Esportazione...';
        
        setTimeout(() => {
            alert('Esportazione in formato CSV completata con successo!');
            btn.innerHTML = originalText;
        }, 1500);
    });
});
