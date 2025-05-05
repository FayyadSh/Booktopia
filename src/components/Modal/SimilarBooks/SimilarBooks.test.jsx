import { render, screen, within } from '@testing-library/react';
import SimilarBooks from './SimilarBooks';
import { mockBooks } from '../../../Mocks';

// Mock Components
jest.mock('../../Book/Book',() => ({book}) => <div>{book.title}</div>)
jest.mock('../../Slider/Slider',() => ({children}) => <div>Slider {children}</div>)


describe('Similar Books', () => {
    
    test('renders SimilarBooks with a list of books', () => {
      render(<SimilarBooks books={mockBooks} />);
    
       // Check if the heading is rendered
       const sectoinTitle = screen.getByText('similar books')
       expect(sectoinTitle).toBeInTheDocument();

       const similarBooks = screen.getByText('similar books')
       expect(similarBooks.parentElement).toHaveClass('similar-books');  

       // Ensure the Slider component is rendered
       const slider = screen.getByText(/slider/i)
       expect(slider).toBeInTheDocument();
   
       // Check if books are rendered
       mockBooks.forEach((book) => {
         expect(within(slider).getByText(book.title)).toBeInTheDocument();
       });
    
    });
  
  test('renders empty message when no books are provided', () => {
    render(<SimilarBooks books={[]} />);
  
    // Check if the heading is rendered
    const sectoinTitle = screen.getByText('similar books')
    expect(sectoinTitle).toBeInTheDocument();
    
    // Ensure no books are rendered
    expect(screen.queryByText('Book1')).not.toBeInTheDocument();
    expect(screen.queryByText('Book2')).not.toBeInTheDocument();
  });
});