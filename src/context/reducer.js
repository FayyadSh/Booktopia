import {
    LOADING,
    ERROR,
    GET_BEST_SELLING_BOOKS,
    GET_BOOK_DETAILS,
    GET_CATEGORY_BOOKS,
    GET_NEW_BOOKS,
    GET_POPULAR_BOOKS,
    GET_SEARCH_RESULT_BOOKS,
    GET_TOP_RATED_BOOKS,
    GET_SIMILAR_BOOKS,
    GET_AUTHOR_BOOKS
  }
  from './actions'

const reducer = (state,action) => {
    switch(action.type){
      case LOADING : 
        return {...state, loading: true};
      case ERROR:
        return { ...state, error: action.payload, loading: false };
      case GET_NEW_BOOKS : 
        return {...state, newBooks:{books: action.payload.books,total: action.payload.total}, loading: false};
      case GET_TOP_RATED_BOOKS : 
        return {...state, topRatedBooks: action.payload.books,loading: false};
      case GET_BEST_SELLING_BOOKS : 
        return {...state, bestSellingBooks: action.payload.books,loading: false};
      case GET_POPULAR_BOOKS : 
        return {...state, popularBooks: action.payload.books,loading: false};
      case GET_CATEGORY_BOOKS : 
        return {...state, categoryBooks: {books: action.payload.books, total: action.payload.total} ,loading: false};
      case GET_SEARCH_RESULT_BOOKS : 
        return {...state, searchResultBooks:{books: action.payload.books, total: action.payload.total} ,loading: false};
      case GET_BOOK_DETAILS : 
        return {...state, bookDetails: action.payload};
      case GET_SIMILAR_BOOKS : 
        return {...state, similarBooks: action.payload};
      case GET_AUTHOR_BOOKS :
        return {...state, authorBooks: {books: action.payload.books , total: action.payload.total}, loading: false};
      case "UPDATE_PARAMS":
        return {
            ...state,
            pagination: action.payload, // Update pagination state with new parameters
        };
      default :
      return state
    }
}

export default reducer