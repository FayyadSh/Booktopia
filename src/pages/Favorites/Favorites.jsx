//---   CSS  ----------------------------------------------------
import './Favorites.css'
//---   Context  ----------------------------------------------------
import { useGlobalContext } from '../../context/BooksContext';
//---   Components  ----------------------------------------------------
import NoContent from '../../ui/NoContent/NoContent';
import Book from '../../components/Book/Book';
import TitleTypeOne from '../../ui/TitleTypeOne/TitleTypeOne';
//---   Icons  ----------------------------------------------------
import { VscClose } from 'react-icons/vsc';

const Favorites = () => {

    const { favoriteBooks, removeFromFavorites } = useGlobalContext()
      
    return (
        <section>
            <div className='container'>

                <TitleTypeOne title='Favorite Books' />

                {/*----------    Conditional Rendering   ----------*/}
                {favoriteBooks?.length === 0 ? 
                    <NoContent /> :

                    // -------------  Displaying Data ---------------
                    <div className='books-grid'>
                        {favoriteBooks?.map((item) => (
                            <div key={item.id} className='favorite-book' role='book'>
                                <Book book={item} size='medium' />

                                <span 
                                    className='delete-icon' 
                                    onClick={() =>  removeFromFavorites(item.id)}
                                    role='remove-button'
                                >
                                    <VscClose />
                                </span>
                            </div>
                        ))}
                    </div>
                }
            </div>
            
        </section>
    );
}

export default Favorites;
