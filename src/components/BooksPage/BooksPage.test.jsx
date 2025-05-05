import { render, screen } from "@testing-library/react";
import { useGlobalContext } from "../../context/BooksContext";
import BooksPage from "./BooksPage";

// Mock components
jest.mock("../../context/BooksContext", () => ({
  useGlobalContext: jest.fn(),
}));
jest.mock("../../ui/Error/Error", () => ({
  __esModule: true,
  default: ({ errorMessage }) => <div data-testid="error">{errorMessage}</div>,
}));
jest.mock("../../ui/NoContent/NoContent", () => ({
  __esModule: true,
  default: () => <div data-testid="no-content">No Content</div>,
}));
jest.mock("../../ui/TitleTypeTow/TitleTypetwo", () => ({
  __esModule: true,
  default: ({ title }) => <h1 data-testid="title">{title}</h1>,
}));
jest.mock("../BooksFilter/BooksFilter", () => ({
  __esModule: true,
  default: () => <div data-testid="books-filter">Books Filter</div>,
}));
jest.mock("../Pagination/Pagination", () => ({
  __esModule: true,
  default: ({ books, length }) => (
    <div data-testid="pagination">{`Showing ${books.length} of ${length}`}</div>
  ),
}));

describe("BooksPage Component", () => {
  it("renders the title and filter components", () => {
    useGlobalContext.mockReturnValue({ error: null });
    render(<BooksPage pageName="Test Page" pageBooks={{ books: [], total: 0 }} />);

    expect(screen.getByTestId("title")).toHaveTextContent("Test Page");
    expect(screen.getByTestId("books-filter")).toBeInTheDocument();
  });

  it("renders the Error component when there is an error", () => {
    useGlobalContext.mockReturnValue({ error: "Something went wrong" });
    render(<BooksPage pageName="Test Page" pageBooks={{ books: [], total: 0 }} />);

    expect(screen.getByTestId("error")).toHaveTextContent("Something went wrong");
  });

  it("renders the Pagination component when there are books", () => {
    useGlobalContext.mockReturnValue({ error: null });
    const books = [{ id: 1, title: "Book 1" }, { id: 2, title: "Book 2" }];
    render(<BooksPage pageName="Test Page" pageBooks={{ books, total: books.length }} />);

    expect(screen.getByTestId("pagination")).toHaveTextContent(
      `Showing ${books.length} of ${books.length}`
    );
  });
});
