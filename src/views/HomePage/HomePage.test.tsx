import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HomePage } from './HomePage';
import { useFetchMovies } from '../../api/hooks/useFetchMovies/useFetchMovies';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the useFetchMovies hook
jest.mock('../../api/hooks/useFetchMovies/useFetchMovies');

const mockedUseFetchMovies = useFetchMovies as jest.MockedFunction<typeof useFetchMovies>;

const mockInitialEmptyState = {
  movies: [],
  loading: false,
  error: null,
  hasMore: false,
};

const mockLoadingState = {
  movies: [],
  loading: true,
  error: null,
  hasMore: false,
};

const mockErrorState = {
  movies: [],
  loading: false,
  error: 'Failed to fetch movies.',
  hasMore: false,
};

const mockMoviesState = {
  movies: [
    { Title: 'Inception', Year: '2010', imdbID: 'tt1375666', Type: 'movie', Poster: 'https://example.com/inception.jpg' },
    { Title: 'Interstellar', Year: '2014', imdbID: 'tt0816692', Type: 'movie', Poster: 'https://example.com/interstellar.jpg' },
  ],
  loading: false,
  error: null,
  hasMore: false,
};

const mockMoviesWithMoreToLoadState = {
  movies: [
    { Title: 'Inception', Year: '2010', imdbID: 'tt1375666', Type: 'movie', Poster: 'https://example.com/inception.jpg' },
  ],
  loading: false,
  error: null,
    hasMore: true,
};

describe('HomePage Component', () => {
  beforeEach(() => {
    mockedUseFetchMovies.mockClear();
  });

  test('renders the search bar and title', () => {
    mockedUseFetchMovies.mockReturnValue(mockInitialEmptyState);

    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText(/Movie Search/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search for movies.../i)).toBeInTheDocument();
  });

  test('displays loading message during the first load', () => {
    mockedUseFetchMovies.mockReturnValue(mockLoadingState);

    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    mockedUseFetchMovies.mockReturnValue(mockErrorState);

    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText(/Failed to fetch movies./i)).toBeInTheDocument();
  });

  test('renders list of movies', () => {
    mockedUseFetchMovies.mockReturnValue(mockMoviesState);

    render(
      <Router>
        <HomePage />
      </Router>
    );

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
  });

  test('handles "Load More" button visibility and interaction', () => {
    mockedUseFetchMovies.mockReturnValue(mockMoviesWithMoreToLoadState);

    render(
      <Router>
        <HomePage />
      </Router>
    );

    const loadMoreButton = screen.getByRole('button', { name: /Load More/i });
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);

    expect(loadMoreButton).toBeInTheDocument();
  });

  test('interacts with SearchBar correctly', () => {
    mockedUseFetchMovies.mockReturnValue(mockInitialEmptyState);

    render(
      <Router>
        <HomePage />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText(/search for movies.../i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'Inception' } });
    fireEvent.click(searchButton);

    expect(searchInput).toHaveValue('Inception');
  });
});
