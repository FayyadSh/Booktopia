// ------------ React Icons ----------------
import { ImSad } from 'react-icons/im';

const Error = ({errorMessage = 'Somthing Went Wrong'}) => {
    return (
        <div className="error">
            <h1>{errorMessage}</h1>
            <i><ImSad /></i>
        </div>
    );
}

export default Error;
