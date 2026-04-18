import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Sidebar.css'

const lessons = [
  { id: 1, title: 'מבוא לשוק ההון והמערכת הכלכלית', duration: '3 שעות' },
  { id: 2, title: 'מכשירי השקעה', duration: '3 שעות' },
  { id: 3, title: 'תשואה, סיכון ופיזור סיכונים', duration: '3 שעות' },
  { id: 4, title: 'קריאת דוחות כספיים', duration: '3 שעות' },
  { id: 5, title: 'השקעה פסיבית מול אקטיבית', duration: '3 שעות' },
  { id: 6, title: 'בניית תיק השקעות', duration: '3 שעות' },
  { id: 7, title: 'יסודות ניתוח טכני', duration: '3 שעות' },
  { id: 8, title: 'פיננסים התנהגותיים וטעויות נפוצות', duration: '3 שעות' },
  { id: 9, title: 'מיסים ועמלות', duration: '3 שעות' },
  { id: 10, title: 'סיכום הקורס ופרויקט גמר', duration: '3 שעות' }
]

function Sidebar({ isOpen, isMobile }) {
  const { lessonId } = useParams()
  const currentLessonId = parseInt(lessonId)
  
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

  const isLessonCompleted = (id) => {
    return progress.lessonsCompleted?.includes(id) || false
  }

  const isLessonLocked = (id) => {
    // All lessons are unlocked
    return false
  }

  return (
    <>
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={() => {}} />
      )}
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">תוכן הקורס</h2>
          <div className="sidebar-subtitle">10 שיעורים • 30 שעות אקדמיות</div>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="lesson-list">
            {lessons.map((lesson) => {
              const isCompleted = isLessonCompleted(lesson.id)
              const isLocked = isLessonLocked(lesson.id)
              const isCurrent = lesson.id === currentLessonId
              
              return (
                <li key={lesson.id} className="lesson-item">
                  <Link
                    to={`/lesson/${lesson.id}`}
                    className={`lesson-link ${isCurrent ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
                    onClick={(e) => {
                      if (isLocked) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <div className="lesson-number">
                      {isCompleted ? (
                        <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="10" fill="var(--secondary)"/>
                          <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : isLocked ? (
                        <svg className="lock-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <rect x="5" y="9" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M7 9V6C7 4.34315 8.34315 3 10 3C11.6569 3 13 4.34315 13 6V9" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                      ) : (
                        <span className="lesson-num">{lesson.id}</span>
                      )}
                    </div>
                    
                    <div className="lesson-info">
                      <div className="lesson-title">{lesson.title}</div>
                      <div className="lesson-duration">{lesson.duration}</div>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="progress-summary">
            <div className="progress-label">התקדמות כוללת</div>
            <div className="progress-stats">
              {progress.lessonsCompleted?.length || 0} מתוך {lessons.length} שיעורים
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
