// ------------ CSS ----------------
import './Slider.css'
// ------------ React Hooks ----------------
import { useRef } from 'react';
// ------------ React Icons ----------------
import { IoIosArrowBack , IoIosArrowForward} from "react-icons/io"
// ------------ Custom Hooks ----------------
import useScroll from '../../hooks/useScroll';

const Slider = ({children, sliderSize = 'normal'}) => {
    
    const contentWrapper = useRef()
    
    const {
        handleScroll,
        counter,
        translate,
        nextButtonDisabled
    } = useScroll(contentWrapper)
    
    return (    
        <div className={`${sliderSize  === 'normal' ? 'slider container' : 'modal-slider' }`} role='slider'>
            {/*----------    Right Scroll Button   ----------*/}
           <button className='slider-button'
              onClick={() => handleScroll('left')}
              disabled={counter === 0}
            >
                <IoIosArrowBack />
            </button>
            {/*----------    Content Box   ----------*/}
            <div className='slider-container'>
                <div className="content-warpper"
                  ref={contentWrapper}
                  role='content-wrapper'
                  style={{transform:`translate(${translate})`}}
                 >
                    {children}
                </div>
            </div>
            {/*----------    Left Scroll Button   ----------*/}
           <button className='slider-button'
              disabled={nextButtonDisabled}
              onClick={() => handleScroll('right')}
            >
                <IoIosArrowForward />
            </button>
        </div>
    );
}

export default Slider;