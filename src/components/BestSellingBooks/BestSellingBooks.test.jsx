import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { BooksContext } from "../../context/BooksContext";
import BestSellingBooks from "./BestSellingBooks";
import { GET_BEST_SELLING_BOOKS } from "../../context/actions";
import { mockContext, mockNullContext, mockLoadingContext } from "../../mocks";

// Mock Components
jest.mock('../../ui/TitleTypeOne/TitleTypeOne', () => () => <div>Best Selling Books</div>);
jest.mock('../Slider/Slider', () => ({ children }) => <div>Slider {children}</div>);
jest.mock('../../ui/Loading/Loading', () => () => <div>Loading</div>);
jest.mock('../Book/Book', () => ({book}) => <div role='book'>{book.title}</div>);
jest.mock('../../ui/NoContent/NoContent', () => () => <div>No Content</div>);

const renderBestSellingBooks = (contextValue) => {

  return render(
    <BooksContext.Provider value={contextValue}>
      <MemoryRouter>
        <BestSellingBooks />
      </MemoryRouter>
    </BooksContext.Provider>
  );
};

describe("BestSellingBooks Component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test("accessibility check: ensures that the main components are accessible", () => {
    renderBestSellingBooks(mockContext);
    const {bestSellingBooks} = mockContext

    // Check for accessibility-related elements
    const sectionTitle = screen.getByText(/best selling books/i)
    expect(sectionTitle).toBeInTheDocument()

    const sectionButton = screen.getByRole('link', { name: /view all products/i })
    expect(sectionButton).toBeInTheDocument()

    const sectionBooks = screen.getAllByRole('book')
    expect(sectionBooks).toHaveLength(bestSellingBooks.length);

    const sectionSlider = screen.getByText(/slider/i)
    expect(sectionSlider).toBeInTheDocument()
  });

  test("renders loading state initially", () => {
    renderBestSellingBooks(mockLoadingContext);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders 'No Content' when no books are available", () => {
    renderBestSellingBooks(mockNullContext);
    expect(screen.getByText(/no content/i)).toBeInTheDocument();
  });

  test("calls useFetch with the correct parameters", () => {
    renderBestSellingBooks(mockContext);
    const {useFetchBooks} = mockContext

    expect(useFetchBooks).toHaveBeenCalledWith(
      GET_BEST_SELLING_BOOKS,
      "search-books?sort=rating&sort-direction=asc&number=20&earliest-publish-year=2023&latest-publish-year=2025&min-rating=0.7"
    );
    expect(useFetchBooks).toHaveBeenCalledTimes(1)
  });

  test("does not render 'View all products' button when there are no books", () => {
    renderBestSellingBooks(mockNullContext);
    const sectionButton = screen.queryByText(/view all products/i)
    expect(sectionButton).not.toBeInTheDocument();
    
    const sectionSlider = screen.queryByText(/slider/i);
    expect(sectionSlider).not.toBeInTheDocument();
  });

  test('render "View all products" link when bestSellingBooks is populated', () => {
    renderBestSellingBooks(mockContext);
    const sectionButton = screen.getByText('View all products');
    
    expect(sectionButton).toBeInTheDocument();
    expect(sectionButton.closest('a')).toHaveAttribute('href', '/*');
    expect(sectionButton).toHaveClass('btn');

    sectionButton.focus();
    expect(sectionButton).toHaveFocus();
  });

  test('should render all section book', () => {
    renderBestSellingBooks(mockContext);
    const {bestSellingBooks} = mockContext
    
    bestSellingBooks.forEach((b) => {
      const book = screen.getByText(b.title)
      expect(book).toBeInTheDocument()
    })
  })
  
});