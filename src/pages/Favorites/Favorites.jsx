//---   CSS  ----------------------------------------------------
import './Favorites.css'
//---   Context  ----------------------------------------------------
import { useGlobalContext } from '../../context/BooksContext';
//---   Components  ----------------------------------------------------
import NoContent from '../../ui/NoContent/NoContent';
import Book from '../../components/Book/Book';

const Favorites = () => {

    const { favoriteBooks, removeFromFavorites } = useGlobalContext()
      
    return (
        <section className='container'>

            {/*----------    Conditional Rendering   ----------*/}
            {favoriteBooks?.length === 0 ? 
                <NoContent /> :

                // -------------  Displaying Data ---------------
                <div className='books-grid'>
                    {favoriteBooks?.map((item) => (
                        <div key={item.id} className='favorite-book' role='book'>
                            <Book book={item} size='large' />
                            <span 
                                className='delete-icon' 
                                onClick={() =>  removeFromFavorites(item.id)}
                                role='remove-button'
                            >X</span>
                        </div>
                    ))}
                </div>
                }
        </section>
    );
}

export default Favorites;
