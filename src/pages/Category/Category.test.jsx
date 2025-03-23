import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Category from './Category';
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

describe('Category Component', () => {

  it('calls useFetch with correct arguments', () => {
    // Mock useParams
    const useParamsMock = require('react-router-dom').useParams;
    useParamsMock.mockReturnValue({ category: 'fiction' });

    // Mock useGlobalContext
    const mockUseFetch = jest.fn();
    const useGlobalContextMock = require('../../context/BooksContext').useGlobalContext;
    useGlobalContextMock.mockReturnValue({
      useFetchBooks: mockUseFetch,
      categoryBooks: [],
    });

    // Render component
    render(
      <MemoryRouter initialEntries={['/category/fiction']}>
        <Routes>
          <Route path="/category/:category" element={<Category />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify that useFetch was called with correct arguments
    expect(mockUseFetch).toHaveBeenCalledWith(
      'GET_CATEGORY_BOOKS',
      'search-books?genres=fiction'
    );
  });
});
