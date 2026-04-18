import './About.css'

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <header className="about-header">
          <h1>אודות הקורס</h1>
          <p className="about-subtitle">קורס מקיף ללימוד שוק ההון והשקעות</p>
        </header>

        <section className="about-section">
          <h2>מטרת הקורס</h2>
          <p>
            קורס שוק ההון נועד לספק לך את הידע והכלים הנדרשים להבנה מעמיקה של עולם ההשקעות והפיננסים.
            הקורס מתאים למתחילים ללא ידע קודם, וכן למי שמעוניין לרענן ולהעמיק את הידע שלו בתחום.
          </p>
        </section>

        <section className="about-section">
          <h2>מה תלמדו בקורס?</h2>
          <ul className="about-list">
            <li>הבנה מעמיקה של המערכת הכלכלית ושוק ההון</li>
            <li>היכרות עם מכשירי השקעה שונים - מניות, אג"ח, קרנות נאמנות ועוד</li>
            <li>ניהול סיכונים ובניית תיק השקעות מאוזן</li>
            <li>קריאה והבנה של דוחות כספיים</li>
            <li>אסטרטגיות השקעה פסיביות ואקטיביות</li>
            <li>יסודות ניתוח טכני ופונדמנטלי</li>
            <li>פיננסים התנהגותיים והימנעות מטעויות נפוצות</li>
            <li>היבטי מיסוי ועמלות בהשקעות</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>מבנה הקורס</h2>
          <div className="course-structure">
            <div className="structure-item">
              <div className="structure-icon">📚</div>
              <h3>10 שיעורים מקיפים</h3>
              <p>כל שיעור מכיל תוכן תיאורטי, דוגמאות מעשיות ותרגילים</p>
            </div>
            <div className="structure-item">
              <div className="structure-icon">⏱️</div>
              <h3>30 שעות אקדמיות</h3>
              <p>תוכן מקיף שמאפשר למידה עצמית בקצב שלך</p>
            </div>
            <div className="structure-item">
              <div className="structure-icon">🎯</div>
              <h3>תרגול אינטראקטיבי</h3>
              <p>שאלות בוחן, סימולציות ותרגילים מעשיים</p>
            </div>
            <div className="structure-item">
              <div className="structure-icon">📊</div>
              <h3>פרויקט גמר</h3>
              <p>בניית תיק השקעות אישי כפרויקט סיום</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>למי מתאים הקורס?</h2>
          <ul className="about-list">
            <li>מתחילים שרוצים להתחיל להשקיע בצורה מושכלת</li>
            <li>משקיעים מתחילים שרוצים להעמיק את הידע שלהם</li>
            <li>אנשים שמעוניינים להבין את המערכת הפיננסית</li>
            <li>מי שרוצה לקבל החלטות פיננסיות מושכלות יותר</li>
            <li>סטודנטים לכלכלה ומנהל עסקים</li>
          </ul>
        </section>

        <section className="about-section disclaimer-section">
          <h2>הצהרת אחריות</h2>
          <div className="disclaimer-box">
            <p>
              <strong>חשוב לדעת:</strong> המידע המוצג בקורס זה הוא למטרות חינוכיות בלבד ואינו מהווה ייעוץ השקעות, 
              ייעוץ פיננסי או המלצה לביצוע פעולות בשוק ההון. כל החלטה להשקיע או לבצע פעולה כלשהי בשוק ההון 
              היא באחריותך הבלעדית.
            </p>
            <p>
              מומלץ להתייעץ עם יועץ פיננסי מוסמך ומורשה לפני קבלת החלטות השקעה. ביצועי עבר אינם ערובה לביצועים עתידיים.
            </p>
          </div>
        </section>

        <section className="about-section contact-section">
          <h2>צור קשר</h2>
          <p>
            יש לך שאלות או הצעות לשיפור? נשמח לשמוע ממך!
          </p>
          <div className="contact-info">
            <p>📧 Email: info@capital-markets-course.com</p>
            <p>💬 נשמח לקבל משוב על הקורס ולשפר אותו</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
