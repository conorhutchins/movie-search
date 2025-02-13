import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HomePage } from './views/HomePage/HomePage';
import { MoviePage } from './views/MoviePage/MoviePage';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <Router basename="/movie-search">
      <div className={styles.appContainer}>
        <header className={styles.header}>
          <Link to="/" className={styles.logo}>Conor's House of Movies</Link>
        </header>

        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:movieId" element={<MoviePage />} />
            <Route
              path="*"
              element={
                <div className={styles.notFoundContainer}>
                  <h2 className={styles.notFound}>404 - Page Not Found</h2>
                  <Link to="/">Go back to Home</Link>
                </div>
              }
            />
          </Routes>
        </main>

        <footer className={styles.footer}>
          {/* Optional footer text or links */}
          &copy; {new Date().getFullYear()} Conor's Movie App
        </footer>
      </div>
    </Router>
  );
};

export default App;
