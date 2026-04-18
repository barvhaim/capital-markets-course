# Capital Markets Course 📈

An interactive educational platform for learning about capital markets, built with React and Vite. This course provides hands-on learning experiences through interactive components, real-time data visualization, and comprehensive lessons.

## ✨ Features

- **10 Comprehensive Lessons**: Structured curriculum covering fundamental to advanced capital markets concepts
- **Interactive Components**:
  - 📊 Real-time Stock Charts with data visualization
  - 💱 Currency Exchange simulator
  - 📈 Live Stock Ticker
  - 🎯 Interactive Quizzes for knowledge assessment
- **Progress Tracking**: Monitor your learning journey through each lesson
- **RTL Support**: Full support for right-to-left languages (Hebrew/Arabic)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean and intuitive interface for optimal learning experience

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd capital-markets-course
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## 🏗️ Project Structure

```
capital-markets-course/
├── src/
│   ├── components/
│   │   ├── interactive/      # Interactive learning components
│   │   │   ├── CurrencyExchange.jsx
│   │   │   ├── StockChart.jsx
│   │   │   ├── StockTicker.jsx
│   │   │   └── InteractiveQuiz.jsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── lessons/          # Lesson-related components
│   │   │   ├── LessonContainer.jsx
│   │   │   ├── LessonContent.jsx
│   │   │   └── LessonProgress.jsx
│   │   └── pages/            # Page components
│   │       └── About.jsx
│   ├── data/
│   │   └── lessons/          # Lesson content (10 lessons)
│   │       ├── lesson01.js
│   │       ├── lesson02.js
│   │       └── ...
│   ├── services/
│   │   └── api.js            # API service layer
│   ├── styles/               # Global styles
│   │   ├── global.css
│   │   ├── rtl.css
│   │   └── variables.css
│   ├── App.jsx               # Main application component
│   └── main.jsx              # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🛠️ Technologies Used

- **React 18.3.1** - UI library
- **React Router DOM 6.26.0** - Client-side routing
- **Recharts 2.12.7** - Data visualization and charting
- **Vite 5.4.2** - Build tool and development server
- **CSS3** - Styling with CSS variables and RTL support

## 📚 Course Content

The course includes 10 comprehensive lessons covering:
1. Introduction to Capital Markets
2. Stock Market Fundamentals
3. Bonds and Fixed Income
4. Currency Markets (Forex)
5. Derivatives and Options
6. Market Analysis Techniques
7. Risk Management
8. Portfolio Management
9. Trading Strategies
10. Advanced Market Concepts

## 🎯 Learning Approach

- **Interactive Learning**: Engage with real-time simulations and visualizations
- **Self-Paced**: Progress through lessons at your own speed
- **Practical Examples**: Learn through hands-on exercises and quizzes
- **Visual Learning**: Understand complex concepts through charts and graphs

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and not licensed for public use.

## 📧 Contact

For questions or feedback, please open an issue in the repository.

---

**Happy Learning! 📚💹**
