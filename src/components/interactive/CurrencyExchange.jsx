import { useState, useEffect } from 'react'
import { fetchExchangeRates } from '../../services/api'
import './CurrencyExchange.css'

function CurrencyExchange() {
  const [rates, setRates] = useState(null)
  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [amount, setAmount] = useState(100)
  const [targetCurrency, setTargetCurrency] = useState('ILS')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const currencies = [
    { code: 'USD', name: 'דולר אמריקאי', symbol: '$' },
    { code: 'EUR', name: 'יורו', symbol: '€' },
    { code: 'GBP', name: 'לירה שטרלינג', symbol: '£' },
    { code: 'ILS', name: 'שקל ישראלי', symbol: '₪' },
    { code: 'JPY', name: 'ין יפני', symbol: '¥' },
    { code: 'CNY', name: 'יואן סיני', symbol: '¥' },
  ]

  useEffect(() => {
    loadRates()
    // Refresh every 5 minutes
    const interval = setInterval(loadRates, 300000)
    return () => clearInterval(interval)
  }, [baseCurrency])

  const loadRates = async () => {
    try {
      setError(null)
      const data = await fetchExchangeRates(baseCurrency)
      setRates(data)
      setLoading(false)
    } catch (err) {
      setError('שגיאה בטעינת שערי מטבע')
      setLoading(false)
    }
  }

  const handleBaseCurrencyChange = (e) => {
    setBaseCurrency(e.target.value)
    setLoading(true)
  }

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setAmount(value)
    }
  }

  const calculateConversion = () => {
    if (!rates || !rates.rates[targetCurrency]) return 0
    return (amount * rates.rates[targetCurrency]).toFixed(2)
  }

  const getPopularPairs = () => {
    if (!rates) return []
    
    const pairs = [
      { from: 'USD', to: 'ILS', label: 'דולר → שקל' },
      { from: 'EUR', to: 'ILS', label: 'יורו → שקל' },
      { from: 'USD', to: 'EUR', label: 'דולר → יורו' },
      { from: 'GBP', to: 'USD', label: 'לירה → דולר' },
    ]

    return pairs.map(pair => {
      const rate = baseCurrency === pair.from 
        ? rates.rates[pair.to]
        : (1 / rates.rates[pair.from]) * rates.rates[pair.to]
      
      return {
        ...pair,
        rate: rate ? rate.toFixed(4) : 'N/A'
      }
    })
  }

  if (loading) {
    return (
      <div className="currency-exchange loading">
        <div className="exchange-loader">טוען שערי מטבע...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="currency-exchange error">
        <div className="exchange-error">
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
    <div className="currency-exchange">
      <div className="exchange-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2"/>
          <path d="M9 6V12L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M15 15L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <h3>מחשבון המרת מטבעות</h3>
      </div>

      <div className="exchange-converter">
        <div className="converter-row">
          <div className="converter-input">
            <label>סכום</label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="converter-select">
            <label>מטבע מקור</label>
            <select value={baseCurrency} onChange={handleBaseCurrencyChange}>
              {currencies.map(curr => (
                <option key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="converter-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="converter-row">
          <div className="converter-result">
            <label>תוצאה</label>
            <div className="result-value">{calculateConversion()}</div>
          </div>
          
          <div className="converter-select">
            <label>מטבע יעד</label>
            <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
              {currencies.map(curr => (
                <option key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="exchange-rate-display">
          1 {baseCurrency} = {rates.rates[targetCurrency]?.toFixed(4)} {targetCurrency}
        </div>
      </div>

      <div className="popular-pairs">
        <h4>שערים פופולריים</h4>
        <div className="pairs-grid">
          {getPopularPairs().map((pair, index) => (
            <div key={index} className="pair-item">
              <div className="pair-label">{pair.label}</div>
              <div className="pair-rate">{pair.rate}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="exchange-footer">
        <div className="footer-info">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 4V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          עדכון אחרון: {new Date(rates.date).toLocaleDateString('he-IL')}
        </div>
        <button onClick={loadRates} className="refresh-button" title="רענן">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84 2 11.4 2.8 12.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 2V4H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          רענן
        </button>
      </div>
    </div>
  )
}

export default CurrencyExchange
