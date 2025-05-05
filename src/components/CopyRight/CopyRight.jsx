// ------------ CSS ----------------
import './CopyRight.css'
// ------------ React Icons ----------------
import { ImFacebook } from 'react-icons/im';
import { FiInstagram } from 'react-icons/fi';
import { GrLinkedinOption } from 'react-icons/gr';
import { RiTwitterXLine } from 'react-icons/ri';
import { ImBehance } from 'react-icons/im';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';


const CopyRight = () => {
    return (
        <section className='copyright'>
            <div className="container copyright-container">
                <p>&copy; Booktopia .All tights restved.
                    <span className='signature'>
                        <BiChevronLeft className='chevron-icon' />
                        Developed By Fayyad Shehadeh
                        <BiChevronRight className='chevron-icon' />
                    </span>
                </p>
                
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
