import { useState } from 'react'
import './InteractiveQuiz.css'

function InteractiveQuiz({ quiz }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (showResults) return // Don't allow changes after submission
    
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    })
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    let correctCount = 0
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++
      }
    })
    setScore(correctCount)
    setShowResults(true)
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setScore(0)
  }

  const getScorePercentage = () => {
    return Math.round((score / quiz.questions.length) * 100)
  }

  const getScoreMessage = () => {
    const percentage = getScorePercentage()
    if (percentage === 100) return 'מושלם! 🎉'
    if (percentage >= 80) return 'מצוין! 👏'
    if (percentage >= 60) return 'טוב מאוד! 👍'
    if (percentage >= 40) return 'לא רע, אבל יש מקום לשיפור 📚'
    return 'כדאי לחזור על החומר 📖'
  }

  const question = quiz.questions[currentQuestion]
  const isAnswered = selectedAnswers[currentQuestion] !== undefined
  const allAnswered = Object.keys(selectedAnswers).length === quiz.questions.length

  if (showResults) {
    return (
      <div className="interactive-quiz results">
        <div className="quiz-header">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="3"/>
            <path d="M16 24L21 29L32 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>תוצאות המבחן</h3>
        </div>

        <div className="results-summary">
          <div className="score-circle">
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={getScorePercentage() >= 60 ? '#4ade80' : '#f87171'}
                strokeWidth="8"
                strokeDasharray={`${getScorePercentage() * 2.827} 282.7`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <text x="50" y="50" textAnchor="middle" dy="7" fontSize="24" fontWeight="bold" fill="currentColor">
                {getScorePercentage()}%
              </text>
            </svg>
          </div>
          
          <div className="score-details">
            <h4>{getScoreMessage()}</h4>
            <p className="score-text">
              ענית נכון על <strong>{score}</strong> מתוך <strong>{quiz.questions.length}</strong> שאלות
            </p>
          </div>
        </div>

        <div className="results-breakdown">
          <h4>סקירת תשובות</h4>
          {quiz.questions.map((q, index) => {
            const userAnswer = selectedAnswers[index]
            const isCorrect = userAnswer === q.correctAnswer
            
            return (
              <div key={index} className={`result-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="result-header">
                  <span className="result-icon">
                    {isCorrect ? '✓' : '✗'}
                  </span>
                  <span className="result-question">שאלה {index + 1}</span>
                </div>
                <p className="result-question-text">{q.question}</p>
                <div className="result-answers">
                  <p className="user-answer">
                    <strong>התשובה שלך:</strong> {q.answers[userAnswer]}
                  </p>
                  {!isCorrect && (
                    <p className="correct-answer">
                      <strong>התשובה הנכונה:</strong> {q.answers[q.correctAnswer]}
                    </p>
                  )}
                </div>
                {q.explanation && (
                  <div className="result-explanation">
                    <strong>הסבר:</strong> {q.explanation}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="quiz-actions">
          <button onClick={handleReset} className="quiz-button primary">
            נסה שוב
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="interactive-quiz">
      <div className="quiz-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <h3>{quiz.title}</h3>
      </div>

      {quiz.description && (
        <p className="quiz-description">{quiz.description}</p>
      )}

      <div className="quiz-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          שאלה {currentQuestion + 1} מתוך {quiz.questions.length}
        </span>
      </div>

      <div className="quiz-question">
        <h4 className="question-text">{question.question}</h4>
        
        <div className="question-answers">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              className={`answer-option ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(currentQuestion, index)}
            >
              <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
              <span className="answer-text">{answer}</span>
              {selectedAnswers[currentQuestion] === index && (
                <span className="answer-check">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-navigation">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="quiz-button secondary"
        >
          ← הקודם
        </button>
        
        <div className="question-indicators">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentQuestion ? 'active' : ''} ${selectedAnswers[index] !== undefined ? 'answered' : ''}`}
              onClick={() => setCurrentQuestion(index)}
              title={`שאלה ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentQuestion === quiz.questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="quiz-button primary"
          >
            סיים מבחן
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="quiz-button primary"
          >
            הבא →
          </button>
        )}
      </div>

      {!allAnswered && (
        <div className="quiz-hint">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="8" cy="11" r="0.5" fill="currentColor"/>
          </svg>
          יש לענות על כל השאלות לפני סיום המבחן
        </div>
      )}
    </div>
  )
}

export default InteractiveQuiz
