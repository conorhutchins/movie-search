import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../api/omdbApi";
import styles from './MovieList.module.css'

interface MovieListProps {
    movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    if (movies.length === 0) {
        return <p>No movies found</p>;
    }
    return (
        <ul>
            {movies.map((movie) => (
                <li key={movie.imdbID}>
                    <div className="movie-info">
                        <Link to={`/movie/${movie.imdbID}`} className={styles.link}>
                            <div className={styles.imageContainer}>
                                {movie.Poster !== "N/A" ? (
                                    <img src={movie.Poster} alt={movie.Title} className={styles.poster} />
                                ) : (
                                    <div className={styles.noImage}>No Image</div>
                                )}
                            </div>
                            <div>
                                <h3>{movie.Title}</h3>
                            </div>
                        </Link>
                        <p className={styles.white}>{movie.Year}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;