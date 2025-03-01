import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchMovieDetails } from '../../api/hooks/useFetchMovieDetails/useFetchMovieDetails';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import styles from './MoviePage.module.css';

export const MoviePage: React.FC = () => {
  const { movieId = "" } = useParams<{ movieId: string }>();
  const { movie, loading, error } = useFetchMovieDetails(movieId);

  let content;

  if (!movieId) {
    content = <p className={styles.errorMessage}>Movie ID is required</p>;
  } else if (error) {
    content = <p className={styles.errorMessage}>{error}</p>;
  } else if (loading) {
    content = <p className={styles.loadingMessage}>Loading those movie details...</p>;
  } else if (movie) {
    content = (
      <div className={styles.movieDetails}>
        <MovieDetails movie={movie} />
      </div>
    );
  }

  return (
    <main className={styles.moviePage}>
      <h1 className={styles.title}>Movie Details</h1>
      {content}
      <nav>
        <Link to="/" className={styles.backLink}>Back to search</Link>
      </nav>
    </main>
  );
};
