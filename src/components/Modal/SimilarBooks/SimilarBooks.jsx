//---   CSS ----------------------------------------------------
import './SimilarBooks.css'
//---   Component ----------------------------------------------------
import Book from "../../Book/Book";
import Slider from "../../Slider/Slider";

const SimilarBooks = ({ books }) => {
  return (
    <div className="similar-books">
      <h3>similar books</h3>
      <Slider sliderSize="modal-slider">
        {books?.map((book) => (
          <Book key={book.id} book={book} size={"small"} />
        ))}
      </Slider>
    </div>
  );
};

export default SimilarBooks;