//---   CSS  ----------------------------------------------------
import './Categories.css'
//---   Data  ----------------------------------------------------
import { categories } from '../../data/data';
//---   React Router Dom  ----------------------------------------------------
import { useNavigate } from 'react-router-dom';
//---   Components  ----------------------------------------------------
import TitleTypeOne from '../../ui/TitleTypeOne/TitleTypeOne';

const Categories = () => {
    const navigate = useNavigate()
    return (
        <section>
            <TitleTypeOne title='Categories' />
            {/*----------    Displaying Data   ----------*/}
            <div className='books-grid container'>
                {categories.sort().map(category => 
                    <h3 className={category.length > 10  ? 'category long-category': 'category'}
                        key={category}
                        onClick={() => navigate('/categories/' + category)}
                    >
                        {category}
                    </h3>
                )}
            </div>
        </section>
    );
}

export default Categories;