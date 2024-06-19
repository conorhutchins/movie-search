import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';
import { MovieDetails as MovieDetailsType } from '../../api/omdbApi';

const mockMovie: MovieDetailsType = {
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
};

describe('MovieDetails Component', () => {
    test('renders key movie details', async () => {
        render(<MovieDetails movie={mockMovie} />);
      
        expect(screen.getByRole('heading', { name: /Inception/i })).toBeInTheDocument();
        expect(screen.getByAltText(/Inception/i)).toBeInTheDocument();
        expect(screen.getByAltText(/Inception/i)).toHaveAttribute('src', mockMovie.Poster);
      
        expect(await screen.findByText(/PG-13/i)).toBeInTheDocument();
        expect(await screen.findByText(/16 Jul 2010/i)).toBeInTheDocument();
        expect(await screen.findByText(/148 min/i)).toBeInTheDocument();
        expect(await screen.findByText(/Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page/i)).toBeInTheDocument();
      });

  test('renders website link when available', () => {
    render(<MovieDetails movie={mockMovie} />);

    const websiteLink = screen.getByText(mockMovie.Website);
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink).toHaveAttribute('href', mockMovie.Website);
  });

  test('renders "N/A" when website is not available', () => {
    const movieWithoutWebsite = { ...mockMovie, Website: 'N/A' };
    render(<MovieDetails movie={movieWithoutWebsite} />);

    expect(screen.getByText(/N\/A/i)).toBeInTheDocument();
  });
});
