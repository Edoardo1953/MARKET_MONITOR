/**
 * Twelve Data API Integration Module
 * Handles real-time and historical data fetching for Stocks, Cryptos, and Forex.
 */

const TwelveDataAPI = {
    getApiKey: () => localStorage.getItem('twelvedata_apikey'),

    /**
     * Fetch real-time price for a symbol
     * @param {string} symbol - e.g. "AAPL", "MC.PA", "BTC/USD"
     * @returns {Promise<object|null>}
     */
    async getQuote(symbol) {
        const apiKey = this.getApiKey();
        if (!apiKey) return null;

        try {
            const response = await fetch(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}`);
            const data = await response.json();
            
            if (data.status === "error") {
                console.warn("Twelve Data API Error:", data.message);
                return null;
            }
            
            return {
                symbol: data.symbol,
                name: data.name,
                price: parseFloat(data.close || data.price),
                change: parseFloat(data.percent_change || 0),
                currency: data.currency,
                exchange: data.exchange,
                timestamp: data.timestamp
            };
        } catch (error) {
            console.error("Failed to fetch quote from Twelve Data:", error);
            return null;
        }
    },

    /**
     * Fetch historical time series for charts
     * @param {string} symbol - e.g. "AAPL"
     * @param {string} interval - e.g. "1day", "1week", "1month"
     * @param {number} outputsize - Number of data points
     * @returns {Promise<array|null>}
     */
    async getTimeSeries(symbol, interval = "1day", outputsize = 30) {
        const apiKey = this.getApiKey();
        if (!apiKey) return null;

        try {
            const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${apiKey}`);
            const data = await response.json();
            
            if (data.status === "error") {
                console.warn("Twelve Data API Error:", data.message);
                return null;
            }
            
            return data.values.map(v => ({
                datetime: v.datetime,
                open: parseFloat(v.open),
                high: parseFloat(v.high),
                low: parseFloat(v.low),
                close: parseFloat(v.close),
                volume: parseInt(v.volume)
            })).reverse();
        } catch (error) {
            console.error("Failed to fetch time series from Twelve Data:", error);
            return null;
        }
    },

    /**
     * Helper to map our local currency keys to Twelve Data supported formats
     */
    mapSymbol(symbol, type = 'stock') {
        // Twelve Data handles most standard tickers directly.
        // Cryptos usually need /USD suffix
        if (type === 'crypto' && !symbol.includes('/')) {
            return `${symbol}/USD`;
        }
        return symbol;
    }
};

window.TwelveDataAPI = TwelveDataAPI;
