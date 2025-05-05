import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Modal from './Modal';
import { BooksContext } from '../../context/BooksContext';

// Mock Components
jest.mock('../../ui/Loading/Loading', () => () => <div>Loading</div>);
jest.mock('./SimilarBooks/SimilarBooks', () => () => <div>Similar Books</div>);
jest.mock('./DescriptionBox/DescriptionBox', () => () => <div>Description Box</div>);
jest.mock('../../ui/NoContent/NoContent', () => () => <div>No Content</div>);
jest.mock('./ModalContainer/ModalContainer', () => ({ children }) => <div>{children}</div>);
jest.mock('./Rating/Rating', () => () => <div>Rating</div>);

describe('Modal Component', () => {
  const mockSetOpenModal = jest.fn();
  const mockRemoveFromFavorites = jest.fn();
  const mockAddToFavorites = jest.fn();

  const defaultContextValue = {
    setOpenModal: mockSetOpenModal,
    openModal: true,
    similarBooks: [],
    bookDetails: {
      id: 1,
      title: 'Test Book',
      authors: [{ name: 'Author' }],
      description: 'This is a test description.',
      rating: { average: 4.5 },
      number_of_pages: 200,
      publish_date: '2021',
      image: 'test-image-url',
    },
    useGetBook: () => ({ loading: false }),
    favoriteBooks: [],
    removeFromFavorites: mockRemoveFromFavorites,
    addToFavorites: mockAddToFavorites,
  };

  const renderModal = (contextValue = defaultContextValue) => {
    return render(
      <BooksContext.Provider value={contextValue}>
        <Modal />
      </BooksContext.Provider>
    );
  };

  test('renders loading state', () => {
    renderModal({
      ...defaultContextValue,
      useGetBook: () => ({ loading: true }),
    });

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  test('renders book details when available', () => {
    renderModal();
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
    expect(screen.getByText('200 pages')).toBeInTheDocument();
    expect(screen.getByText(/publish year/i)).toBeInTheDocument();
  });

  test('shows truncated description with "Read more..." link', () => {
    renderModal({
      ...defaultContextValue,
      bookDetails: {
        ...defaultContextValue.bookDetails,
        description: 'This is a very long description that exceeds the 150 characters limit, and should be truncated when rendered. This is a very long description that exceeds the 150 characters limit, and should be truncated when rendered.',
      },
    });

    expect(screen.getByText('Read more....')).toBeInTheDocument();
  });

  test('handles adding a book to favorite books', async () => {
    renderModal();
    const addToFavoritesButton = screen.getByText(/Add To Favorites/i);
    fireEvent.click(addToFavoritesButton);

    const loading = screen.getByText(/Loading/i)
    expect(loading).toBeInTheDocument()

    await waitFor(() => {
      expect(mockAddToFavorites).toHaveBeenCalledWith(defaultContextValue.bookDetails);
    },{timeout: 855})
  });

  test('handles removing a book from favorite books', async () => {
    renderModal({
      ...defaultContextValue,
      favoriteBooks: [{ id: 1 }],
    });
    const removeFromFavoritesButton = screen.getByText(/In Favorites/i);
    fireEvent.click(removeFromFavoritesButton);

    const loading = screen.getByText(/Loading/i)
    expect(loading).toBeInTheDocument()

    await waitFor(() => {
      expect(mockRemoveFromFavorites).toHaveBeenCalledWith(1);
    },{timeout: 555})
  });

  test('renders book image correctly', () => {
    renderModal();
    const bookImage = screen.getByRole('img');
    expect(bookImage).toHaveAttribute('src', 'test-image-url');
    expect(bookImage).toHaveClass('modal-book-image');
  });

  test('add to favorite books button shows correct state', async () => {
    renderModal();
    const addToFavoriesButton = screen.getByText(/Add To Favorites/i)
    expect(addToFavoriesButton).toBeInTheDocument();

    renderModal({
      ...defaultContextValue,
      favoriteBooks: [{ id: 1 }],
    });

    const removeFromFavoritesButton = screen.getByText(/In Favorites/i)
    expect(removeFromFavoritesButton).toBeInTheDocument();
  });

  test('applies correct CSS class based on title length', () => {
    renderModal({
      ...defaultContextValue,
      bookDetails: {
        ...defaultContextValue.bookDetails,
        title: 'A Very Very Very Long Book Title That Exceeds Thirty Characters',
      },
    });

    const titleElement = screen.getByText(/A Very Very Very Long Book Title/i);
    expect(titleElement).toHaveClass('long-title');
  });

  test('renders just one authors correctly', () => {
    renderModal({
      ...defaultContextValue,
      bookDetails: {
        ...defaultContextValue.bookDetails,
        authors: [{ name: 'Author One' }, { name: 'Author Two' }],
      },
    });

    expect(screen.getByText('Author One')).toBeInTheDocument();
    expect(screen.queryByText('Author Two')).not.toBeInTheDocument();
  });

  test('handles book with no author gracefully', () => {
    renderModal({
      ...defaultContextValue,
      bookDetails: {
        ...defaultContextValue.bookDetails,
        authors: [],
      },
    });

    const authorName = screen.queryByText('Author')
    expect(authorName).not.toBeInTheDocument();
  });

  test('renders Rating component only if rating is present', () => {
    renderModal({
      ...defaultContextValue,
      bookDetails: {
        ...defaultContextValue.bookDetails,
        rating: null,
      },
    });

    const bookRating = screen.queryByText('Rating')
    expect(bookRating).not.toBeInTheDocument();
  });

  test('renders correct number of similar books', () => {
    renderModal({
      ...defaultContextValue,
      similarBooks: [{ id: 1 }],
    });

    const similarBooks = screen.getByText('Similar Books')
    expect(similarBooks).toBeInTheDocument();
  });

  // test('handles empty book object gracefully', () => {
  //   renderModal({
  //     ...defaultContextValue,
  //     bookDetails: {},
  //   });

  //   const noContentComponent = screen.getByText('No Content')
  //   expect(noContentComponent).toBeInTheDocument();
  // });

  test('closes the description modal when the close button is clicked', async () => {
    renderModal({
      ...defaultContextValue,
      bookDetails: {
        ...defaultContextValue.bookDetails,
        description: 'This is a very long description that exceeds the 150 characters limit, and should be truncated when rendered. This is a very long description that exceeds the 150 characters limit, and should be truncated when rendered.',
      },
    });

    fireEvent.click(screen.getByText('Read more....'));

    await waitFor(() => expect(screen.getByText(/Description Box/)).toBeInTheDocument());
  });

  it("should display the modal image with correct src and alt attributes", () => {
    renderModal()

    const bookImage = screen.getByRole("img");
    expect(bookImage).toHaveAttribute("src", defaultContextValue.bookDetails.image);
    expect(bookImage).toHaveAttribute("alt", "book-image");
  });

  it("handles case where book description is not provided", () => {
    const noDescriptionContextValue = {
      ...defaultContextValue,
      bookDetails: { ...defaultContextValue.bookDetails, description: "" },
    };

    renderModal(noDescriptionContextValue)

    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(screen.queryByText("Read more....")).toBeNull();
  });

});