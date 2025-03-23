//---   CSS  ----------------------------------------------------
import "./TopRatedBooks.css";
//---   Context  ----------------------------------------------------
import { useContext } from "react";
import { BooksContext } from "../../context/BooksContext";
//---   Components  ----------------------------------------------------
import TitleTypetwo from "../../ui/TitleTypeTow/TitleTypetwo";
import TreeShape from "../../assets/treeShape.png";
import Slider from "../Slider/Slider";
import Loading from "../../ui/Loading/Loading";
import NoContent from "../../ui/NoContent/NoContent";
import Rating from "../Modal/Rating/Rating";
import Error from '../../ui/Error/Error'
//---   React Icons  ----------------------------------------------------
import { BsArrowReturnRight } from "react-icons/bs";
//---   Actions  ----------------------------------------------------
import { GET_TOP_RATED_BOOKS } from "../../context/actions";

const TopRatedBooks = () => {

  const { handleOpenModal, topRatedBooks, useFetchBooks, loading, error } = useContext(BooksContext);

  // ---   Get Top Rated Books  --------------------------------------------------
  useFetchBooks(
    GET_TOP_RATED_BOOKS,
    "search-books?min-rating=0.9&sort=rating&sort-direction=ASC&number=12"
  );

  return (
    <div className="top-rated-books">
      {/*----------    UI   ----------*/}

      <img className="tree-shape" src={TreeShape} alt="tree shape" />
      <TitleTypetwo
        className="top-rated-title "
        titleTop="get Best books"
        title="Top Rated Books"
      />

      {error ?
        <Error errorMessage={error} /> :
      loading ? (
        <Loading />
      ) : topRatedBooks?.length > 0 ? 
       (
        // ------------   Displaying Books   ------------------
        <Slider>
          {topRatedBooks?.map((book) => (
            <div key={book.id} className="top-rated-book">
              <img
                src={book.image}
                className="top-rated-book-image"
                alt="book-image"
              />
              <div className="top-rated-book-info">
                {/*----------    Book Details   ----------*/}
                <div>
                  <h1
                    className={`${
                      book?.title?.length > 15 && "long-title"
                    } book-title`}
                  >
                    {book.title}
                  </h1>
                  <Rating rating={book?.rating?.average?.toFixed(1)} />
                </div>

                {/*----------    Read More Button   ----------*/}
                <button className="btn" onClick={() => handleOpenModal(book)}>
                  Read More <BsArrowReturnRight />
                </button>
              </div>
            </div>
          ))}
        </Slider>
      ) :  <NoContent />
      }
    </div>
  );
};

export default TopRatedBooks;
