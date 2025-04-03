// ------------ CSS ----------------
import './NoContent.css'
// ------------ React Icons ----------------
import { TbBooks } from 'react-icons/tb';

const NoContent = () => {
    return (
        <div className="no-content">
            <h1>No Books Avaliable</h1>
            <i><TbBooks /></i>
        </div>
    );
}

export default NoContent;