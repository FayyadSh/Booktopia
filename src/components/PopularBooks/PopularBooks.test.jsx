import { render, screen, fireEvent } from '@testing-library/react';
import PopularBooks from './PopularBooks';
import { BooksContext } from '../../context/BooksContext';
import { topics } from '../../data/data';
import { mockContext, mockNullContext, mockLoadingContext } from '../../mocks';

// Mock the Book component
jest.mock('../Book/Book', () => ({book}) => <div role='book'>{book.title}</div>)
jest.mock('../../ui/TitleTypeOne/TitleTypeOne', () => () => <div>Popular Books</div>);
jest.mock('../../ui/Loading/Loading', () => () => <div>Loading</div>);
jest.mock('../../ui/NoContent/NoContent', () => () => <div>No content available</div>);

describe('PopularBooks Component', () => {

  const { useFetchBooks } = mockContext;

  const renderPopularBooks = (context = mockContext) => {
    render(
      <BooksContext.Provider value={context}>
        <PopularBooks />
      </BooksContext.Provider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calls useFetchBooks on initial render', () => {
    renderPopularBooks(mockNullContext);
    const {useFetchBooks} = mockNullContext

    const sectionTitle = screen.getByText('Popular Books')
    expect(sectionTitle).toBeInTheDocument();
    expect(useFetchBooks).toHaveBeenCalledWith('GET_POPULAR_BOOKS', 'search-books?genres=classics&number=15');
  });

  test('displays loading component when loading is true', () => {
    renderPopularBooks(mockLoadingContext);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders default topic as active when no initial topic is selected', () => {
    renderPopularBooks();

    const firstTopicButton = screen.getByText(topics[0]);
    expect(firstTopicButton).toHaveClass('active');
    const secondTopicButton = screen.getByText(topics[1])
    
    fireEvent.click(secondTopicButton)
    expect(secondTopicButton).toHaveClass('active');
    expect(firstTopicButton).not.toHaveClass('active');
  });

  test('handles a scenario where `popularBooks` is loaded successfully but an empty array is returned', () => {
    renderPopularBooks(mockNullContext);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(screen.queryByText('No content available')).toBeInTheDocument();
  });

  test('ensures `useFetchBooks` is not called repeatedly when the same topic is clicked multiple times', () => {
    renderPopularBooks();
    const topicButton = screen.getByText(topics[0]);
    screen.debug()

    // Click the same topic button multiple times
    fireEvent.click(topicButton);
    fireEvent.click(topicButton);
    fireEvent.click(topicButton);

    // Ensure `useFetchBooks` was only called once
    expect(useFetchBooks).toHaveBeenCalledTimes(1);
  });

  test('renders PopularBooks component with initial state', () => {
    renderPopularBooks();
    
    // Check for the filter buttons
    topics.forEach((topic) => {
      expect(screen.getByText(topic)).toBeInTheDocument();
    });
  });

  test('displays loading component when loading is true', () => {
    renderPopularBooks(mockLoadingContext);

    // Check that the loading component is displayed
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('handles multiple rapid topic changes correctly', () => {
    renderPopularBooks();
    // Simulate rapid topic changes
    const firstTopicButton = screen.getByText(topics[0]);
    const secondTopicButton = screen.getByText(topics[1]);
    const thirdTopicButton = screen.getByText(topics[2]);

    fireEvent.click(secondTopicButton);
    fireEvent.click(thirdTopicButton);
    fireEvent.click(firstTopicButton);

    // Ensure useFetchBooks is called with the last selected topic
    expect(useFetchBooks).toHaveBeenCalledWith('GET_POPULAR_BOOKS', `search-books?genres=${topics[0]}&number=15`);
    expect(useFetchBooks).toHaveBeenCalledTimes(4); 
  })

  it("should render books when popular books are available", () => {
    renderPopularBooks()
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(screen.queryByText('No content available')).not.toBeInTheDocument();


    const {popularBooks} = mockContext
    
    popularBooks.forEach((b) => {
      const book = screen.getByText(b.title)
      expect(book).toBeInTheDocument()
    })
  });

  it("should trigger the correct fetch request when switching between topics quickly", () => {
    renderPopularBooks()

    const fictionButton = screen.getByText(/fiction/i);
    const classicsButton = screen.getByText(/classics/i);

    // Click on fiction
    fireEvent.click(fictionButton);
    expect(useFetchBooks).toHaveBeenCalledWith("GET_POPULAR_BOOKS", "search-books?genres=fiction&number=15");

    // Immediately switch to classics
    fireEvent.click(classicsButton);
    expect(useFetchBooks).toHaveBeenCalledWith("GET_POPULAR_BOOKS", "search-books?genres=classics&number=15");

    // Ensure useFetchBooks was called the correct number of times
    expect(useFetchBooks).toHaveBeenCalledTimes(3);
  });
})