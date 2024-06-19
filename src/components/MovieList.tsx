import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../api/omdbApi";
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
                        <img src={movie.Poster} alt={movie.Title} />
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