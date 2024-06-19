import { useState, useEffect } from 'react';
import { fetchMovieDetails, MovieDetails } from '../omdbApi';

export const useFetchMovieDetails = (movieId: string) => {
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!movieId) {
            setMovie(null);
            setError("Please select a movie");
            return;
        }

        (async () => {
            try {
                setLoading(true);
                const data = await fetchMovieDetails(movieId);
                setMovie(data);
                setError(null);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        })();
        
    }, [movieId]);

    return { movie, loading, error };
}
