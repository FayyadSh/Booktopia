// ------------ CSS ----------------
import "./Navbar.css";
// ------------ React Hooks ----------------
import { use, useState } from "react";
// ------------ React Router Dom ----------------
import { Link, NavLink, useNavigate } from "react-router-dom";
// ------------ Context ----------------
import { BooksContext } from "../../context/BooksContext";
// ------------ React Icons ----------------
import { VscMenu, VscSearch } from "react-icons/vsc";
import { GrClose } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai"
import { IoMoonOutline } from "react-icons/io5";
import { GoSun } from "react-icons/go";
// ------------ Utils ----------------
import switchTheme from "../../utils/theme";


const Navbar = () => {

  //---   Component States  ----------------------------------------------------
  const [searchInput, setSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isNavLinkShowing, setNavLinkShowing] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true)

  const { favoriteBooks } = use(BooksContext)

  //---   Navigate Hook  ----------------------------------------------------
  const navigate = useNavigate();

  //---   Handle Search Function  ----------------------------------------------------
  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`search/${encodeURIComponent(searchValue)}`);
    }
  };
  
  //---   Handle Show Search Input Function  ----------------------------------------------------
  const handleCloseSearchInput = () => {
    setSearchValue('');
    setSearchInput(false);
  }
  
  //---   Handle Show Search Input Function  ----------------------------------------------------
  const handlSwitchTheme = () => {
    setDarkTheme(!darkTheme)
    switchTheme(darkTheme)
  }
  
  //---   Handle Close Search Input When User Click On Escape  ----------------------------------------------------
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      handleCloseSearchInput()
    }
  });
  
  return (
    <nav>
      {/*----------    Search Input   ----------*/}

      {searchInput && 
        <input type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          autoFocus={searchInput}
          placeholder="Search For Book"
          onKeyDown={e => {
            if(e.key=== 'Enter'){
              handleSearch()
            }
          }}
        />
      }

      <div className="container">
        {/*----------    Logo   ----------*/}

        <Link to={"/"} className="logo" onClick={handleCloseSearchInput}>
          <img src='/icon.svg' alt="logo" />
          <h1>Booktopia</h1>
        </Link>
        {/*---------- Nav-Links  ----------*/}

        <ul className={`nav-links ${isNavLinkShowing ? "navlinkShow" : "navlinkHide"}`}>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/newbooks'>NewBooks</NavLink></li>
          <li><NavLink to='/authors'>Authors</NavLink></li>
          <li><NavLink to='/categories'>Categories</NavLink></li>
        </ul>
        {/*---------- Right-Nav  ----------*/}

        <div className="nav-right">

          <span className="nav-icon" onClick={handlSwitchTheme}>
            <GoSun className="toggle-theme-icon" style={{translate: darkTheme? '0 -100px' : '0 '}}/>
            <IoMoonOutline className="toggle-theme-icon" style={{translate: darkTheme? '0' : '0 -100px'}}/> 
          </span>
        
          <span role='search-button' onClick={() => setSearchInput(!searchInput)}  className="nav-icon">
            {searchInput ? 
              <RiCloseFill/>
                : 
              <VscSearch/>
            }
          </span>

          <Link className="nav-icon">
            <FiUser />
          </Link>

          <Link to='/favorites' className="nav-icon">
            <span className="favorite-books-icon">
                <AiOutlineHeart />
                {favoriteBooks?.length > 0 && <span className='favorite-books' >{favoriteBooks?.length}</span>}
            </span>
          </Link>

        </div>
        {/*---------- Menu-Button  ----------*/}

        <button className="menu btn nav-icon" onClick={() => setNavLinkShowing(!isNavLinkShowing)} role='menu-button'>
          {!isNavLinkShowing ? <VscMenu /> : <GrClose />}
        </button>

      </div>
    </nav>
  );
};

export default Navbar;