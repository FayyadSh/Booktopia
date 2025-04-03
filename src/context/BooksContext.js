import { createContext, useState, useEffect, useReducer, use } from "react";
import { GET_BOOK_DETAILS, GET_SIMILAR_BOOKS, LOADING } from "./actions";
import fetchData from "../utils/api";
import reducer from "./reducer";
import useBrowse from "../hooks/useBrowse";

export const BooksContext = createContext();

const BooksContextProvider = ({ children }) => {
  // --- Initial State ---
  const initialState = {
    loading: false,
    error: null,
    newBooks: { books: [], total: 0 },
    categoryBooks: { books: [], total: 0 },
    searchResultBooks: { books: [], total: 0 },
    authorBooks: { books: [], total: 0 },
    bookDetails: [],
    popularBooks: [],
    topRatedBooks: [],
    bestSellingBooks: [],
    similarBooks: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // --- Application States ---
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [modalId, setModalId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { offset, sortDirection, sortType, isBrowseRoute } = useBrowse((updatedParams) => {
    dispatch({ type: "UPDATE_PARAMS", payload: updatedParams });
  });

  // --- Fetch Books ---
  const useFetchBooks = (type, endpoint) => {

    const url = !isBrowseRoute ? endpoint :
    `${endpoint}&number=100&offset=${offset}&sort=${sortType}&sort-direction=${sortDirection}`;

    useEffect(() => {
        dispatch({ type: LOADING });
        fetchData(url)
          .then((res) =>
            dispatch({
              type,
              payload: {
                total: res?.available,
                books: res?.books?.flat(),
              },
            })
          )
          .catch((err) => {
            dispatch({ type: "ERROR", payload: err?.message });
          });
    }, [url]);
  };

  // --- Fetch Book Details and Similar Books ---
  const useGetBook = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (modalId) {
        setLoading(true);
        setError(null);

        fetchData(modalId)
          .then((res) => {
            dispatch({ type: GET_BOOK_DETAILS, payload: res });
          })
          .catch((err) => {
            setError(err.message);
          });

        fetchData(`${modalId}/similar`)
          .then((res) => {
            dispatch({ type: GET_SIMILAR_BOOKS, payload: res?.similar_books });
          })
          .catch((err) => {
            setError((prevError) =>
              prevError ? `${prevError}, ${err.message}` : err.message
            );
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, [modalId]);

    return { loading, error };
  };

  // --- Favorites Management ---
  const addToFavorites = (book) => {
    const existingFavorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    const updatedFavorites = [...existingFavorites, book];
    localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
    setFavoriteBooks(updatedFavorites);
  };

  const removeFromFavorites = (id) => {
    const existingFavorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    const updatedFavorites = existingFavorites.filter((book) => book.id !== id);
    localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
    setFavoriteBooks(updatedFavorites);
  };

  const getFavoriteBooksFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("favoriteBooks")) || [];
  };

  useEffect(() => {
    setFavoriteBooks(getFavoriteBooksFromLocalStorage());
  }, []);

  // --- Modal Management ---
  const handleOpenModal = (book) => {
    setOpenModal(true);
    setModalId(book.id);
  };

  // --- Context Value ---
  const value = {
    ...state,
    favoriteBooks,
    openModal,
    removeFromFavorites,
    addToFavorites,
    useFetchBooks,
    useGetBook,
    handleOpenModal,
    setOpenModal,
  };

  return <BooksContext value={value}>{children}</BooksContext>;
};

export const useGlobalContext =() => {
  return use(BooksContext);
} 
  

export default BooksContextProvider;
