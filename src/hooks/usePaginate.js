// ------------ Custom Hooks ----------------
import useBrowse from "./useBrowse";

export default function usePaginate(totalBooksCount, allBooks) {
  // Define constants for books per page and maximum number of pages
  const BOOKS_PER_PAGE = 25;
  const MAX_PAGES = 44;

  // Calculate total pages based on the total books count
  const totalPages =
    totalBooksCount > 1100
      ? MAX_PAGES
      : Math.ceil(totalBooksCount / BOOKS_PER_PAGE);

  // Extract the last two digits of the total books count
  const lastTwoDigitsOfTotal = parseInt(
    totalBooksCount?.toString()?.slice(-2)
  );

  // Destructure properties from useBrowse
  const { page: currentPage, offset: currentOffset, part, setSearchParams } = useBrowse();

  // Helper function to calculate the books to display for the current page
  const getBooksForCurrentPage = () => {
    const startIndex = (part - 1) * BOOKS_PER_PAGE;
    const endIndex = part * BOOKS_PER_PAGE;
    return allBooks?.slice(startIndex, endIndex);
  };

  // Adjust the counter based on the value
  const getAdjustedCounter = (value) => {
    if (value < 26) return 1;
    if (value < 51) return 2;
    if (value < 76) return 3;
    return 4;
  };

  // Handle pagination logic for next or back navigation
  const handlePagination = (targetPage, direction) => {
    window.scrollTo(0, 0); // Scroll to top on page change

    const remainingBooks = allBooks?.slice(part * BOOKS_PER_PAGE)
      ?.length;

    // Special case for the last page with partial books
    if (
      targetPage === totalPages &&
      totalPages - currentPage > 1 &&
      lastTwoDigitsOfTotal !== 0 &&
      targetPage !== MAX_PAGES
    ) {
      setSearchParams({
        page: targetPage,
        offset: totalBooksCount - lastTwoDigitsOfTotal,
        part: getAdjustedCounter(lastTwoDigitsOfTotal),
      });
      return;
    }

    let updatedCounter = part;
    let updatedOffset = currentOffset;

    if (direction === "next") {
      if (
        targetPage === MAX_PAGES ||
        (targetPage === totalPages && currentOffset < totalBooksCount - 100)
      ) {
        updatedCounter = 4;
        updatedOffset =
          targetPage === MAX_PAGES
            ? 1000
            : totalBooksCount - 100;
      } else if (
        targetPage === totalPages &&
        totalBooksCount < 1100 &&
        remainingBooks > 0
      ) {
        updatedCounter += 1;
      } else {
        updatedCounter = part === 4 ? 1 : part + 1;
        if (part === 4) updatedOffset += 100;
      }
    } else if (direction === "back") {
      if (targetPage === 1) {
        updatedCounter = 1;
        updatedOffset = 0;
      } else {
        updatedCounter = part === 1 ? 4 : part - 1;
        if (part === 1) updatedOffset -= 100;
      }
    }

    // Update search parameters with the new state
    setSearchParams({
      page: targetPage,
      offset: updatedOffset,
      part: updatedCounter,
    });
  };

  // Return the pagination data and functions
  return {
    totalPages, // Total number of pages
    books: getBooksForCurrentPage(), // Books to display on the current page
    handlePagination, // Function to handle pagination actions
    currentPage, // Current active page
  };
}
