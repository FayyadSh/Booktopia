// ------------ CSS ----------------
import './TitleTypeOne.css'
// ------------ SVG ----------------
import Victor from '../../assets/victor.png'

const TitleTypeOne = ({className,title,titleTop}) => {
    return (
        <div className={`title-type-one ${className}`}>
            <small>{titleTop}</small>
            <div className="heading-h">
                <div className="line"></div>
                <h2 className='section-title'>{title}</h2>
                <div className="line"></div>
            </div>
            <img src={Victor} className='victor' alt="" />
        </div>
    );
}

export default TitleTypeOne;

