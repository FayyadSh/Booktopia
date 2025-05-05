// ------------ CSS ----------------
import './Footer.css'
// ------------ React Router Dom----------------
import { Link } from 'react-router-dom';
// ------------ Components ----------------
import CopyRight from '../CopyRight/CopyRight';

const Footer = () => {
    return (
        <footer>
            <div className="container footer-container">
                <div>
                <h5>About us</h5>
                <ul className="about-params params-links">
                    <li><Link to='/'>vision</Link></li>
                    <li><Link to='/'>articles</Link></li>
                    <li><Link to='/'>careers</Link></li>
                    <li><Link to='/'>service terms</Link></li>
                    <li><Link to='/'>donate</Link></li>
                </ul>
                </div>
                <div>
                <h5>Discover us</h5>
                <ul className="discover-params params-links">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/'>Books</Link></li>
                    <li><Link to='/'>Authors</Link></li>
                    <li><Link to='/'>Subjects</Link></li>
                    <li><Link to='/'>Advanced Search</Link></li>
                </ul>
                </div>
                <div>
                <h5>My Account</h5>
                <ul className="my-account-params params-links">
                    <li><Link to='/'>Sign in</Link></li>
                    <li><Link to='/'>Articles</Link></li>
                    <li><Link to='/'>View Cart</Link></li>
                    <li><Link to='/'>My Wishtlist</Link></li>
                    <li><Link to='/'>Track My Order</Link></li>
                </ul>
                </div>
                <div>
                <h5>Helps</h5>
                <ul className="helps-params params-links">
                    <li><Link to='/'>Help Center</Link></li>
                    <li><Link to='/'>Report a problem</Link></li>
                    <li><Link to='/'>View Cart</Link></li>
                    <li><Link to='/'>Suggesting edits</Link></li>
                    <li><Link to='/'>Contact us</Link></li>
                </ul>
                </div>
            </div>
            <CopyRight />
        </footer>
    );
}

export default Footer;
