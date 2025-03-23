// ------------ CSS ----------------
import './BooksPage.css'
// ------------ Hooks ----------------
import { useGlobalContext } from "../../context/BooksContext";
// ------------ Components ----------------
import Error from "../../ui/Error/Error";
import NoContent from "../../ui/NoContent/NoContent";
import TitleTypetwo from "../../ui/TitleTypeTow/TitleTypetwo";
import BooksFilter from "../BooksFilter/BooksFilter";
import Pagination from "../Pagination/Pagination";

const BooksPage = ({ pageName, pageBooks }) => {

  const { error } = useGlobalContext();
  return (
    <section>
      <div className="section-header">
        <TitleTypetwo title={pageName} />
        <BooksFilter />
      </div>
      {error ? 
        <Error errorMessage={error} />
       : pageBooks?.books?.length > 0 ? 
        <Pagination
          dataArray={pageBooks?.books}
          length={pageBooks?.total}
        />
       : 
        <NoContent />
      }
    </section>
  );
};

export default BooksPage;
