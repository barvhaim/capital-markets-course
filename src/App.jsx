import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'
import LessonContainer from './components/lessons/LessonContainer'
import About from './components/pages/About'
import Terms from './components/pages/Terms'
import GoogleAnalytics from './components/GoogleAnalytics'
import './styles/variables.css'
import './styles/rtl.css'

// Google Analytics Measurement ID - Replace with your own
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Reset window scrolling
    window.scrollTo(0, 0)
    // Reset any isolated scrolling on the main container just in case
    const mainContent = document.querySelector('.main-content')
    if (mainContent) {
      mainContent.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setSidebarOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Router>
      <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      <ScrollToTop />
      <div className="app" dir="rtl">
        <Header toggleSidebar={toggleSidebar} />
        <div className="app-container">
          <Sidebar isOpen={sidebarOpen} isMobile={isMobile} />
          <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Routes>
              <Route path="/" element={<Navigate to="/lesson/1" replace />} />
              <Route path="/lesson/:lessonId" element={<LessonContainer />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<Navigate to="/lesson/1" replace />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
