//---   React Icons  ----------------------------------------------------
import { BsStarFill } from "react-icons/bs"
import { BsStarHalf } from 'react-icons/bs';
import { BsStar } from "react-icons/bs"

const Rating = ({rating}) => {
    return (
        <div style={{display:"flex", alignItems:"center"}}>
            {
                rating <= 0.1 ? <BsStar className='rating-star BsStar' data-testid='rating-star' />  
                : rating >= 0.2  &&  rating < 0.2 ? <BsStarHalf className='rating-star BsStarHalf' data-testid='rating-star' /> 
                : <BsStarFill className='rating-star BsStarFill' data-testid='rating-star' /> 
            }
            {
                rating <= 0.2 ? <BsStar className='rating-star BsStar' data-testid='rating-star' />  
                : rating <= 0.3 && rating < 0.4 ? <BsStarHalf className='rating-star BsStarHalf' data-testid='rating-star' /> 
                : <BsStarFill className='rating-star BsStarFill' data-testid='rating-star' /> 
            }
            {
                rating <= 0.4 ? <BsStar className='rating-star BsStar' data-testid='rating-star' />  
                : rating <= 0.5 && rating < 0.6 ? <BsStarHalf className='rating-star BsStarHalf' data-testid='rating-star' /> 
                : <BsStarFill className='rating-star BsStarFill' data-testid='rating-star' /> 
            }
            {
                rating <= 0.6 ? <BsStar className='rating-star BsStar' data-testid='rating-star' />  
                : rating <= 0.7 && rating < 0.8  ? <BsStarHalf className='rating-star BsStarHalf' data-testid='rating-star' /> 
                : <BsStarFill className='rating-star BsStarFill' data-testid='rating-star' /> 
            }
            {
                rating <= 0.8 ? <BsStar className='rating-star BsStar' data-testid='rating-star' />  
                : rating <= 0.9 && rating < 1 ? <BsStarHalf className='rating-star BsStarHalf' data-testid='rating-star' /> 
                : <BsStarFill className='rating-star BsStarFill' data-testid='rating-star' /> 
            }
        </div>
    );
}

export default Rating;