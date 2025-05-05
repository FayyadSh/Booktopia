//---   CSS ----------------------------------------------------
import "./Modal.css";
//---   Context  ----------------------------------------------------
import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../../context/BooksContext";
//---   Components  ----------------------------------------------------
import Loading from "../../ui/Loading/Loading";
import Rating from "./Rating/Rating";
import SimilarBooks from "./SimilarBooks/SimilarBooks";
import ModalContainer from "./ModalContainer/ModalContainer";
import DescriptionBox from "./DescriptionBox/DescriptionBox";
import Error from "../../ui/Error/Error";
//---   React Icons  ----------------------------------------------------
import { MdDone } from "react-icons/md";
import { AiOutlineHeart, AiOutlineLoading3Quarters } from "react-icons/ai";

const Modal = () => {
  
  //---   Component States  ----------------------------------------------------

  const [updatingFavorites, setUpdatingFavorites] = useState(false)
  const [description, setDescription] = useState({title: '', description: ''})
  const [showDescription, setShowDescription] = useState(false)
  
  const {
    setOpenModal,
    openModal,
    similarBooks,
    bookDetails: book,
    useGetBook,
    favoriteBooks,
    removeFromFavorites,
    addToFavorites,
  } = useContext(BooksContext);

  //---   Get Book Detail and Similar Books  ----------------------------------------------------
  
  const { loading, error } = useGetBook()

  //---   Close Modal  ----------------------------------------------------
  
  const handleCloseModal = () => {
    setOpenModal(false)
    setShowDescription(false)
  }
  //---   Check If The Book In Favorite  ----------------------------------------------------

  const isInFavorites = favoriteBooks.find(b => b.id === book.id) 

  //---   Handle Favorites Button  ----------------------------------------------------

  const handleAddToFavorite = () => {

    setUpdatingFavorites(true)

    setTimeout(() => {
      if(isInFavorites){
        removeFromFavorites(book.id)
      } else {
        addToFavorites(book)
      }
      setUpdatingFavorites(false)
    }, 500);
  }
  //---   Handle Show Description Button  ----------------------------------------------------

  const handleShowDescription = () => {
    setShowDescription(true)
    setDescription({description: book?.description,title:book?.title})
  }

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        handleCloseModal()
      }
    });
  }, [])

  return (
    <ModalContainer closeModal={handleCloseModal} openModal={openModal}>
      
      {loading ? 
        <Loading />
      : error ?
        <Error errorMessage={error} />
      : book?.id &&
          <div className="book modal">

            {/*----------    Left Section   ----------*/}
            <img className="modal-book-image" src={book.image} alt='book-image' />

            {/*----------    Right Section   ----------*/}
            <div>
              <div className="book-details">  

                {/*----------    If Title Too Long Make The Font Smaller   ----------*/}
                <div>
                  <h1 className={book.title.length > 30 ? 'long-title title': 'title'}>
                    {book.title}
                  </h1>
                </div>
                <h5>{book?.authors[0]?.name}</h5>
                <h5 className="book-description">

                {/*---------- If Description Too Long Show First 100 Character Just ---------*/}
                  {book?.description?.length > 150 ?
                  <>
                    {book?.description?.substring(0,150)}
                    <span onClick={() => handleShowDescription()}>
                      Read more....
                    </span> 
                  </> 
                  : book?.description
                  }
                </h5>
                
                {book?.rating?.average &&
                <Rating rating={book?.rating?.average?.toFixed(1)} />}

                <h5><span>{book.number_of_pages} pages </span></h5>
                <h5><span>publish year</span> :{book.publish_date}</h5>
                {/*----------    Favorites Button   ----------*/}
                <button 
                  className={`favorite-button ${updatingFavorites ? '' : isInFavorites ? 'remove-button' : 'add-button'}`} 
                  onClick={() => handleAddToFavorite()}
                >
                  {updatingFavorites ? 
                    <> Loading <AiOutlineLoading3Quarters className="loading-icon" /></>
                      : isInFavorites  ?
                        <> In Favorites <MdDone/></>  :
                          <> Add To Favorites <AiOutlineHeart /></> 
                    }
                </button>

              </div>
                
                {/*----------    Similar Books   ----------*/}
                <SimilarBooks books={similarBooks} />
            </div>
                {showDescription &&
                  <DescriptionBox 
                    description={description}
                    setShowDescription={setShowDescription}
                  />
                }
          </div>
      }
    </ModalContainer>
  );
};

export default Modal;