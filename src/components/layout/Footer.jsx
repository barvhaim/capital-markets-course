import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p className="footer-text">
            © {currentYear} קורס שוק ההון. כל הזכויות שמורות.
          </p>
        </div>
        
        <div className="footer-section">
          <p className="footer-disclaimer">
            <strong>הצהרת אחריות:</strong> המידע המוצג באתר זה הוא למטרות חינוכיות בלבד ואינו מהווה ייעוץ השקעות. 
            יש להתייעץ עם יועץ פיננסי מוסמך לפני קבלת החלטות השקעה.
          </p>
        </div>
        
        <div className="footer-section footer-links">
          <Link to="/about" className="footer-link">אודות</Link>
          <span className="footer-separator">•</span>
          <Link to="/terms" className="footer-link">תנאי שימוש</Link>
          <span className="footer-separator">•</span>
          <a href="#" className="footer-link">פרטיות</a>
          <span className="footer-separator">•</span>
          <a href="#" className="footer-link">צור קשר</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
