// ------------ CSS ----------------
import './DescriptionBox.css'
// ------------ React Icons ----------------
import { RiCloseCircleFill } from "react-icons/ri";

const DescriptionBox = ({setShowDescription,description}) => {
    return (
        <div className='description-box'>
            <div>
                <RiCloseCircleFill className="close-icon" onClick={() => setShowDescription(false)} role='icon'/>
                <h1 className={description?.title?.length > 30 ? 'long-title': ''}>
                    {description?.title}
                </h1>
                <p>{description?.description}</p>
            </div>
        </div>
    );
}

export default DescriptionBox;