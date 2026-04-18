import './LessonProgress.css'

function LessonProgress({ currentLesson, totalLessons, isCompleted }) {
  const progressPercentage = Math.round((currentLesson / totalLessons) * 100)
  
  return (
    <div className="lesson-progress-container">
      <div className="progress-info">
        <div className="progress-label">
          {isCompleted ? (
            <span className="completed-badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="var(--secondary)"/>
                <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              שיעור הושלם
            </span>
          ) : (
            <span>התקדמות בקורס</span>
          )}
        </div>
        <div className="progress-stats">
          שיעור {currentLesson} מתוך {totalLessons}
        </div>
      </div>
      
      <div className="progress-bar-wrapper">
        <div 
          className="progress-bar-track"
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div 
            className="progress-bar-indicator"
            style={{ width: `${progressPercentage}%` }}
          >
            <span className="progress-percentage">{progressPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonProgress
