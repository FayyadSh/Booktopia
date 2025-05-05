// ------------ React Router Dom ----------------
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
// ------------ Components ----------------
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import BooksContextProvider from "../context/BooksContext";
import Loading from "../ui/Loading/Loading";

// ------------ Lazy Loaded Pages ----------------
const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const NewBooks = lazy(() => import("../pages/NewBooks/NewBooks"));
const Categories = lazy(() => import("../pages/Categories/Categories"));
const SearchBooks = lazy(() => import("../pages/Search/SearchBooks"));
const Category = lazy(() => import("../pages/Category/Category"));
const Favorites = lazy(() => import("../pages/Favorites/Favorites"));
const Authors = lazy(() => import("../pages/Authors/Authors"));
const AuthorBooks = lazy(() => import("../pages/AuthorBooks/AuthorBooks"));

const Router = () => {
  return (
    <BrowserRouter>
      <BooksContextProvider>
        <Navbar />
        <Suspense fallback={<Loading />}> {/* Wrap Routes in Suspense */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/new-books" element={<NewBooks />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/search/:query" element={<SearchBooks />} />
            <Route path="/categories/:category" element={<Category />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/authors/:author" element={<AuthorBooks />} />
          </Routes>
        </Suspense>
        <Modal />
        <Footer />
      </BooksContextProvider>
    </BrowserRouter>
  );
};

export default Router;