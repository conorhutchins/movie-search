import { renderHook, waitFor } from '@testing-library/react';
import { useFetchMovieDetails } from './useFetchMovieDetails';
import { fetchMovieDetails } from '../../omdbApi';

jest.mock('../../omdbApi', () => ({
  fetchMovieDetails: jest.fn(),
}));

const mockMovieDetails = {
  Title: 'Inception',
  Year: '2010',
  Rated: 'PG-13',
  Released: '16 Jul 2010',
  Runtime: '148 min',
  Genre: 'Action, Adventure, Sci-Fi',
  Director: 'Christopher Nolan',
  Writer: 'Christopher Nolan',
  Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
  Plot: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
  Language: 'English, Japanese, French',
  Country: 'USA, UK',
  Awards: 'Won 4 Oscars. Another 143 wins & 198 nominations.',
  Poster: 'https://example.com/inception.jpg',
  Ratings: [{ Source: 'Internet Movie Database', Value: '8.8/10' }],
  Metascore: '74',
  imdbRating: '8.8',
  imdbVotes: '2,000,000',
  imdbID: 'tt1375666',
  Type: 'movie',
  DVD: '07 Dec 2010',
  BoxOffice: '$292,576,195',
  Production: 'Warner Bros. Pictures',
  Website: 'N/A',
  Response: 'True',
};

const mockError = new Error('Failed to fetch movie details');

describe('useFetchMovieDetails', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches movie details successfully', async () => {
    (fetchMovieDetails as jest.Mock).mockResolvedValue(mockMovieDetails);

    const { result } = renderHook(() =>
      useFetchMovieDetails('tt1375666')
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movie).toEqual(mockMovieDetails);
    expect(result.current.error).toBeNull();
  });

  test('handles API error', async () => {
    (fetchMovieDetails as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() =>
      useFetchMovieDetails('tt1375666')
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movie).toBeNull();
    expect(result.current.error).toBe(mockError.message);
  });

  test('handles empty movieId', () => {
    const { result } = renderHook(() => useFetchMovieDetails(''));

    expect(result.current.loading).toBe(false);
    expect(result.current.movie).toBeNull();
    expect(result.current.error).toBe('Please select a movie');
  });
});
