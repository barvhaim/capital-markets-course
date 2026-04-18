import './LessonContent.css'
import StockTicker from '../interactive/StockTicker'
import CurrencyExchange from '../interactive/CurrencyExchange'
import StockChart from '../interactive/StockChart'
import InteractiveQuiz from '../interactive/InteractiveQuiz'

function LessonContent({ lesson }) {
  if (!lesson || !lesson.sections) {
    return <div className="lesson-content-empty">אין תוכן זמין</div>
  }

  return (
    <div className="lesson-content">
      {lesson.sections.map((section) => (
        <section key={section.id} className="lesson-section">
          <h2 className="section-title">{section.title}</h2>
          
          {section.type === 'text' && (
            <div className="section-text" dangerouslySetInnerHTML={{ __html: section.content }} />
          )}
          
          {section.type === 'list' && (
            <ul className="section-list">
              {section.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          
          {section.type === 'table' && (
            <div className="section-table-wrapper">
              <table className="section-table">
                <thead>
                  <tr>
                    {section.headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {section.type === 'example' && (
            <div className="section-example">
              <div className="example-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3>דוגמה</h3>
              </div>
              <div className="example-content" dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          )}
          
          {section.type === 'note' && (
            <div className="section-note">
              <div className="note-header">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="10" cy="14" r="0.5" fill="currentColor"/>
                </svg>
                <strong>שים לב:</strong>
              </div>
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          )}
          
          {section.type === 'key-points' && (
            <div className="section-key-points">
              <h3 className="key-points-title">נקודות מפתח</h3>
              <ul className="key-points-list">
                {section.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}
          
          {section.type === 'stock-ticker' && (
            <StockTicker symbols={section.symbols} />
          )}
          
          {section.type === 'currency-exchange' && (
            <CurrencyExchange />
          )}
          
          {section.type === 'stock-chart' && (
            <StockChart symbol={section.symbol} interval={section.interval} />
          )}
          
          {section.type === 'quiz' && (
            <InteractiveQuiz quiz={section.quiz} />
          )}
        </section>
      ))}
      
      {lesson.resources && lesson.resources.length > 0 && (
        <div className="lesson-resources">
          <h3>משאבים נוספים</h3>
          <ul className="resources-list">
            {lesson.resources.map((resource, index) => (
              <li key={index}>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2V8M8 8V14M8 8H14M8 8H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default LessonContent
