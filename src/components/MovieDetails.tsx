import React from "react";
import { MovieDetails as MovieDetailsType } from "../api/omdbApi";
import styles from "./MovieDetails.module.css";

interface MovieDetailsProps {
    movie: MovieDetailsType;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
    return (
        <div>
            <div className={styles.movieHeader}>
            <img src={movie.Poster} alt={movie.Title} className={styles.poster} />
            <h2>{movie.Title}</h2>
            </div>
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Rated:</strong> {movie.Rated}</p>
            <p><strong>Released:</strong> {movie.Released}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Writer:</strong> {movie.Writer}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>Language:</strong> {movie.Language}</p>
            <p><strong>Country:</strong> {movie.Country}</p>
            <p><strong>Awards:</strong> {movie.Awards}</p>
            <p><strong>Ratings:</strong> {movie.Ratings.map(rating => (
                <span key={rating.Source}>{rating.Source}: {rating.Value} </span>
            ))}</p>
            <p><strong>Metascore:</strong> {movie.Metascore}</p>
            <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
            <p><strong>IMDb Votes:</strong> {movie.imdbVotes}</p>
            <p><strong>Box Office:</strong> {movie.BoxOffice}</p>
            <p><strong>Production:</strong> {movie.Production}</p>
            <p><strong>DVD Release:</strong> {movie.DVD}</p>
            <p><strong>Website:</strong> {movie.Website ? <a href={movie.Website} target="_blank" rel="noopener noreferrer">{movie.Website}</a> : 'N/A'}</p>
        </div>
    );
};

export default MovieDetails;