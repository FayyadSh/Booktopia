import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";
import { useGlobalContext } from "../../context/BooksContext";
import usePaginate from "../../hooks/usePaginate";

// Mock dependencies
jest.mock("../../context/BooksContext", () => ({
  useGlobalContext: jest.fn(),
}));
jest.mock("../../hooks/usePaginate", () => jest.fn());

// Mock components
jest.mock("../Book/Book", () => ({ book }) => <div>{book.title}</div>);

describe("Pagination Component", () => {
  const mockHandlePagination = jest.fn();
  const mockUsePaginate = {
    totalPages: 3,
    books: [
      { id: 1, title: "Book 1" },
      { id: 2, title: "Book 2" },
    ],
    handlePagination: mockHandlePagination,
    currentPage: 1,
  };

  beforeEach(() => {
    usePaginate.mockReturnValue(mockUsePaginate);
    useGlobalContext.mockReturnValue({ loading: false });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly when not loading", () => {
    render(<Pagination length={5} books={[]} />);

    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();
    expect(screen.getAllByRole("button")[1]).not.toBeDisabled();
    expect(screen.getAllByRole("button")[0]).toBeDisabled();
  });

  test("triggers handlePagination when next button is clicked", () => {
    render(<Pagination length={26} books={[]} />);

    const nextButton = screen.getAllByRole("button")[1];

    // Click next button
    fireEvent.click(nextButton);
    expect(mockHandlePagination).toHaveBeenCalledWith(2, "next");
  });

  test("triggers handlePagination when previous button is clicked", () => {
    usePaginate.mockReturnValueOnce({
      ...mockUsePaginate,
      currentPage: 2,
    });

    render(<Pagination length={5} books={[1, 2, 3, 4, 5]} />);

    const previousButton = screen.getAllByRole("button")[0];
    fireEvent.click(previousButton);

    expect(mockHandlePagination).toHaveBeenCalledWith(1, "back");
  });

  test("disables next button at the last page", () => {
    usePaginate.mockReturnValueOnce({
      ...mockUsePaginate,
      currentPage: 3
    });

    render(<Pagination length={5} books={[]} />);

    const previousButton = screen.getAllByRole("button")[0];
    const nextButton = screen.getAllByRole("button")[1];

    expect(previousButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();

  });

  test("disables previous button at the first page", () => {

    render(<Pagination length={5} books={[]} />);

    const previousButton = screen.getAllByRole("button")[0];
    const nextButton = screen.getAllByRole("button")[1];

    expect(previousButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

  });

  test("updates correctly when totalPages changes dynamically", () => {
    const { rerender } = render(<Pagination length={5} books={[]} />);

    expect(screen.getByText("3")).toBeInTheDocument();

    usePaginate.mockReturnValueOnce({
      ...mockUsePaginate,
      totalPages: 5,
    });

    rerender(<Pagination length={10} books={[]} />);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("displays correct page numbers and highlights active page", () => {
    render(<Pagination length={5} books={[]} />);

    const page1 = screen.getByText("1");
    const page2 = screen.getByText("2");
    const page3 = screen.getByText("3");

    expect(page1).toHaveClass("active-page");
    expect(page2).not.toHaveClass("active-page");
    expect(page3).not.toHaveClass("active-page");
    
  });

  test("highlights correct page based on currentPage", () => {

    usePaginate.mockReturnValueOnce({
      totalPages: 3,
      books: [
        { id: 1, title: "Book 1" },
        { id: 2, title: "Book 2" },
      ],
      handlePagination: mockHandlePagination,
      currentPage: 2,
    });

    render(<Pagination length={5} books={[1, 2, 3, 4, 5]} />);
    expect(screen.getByText("2")).toHaveClass("active-page");
  });

  test("disables all buttons if books length is zero and totalPages is 1", () => {
    usePaginate.mockReturnValueOnce({
      ...mockUsePaginate,
      books: [],
      totalPages: 1,
    });

    render(<Pagination length={0} books={[]} />);

    const buttons = screen.queryAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  test("does not display page numbers when totalPages is 1", () => {
    usePaginate.mockReturnValueOnce({
      ...mockUsePaginate,
      totalPages: 1,
    });
  
    render(<Pagination length={0} books={[]} />);
  
    const pages = screen.queryByText("2");
    expect(pages).toHaveClass('hide');
  });

  test("renders empty state when no data is passed and loading is false", () => {
    usePaginate.mockReturnValueOnce({
      ...mockUsePaginate,
      books: [],
      totalPages: 1,
    });
    useGlobalContext.mockReturnValueOnce({ loading: false });
  
    render(<Pagination length={0} books={[]} />);
  
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("Book 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Book 2")).not.toBeInTheDocument();
  });

});
