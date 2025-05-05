import Hero from '../components/Hero/Hero';
import Brands from '../components/Brands/Brands';
import BestSellingBooks from '../components/BestSellingBooks/BestSellingBooks';
import TopRatedBooks from '../components/TopRatedBooks/TopRatedBooks'
import PopularBooks from '../components/PopularBooks/PopularBooks';

const Home = () => {
    return (
        <div>
            <Hero/>
            <Brands/>
            <TopRatedBooks /> 
            <BestSellingBooks/>
            <PopularBooks />
        </div>
    );
}

export default Home;