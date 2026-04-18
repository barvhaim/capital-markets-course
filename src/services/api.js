/**
 * API Service Layer for Financial Data
 * Integrates with multiple financial data providers
 */

const API_KEYS = {
  // Free tier API keys - users should replace with their own
  ALPHA_VANTAGE: 'demo', // Replace with actual key from https://www.alphavantage.co/support/#api-key
  EXCHANGE_RATE: 'demo', // Replace with actual key from https://www.exchangerate-api.com/
}

const API_ENDPOINTS = {
  ALPHA_VANTAGE: 'https://www.alphavantage.co/query',
  EXCHANGE_RATE: 'https://api.exchangerate-api.com/v4/latest',
  TWELVE_DATA: 'https://api.twelvedata.com',
  YAHOO_FINANCE_PROXY: 'https://query1.finance.yahoo.com/v8/finance/chart',
}

/**
 * Fetch stock quote data
 * @param {string} symbol - Stock symbol (e.g., 'AAPL', 'MSFT')
 * @returns {Promise<Object>} Stock data
 */
export async function fetchStockQuote(symbol) {
  try {
    // Using Alpha Vantage API
    const url = `${API_ENDPOINTS.ALPHA_VANTAGE}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEYS.ALPHA_VANTAGE}`
    const response = await fetch(url)
    const data = await response.json()
    
    if (data['Global Quote']) {
      const quote = data['Global Quote']
      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        volume: parseInt(quote['06. volume']),
        lastUpdated: quote['07. latest trading day'],
      }
    }
    
    throw new Error('Invalid response from API')
  } catch (error) {
    console.error('Error fetching stock quote:', error)
    // Return mock data for demo purposes
    return getMockStockData(symbol)
  }
}

/**
 * Fetch intraday stock data for charts
 * @param {string} symbol - Stock symbol
 * @param {string} interval - Time interval (1min, 5min, 15min, 30min, 60min)
 * @returns {Promise<Array>} Array of price data points
 */
export async function fetchIntradayData(symbol, interval = '5min') {
  try {
    const url = `${API_ENDPOINTS.ALPHA_VANTAGE}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${API_KEYS.ALPHA_VANTAGE}`
    const response = await fetch(url)
    const data = await response.json()
    
    const timeSeriesKey = `Time Series (${interval})`
    if (data[timeSeriesKey]) {
      const timeSeries = data[timeSeriesKey]
      return Object.entries(timeSeries).map(([time, values]) => ({
        time,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume']),
      })).reverse().slice(0, 50) // Last 50 data points
    }
    
    throw new Error('Invalid response from API')
  } catch (error) {
    console.error('Error fetching intraday data:', error)
    return getMockIntradayData(symbol)
  }
}

/**
 * Fetch currency exchange rates
 * @param {string} baseCurrency - Base currency code (e.g., 'USD', 'EUR', 'ILS')
 * @returns {Promise<Object>} Exchange rates
 */
export async function fetchExchangeRates(baseCurrency = 'USD') {
  try {
    const url = `${API_ENDPOINTS.EXCHANGE_RATE}/${baseCurrency}`
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.rates) {
      return {
        base: data.base,
        date: data.date,
        rates: data.rates,
      }
    }
    
    throw new Error('Invalid response from API')
  } catch (error) {
    console.error('Error fetching exchange rates:', error)
    return getMockExchangeRates(baseCurrency)
  }
}

/**
 * Fetch Israeli stock data (Tel Aviv Stock Exchange)
 * @param {string} symbol - Stock symbol (e.g., 'TEVA.TA')
 * @returns {Promise<Object>} Stock data
 */
export async function fetchIsraeliStock(symbol) {
  try {
    // Using Yahoo Finance as it supports TASE stocks
    const url = `${API_ENDPOINTS.YAHOO_FINANCE_PROXY}/${symbol}?interval=1d&range=1d`
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.chart && data.chart.result && data.chart.result[0]) {
      const result = data.chart.result[0]
      const meta = result.meta
      const quote = result.indicators.quote[0]
      
      return {
        symbol: meta.symbol,
        price: meta.regularMarketPrice,
        change: meta.regularMarketPrice - meta.previousClose,
        changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100,
        volume: meta.regularMarketVolume,
        currency: meta.currency,
        lastUpdated: new Date(meta.regularMarketTime * 1000).toISOString(),
      }
    }
    
    throw new Error('Invalid response from API')
  } catch (error) {
    console.error('Error fetching Israeli stock:', error)
    return getMockIsraeliStockData(symbol)
  }
}

/**
 * Fetch market indices (TA-35, TA-125, etc.)
 * @returns {Promise<Array>} Array of index data
 */
