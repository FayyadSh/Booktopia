// ------------ CSS ----------------
import './CopyRight.css'
// ------------ React Icons ----------------
import { ImFacebook } from 'react-icons/im';
import { FiInstagram } from 'react-icons/fi';
import { GrLinkedinOption } from 'react-icons/gr';
import { RiTwitterXLine } from 'react-icons/ri';
import { ImBehance } from 'react-icons/im';


const CopyRight = () => {
    return (
        <section className='copyright'>
            <div className="container copyright-container">
                <p>&copy; Zapterify .All tights restved.</p>
                <div className="footer-socials">
                    <a href="/"><ImFacebook/></a>
                    <a href="/"><FiInstagram/></a>
                    <a href="/"><GrLinkedinOption/></a>
                    <a href="/"><RiTwitterXLine/></a>
                    <a href="/"><ImBehance/></a>
                </div>
            </div>
        </section>
    );
}

export default CopyRight;
