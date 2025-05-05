import { render, screen, fireEvent } from '@testing-library/react';
import TopRatedBooks from './TopRatedBooks';
import { BooksContext } from '../../context/BooksContext';
import { mockContext, mockNullContext, mockLoadingContext } from '../../mocks';

// Mock Components
jest.mock('../../ui/TitleTypeOne/TitleTypeOne', () => () => <div>Top Rated Books</div>);
jest.mock('../Slider/Slider', () => ({ children }) => <div>Slider {children}</div>);
jest.mock('../../ui/Loading/Loading', () => () => <div>Loading</div>);
jest.mock('../Book/Book', () => ({book}) => <div role='book'>{book.title}</div>);
jest.mock('../../ui/NoContent/NoContent', () => () => <div>No Content</div>);
jest.mock('../Modal/Rating/Rating',() => ({rating}) => <div>{rating}</div>)

describe('TopRatedBooks Component', () => {

  const renderTopRatedBooksf = (contextValue) => {
    render(
      <BooksContext.Provider value={contextValue}>
        <TopRatedBooks />
      </BooksContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the loading state', () => {
    renderTopRatedBooksf(mockLoadingContext);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders NoContent when no books are found', () => {
    renderTopRatedBooksf(mockNullContext);
    expect(screen.getByText(/no content/i)).toBeInTheDocument();
  });

  test('renders the books when topRatedBooks are provided', () => {
    renderTopRatedBooksf(mockContext);
    const {topRatedBooks} = mockContext

    const books = screen.getAllByAltText('book-image')
    expect(books).toHaveLength(topRatedBooks.length)
  });

  test('clicking "Read More" button calls handleOpenModal with correct book', () => {
    renderTopRatedBooksf(mockContext);
    const {handleOpenModal} = mockContext
    fireEvent.click(screen.getAllByText(/Read More/i)[0]);
    expect(handleOpenModal).toHaveBeenCalledWith(mockContext.bestSellingBooks[0]);
  });

  test('calls useFetchBooks with the correct arguments', () => {
    renderTopRatedBooksf(mockLoadingContext);
    const {useFetchBooks} = mockLoadingContext

    expect(useFetchBooks).toHaveBeenCalledTimes(1)
    expect(useFetchBooks).toHaveBeenCalledWith(
      'GET_TOP_RATED_BOOKS',
      'search-books?min-rating=0.9&sort=rating&sort-direction=ASC&number=12'
    );
  });

  test('handles case when no books have ratings', () => {
    renderTopRatedBooksf(mockContext)
    const {topRatedBooks} = mockContext
    const ratings = screen.getAllByText('0.0');
    expect(ratings).toHaveLength(topRatedBooks.length);
  });

  test('renders tree shape image with correct src and alt attributes', () => {
    renderTopRatedBooksf(mockNullContext);
    const treeImage = screen.getByAltText('tree shape');
    expect(treeImage).toHaveAttribute('src', 'treeShape.png');
    expect(treeImage).toHaveClass('tree-shape')
  });

  test('displays the correct title for the section', () => {
    renderTopRatedBooksf(mockNullContext);
    const sectionTitle = screen.getByText(/top rated books/i)
    expect(sectionTitle).toBeInTheDocument();
  });
})