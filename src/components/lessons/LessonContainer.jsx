import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LessonContent from './LessonContent'
import LessonProgress from './LessonProgress'
import './LessonContainer.css'

// Import lesson data
import { lessons } from '../../data/lessons/index'

function LessonContainer() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const currentLessonId = parseInt(lessonId)
  
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('courseProgress')
    return saved ? JSON.parse(saved) : { 
      lessonsCompleted: [], 
      currentLesson: 1,
      quizScores: {}
    }
  })

  const lesson = lessons.find(l => l.id === currentLessonId)

  useEffect(() => {
    if (!lesson) {
      navigate('/lesson/1')
    }
  }, [lesson, navigate])

  // Scroll to top when lesson changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    // Also scroll the main content container
    const mainContent = document.querySelector('.main-content')
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [lessonId])

  const handlePrevious = () => {
    if (currentLessonId > 1) {
      navigate(`/lesson/${currentLessonId - 1}`)
      window.scrollTo(0, 0)
    }
  }

  const handleNext = () => {
    if (currentLessonId < 10) {
      navigate(`/lesson/${currentLessonId + 1}`)
      window.scrollTo(0, 0)
    }
  }

  const handleCompleteLesson = () => {
    const newProgress = {
      ...progress,
      lessonsCompleted: [...new Set([...progress.lessonsCompleted, currentLessonId])],
      currentLesson: Math.max(progress.currentLesson, currentLessonId + 1)
    }
    
    setProgress(newProgress)
    localStorage.setItem('courseProgress', JSON.stringify(newProgress))
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('courseProgressUpdated'))
    
    // Navigate to next lesson if available
    if (currentLessonId < 10) {
      setTimeout(() => {
        navigate(`/lesson/${currentLessonId + 1}`)
        window.scrollTo(0, 0)
      }, 500)
    }
  }

  const isLessonCompleted = progress.lessonsCompleted.includes(currentLessonId)

  if (!lesson) {
    return (
      <div className="lesson-container">
        <div className="lesson-loading">טוען שיעור...</div>
      </div>
    )
  }

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <div className="lesson-meta">
          <span className="lesson-number-badge">שיעור {lesson.id}</span>
          <span className="lesson-duration-badge">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {lesson.duration}
          </span>
        </div>
        <h1 className="lesson-title">{lesson.title}</h1>
        
        {lesson.objectives && lesson.objectives.length > 0 && (
          <div className="lesson-objectives">
            <h3>מטרות השיעור:</h3>
            <ul>
              {lesson.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <LessonContent lesson={lesson} />

      <div className="lesson-actions">
        <div className="lesson-navigation">
          <button 
            className="btn btn-secondary"
            onClick={handlePrevious}
            disabled={currentLessonId === 1}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            שיעור קודם
          </button>
          
          {!isLessonCompleted && (
            <button 
              className="btn btn-primary"
              onClick={handleCompleteLesson}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10L8 13L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              סיימתי את השיעור
            </button>
          )}
          
          <button 
            className="btn btn-secondary"
            onClick={handleNext}
            disabled={currentLessonId === 10}
          >
            שיעור הבא
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <LessonProgress 
        currentLesson={currentLessonId}
        totalLessons={10}
        isCompleted={isLessonCompleted}
      />
    </div>
  )
}

export default LessonContainer
