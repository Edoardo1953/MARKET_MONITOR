document.addEventListener('DOMContentLoaded', () => {
    // 1. World Stock Exchanges Catalog
    const stockExchanges = [
        // AMERICAS
        { id: 'nyse', name: 'NYSE', fullName: 'New York Stock Exchange', country: 'Stati Uniti', flag: 'fi fi-us', region: 'America', majorIndices: ['Dow Jones', 'S&P 500'], mainStocks: ['JPM', 'WMT', 'BRK.B', 'LLY', 'V', 'MA'] },
        { id: 'nasdaq', name: 'NASDAQ', fullName: 'NASDAQ Stock Market', country: 'Stati Uniti', flag: 'fi fi-us', region: 'America', majorIndices: ['Nasdaq 100'], mainStocks: ['AAPL', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA'] },
        { id: 'tsx', name: 'Toronto Stock Exchange', fullName: 'Toronto Stock Exchange', country: 'Canada', flag: 'fi fi-ca', region: 'America', majorIndices: ['S&P/TSX'], mainStocks: ['RY', 'TD', 'SHOP'] },
        { id: 'bovespa', name: 'B3 Bovespa', fullName: 'Brasil Bolsa Balcão', country: 'Brasile', flag: 'fi fi-br', region: 'America', majorIndices: ['Ibovespa'], mainStocks: ['VALE', 'PETR4'] },

        // EUROPE
        { id: 'lse', name: 'London Stock Exchange', fullName: 'London Stock Exchange', country: 'Regno Unito', flag: 'fi fi-gb', region: 'Europa', majorIndices: ['FTSE 100'], mainStocks: ['SHEL', 'AZN', 'BP'] },
        { id: 'borit', name: 'Borsa Italiana', fullName: 'Borsa Italiana S.p.A.', country: 'Italia', flag: 'fi fi-it', region: 'Europa', majorIndices: ['FTSE MIB'], mainStocks: ['ENI', 'RACE', 'ISP', 'STLAM', 'LDO', 'BAMI'] },
        { id: 'dax', name: 'Deutsche Börse (XETRA)', fullName: 'Frankfurt Stock Exchange', country: 'Germania', flag: 'fi fi-de', region: 'Europa', majorIndices: ['DAX 40'], mainStocks: ['SAP', 'SIE', 'ALV', 'DTE'] },
        { id: 'cac', name: 'Euronext Paris', fullName: 'Euronext Paris (CAC)', country: 'Francia', flag: 'fi fi-fr', region: 'Europa', majorIndices: ['CAC 40'], mainStocks: ['MC.PA', 'LVMH', 'TTE.PA', 'OR.PA', 'RMS.PA'] },
        { id: 'eurnex', name: 'Euronext Amsterdam', fullName: 'Euronext Amsterdam', country: 'Paesi Bassi', flag: 'fi fi-nl', region: 'Europa', majorIndices: ['AEX'], mainStocks: ['ASML.AS', 'PRX.AS'] },
        { id: 'six', name: 'SIX Swiss Exchange', fullName: 'SIX Swiss Exchange', country: 'Svizzera', flag: 'fi fi-ch', region: 'Europa', majorIndices: ['SMI'], mainStocks: ['NESN', 'NOVN'] },
        { id: 'ibex', name: 'Bolsa de Madrid', fullName: 'BME Bolsa de Madrid', country: 'Spagna', flag: 'fi fi-es', region: 'Europa', majorIndices: ['IBEX 35'], mainStocks: ['SAN.MC', 'ITX.MC'] },

        // ASIA / PACIFIC
        { id: 'tse', name: 'Tokyo Stock Exchange', fullName: 'Tokyo Stock Exchange', country: 'Giappone', flag: 'fi fi-jp', region: 'Asia', majorIndices: ['Nikkei 225'], mainStocks: ['7203', '6758', 'Nintendo'] },
        { id: 'hkex', name: 'HKEX', fullName: 'Hong Kong Exchanges', country: 'Hong Kong', flag: 'fi fi-hk', region: 'Asia', majorIndices: ['Hang Seng'], mainStocks: ['0700', '9988'] }
    ];

    // Market Hours Database (Local Time)
    const marketHours = {
        nyse: { tz: 'America/New_York', open: '09:30', close: '16:00' },
        nasdaq: { tz: 'America/New_York', open: '09:30', close: '16:00' },
        tsx: { tz: 'America/Toronto', open: '09:30', close: '16:00' },
        bovespa: { tz: 'America/Sao_Paulo', open: '10:00', close: '17:00' },
        lse: { tz: 'Europe/London', open: '08:00', close: '16:30' },
        borit: { tz: 'Europe/Rome', open: '09:00', close: '17:30' },
        dax: { tz: 'Europe/Berlin', open: '09:00', close: '17:30' },
        cac: { tz: 'Europe/Paris', open: '09:00', close: '17:30' },
        eurnex: { tz: 'Europe/Amsterdam', open: '09:00', close: '17:30' },
        six: { tz: 'Europe/Zurich', open: '09:00', close: '17:30' },
        ibex: { tz: 'Europe/Madrid', open: '09:00', close: '17:30' },
        tse: { tz: 'Asia/Tokyo', open: '09:00', close: '15:00', lunchStart: '11:30', lunchEnd: '12:30' },
        hkex: { tz: 'Asia/Hong_Kong', open: '09:30', close: '16:00', lunchStart: '12:00', lunchEnd: '13:00' }
    };

    function isMarketOpenNow(exId) {
        const data = marketHours[exId];
        if (!data) return false;
        
        try {
            const parts = new Intl.DateTimeFormat('en-US', {
                timeZone: data.tz, weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
            }).formatToParts(new Date());
            
            let weekday, hour = 0, minute = 0;
            parts.forEach(p => {
                if (p.type === 'weekday') weekday = p.value;
                if (p.type === 'hour') hour = parseInt(p.value, 10);
                if (p.type === 'minute') minute = parseInt(p.value, 10);
            });

            if (hour === 24) hour = 0; // Fix midnight format issues
            if (weekday === 'Sat' || weekday === 'Sun') return false; // Closed on weekends

            const currentMins = hour * 60 + minute;
            const [oH, oM] = data.open.split(':').map(Number);
            const [cH, cM] = data.close.split(':').map(Number);
            const openMins = oH * 60 + oM;
            const closeMins = cH * 60 + cM;

            let open = currentMins >= openMins && currentMins < closeMins;

            // Handle Asia lunch breaks
            if (open && data.lunchStart && data.lunchEnd) {
                const [lsH, lsM] = data.lunchStart.split(':').map(Number);
                const [leH, leM] = data.lunchEnd.split(':').map(Number);
                if (currentMins >= (lsH * 60 + lsM) && currentMins < (leH * 60 + leM)) {
                    open = false;
                }
            }
            return open;
        } catch(e) {
            console.error("Timezone error", e);
            return false;
        }
    }

    // Assign real-time status
    stockExchanges.forEach(ex => {
        ex.isOpen = isMarketOpenNow(ex.id);
    });

    const exchangeList = document.getElementById('exchangeList');
    const searchInput = document.getElementById('exchangeSearch');
    const filterChips = document.querySelectorAll('.filter-chip');
    
    let currentFilter = 'Tutti';
    let currentSearch = '';

    // 2. Render Function (Enhanced with Global Stock Search)
    function renderExchanges() {
        exchangeList.innerHTML = '';
        
        const filtered = stockExchanges.map(ex => {
            const matchesFilter = (currentFilter === 'Tutti' || ex.region === currentFilter);
            const matchesName = (ex.name.toLowerCase().includes(currentSearch.toLowerCase()) || 
                                   ex.country.toLowerCase().includes(currentSearch.toLowerCase()) ||
                                   ex.fullName.toLowerCase().includes(currentSearch.toLowerCase()));
            
            // Check if search matches any main stock (min 2 chars)
            const matchedStock = currentSearch.length > 1 ? (ex.mainStocks || []).find(s => s.toLowerCase().includes(currentSearch.toLowerCase())) : null;
            
            if (matchesFilter && (matchesName || matchedStock)) {
                return { ...ex, matchedStock: matchesName ? null : matchedStock };
            }
            return null;
        }).filter(ex => ex !== null);

        if (filtered.length === 0) {
            exchangeList.innerHTML = `
                <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">
                    <i class="fa-solid fa-magnifying-glass" style="font-size: 40px; margin-bottom: 20px; display: block;"></i>
                    <p>Nessun risultato trovato per la ricerca.</p>
                </div>
            `;
            return;
        }

        // Get favorites from localStorage
        const favorites = JSON.parse(localStorage.getItem('favoriteExchanges') || '[]');

        filtered.forEach((ex, index) => {
            const isFavorite = favorites.includes(ex.id);
            const card = document.createElement('a');
            card.href = `exchange_detail.html?exchange=${ex.id}&fav=${isFavorite ? '1' : '0'}`;
            card.className = 'exchange-card';
            card.style.animationDelay = `${index * 0.05}s`;
            
            card.innerHTML = `
                <span class="${ex.flag} exchange-flag"></span>
                <div class="exchange-info">
                    <h3 class="exchange-name">${ex.name}</h3>
                    <div class="exchange-country">
                        <span>${ex.id.toUpperCase()}</span> ${ex.country}
                    </div>
                    ${ex.matchedStock ? `<div class="stock-match-tag">
                        <i class="fa-solid fa-magnifying-glass"></i> Titolo trovato: <strong>${ex.matchedStock}</strong>
                    </div>` : ''}
                </div>
                <div class="exchange-status ${ex.isOpen ? 'status-open' : 'status-closed'}"></div>
                <button class="fav-star-btn" data-id="${ex.id}" style="margin-right: 15px; background: none; border: none; font-size: 1.2rem; cursor: pointer; z-index: 2; padding: 5px; color: ${isFavorite ? '#FBBF24' : '#475569'}; transition: transform 0.2s, color 0.2s;">
                    <i class="${isFavorite ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                </button>
                <i class="fa-solid fa-chevron-right exchange-indicator"></i>
            `;
            
            exchangeList.appendChild(card);
        });

        // Add event listeners for the star buttons
        document.querySelectorAll('.fav-star-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent navigating to detail page
                e.stopPropagation();
                
                const exId = e.currentTarget.getAttribute('data-id');
                let favs = JSON.parse(localStorage.getItem('favoriteExchanges') || '[]');
                
                if (favs.includes(exId)) {
                    favs = favs.filter(id => id !== exId); // Remove
                } else {
                    favs.push(exId); // Add
                }
                
                localStorage.setItem('favoriteExchanges', JSON.stringify(favs));
                
                // Add a small bounce animation
                e.currentTarget.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    renderExchanges(); // Re-render to update UI
                }, 150);
            });
        });
    }

    // 3. Event Listeners
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.trim();
        renderExchanges();
        
        clearTimeout(searchTimeout);
        if (currentSearch.length < 2) return;
        
        searchTimeout = setTimeout(async () => {
            if (window.TwelveDataAPI && TwelveDataAPI.getApiKey()) {
                try {
                    const results = await TwelveDataAPI.searchSymbols(currentSearch);
                    if (results && results.length > 0) {
                        let updated = false;
                        results.forEach(r => {
                            // Find the matching exchange
                            const matchedEx = stockExchanges.find(ex => 
                                (r.exchange && ex.name.toLowerCase().includes(r.exchange.toLowerCase())) ||
                                (r.country && ex.country.toLowerCase() === r.country.toLowerCase())
                            );
                            
                            if (matchedEx) {
                                if (!matchedEx.mainStocks) matchedEx.mainStocks = [];
                                // Aggiungiamo sia il simbolo che il nome in modo che la ricerca per nome funzioni
                                const stockString = `${r.symbol} ${r.instrument_name}`;
                                if (!matchedEx.mainStocks.includes(stockString)) {
                                    // Rimuoviamo eventuali versioni vecchie solo simbolo
                                    matchedEx.mainStocks = matchedEx.mainStocks.filter(s => s !== r.symbol);
                                    matchedEx.mainStocks.push(stockString);
                                    updated = true;
                                }
                            }
                        });
                        
                        if (updated) {
                            renderExchanges();
                        }
                    }
                } catch(err) {
                    console.error("API error", err);
                }
            }
        }, 500);
    });

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.getAttribute('data-category');
            renderExchanges();
        });
    });

    // Refresh simulation
    const refreshBtn = document.getElementById('refreshBtn');
    const statusDot = document.getElementById('statusDot');
    const lastUpdatedEl = document.getElementById('lastUpdated');
    
    function updateTimestamp() {
        const now = new Date();
        lastUpdatedEl.textContent = `Aggiornato: ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    }
    
    refreshBtn.addEventListener('click', () => {
        refreshBtn.classList.add('fa-spin');
        statusDot.style.background = '#3b82f6';
        
        setTimeout(() => {
            refreshBtn.classList.remove('fa-spin');
            statusDot.style.background = '#10b981';
            updateTimestamp();
            renderExchanges();
        }, 1200);
    });

    // Initial Render
    renderExchanges();
    updateTimestamp();
});
