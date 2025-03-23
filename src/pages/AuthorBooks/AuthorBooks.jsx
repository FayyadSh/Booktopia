//---   Hooks  ----------------------------------------------------
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/BooksContext';
//---   Components  ----------------------------------------------------
import BooksPage from '../../components/BooksPage/BooksPage';
//---   Actions  ----------------------------------------------------
import { GET_AUTHOR_BOOKS } from '../../context/actions';

const AuthorBooks = () => {

  const { author } = useParams()
  const { useFetchBooks, authorBooks } = useGlobalContext();
  
  useFetchBooks( GET_AUTHOR_BOOKS, `search-books?authors=${author}`)
    
  return <BooksPage pageName='Results' pageBooks={authorBooks} />
}

export default AuthorBooks;