// ------------ CSS ----------------
import './BooksPage.css'
// ------------ Hooks ----------------
import { useGlobalContext } from "../../context/BooksContext";
// ------------ Components ----------------
import Error from "../../ui/Error/Error";
import TitleTypetwo from "../../ui/TitleTypeTow/TitleTypetwo";
import BooksFilter from "../BooksFilter/BooksFilter";
import Pagination from "../Pagination/Pagination";
import Loading from '../../ui/Loading/Loading';
import NoContent from '../../ui/NoContent/NoContent';

const BooksPage = ({ pageName, pageBooks }) => {

  const { error, loading } = useGlobalContext();
  return (
    <section>
      <div className="section-header">
        <TitleTypetwo title={pageName} />
        <BooksFilter />
      </div>
      
      {error ? 
        <Error errorMessage={error} />
       : loading ?
        <Loading />: 
        pageBooks?.length === 0 ?
        <NoContent />
       : <Pagination
          books={pageBooks?.books}
          length={pageBooks?.total}
        />
      }
    </section>
  );
};

export default BooksPage;
