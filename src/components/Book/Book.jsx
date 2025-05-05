// ------------ CSS ----------------
import "./Book.css";
// ------------ Context ----------------
import { useGlobalContext } from "../../context/BooksContext";

const Book = ({ book, size = 'large' }) => {
  const { handleOpenModal } = useGlobalContext();
  return (
    <div className={`book ${size}`} onClick={() => handleOpenModal(book)} role='book'>
      <img className="book-image" src={book.image} alt="book-image" />
    </div>
  );
};

export default Book;