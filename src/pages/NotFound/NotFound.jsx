//---   CSS  ----------------------------------------------------
import './NotFound.css'
//---   React Icons  ----------------------------------------------------
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className='not-found'>
            <div className="container">
                <h1>404</h1>
                <h3>Opps, This Page Not Found</h3>
                <Link to='/' className='btn btn-border'>
                    Go To Home
                </Link>
            </div>
        </section>
    );
}

export default NotFound;
