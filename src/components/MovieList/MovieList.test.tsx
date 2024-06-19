import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import MovieList from './MovieList';
import { Movie } from '../../api/omdbApi';

const mockMovies: Movie[] = [
  {
    Title: 'Inception',
    Year: '2010',
    imdbID: 'tt1375666',
    Type: 'movie',
    Poster: 'https://example.com/inception.jpg',
  },
  {
    Title: 'Interstellar',
    Year: '2014',
    imdbID: 'tt0816692',
    Type: 'movie',
    Poster: 'https://example.com/interstellar.jpg',
  },
];

describe('MovieList Component', () => {
  test('renders "No movies found" when the movie list is empty', () => {
    render(
      <Router>
        <MovieList movies={[]} />
      </Router>
    );

    expect(screen.getByText(/No movies found/i)).toBeInTheDocument();
  });

  test('renders a list of movies', () => {
    render(
      <Router>
        <MovieList movies={mockMovies} />
      </Router>
    );

    const movieItems = screen.getAllByRole('listitem');
    expect(movieItems).toHaveLength(mockMovies.length);
  });

  test('renders movie details correctly', () => {
    render(
      <Router>
        <MovieList movies={mockMovies} />
      </Router>
    );

    mockMovies.forEach(movie => {
      expect(screen.getByText(movie.Title)).toBeInTheDocument();
      expect(screen.getByAltText(movie.Title)).toHaveAttribute('src', movie.Poster);
      expect(screen.getByText(movie.Year)).toBeInTheDocument();
    });
  });

  test('renders links to movie details page', () => {
    render(
      <Router>
        <MovieList movies={mockMovies} />
      </Router>
    );

    mockMovies.forEach(movie => {
        const linkElement = screen.getByRole('link', {
          name: (name, element) => name.includes(movie.Title) && element instanceof HTMLAnchorElement,
        });
        expect(linkElement).toHaveAttribute('href', `/movie/${movie.imdbID}`);
      });
  });
});
