// ------------ React ----------------
import { createContext, useState, useEffect, useReducer, use } from "react";
// ------------ Actions ----------------
import { GET_BOOK_DETAILS, GET_SIMILAR_BOOKS, LOADING } from "./actions";
// ------------ Utils ----------------
import fetchData from "../utils/api";
// ------------ Custom Hooks ----------------
import reducer from "./reducer";
import useBrowse from "../hooks/useBrowse";

// Create a context for books data management
export const BooksContext = createContext();

/**
 * BooksContextProvider component that manages global state for book-related data
 * and provides functionality for fetching books, managing favorites, and handling modals
 */
const BooksContextProvider = ({ children }) => {
  // --- Initial State ---
  // Define the initial state for the books reducer
  const initialState = {
    loading: false,
    error: null,
    newBooks: { books: [], total: 0 },          // Stores newly released books
    categoryBooks: { books: [], total: 0 },     // Books by category
    searchResultBooks: { books: [], total: 0 }, // Search results
    authorBooks: { books: [], total: 0 },       // Books by author
    bookDetails: [],                            // Detailed info for a specific book
    popularBooks: [],                           // Popular books list
    topRatedBooks: [],                          // Top rated books list
    bestSellingBooks: [],                       // Best selling books list
    similarBooks: [],                           // Books similar to the selected one
  };

  // Initialize reducer for state management
  const [state, dispatch] = useReducer(reducer, initialState);

  // --- Application States ---
  const [favoriteBooks, setFavoriteBooks] = useState([]); // User's favorite books
  const [modalId, setModalId] = useState(null);           // ID of book for modal display
  const [openModal, setOpenModal] = useState(false);      // Modal open/close state

  // Custom hook for browse functionality with callback for parameter updates
  const { offset, sortDirection, sortType, isBrowseRoute } = useBrowse((updatedParams) => {
    dispatch({ type: "UPDATE_PARAMS", payload: updatedParams });
  });

  /**
   * Custom hook for fetching books data
   * @param {string} type - Action type for reducer dispatch
   * @param {string} endpoint - API endpoint to fetch data from
   */
  const useFetchBooks = (type, endpoint) => {
    // Construct URL with query parameters if in browse route
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
    }, [url]); // Re-run effect when URL changes
  };

  /**
   * Custom hook for fetching book details and similar books
   * @returns {Object} - Loading state and error information
   */
  const useGetBook = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (modalId) {
        setLoading(true);
        setError(null);

        // Fetch book details
        fetchData(modalId)
          .then((res) => {
            dispatch({ type: GET_BOOK_DETAILS, payload: res });
          })
          .catch((err) => {
            setError(err.message);
          });

        // Fetch similar books
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
    }, [modalId]); // Re-run effect when modalId changes

    return { loading, error };
  };

  // --- Favorites Management ---
  
  /**
   * Adds a book to favorites and updates localStorage
   * @param {Object} book - Book object to add to favorites
   */
  const addToFavorites = (book) => {
    const existingFavorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    const updatedFavorites = [...existingFavorites, book];
    localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
    setFavoriteBooks(updatedFavorites);
  };

  /**
   * Removes a book from favorites and updates localStorage
   * @param {string} id - ID of the book to remove
   */
  const removeFromFavorites = (id) => {
    const existingFavorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    const updatedFavorites = existingFavorites.filter((book) => book.id !== id);
    localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
    setFavoriteBooks(updatedFavorites);
  };

  /**
   * Retrieves favorite books from localStorage
   * @returns {Array} - Array of favorite books
   */
  const getFavoriteBooksFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("favoriteBooks")) || [];
  };

  // Initialize favorite books from localStorage on component mount
  useEffect(() => {
    setFavoriteBooks(getFavoriteBooksFromLocalStorage());
  }, []);

  // --- Modal Management ---
  
  /**
   * Opens modal and sets the book ID for which to show details
   * @param {Object} book - Book object containing the ID to show in modal
   */
  const handleOpenModal = (book) => {
    setOpenModal(true);
    setModalId(book.id);
  };

  // --- Context Value ---
  // All values and functions to be provided to consuming components
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

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
};

/**
 * Custom hook for accessing the books context
 * @returns {Object} - The context value containing state and methods
 */
export const useGlobalContext = () => {
  return use(BooksContext);
};

export default BooksContextProvider;