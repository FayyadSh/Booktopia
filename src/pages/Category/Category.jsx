//---   Hooks  ----------------------------------------------------
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/BooksContext';
//---   Components  ----------------------------------------------------
import BooksPage from '../../components/BooksPage/BooksPage';
//---   Actions  ----------------------------------------------------
import { GET_CATEGORY_BOOKS } from '../../context/actions';

const Category = () => {

  const { category } = useParams()
  const { useFetchBooks, categoryBooks } = useGlobalContext();

  //---   Get Category Books  -----------------------------------------------
  useFetchBooks( GET_CATEGORY_BOOKS, `search-books?genres=${category}`)

  return <BooksPage pageName={`${category} Books`} pageBooks={categoryBooks} />
}

export default Category;