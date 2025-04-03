import './Authors.css'
import { suggistedAuthors } from '../../data/data';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleTypeOne from '../../ui/TitleTypeOne/TitleTypeOne';
import { BiSearch } from 'react-icons/bi';

const Authors = () => {

    const navigate = useNavigate()
    const [author,setAuthor] = useState('')
    
    return (
        <section className='authors'>
            <TitleTypeOne title='Authors'/>
            <div className="container">
                <div className='search-box'>
                <input 
                    type="text" 
                    placeholder='search for authors'
                    onChange={(e) => setAuthor(e.target.value)}
                    onKeyDown={e => {
                        if(e.key === 'Enter') navigate(`${author}`)
                      }
                    }
                />
                <button onClick={() => navigate(`${author}`)}>
                    <BiSearch className='search-icon' />
                </button>
                </div>
                <h2>Popular Authors</h2>
                <div className='books-grid'>
                    {suggistedAuthors.map(author => (
                        <h3 onClick={() => navigate(`${author}`)} key={author}>
                            {author}
                        </h3>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Authors;