import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AuthorBooks from './AuthorBooks';
import BooksPage from '../../components/BooksPage/BooksPage';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../../context/BooksContext', () => ({
  useGlobalContext: jest.fn(),
}));

jest.mock('../../components/BooksPage/BooksPage', () => jest.fn(() => <div data-testid="mocked-books-page">Mocked BooksPage</div>));

describe('AuthorBooks Component', () => {

  it('calls useFetch with correct arguments', () => {
    // Mock useParams
    const useParamsMock = require('react-router-dom').useParams;
    useParamsMock.mockReturnValue({ author: 'John Doe' });

    // Mock useGlobalContext
    const mockUseFetch = jest.fn();
    const useGlobalContextMock = require('../../context/BooksContext').useGlobalContext;
    useGlobalContextMock.mockReturnValue({
      useFetchBooks: mockUseFetch,
      authorBooks: [],
    });

    // Render component
    render(
      <MemoryRouter initialEntries={['/author/John Doe']}>
        <Routes>
          <Route path="/author/:author" element={<AuthorBooks />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify that useFetch was called with correct arguments
    expect(mockUseFetch).toHaveBeenCalledWith(
      'GET_AUTHOR_BOOKS',
      'search-books?authors=John Doe'
    );
  });
});
