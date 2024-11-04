export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface MovieSearchResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
    Error?: string;
}

export interface MovieDetails {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Array<{ Source: string; Value: string }>;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
    Error?: string;
}
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com';

console.log('API Key:', API_KEY);

export async function fetchMovies (searchTerm: string, page: number = 1): Promise<Movie[]> {
    const response = await fetch (`${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}&page=${page}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    const data: MovieSearchResponse = await response.json();
    if (data.Response === 'False') {
        throw new Error(data.Error || 'Unknown error occurred');
    }
    return data.Search; 
}

export async function fetchMovieDetails(movieId: string): Promise<MovieDetails> {
    const response = await fetch (`${BASE_URL}?apikey=${API_KEY}&i=${movieId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie details');
    }
    const data: MovieDetails = await response.json();
    if (data.Response === 'False') {
        throw new Error(data.Error || 'Unknown error occurred');
    }
    return data;
}