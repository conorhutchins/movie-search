import { renderHook, waitFor } from '@testing-library/react';
import { useFetchMovies } from './useFetchMovies';
import { fetchMovies } from '../../omdbApi';

jest.mock('../../omdbApi', () => ({
  fetchMovies: jest.fn(),
}));

const mockMoviesPage1 = [
  { Title: 'Movie 1', Year: '2020', imdbID: 'tt1234567', Type: 'movie', Poster: 'N/A' },
  { Title: 'Movie 2', Year: '2021', imdbID: 'tt7654321', Type: 'movie', Poster: 'N/A' },
];

const mockMoviesPage2 = [
  { Title: 'Movie 3', Year: '2022', imdbID: 'tt9876543', Type: 'movie', Poster: 'N/A' },
];

const mockError = new Error('Failed to fetch movies');

describe('useFetchMovies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches movies successfully on initial page', async () => {
    (fetchMovies as jest.Mock).mockResolvedValue(mockMoviesPage1);

    const { result } = renderHook(() =>
      useFetchMovies('Batman', 1)
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movies).toEqual(mockMoviesPage1);
    expect(result.current.error).toBeNull();
  });

  test('fetches more movies on subsequent pages', async () => {
    (fetchMovies as jest.Mock)
      .mockResolvedValueOnce(mockMoviesPage1)
      .mockResolvedValueOnce(mockMoviesPage2);

    const { result, rerender } = renderHook(
      ({ searchTerm, page }) => useFetchMovies(searchTerm, page),
      {
        initialProps: { searchTerm: 'Batman', page: 1 },
      }
    );

    await waitFor(() => {
      expect(result.current.movies).toEqual(mockMoviesPage1);
    });

    rerender({ searchTerm: 'Batman', page: 2 });

    await waitFor(() => {
      expect(result.current.movies).toEqual([
        ...mockMoviesPage1,
        ...mockMoviesPage2,
      ]);
    });
  });

  test('handles API error', async () => {
    (fetchMovies as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() =>
      useFetchMovies('Batman', 1)
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBe(mockError.message);
  });

  test('handles empty search term', () => {
    const { result } = renderHook(() => useFetchMovies('', 1));

    expect(result.current.loading).toBe(false);
    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
