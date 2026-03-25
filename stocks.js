document.addEventListener('DOMContentLoaded', () => {
    // 1. World Stock Exchanges Catalog
    const stockExchanges = [
        // AMERICAS
        { id: 'nyse', name: 'NYSE', fullName: 'New York Stock Exchange', country: 'Stati Uniti', flag: 'fi fi-us', region: 'America', isOpen: true, majorIndices: ['Dow Jones', 'S&P 500'], mainStocks: ['JPM', 'WMT', 'BRK.B', 'LLY', 'V', 'MA'] },
        { id: 'nasdaq', name: 'NASDAQ', fullName: 'NASDAQ Stock Market', country: 'Stati Uniti', flag: 'fi fi-us', region: 'America', isOpen: true, majorIndices: ['Nasdaq 100'], mainStocks: ['AAPL', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA'] },
        { id: 'tsx', name: 'Toronto Stock Exchange', fullName: 'Toronto Stock Exchange', country: 'Canada', flag: 'fi fi-ca', region: 'America', isOpen: true, majorIndices: ['S&P/TSX'], mainStocks: ['RY', 'TD', 'SHOP'] },
        { id: 'bovespa', name: 'B3 Bovespa', fullName: 'Brasil Bolsa Balcão', country: 'Brasile', flag: 'fi fi-br', region: 'America', isOpen: true, majorIndices: ['Ibovespa'], mainStocks: ['VALE', 'PETR4'] },

        // EUROPE
        { id: 'lse', name: 'London Stock Exchange', fullName: 'London Stock Exchange', country: 'Regno Unito', flag: 'fi fi-gb', region: 'Europa', isOpen: false, majorIndices: ['FTSE 100'], mainStocks: ['SHEL', 'AZN', 'BP'] },
        { id: 'borit', name: 'Borsa Italiana', fullName: 'Borsa Italiana S.p.A.', country: 'Italia', flag: 'fi fi-it', region: 'Europa', isOpen: false, majorIndices: ['FTSE MIB'], mainStocks: ['ENI', 'RACE', 'ISP', 'STLAM', 'LDO'] },
        { id: 'dax', name: 'Deutsche Börse (XETRA)', fullName: 'Frankfurt Stock Exchange', country: 'Germania', flag: 'fi fi-de', region: 'Europa', isOpen: false, majorIndices: ['DAX 40'], mainStocks: ['SAP', 'SIE', 'ALV', 'DTE'] },
        { id: 'cac', name: 'Euronext Paris', fullName: 'Euronext Paris (CAC)', country: 'Francia', flag: 'fi fi-fr', region: 'Europa', isOpen: false, majorIndices: ['CAC 40'], mainStocks: ['MC.PA', 'LVMH', 'TTE.PA', 'OR.PA', 'RMS.PA'] },
        { id: 'eurnex', name: 'Euronext Amsterdam', fullName: 'Euronext Amsterdam', country: 'Paesi Bassi', flag: 'fi fi-nl', region: 'Europa', isOpen: false, majorIndices: ['AEX'], mainStocks: ['ASML.AS', 'PRX.AS'] },
        { id: 'six', name: 'SIX Swiss Exchange', fullName: 'SIX Swiss Exchange', country: 'Svizzera', flag: 'fi fi-ch', region: 'Europa', isOpen: false, majorIndices: ['SMI'], mainStocks: ['NESN', 'NOVN'] },
        { id: 'ibex', name: 'Bolsa de Madrid', fullName: 'BME Bolsa de Madrid', country: 'Spagna', flag: 'fi fi-es', region: 'Europa', isOpen: false, majorIndices: ['IBEX 35'], mainStocks: ['SAN.MC', 'ITX.MC'] },

        // ASIA / PACIFIC
        { id: 'tse', name: 'Tokyo Stock Exchange', fullName: 'Tokyo Stock Exchange', country: 'Giappone', flag: 'fi fi-jp', region: 'Asia', isOpen: false, majorIndices: ['Nikkei 225'], mainStocks: ['7203', '6758', 'Nintendo'] },
        { id: 'hkex', name: 'HKEX', fullName: 'Hong Kong Exchanges', country: 'Hong Kong', flag: 'fi fi-hk', region: 'Asia', isOpen: false, majorIndices: ['Hang Seng'], mainStocks: ['0700', '9988'] }
    ];

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

        filtered.forEach((ex, index) => {
            const card = document.createElement('a');
            card.href = `exchange_detail.html?exchange=${ex.id}`;
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
                <i class="fa-solid fa-chevron-right exchange-indicator"></i>
            `;
            
            exchangeList.appendChild(card);
        });
    }

    // 3. Event Listeners
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderExchanges();
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
