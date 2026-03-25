document.addEventListener('DOMContentLoaded', () => {
    // 1. World Stock Exchanges Catalog
    const stockExchanges = [
        // AMERICAS
        { id: 'nyse', name: 'NYSE', fullName: 'New York Stock Exchange', country: 'Stati Uniti', flag: 'fi fi-us', region: 'America', isOpen: true, majorIndices: ['Dow Jones', 'S&P 500'] },
        { id: 'nasdaq', name: 'NASDAQ', fullName: 'NASDAQ Stock Market', country: 'Stati Uniti', flag: 'fi fi-us', region: 'America', isOpen: true, majorIndices: ['Nasdaq 100'] },
        { id: 'tsx', name: 'Toronto Stock Exchange', fullName: 'Toronto Stock Exchange', country: 'Canada', flag: 'fi fi-ca', region: 'America', isOpen: true, majorIndices: ['S&P/TSX'] },
        { id: 'bovespa', name: 'B3 Bovespa', fullName: 'Brasil Bolsa Balcão', country: 'Brasile', flag: 'fi fi-br', region: 'America', isOpen: true, majorIndices: ['Ibovespa'] },

        // EUROPE
        { id: 'lse', name: 'London Stock Exchange', fullName: 'London Stock Exchange', country: 'Regno Unito', flag: 'fi fi-gb', region: 'Europa', isOpen: false, majorIndices: ['FTSE 100'] },
        { id: 'borit', name: 'Borsa Italiana', fullName: 'Borsa Italiana S.p.A.', country: 'Italia', flag: 'fi fi-it', region: 'Europa', isOpen: false, majorIndices: ['FTSE MIB'] },
        { id: 'dax', name: 'Deutsche Börse (XETRA)', fullName: 'Frankfurt Stock Exchange', country: 'Germania', flag: 'fi fi-de', region: 'Europa', isOpen: false, majorIndices: ['DAX 40'] },
        { id: 'cac', name: 'Euronext Paris', fullName: 'Euronext Paris (CAC)', country: 'Francia', flag: 'fi fi-fr', region: 'Europa', isOpen: false, majorIndices: ['CAC 40'] },
        { id: 'eurnex', name: 'Euronext Amsterdam', fullName: 'Euronext Amsterdam', country: 'Paesi Bassi', flag: 'fi fi-nl', region: 'Europa', isOpen: false, majorIndices: ['AEX'] },
        { id: 'six', name: 'SIX Swiss Exchange', fullName: 'SIX Swiss Exchange', country: 'Svizzera', flag: 'fi fi-ch', region: 'Europa', isOpen: false, majorIndices: ['SMI'] },
        { id: 'ibex', name: 'Bolsa de Madrid', fullName: 'BME Bolsa de Madrid', country: 'Spagna', flag: 'fi fi-es', region: 'Europa', isOpen: false, majorIndices: ['IBEX 35'] },

        // ASIA / PACIFIC
        { id: 'tse', name: 'Tokyo Stock Exchange', fullName: 'Tokyo Stock Exchange', country: 'Giappone', flag: 'fi fi-jp', region: 'Asia', isOpen: false, majorIndices: ['Nikkei 225'] },
        { id: 'hkex', name: 'HKEX', fullName: 'Hong Kong Exchanges', country: 'Hong Kong', flag: 'fi fi-hk', region: 'Asia', isOpen: false, majorIndices: ['Hang Seng'] },
        { id: 'sse', name: 'Shanghai Stock Exchange', fullName: 'Shanghai Stock Exchange', country: 'Cina', flag: 'fi fi-cn', region: 'Asia', isOpen: false, majorIndices: ['SSE Composite'] },
        { id: 'asx', name: 'ASX', fullName: 'Australian Securities Exchange', country: 'Australia', flag: 'fi fi-au', region: 'Asia', isOpen: false, majorIndices: ['S&P/ASX 200'] },
        { id: 'nse', name: 'NSE', fullName: 'National Stock Exchange of India', country: 'India', flag: 'fi fi-in', region: 'Asia', isOpen: false, majorIndices: ['Nifty 50'] }
    ];

    const exchangeList = document.getElementById('exchangeList');
    const searchInput = document.getElementById('exchangeSearch');
    const filterChips = document.querySelectorAll('.filter-chip');
    
    let currentFilter = 'Tutti';
    let currentSearch = '';

    // 2. Render Function
    function renderExchanges() {
        exchangeList.innerHTML = '';
        
        const filtered = stockExchanges.filter(ex => {
            const matchesFilter = (currentFilter === 'Tutti' || ex.region === currentFilter);
            const matchesSearch = (ex.name.toLowerCase().includes(currentSearch.toLowerCase()) || 
                                  ex.country.toLowerCase().includes(currentSearch.toLowerCase()) ||
                                  ex.fullName.toLowerCase().includes(currentSearch.toLowerCase()));
            return matchesFilter && matchesSearch;
        });

        if (filtered.length === 0) {
            exchangeList.innerHTML = `
                <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">
                    <i class="fa-solid fa-magnifying-glass" style="font-size: 40px; margin-bottom: 20px; display: block;"></i>
                    <p>Nessuna borsa trovata per questa ricerca.</p>
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
    
    refreshBtn.addEventListener('click', () => {
        refreshBtn.classList.add('fa-spin');
        statusDot.style.background = '#3b82f6';
        
        setTimeout(() => {
            refreshBtn.classList.remove('fa-spin');
            statusDot.style.background = '#10b981';
            renderExchanges();
        }, 1200);
    });

    // Initial Render
    renderExchanges();
});
