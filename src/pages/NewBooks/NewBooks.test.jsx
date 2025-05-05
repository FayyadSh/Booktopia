import { render, screen, waitFor } from '@testing-library/react';
import NewBooks from './NewBooks'; // Adjust the import to the correct path
import { useGlobalContext } from '../../context/BooksContext'; // Adjust the import
import { GET_NEW_BOOKS } from '../../context/actions';

// Mocking the context
jest.mock('../../context/BooksContext', () => ({
  useGlobalContext: jest.fn(),
}));

// Mocking the BooksPage component
jest.mock('../../components/BooksPage/BooksPage', () => () => <div>Books Page</div>);

describe('NewBooks Component', () => {
  const mockUseFetch = jest.fn();
  const mockNewBooks = [{ title: 'Book 1', author: 'Author 1' }, { title: 'Book 2', author: 'Author 2' }];

  beforeEach(() => {
    // Reset mock functions before each test
    mockUseFetch.mockClear();
    useGlobalContext.mockReturnValue({
      useFetchBooks: mockUseFetch,
      newBooks: mockNewBooks,
    });
  });

  test('should call useFetch with the correct parameters', async () => {
    // Render the component
    render(<NewBooks />);

    // Ensure useFetch is called with the correct action and parameters
    expect(mockUseFetch).toHaveBeenCalledWith(
      GET_NEW_BOOKS,
      'search-books?earliest-publish-year=2023&latest-publish-year=2025'
    );
  });

});
