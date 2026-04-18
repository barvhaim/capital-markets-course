import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header({ toggleSidebar }) {
  return (
    <header className="header">
      <div className="header-content">
        <button 
          className="menu-toggle"
          onClick={toggleSidebar}
          aria-label="פתח/סגור תפריט"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <Link to="/lesson/1" className="header-logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logo-body-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--primary-light)" stopOpacity="0.8"/>
                <stop offset="1" stopColor="var(--primary-dark)" stopOpacity="0.8"/>
              </linearGradient>
              <linearGradient id="logo-accent-grad" x1="0" y1="40" x2="40" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--accent-light)"/>
                <stop offset="1" stopColor="var(--accent-dark)"/>
              </linearGradient>
              <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
              </filter>
            </defs>
            <rect width="40" height="40" rx="12" fill="var(--glass-bg)" stroke="url(#logo-body-grad)" strokeWidth="1.5"/>
            <path d="M10 28L18 16L24 20L30 10" stroke="url(#logo-accent-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#logo-glow)"/>
            <circle cx="30" cy="10" r="3.5" fill="var(--primary-light)" filter="url(#logo-glow)"/>
            <path d="M10 28L18 16L24 20L30 10V32H10V28Z" fill="url(#logo-body-grad)" opacity="0.15"/>
          </svg>
          <h1 className="header-title">קורס שוק ההון</h1>
        </Link>
        
        <div className="header-progress">
          <ProgressIndicator />
        </div>
      </div>
    </header>
  )
}

function ProgressIndicator() {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('courseProgress')
    return saved ? JSON.parse(saved) : { lessonsCompleted: [], currentLesson: 1 }
  })

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('courseProgress')
      if (saved) {
        setProgress(JSON.parse(saved))
      }
    }

    // Listen for storage events from other tabs/windows
    window.addEventListener('storage', handleStorageChange)
    
    // Listen for custom event for same-window updates
    window.addEventListener('courseProgressUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('courseProgressUpdated', handleStorageChange)
    }
  }, [])
  
  const totalLessons = 10
  const completedCount = progress.lessonsCompleted?.length || 0
  const percentage = Math.round((completedCount / totalLessons) * 100)
  
  return (
    <div className="progress-indicator">
      <span className="progress-text">{completedCount}/{totalLessons} שיעורים</span>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="progress-percentage">{percentage}%</span>
    </div>
  )
}

export default Header
