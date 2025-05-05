//---   Hooks  ----------------------------------------------------
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/BooksContext";
//---   Components  ----------------------------------------------------
import BooksPage from "../../components/BooksPage/BooksPage";
//---   Actions  ----------------------------------------------------
import { GET_SEARCH_RESULT_BOOKS } from "../../context/actions";

const SearchBooks = () => {
  
  const { query } = useParams();
  const { useFetchBooks, searchResultBooks } = useGlobalContext();;

  //---   Get Search Result Books  -----------------------------------------------
  useFetchBooks( GET_SEARCH_RESULT_BOOKS, `search-books?query=${query}`);

  return <BooksPage pageName={`${query} Books`} pageBooks={searchResultBooks} />
};

export default SearchBooks;
