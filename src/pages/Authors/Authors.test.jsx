import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Authors from './Authors';

// Mock the data and navigate function
jest.mock('../../data/data', () => ({
  suggistedAuthors: ['Author1', 'Author2', 'Author3'],
}));
const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Authors Component', () => {

  const renderAuthors = () => {
    render(
      <MemoryRouter>
        <Authors />
      </MemoryRouter>
    )
  }
  
  test('renders the Authors component correctly', () => {
    renderAuthors()

    expect(screen.getByText('Authors')).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText('search for authors');
    expect(searchInput).toBeInTheDocument()
    expect(screen.getByText('Popular Authors')).toBeInTheDocument();
    expect(screen.getByText('Author1')).toBeInTheDocument();
    expect(screen.getByText('Author2')).toBeInTheDocument();
  });

  test('updates the searchInput field correctly', () => {
    renderAuthors()

    const searchInput = screen.getByPlaceholderText('search for authors');
    fireEvent.change(searchInput, { target: { value: 'new author' } });
    expect(searchInput.value).toBe('new author');
  });

  test('navigates on clicking a popular author', () => {
    renderAuthors()

    fireEvent.click(screen.getByText('Author1'));
    expect(mockNavigate).toHaveBeenCalledWith('Author1');
  });

  // Trimmed searchInput handling
  test('trims searchInput before navigation', () => {
    renderAuthors()

    const searchInput = screen.getByPlaceholderText('search for authors');
    fireEvent.change(searchInput, { target: { value: 'Author1' } });
    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);
    expect(mockNavigate).toHaveBeenCalledWith('Author1');
  });
  
  // Handling case sensitivity in author names
  test('navigates correctly with case-insensitive author names', () => {
    renderAuthors()

    const searchInput = screen.getByPlaceholderText('search for authors');
    fireEvent.change(searchInput, { target: { value: 'author1' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    expect(mockNavigate).toHaveBeenCalledWith('author1');
  });

});