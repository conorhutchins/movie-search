import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders HomePage at root path "/"', () => {
    window.history.pushState({}, 'HomePage', '/');
    render(<App />);

    expect(screen.getByPlaceholderText(/search for movies.../i)).toBeInTheDocument();
    expect(screen.getByText(/Movie Search/i)).toBeInTheDocument();
  });

  test('renders MoviePage at path "/movie/:movieId"', () => {
    window.history.pushState({}, 'MoviePage', '/movie/tt1375666');
    render(<App />);

    expect(screen.getByText(/Loading those movie details.../i)).toBeInTheDocument();
  });

  test('renders 404 page for invalid paths', () => {
    window.history.pushState({}, 'Not Found', '/invalid-path');
    render(<App />);

    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go back to Home/i })).toBeInTheDocument();
  });
});
