// ------------ CSS ----------------
import './Brands.css'
// ------------ Data ----------------
import { brandsData } from '../../data/data';

const Brands = () => {
    return (
        <section className='brands'>
            <div className="container brands-container">
                {brandsData.map(({img}, index)=>(
                    <img className='brand' src={img} key={index} alt="" />
                ))}
            </div>
        </section>
    );
}

export default Brands;
