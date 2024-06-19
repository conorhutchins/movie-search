import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../api/omdbApi";

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
                    <Link to={`/movie/${movie.imdbID}`}>
                        <img src={movie.Poster} alt={movie.Title} />
                        <div>
                            <h3>{movie.Title}</h3>
                        </div>
                    </Link>
                            <p>{movie.Year}</p>
                            </div>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;