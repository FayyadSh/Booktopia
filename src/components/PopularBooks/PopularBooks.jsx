//---   CSS  ----------------------------------------------------
import "./PopularBooks.css";
//---   Imports  ----------------------------------------------------
import { useContext ,useState} from "react";
import { BooksContext } from "../../context/BooksContext";
//---   Data  ----------------------------------------------------
import { topics } from "../../data/data";
//---   Components  ----------------------------------------------------
import TitleTypeOne from "../../ui/TitleTypeOne/TitleTypeOne";
import Loading from "../../ui/Loading/Loading";
import NoContent from "../../ui/NoContent/NoContent";
import Book from "../Book/Book";
import Error from "../../ui/Error/Error";
//---   Actions  ----------------------------------------------------
import { GET_POPULAR_BOOKS } from "../../context/actions";

const PopularBooks = () => {

  //---   Component States  ----------------------------------------------------
  const [topic, setTopic] = useState("classics");

  const {
    useFetchBooks,
    popularBooks,
    loading,
    error
  } = useContext(BooksContext)
  
  //---   Get Popular Books  ----------------------------------------------------
  useFetchBooks(
    GET_POPULAR_BOOKS,
    `search-books?genres=${topic}&number=15`
  )

  return (
    <section className="popular-books">
      <div className="container">
        <TitleTypeOne title="Popular Books" titleTop="Some quality items" />

        {/*----------    Filtering Tabs   ----------*/}
        <div className="filter-buttons">
          {topics.map((t) => 
            <button className={`${topic === t && 'active'}`} onClick={() => setTopic(t)} key={t}>
              {t}
            </button>
          )}
        </div>

        {loading ?
          <Loading /> 
          : error ?
          <Error /> 
          : popularBooks?.length > 0 ?

          <div className="books-grid">
            {popularBooks.map(book => 
              <Book book={book} key={book.id} size='medium' />)
            }
          </div> :
          <NoContent /> 
        }          
      </div>
    </section>
  );
};

export default PopularBooks;