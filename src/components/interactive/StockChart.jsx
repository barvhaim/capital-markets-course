import { useState, useEffect } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { fetchIntradayData } from '../../services/api'
import './StockChart.css'

function StockChart({ symbol = 'AAPL', interval = '5min' }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [chartType, setChartType] = useState('area')
  const [selectedSymbol, setSelectedSymbol] = useState(symbol)
  const [selectedInterval, setSelectedInterval] = useState(interval)

  const symbols = [
    { code: 'AAPL', name: 'Apple' },
    { code: 'MSFT', name: 'Microsoft' },
    { code: 'GOOGL', name: 'Google' },
    { code: 'AMZN', name: 'Amazon' },
    { code: 'TEVA.TA', name: 'Teva' },
  ]

  const intervals = [
    { value: '1min', label: 'דקה' },
    { value: '5min', label: '5 דקות' },
    { value: '15min', label: '15 דקות' },
    { value: '30min', label: '30 דקות' },
    { value: '60min', label: 'שעה' },
  ]

  useEffect(() => {
    loadChartData()
  }, [selectedSymbol, selectedInterval])

  const loadChartData = async () => {
    try {
      setLoading(true)
      setError(null)
      const chartData = await fetchIntradayData(selectedSymbol, selectedInterval)
      
      // Format data for Recharts
      const formattedData = chartData.map(point => ({
        time: new Date(point.time).toLocaleTimeString('he-IL', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        price: point.close,
        high: point.high,
        low: point.low,
        volume: point.volume,
      }))
      
      setData(formattedData)
      setLoading(false)
    } catch (err) {
      setError('שגיאה בטעינת נתוני גרף')
      setLoading(false)
    }
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-time">{payload[0].payload.time}</p>
          <p className="tooltip-price">מחיר: ${payload[0].value.toFixed(2)}</p>
          {payload[0].payload.high && (
            <>
              <p className="tooltip-high">גבוה: ${payload[0].payload.high.toFixed(2)}</p>
              <p className="tooltip-low">נמוך: ${payload[0].payload.low.toFixed(2)}</p>
            </>
          )}
          {payload[0].payload.volume && (
            <p className="tooltip-volume">נפח: {(payload[0].payload.volume / 1000).toFixed(0)}K</p>
          )}
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="stock-chart loading">
        <div className="chart-loader">
          <div className="loader-spinner"></div>
          <p>טוען נתוני גרף...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="stock-chart error">
        <div className="chart-error">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="16" r="1" fill="currentColor"/>
          </svg>
          <p>{error}</p>
          <button onClick={loadChartData} className="retry-button">נסה שוב</button>
        </div>
      </div>
    )
  }

  return (
    <div className="stock-chart">
      <div className="chart-header">
        <div className="chart-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 16L12 11L16 15L21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>גרף מניות אינטראקטיבי</h3>
        </div>
        
        <div className="chart-controls">
          <div className="control-group">
            <label>מניה:</label>
            <select 
              value={selectedSymbol} 
              onChange={(e) => setSelectedSymbol(e.target.value)}
              className="chart-select"
            >
              {symbols.map(sym => (
                <option key={sym.code} value={sym.code}>
                  {sym.name} ({sym.code})
                </option>
              ))}
            </select>
          </div>
          
          <div className="control-group">
            <label>מרווח:</label>
            <select 
              value={selectedInterval} 
              onChange={(e) => setSelectedInterval(e.target.value)}
              className="chart-select"
            >
              {intervals.map(int => (
                <option key={int.value} value={int.value}>
                  {int.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="control-group">
            <label>סוג גרף:</label>
            <div className="chart-type-buttons">
              <button
                className={`type-button ${chartType === 'area' ? 'active' : ''}`}
                onClick={() => setChartType('area')}
                title="גרף שטח"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 15L5 10L9 13L13 8L18 12V18H2V15Z" fill="currentColor" opacity="0.3"/>
                  <path d="M2 15L5 10L9 13L13 8L18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className={`type-button ${chartType === 'line' ? 'active' : ''}`}
                onClick={() => setChartType('line')}
                title="גרף קווי"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 15L5 10L9 13L13 8L18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <button onClick={loadChartData} className="refresh-button" title="רענן">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M16 9C16 12.866 12.866 16 9 16C5.134 16 2 12.866 2 9C2 5.134 5.134 2 9 2C11.213 2 13.213 3.05 14.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M14 2V4.5H11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          {chartType === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="#888"
                tick={{ fill: '#888', fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#888"
                tick={{ fill: '#888', fontSize: 12 }}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#8884d8" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPrice)" 
              />
            </AreaChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="#888"
                tick={{ fill: '#888', fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#888"
                tick={{ fill: '#888', fontSize: 12 }}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={false}
                name="מחיר"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="chart-stats">
        <div className="stat-item">
          <span className="stat-label">נקודות נתונים:</span>
          <span className="stat-value">{data.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">מחיר נוכחי:</span>
          <span className="stat-value">${data[data.length - 1]?.price.toFixed(2)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">שינוי:</span>
          <span className={`stat-value ${(data[data.length - 1]?.price - data[0]?.price) >= 0 ? 'positive' : 'negative'}`}>
            {((data[data.length - 1]?.price - data[0]?.price) / data[0]?.price * 100).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default StockChart
