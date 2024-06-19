import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders the search input and button', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    expect(screen.getByPlaceholderText(/search for movies.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('updates the search term state on user input', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/search for movies.../i);
    fireEvent.change(inputElement, { target: { value: 'Inception' } });

    expect(inputElement).toHaveValue('Inception');
  });

  test('calls onSearch with the correct term when the button is clicked', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/search for movies.../i);
    const buttonElement = screen.getByRole('button', { name: /search/i });

    fireEvent.change(inputElement, { target: { value: 'Interstellar' } });
    fireEvent.click(buttonElement);

    expect(mockOnSearch).toHaveBeenCalledWith('Interstellar');
  });

  test('calls onSearch with the correct term when Enter key is pressed', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/search for movies.../i);

    fireEvent.change(inputElement, { target: { value: 'Dunkirk' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    
    expect(mockOnSearch).toHaveBeenCalledWith('Dunkirk');
  });

  test('does not call onSearch when the input is empty or whitespace', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/search for movies.../i);
    const buttonElement = screen.getByRole('button', { name: /search/i });

    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(buttonElement);
    expect(mockOnSearch).not.toHaveBeenCalled();

    fireEvent.change(inputElement, { target: { value: '   ' } });
    fireEvent.click(buttonElement);
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
