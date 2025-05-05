// ------------ CSS ----------------
import "./Navbar.css";
// ------------ React Hooks ----------------
import { use, useEffect, useRef, useState } from "react";
// ------------ React Router Dom ----------------
import { Link, NavLink, useNavigate } from "react-router-dom";
// ------------ Context ----------------
import { BooksContext } from "../../context/BooksContext";
// ------------ React Icons ----------------
import { VscMenu, VscSearch } from "react-icons/vsc";
import { GrClose } from "react-icons/gr";
import { RiCloseFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai"
import { IoMoonOutline } from "react-icons/io5";
import { GoSun } from "react-icons/go";
// ------------ Utils ----------------
import switchTheme from "../../utils/theme";

/**
 * Navbar component that handles navigation, search, theme switching, and favorites
 */
const Navbar = () => {
  
  const [searchInput, setSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isNavLinkShowing, setNavLinkShowing] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  // Access favorite books from context
  const { favoriteBooks } = use(BooksContext);
  
  // Navigation hook for programmatic routing
  const navigate = useNavigate();

  /**
   * Handles search functionality
   * Navigates to search page with encoded search term
   */
  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`search/${encodeURIComponent(searchValue)}`);
    }
  };

  /**
   * ScrollNavLink component - Custom NavLink with scroll-to-top functionality
   * @param {string} title - The title/label for the navigation link
   */
  function ScrollNavLink({ title }) {
    const handleClick = () => {
      window.scrollTo(0, 0);
      setNavLinkShowing(false);
    };
    
    // Generate path from title (handles home case and spaces in titles)
    const targetPath = 
      title === 'home' ? '/' : '/' + title.replace(' ', '-').toLowerCase();
  
    return (
      <NavLink to={targetPath} onClick={handleClick} >
        {title}
      </NavLink>
    );
  }

  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (favoriteBooks?.length > 0) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 1000); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [favoriteBooks?.length]);

  // Ref for search input to manage focus
  const searchInputRef = useRef(null);

  // Effect to focus search input when it becomes visible
  useEffect(() => {
    if (searchInput && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchInput]);
  
  /**
   * Clears search input and hides it
   */
  const handleCloseSearchInput = () => {
    setSearchValue('');
    setSearchInput(false);
  }
  
  /**
   * Toggles between dark and light theme
   */
  const handlSwitchTheme = () => {
    setDarkTheme(!darkTheme)
    switchTheme(darkTheme)
  }

  // Add global keydown listener for Escape key to close search
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      handleCloseSearchInput()
    }
  });
  
  return (
    <nav>
      {/*----------    Search Input Section    ----------*/}
      <div className={`search-wrapper ${searchInput ? "search-active" : ""}`}>
        <input 
          type="text"
          value={searchValue}
          ref={searchInputRef}
          onChange={e => setSearchValue(e.target.value)}
          autoFocus={searchInput}
          placeholder="Search For Book"
          onKeyDown={e => {
            if(e.key=== 'Enter'){
              handleSearch()
            }
          }}
        />
      </div>

      <div className="container">
        {/*----------   Logo Section   ----------*/}
        <Link to={"/"} className="logo" onClick={handleCloseSearchInput}>
          <img src='/icon.svg' alt="logo" />
          <h1>Booktopia</h1>
        </Link>

        {/*---------- Main Navigation Links Section  ----------*/}
        <ul className={`nav-links`}>
          <li className={isNavLinkShowing ? "navLinkShow" : "navLinkHide"} style={{ animationDelay: isNavLinkShowing ? '0ms' : '600ms' }}>
            <ScrollNavLink title='home' />
            </li>
          <li className={isNavLinkShowing ? "navLinkShow" : "navLinkHide"} style={{ animationDelay: isNavLinkShowing ? '200ms' : '400ms' }}>
            <ScrollNavLink title='new books' />
            </li>
          <li className={isNavLinkShowing ? "navLinkShow" : "navLinkHide"} style={{ animationDelay: isNavLinkShowing ? '400ms' : '200ms' }}>
            <ScrollNavLink title='categories' />
            </li>
          <li className={isNavLinkShowing ? "navLinkShow" : "navLinkHide"} style={{ animationDelay: isNavLinkShowing ? '600ms' : '0ms' }}>
            <ScrollNavLink title='authors' />
          </li>
        </ul>

        {/*---------- Right Navigation Icons Section  ----------*/}
        <div className="nav-right">
          {/* Theme Toggle Button */}
          <span className="nav-icon" onClick={handlSwitchTheme}>
            <GoSun className="toggle-theme-icon" style={{translate: darkTheme? '0 -100px' : '0 '}}/>
            <IoMoonOutline className="toggle-theme-icon" style={{translate: darkTheme? '0' : '0 -100px'}}/> 
          </span>
        
          {/* Search Toggle Button */}
          <span 
            role='search-button' 
            onClick={() => setSearchInput(prev => !prev)}  
            className="nav-icon"
          >
            {searchInput ? 
              <RiCloseFill/> 
              : 
              <VscSearch/> 
            }
          </span>

          {/* Favorites Link with Counter */}
          <Link to='/favorites' className="nav-icon">
            <span className={`favorite-books-icon ${pulse ? 'pulse-animation' : ''}`}>
              <AiOutlineHeart />
                {favoriteBooks?.length > 0 && <span className='favorite-books'>{favoriteBooks?.length}</span>}
              </span>
          </Link>
        </div>

        {/*---------- Mobile Menu Toggle Button  ----------*/}
        <button 
          className="menu-icon btn nav-icon" 
          onClick={() => setNavLinkShowing(!isNavLinkShowing)} 
          role='menu-button'
        >
          {!isNavLinkShowing ? 
            <VscMenu /> 
            : 
            <GrClose />
          }
        </button>
      </div>
    </nav>
  );
};

export default Navbar;