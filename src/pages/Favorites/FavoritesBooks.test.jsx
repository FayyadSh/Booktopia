import { render, screen, fireEvent } from "@testing-library/react";
import Favorites from "./Favorites";
import { BooksContext } from "../../context/BooksContext";

jest.mock("../../components/Book/Book", () => ({ book }) => (
  <div>
    <h3>{book.title}</h3>
    <p>{book.author}</p>
  </div>
));

jest.mock('../../ui/NoContent/NoContent', () => () => {
  return <div>No Content</div>;
})

describe("Favorites Component", () => {
  const mockRemoveFromFavorites = jest.fn();

  const renderFavorites = (favoriteBooks) => {
    return render(
      <BooksContext.Provider
        value={{ favoriteBooks, removeFromFavorites: mockRemoveFromFavorites }}
      >
        <Favorites />
      </BooksContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays "No Books Yet" when there are no favorite books', () => {
    renderFavorites([]);

    expect(screen.getByText("No Content")).toBeInTheDocument();
  });

  test("displays favorite books when they are available", () => {
    const favoriteBooks = [
      { id: 1, title: "Book One", author: "Author One" },
      { id: 2, title: "Book Two", author: "Author Two" },
    ];

    renderFavorites(favoriteBooks);

    expect(screen.getByText("Book One")).toBeInTheDocument();
    expect(screen.getByText("Author One")).toBeInTheDocument();
    expect(screen.getByText("Book Two")).toBeInTheDocument();
    expect(screen.getByText("Author Two")).toBeInTheDocument();
  });

  test("calls removeFromFavorites when the delete icon is clicked", () => {
    const favoriteBooks = [{ id: 1, title: "Book One", author: "Author One" }];

    renderFavorites(favoriteBooks);
    const deleteIcon = screen.getByRole("remove-button");
    fireEvent.click(deleteIcon);

    expect(mockRemoveFromFavorites).toHaveBeenCalledWith(1);
  });
});
