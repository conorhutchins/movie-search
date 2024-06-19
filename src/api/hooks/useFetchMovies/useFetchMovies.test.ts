// src/hooks/useFetchMovies/useFetchMovies.test.ts

import { renderHook, act, waitFor } from '@testing-library/react';
import { useFetchMovies } from './useFetchMovies';
import { fetchMovies } from '../../omdbApi';

jest.mock('../../omdbApi', () => ({
  fetchMovies: jest.fn(),
}));

describe('useFetchMovies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches movies successfully on initial page', async () => {
    (fetchMovies as jest.Mock).mockResolvedValue([
      { Title: 'Movie 1', Year: '2020', imdbID: 'tt1234567', Type: 'movie', Poster: 'N/A' },
      { Title: 'Movie 2', Year: '2021', imdbID: 'tt7654321', Type: 'movie', Poster: 'N/A' },
    ]);

    const { result } = renderHook(() =>
      useFetchMovies('Batman', 1)
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movies).toEqual([
      { Title: 'Movie 1', Year: '2020', imdbID: 'tt1234567', Type: 'movie', Poster: 'N/A' },
      { Title: 'Movie 2', Year: '2021', imdbID: 'tt7654321', Type: 'movie', Poster: 'N/A' },
    ]);
    expect(result.current.error).toBeNull();
  });

  test('fetches more movies on subsequent pages', async () => {
    (fetchMovies as jest.Mock)
      .mockResolvedValueOnce([
        { Title: 'Movie 1', Year: '2020', imdbID: 'tt1234567', Type: 'movie', Poster: 'N/A' },
      ])
      .mockResolvedValueOnce([
        { Title: 'Movie 2', Year: '2021', imdbID: 'tt7654321', Type: 'movie', Poster: 'N/A' },
      ]);

    const { result, rerender } = renderHook(
      ({ searchTerm, page }) => useFetchMovies(searchTerm, page),
      {
        initialProps: { searchTerm: 'Batman', page: 1 },
      }
    );

    await waitFor(() => {
      expect(result.current.movies).toEqual([
        { Title: 'Movie 1', Year: '2020', imdbID: 'tt1234567', Type: 'movie', Poster: 'N/A' },
      ]);
    });

    rerender({ searchTerm: 'Batman', page: 2 });

    await waitFor(() => {
      expect(result.current.movies).toEqual([
        { Title: 'Movie 1', Year: '2020', imdbID: 'tt1234567', Type: 'movie', Poster: 'N/A' },
        { Title: 'Movie 2', Year: '2021', imdbID: 'tt7654321', Type: 'movie', Poster: 'N/A' },
      ]);
    });
  });

  test('handles API error', async () => {
    (fetchMovies as jest.Mock).mockRejectedValue(new Error('Failed to fetch movies'));

    const { result } = renderHook(() =>
      useFetchMovies('Batman', 1)
    );

    await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    
      await waitFor(() => {
        expect(result.current.movies).toEqual([]);
      });
    
      await waitFor(() => {
        expect(result.current.error).toBe('Failed to fetch movies');
      });
    });

  test('handles empty search term', () => {
    const { result } = renderHook(() => useFetchMovies('', 1));

    expect(result.current.loading).toBe(false);
    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
