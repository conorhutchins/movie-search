import { useState, useEffect } from 'react';
import { fetchMovies, Movie } from '../omdbApi';

export const useFetchMovies = (searchTerm: string, page: number) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

useEffect(() => {
    if (!searchTerm) {
        setMovies([]);
        setError(null);
        return;
    }
    (async () => {
        try {
            setLoading(true);
            const data = await fetchMovies(searchTerm, page);
            setMovies((previousMovies) => page === 1 ? data: [...previousMovies, ...data]); 
            if (data.length === 0 && page === 1) {
                setError('No movies found');
            } else {
                setError(null);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            setError(errorMessage);
    } finally {
        setLoading(false);
    }
}
    )();
}
, [searchTerm, page]);
useEffect(() => {
    setMovies([]);
    setError(null);
}, [searchTerm]);

return { movies, loading, error };
}