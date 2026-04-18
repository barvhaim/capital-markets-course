import { useState, useEffect } from 'react'
import { fetchStockQuote } from '../../services/api'
import './StockTicker.css'

function StockTicker({ symbols = ['AAPL', 'MSFT', 'GOOGL', 'TEVA.TA'] }) {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadStocks()
    // Refresh every 60 seconds
    const interval = setInterval(loadStocks, 60000)
    return () => clearInterval(interval)
  }, [symbols])

  const loadStocks = async () => {
    try {
      setError(null)
      const stockPromises = symbols.map(symbol => fetchStockQuote(symbol))
      const stockData = await Promise.all(stockPromises)
      setStocks(stockData)
      setLoading(false)
    } catch (err) {
      setError('שגיאה בטעינת נתוני מניות')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="stock-ticker loading">
        <div className="ticker-loader">טוען נתוני שוק...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="stock-ticker error">
        <div className="ticker-error">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="10" cy="14" r="0.5" fill="currentColor"/>
          </svg>
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="stock-ticker">
      <div className="ticker-header">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2 10L5 7L9 11L13 5L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 5H18V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3>מניות בזמן אמת</h3>
        <button onClick={loadStocks} className="refresh-button" title="רענן">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84 2 11.4 2.8 12.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 2V4H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className="ticker-grid">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="ticker-item">
            <div className="ticker-symbol">{stock.symbol}</div>
            <div className="ticker-price">${stock.price.toFixed(2)}</div>
            <div className={`ticker-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
              <span className="change-arrow">
                {stock.change >= 0 ? '▲' : '▼'}
              </span>
              <span className="change-value">
                {Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
              </span>
            </div>
            <div className="ticker-volume">
              נפח: {(stock.volume / 1000000).toFixed(2)}M
            </div>
          </div>
        ))}
      </div>
      
      <div className="ticker-footer">
        עדכון אחרון: {new Date().toLocaleTimeString('he-IL')}
      </div>
    </div>
  )
}

export default StockTicker
