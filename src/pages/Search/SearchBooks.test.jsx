import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';  // For simulating routing
import { useGlobalContext } from '../../context/BooksContext';
import SearchBooks from './SearchBooks';  // Import the SearchBooks component
import { GET_SEARCH_RESULT_BOOKS } from '../../context/actions';

// Mock the BooksPage component to avoid rendering the full component
jest.mock('../../components/BooksPage/BooksPage', () => ({ pageName, pageBooks }) => (
  <div data-testid="books-page">
    <h1>{pageName}</h1>
    <div>{pageBooks.length} books found</div>
  </div>
));

jest.mock('../../context/BooksContext', () => ({
  useGlobalContext: jest.fn(),
}));

// Mock react-router-dom entirely to avoid issues with spying
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),  // Keep other React Router methods intact
  useParams: jest.fn(),
}));

describe('SearchBooks Component', () => {
  it('should fetch and display search result books correctly', async () => {
    const query = 'react';
    const mockBooks = [
      { id: 1, title: 'React for Beginners' },
      { id: 2, title: 'Advanced React' },
    ];

    // Mock useParams to simulate the URL query parameter
    require('react-router-dom').useParams.mockReturnValue({ query });

    // Mock useGlobalContext
    useGlobalContext.mockReturnValue({
      useFetchBooks: jest.fn(),
      searchResultBooks: mockBooks,
    });

    // Render the component within a MemoryRouter to simulate routing
    render(
      <MemoryRouter initialEntries={[`/search-books/${query}`]}>
        <Routes>
          <Route path="/search-books/:query" element={<SearchBooks />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the component to render and check the page content
    await waitFor(() => {
      expect(screen.getByTestId('books-page')).toBeInTheDocument();
      expect(screen.getByText(`${query} Books`)).toBeInTheDocument(); // Check the page name
      expect(screen.getByText('2 books found')).toBeInTheDocument(); // Check the number of books
    });

    // Ensure useFetch was called with the correct parameters
    expect(useGlobalContext().useFetchBooks).toHaveBeenCalledWith(
      GET_SEARCH_RESULT_BOOKS,
      `search-books?query=${query}`
    );
  });

  it('should handle empty search result correctly', async () => {
    const query = 'react';
    const mockBooks = [];

    require('react-router-dom').useParams.mockReturnValue({ query });

    useGlobalContext.mockReturnValue({
      useFetchBooks: jest.fn(),
      searchResultBooks: mockBooks,
    });

    render(
      <MemoryRouter initialEntries={[`/search-books/${query}`]}>
        <Routes>
          <Route path="/search-books/:query" element={<SearchBooks />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('books-page')).toBeInTheDocument();
      expect(screen.getByText(`${query} Books`)).toBeInTheDocument();
      expect(screen.getByText('0 books found')).toBeInTheDocument(); // Ensure no books found
    });
  });
});
