// ------------ CSS ----------------
import "./BestSellingBooks.css";
// ------------ Context ----------------
import { useContext } from "react";
import { BooksContext } from "../../context/BooksContext";
// ------------ Components ----------------
import TitleTypeOne from "../../ui/TitleTypeOne/TitleTypeOne";
import Slider from "../Slider/Slider";
import Loading from "../../ui/Loading/Loading";
import Book from "../Book/Book";
import NoContent from "../../ui/NoContent/NoContent";
import Error from "../../ui/Error/Error";
// ------------ React Router Dom ----------------
import { Link } from "react-router-dom";
// ------------ React Icons ----------------
import { BsArrowReturnRight } from "react-icons/bs";
// ------------ Actions --------------------------------------------------------------------------
import { GET_BEST_SELLING_BOOKS } from "../../context/actions";

const BestSellingBooks = () => {

  const { useFetchBooks, loading, error, bestSellingBooks } = useContext(BooksContext);

  //---   Get Best Selling Books  ----------------------------------------------------
  useFetchBooks(
    GET_BEST_SELLING_BOOKS,
    "search-books?sort=rating&sort-direction=asc&number=20&earliest-publish-year=2023&latest-publish-year=2025&min-rating=0.7"
  );

  return (
    <section className="best-selling-books">
      <TitleTypeOne title={"Best Selling Books"} titleTop={"this year published"}/>

        {loading ?
          <Loading /> : 
            error ? 
              <Error /> :
                bestSellingBooks?.length > 0 ?
                  //-------- Displaying Data ---------------
                  <Slider>
                    {bestSellingBooks?.map(book => 
                      <Book book={book} key={book.id} size={"large"} />
                    )}
                  </Slider> :
          <NoContent /> 
        }

        {/*----------    Section Button   ----------*/}
        {bestSellingBooks &&      
          <Link to="/*" className="btn">
            View all products <BsArrowReturnRight />
          </Link>
        }
    </section>
  );
};

export default BestSellingBooks;