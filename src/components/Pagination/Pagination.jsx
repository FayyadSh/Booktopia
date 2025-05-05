//---   CSS  ----------------------------------------------------
import "./Pagination.css";
//---   React Icons  ----------------------------------------------------
import { HiArrowSmallRight } from "react-icons/hi2";
import { HiArrowSmallLeft } from "react-icons/hi2";
//---   Components  ----------------------------------------------------
import Book from "../Book/Book";
//---   Custom Hooks  ----------------------------------------------------
import usePaginate from "../../hooks/usePaginate";

const Pagination = ({ length, books }) => {
  
  const { 
    totalPages,
    books: pageBooks, 
    handlePagination, 
    currentPage 
  } = usePaginate( length, books );

  return (
    <div className="pagination">
      <div className="pageBooks-grid">
        {pageBooks?.map((book) => (
            <Book key={book.id} book={book} size={"medium"} />
         ))}
      </div>

      <div className="pages">
        {/*----------- Back Button --------------*/}
        <button
          className="page previous"
          disabled={currentPage === 1}
          onClick={() => handlePagination(currentPage - 1, "back")}
        >
          <HiArrowSmallLeft />
        </button>
        {/*----------- First Page --------------*/}
        <div
          className={currentPage === 1 ? "page active-page" : "page"}
          onClick={() => handlePagination(1, "back")}
        >
          1
        </div>
        {/*----------- Next Page --------------*/}
        <div
          className={
            currentPage === 1 && totalPages > 1
              ? "page"
              : totalPages === 1
              ? "hide"
              : currentPage === totalPages
              ? "page"
              : " page active-page"
          }
        >
          {currentPage === 1
            ? 2
            : currentPage === totalPages
            ? currentPage - 1
            : currentPage}
        </div>
        {/*----------- Last Page --------------*/}
        <div
          className={
            currentPage === totalPages && totalPages > 1
              ? "page active-page"
              : totalPages === 1
              ? "hide"
              : "page"
          }
          onClick={() => handlePagination(totalPages, "next")}
        >
          {totalPages}
        </div>
        {/*----------- Next Button --------------*/}
        <button
          className="page next"
          onClick={() => handlePagination(currentPage + 1, "next")}
          disabled={currentPage === totalPages}
        >
          <HiArrowSmallRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
