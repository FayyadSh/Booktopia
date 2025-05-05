//---   Hooks  ----------------------------------------------------
import { useGlobalContext } from '../../context/BooksContext';
//---   Components  ----------------------------------------------------
import BooksPage from '../../components/BooksPage/BooksPage';
//---   Actions  ----------------------------------------------------
import { GET_NEW_BOOKS } from '../../context/actions';

const NewBooks = () => {

  const { useFetchBooks, newBooks } = useGlobalContext();

  //---   Get Top New Books  ----------------------------------------------------
  useFetchBooks(
    GET_NEW_BOOKS,
    `search-books?earliest-publish-year=2023&latest-publish-year=2025`
  )

  return <BooksPage pageName='New Books' pageBooks={newBooks} />
}

export default NewBooks;