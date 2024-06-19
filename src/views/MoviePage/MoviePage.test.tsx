import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MoviePage } from './MoviePage';
import { useFetchMovieDetails } from '../../api/hooks/useFetchMovieDetails/useFetchMovieDetails';

// Mock the useFetchMovieDetails hook
jest.mock('../../api/hooks/useFetchMovieDetails/useFetchMovieDetails');

const mockedUseFetchMovieDetails = useFetchMovieDetails as jest.MockedFunction<typeof useFetchMovieDetails>;

describe('MoviePage Component', () => {
  beforeEach(() => {
    mockedUseFetchMovieDetails.mockClear();
  });

  const mockLoadingState = {
    movie: null,
    loading: true,
    error: null,
  };

  const mockErrorState = {
    movie: null,
    loading: false,
    error: 'Failed to fetch movie details.',
  };

  const mockMovieDetailsState = {
    movie: {
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
      Website: 'https://example.com',
      Response: 'True',
    },
    loading: false,
    error: null,
  };

  test('displays loading message during movie details fetch', () => {
    mockedUseFetchMovieDetails.mockReturnValue(mockLoadingState);

    render(
      <MemoryRouter initialEntries={['/movie/tt1375666']}>
        <Routes>
          <Route path="/movie/:movieId" element={<MoviePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading those movie details.../i)).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    mockedUseFetchMovieDetails.mockReturnValue(mockErrorState);

    render(
      <MemoryRouter initialEntries={['/movie/tt1375666']}>
        <Routes>
          <Route path="/movie/:movieId" element={<MoviePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Failed to fetch movie details./i)).toBeInTheDocument();
  });

  test('renders movie details when data is fetched successfully', () => {
    mockedUseFetchMovieDetails.mockReturnValue(mockMovieDetailsState);

    render(
      <MemoryRouter initialEntries={['/movie/tt1375666']}>
        <Routes>
          <Route path="/movie/:movieId" element={<MoviePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText(/Leonardo DiCaprio/i)).toBeInTheDocument();
    expect(screen.getByAltText('Inception')).toHaveAttribute('src', 'https://example.com/inception.jpg');
  });

  test('renders back link to search page', () => {
    mockedUseFetchMovieDetails.mockReturnValue(mockMovieDetailsState);

    render(
      <MemoryRouter initialEntries={['/movie/tt1375666']}>
        <Routes>
          <Route path="/movie/:movieId" element={<MoviePage />} />
        </Routes>
      </MemoryRouter>
    );

    const backLink = screen.getByRole('link', { name: /Back to search/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });
});
