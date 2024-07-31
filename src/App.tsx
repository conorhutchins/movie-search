import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HomePage } from './views/HomePage/HomePage';
import { MoviePage } from './views/MoviePage/MoviePage';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
      <Router basename="/movie-search">
          <div className={styles.appContainer}>
              <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/movie/:movieId" element={<MoviePage/>} />
                  <Route path="*" element={
              <div>
                <h2 className={styles.notFound}>404 - Page Not Found</h2>
                <Link to="/">Go back to Home</Link>
              </div>
            }
          />
              </Routes>
          </div>
      </Router>
  );
};

export default App;
