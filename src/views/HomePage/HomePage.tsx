import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import { useFetchMovies } from '../../api/hooks/useFetchMovies/useFetchMovies';
import styles from './HomePage.module.css';
import Image from '../../images/house-of-movies.webp';

export const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const { movies, loading, error, hasMore } = useFetchMovies(searchTerm, page);

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        setPage(1);
    };

    const loadMore = () => {
        setPage((previousPage) => previousPage + 1);
    };

    let content

    if (error) {
        content = <p className={styles.errorMessage}>{error}</p>;
    } else if (loading && page === 1) {
        content = <p className={styles.loadingMessage}>Loading...</p>;

    } else { 
        content = (
            <>
                {movies.length > 0 && <MovieList movies={movies} />}
                {loading && page > 1 ? (
                    <p className={styles.loadingMoreMessage}>Loading more...</p>
                ) : (
                 hasMore &&  movies.length > 0 && !loading && <button className={styles.loadMoreButton} onClick={loadMore}>Load More</button>
                )}
            </>
        );
    }
    return (
        <div className={styles.homePage}>
          {!searchTerm && <h1 className={styles.title}>Give it a whirl</h1>}
          <SearchBar onSearch={handleSearch} />
          {movies.length > 0 || searchTerm ? (
            content
          ) : (
            <div className={styles.welcome}>
              <img
                src={Image}
                alt="Conor's House of Movies"
                className={styles.welcomeImage}
              />
              <p>
                Welcome friend! Use the search bar above to find details on your favourite films.
              </p>
            </div>
          )}
        </div>
      );
    };      
