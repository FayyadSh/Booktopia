import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import Book from './Book';
import { BooksContext } from '../../context/BooksContext';

describe('Book Component', () => {
  const mockHandleOpenModal = jest.fn();
  const mockBook = {id: 1, image: './icon.svg'}

  const renderBook = (size = 'normal') => {
    render (
      <BooksContext.Provider value={{ handleOpenModal: mockHandleOpenModal }}>
        <Book book={mockBook} size={size}/>
      </BooksContext.Provider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders book with correct image', () => {
    renderBook()
    const bookImage = screen.getByAltText('book-image');
    expect(bookImage).toBeInTheDocument();
    expect(bookImage).toHaveAttribute('src', './icon.svg');
    expect(bookImage).toHaveAttribute('alt', 'book-image');
    expect(bookImage).not.toBeNull();
  });

  test('applies correct size class based on prop', () => {
    renderBook('large');
    const bookElement = screen.getByRole('book');
    expect(bookElement).toHaveClass('book large');
  });

  test('calls handleOpenModal when the book is clicked', () => {
    renderBook();

    const bookElement = screen.getByRole('book');
    fireEvent.click(bookElement);

    expect(mockHandleOpenModal).toHaveBeenCalledTimes(1);
    expect(mockHandleOpenModal).toHaveBeenCalledWith(mockBook);
  });

  test('calls handleOpenModal when the book is clicked', () => {
    renderBook();

    const bookElement = screen.getByRole('book');
    fireEvent.click(bookElement);

    expect(mockHandleOpenModal).toHaveBeenCalledTimes(1);
    expect(mockHandleOpenModal).toHaveBeenCalledWith(mockBook);
  });

  test('renders book with default size class if no size prop is provided', () => {
    renderBook();

    const bookElement = screen.getByRole('book');
    expect(bookElement).toHaveClass('book normal');
  });

  test('does not throw error if book.image is undefined', () => {
    const bookWithoutImage = { ...mockBook, image: undefined };

    expect(() => render(
      <BooksContext.Provider value={{handleOpenModal: mockHandleOpenModal}}>
        <Book book={bookWithoutImage} />
      </BooksContext.Provider>
    )).not.toThrow();
  });

});