export async function fetchMarketIndices() {
  const indices = [
    { symbol: '^TA35.TA', name: 'TA-35' },
    { symbol: '^TA125.TA', name: 'TA-125' },
    { symbol: '^GSPC', name: 'S&P 500' },
    { symbol: '^DJI', name: 'Dow Jones' },
  ]
  
  try {
    const promises = indices.map(async (index) => {
      const data = await fetchIsraeliStock(index.symbol)
      return {
        ...data,
        name: index.name,
      }
    })
    
    return await Promise.all(promises)
  } catch (error) {
    console.error('Error fetching market indices:', error)
    return getMockIndicesData()
  }
}

/**
 * Search for stocks by name or symbol
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching stocks
 */
export async function searchStocks(query) {
  try {
    const url = `${API_ENDPOINTS.ALPHA_VANTAGE}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEYS.ALPHA_VANTAGE}`
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.bestMatches) {
      return data.bestMatches.map(match => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
        type: match['3. type'],
        region: match['4. region'],
        currency: match['8. currency'],
      }))
    }
    
    throw new Error('Invalid response from API')
  } catch (error) {
    console.error('Error searching stocks:', error)
    return getMockSearchResults(query)
  }
}

// Mock data functions for demo/fallback purposes

function getMockStockData(symbol) {
  const basePrice = 100 + Math.random() * 400
  const change = (Math.random() - 0.5) * 10
  
  return {
    symbol,
    price: parseFloat(basePrice.toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat((change / basePrice * 100).toFixed(2)),
    volume: Math.floor(Math.random() * 10000000),
    lastUpdated: new Date().toISOString().split('T')[0],
  }
}

function getMockIntradayData(symbol) {
  const data = []
  const basePrice = 100 + Math.random() * 400
  const now = new Date()
  
  for (let i = 50; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60 * 1000)
    const variance = (Math.random() - 0.5) * 5
    const open = basePrice + variance
    const close = open + (Math.random() - 0.5) * 2
    const high = Math.max(open, close) + Math.random() * 1
    const low = Math.min(open, close) - Math.random() * 1
    
    data.push({
      time: time.toISOString(),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000),
    })
  }
  
  return data
}

function getMockExchangeRates(baseCurrency) {
  const rates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    ILS: 3.65,
    JPY: 110.5,
    CNY: 6.45,
  }
  
  // Adjust rates based on base currency
  const baseRate = rates[baseCurrency] || 1
  const adjustedRates = {}
  
  Object.keys(rates).forEach(currency => {
    adjustedRates[currency] = parseFloat((rates[currency] / baseRate).toFixed(4))
  })
  
  return {
    base: baseCurrency,
    date: new Date().toISOString().split('T')[0],
    rates: adjustedRates,
  }
}

function getMockIsraeliStockData(symbol) {
  const basePrice = 50 + Math.random() * 200
  const change = (Math.random() - 0.5) * 5
  
  return {
    symbol,
    price: parseFloat(basePrice.toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat((change / basePrice * 100).toFixed(2)),
    volume: Math.floor(Math.random() * 5000000),
    currency: 'ILS',
    lastUpdated: new Date().toISOString(),
  }
}

function getMockIndicesData() {
  return [
    {
      symbol: '^TA35.TA',
      name: 'TA-35',
      price: 2150.45,
      change: 12.34,
      changePercent: 0.58,
      volume: 0,
      currency: 'ILS',
      lastUpdated: new Date().toISOString(),
    },
    {
      symbol: '^TA125.TA',
      name: 'TA-125',
      price: 1850.23,
      change: -5.67,
      changePercent: -0.31,
      volume: 0,
      currency: 'ILS',
      lastUpdated: new Date().toISOString(),
    },
    {
      symbol: '^GSPC',
      name: 'S&P 500',
      price: 4500.12,
      change: 25.45,
      changePercent: 0.57,
      volume: 0,
      currency: 'USD',
      lastUpdated: new Date().toISOString(),
    },
    {
      symbol: '^DJI',
      name: 'Dow Jones',
      price: 35000.67,
      change: -100.23,
      changePercent: -0.29,
      volume: 0,
      currency: 'USD',
      lastUpdated: new Date().toISOString(),
    },
  ]
}

function getMockSearchResults(query) {
  const mockStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', type: 'Equity', region: 'United States', currency: 'USD' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'Equity', region: 'United States', currency: 'USD' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'Equity', region: 'United States', currency: 'USD' },
    { symbol: 'TEVA.TA', name: 'Teva Pharmaceutical Industries', type: 'Equity', region: 'Israel', currency: 'ILS' },
  ]
  
  return mockStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
    stock.name.toLowerCase().includes(query.toLowerCase())
  )
}
