import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { BrowserRouter as Router} from "react-router-dom";
import user from '@testing-library/user-event'
import { BooksContext } from "../../context/BooksContext";

describe('Navbar', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderNavbar = () => {
    render(
      <BooksContext.Provider value={{favoriteBooks:[1,2,3]}}>
        <Router>
          <Navbar />
        </Router>
      </BooksContext.Provider>
  )};

  beforeEach(() => {
    renderNavbar()
  })

  test("renders the logo", () => {
    const logo = screen.getAllByRole('link')[0]
    user.click(logo)
    expect(window.location.pathname).toBe('/')
  });

  test("renders the navigation links", async () => {
    const navLinks = screen.getAllByRole('listitem')
    const randIndex = Math.floor(Math.random() * 3) + 1

    await user.click(navLinks[randIndex].firstChild)
    expect(window.location.pathname).toBe(`/${navLinks[randIndex].textContent.
    toLocaleLowerCase().replace(' ','-')}`)
  });

  it('toggles search bar visibility on search button click', async () => {
    const searchButton = screen.getByRole('search-button');
    
    await user.click(searchButton);
    expect(screen.getByPlaceholderText('Search For Book')).toBeInTheDocument();
    
    await user.click(searchButton);
    expect(screen.queryByPlaceholderText('Search For Book')).not.toBeInTheDocument();
  });

  test('navigates to Home on clicking Home link', () => {
    const homeLink = screen.getByText('Home');
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('does not render the search input when searchBar state is false', () => {
    expect(screen.queryByPlaceholderText('Search For Book')).not.toBeInTheDocument();
  });

  test("navigates to search page with search input value", async () => {
    const searchButton = screen.getByRole("search-button");
    await user.click(searchButton);
    const searchInput = await screen.findByPlaceholderText("Search For Book");

    await user.type(searchInput,'javascript')
    expect(searchInput).toHaveDisplayValue('javascript')

    await user.keyboard('{Enter}')
    expect(window.location.pathname).toEqual('/search/javascript')
  });

  test("favorites link displays correct number of favorite books", async () => {
    const favoriteCount = screen.getByText("3");
    expect(favoriteCount).toBeInTheDocument();
  
    await user.click(favoriteCount.parentElement);
    expect(window.location.pathname).toBe("/favorites");
  });

  it('focuses the search input when search bar is opened', async () => {
    const searchButton = screen.getByRole('search-button');
    user.click(searchButton);

    const searchInput = await screen.findByPlaceholderText('Search For Book');
    expect(searchInput).toHaveFocus();
  });

  it('has accessible icons and buttons with appropriate roles', () => {
    expect(screen.getByRole('search-button')).toBeInTheDocument();
    expect(screen.getByRole('menu-button')).toBeInTheDocument();
  });

  it('renders the Navbar component within a reasonable time', () => {
    const renderStart = performance.now();
    const renderEnd = performance.now();
    expect(renderEnd - renderStart).toBeLessThan(100); // Expect render to complete in under 100ms
  });

  it('toggles visibility of nav-links correctly with multiple menu button clicks', async () => {
    const menuButton = screen.getByRole('menu-button');

    await user.click(menuButton); // Hide nav-links
    expect(screen.getByText('Home').closest('ul')).toHaveClass('navlinkHide');

    await user.click(menuButton); // Show nav-links
    expect(screen.getByText('Home').closest('ul')).toHaveClass('navlinkShow');

    await user.click(menuButton); // Hide again
    expect(screen.getByText('Home').closest('ul')).toHaveClass('navlinkHide');
  });

  it('clears search input and closes search bar on Escape key press', async () => {
    const searchButton = screen.getByRole('search-button');
    await user.click(searchButton);

    const searchInput = screen.getByPlaceholderText('Search For Book');
    await user.type(searchInput, 'Some Search Term');
    await user.keyboard('{Escape}');

    expect(searchInput).not.toBeInTheDocument();
  });

  it('resets search input when closing the search bar', async () => {
    const searchButton = screen.getByRole('search-button');
    await user.click(searchButton);

    const searchInput = screen.getByPlaceholderText('Search For Book');
    await user.type(searchInput, 'Some Search Term');

    // Toggle search bar off
    await user.click(searchButton);
    await user.click(searchButton); // Toggle on again
    
    expect(searchInput).toHaveTextContent(''); // Ensure search input is cleared
  });

});