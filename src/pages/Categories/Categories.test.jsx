import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Categories from './Categories';
import { categories } from '../../data/data';

// Mock the TitleTypetwo component
jest.mock('../../ui/TitleTypeTow/TitleTypetwo', () => ({ title }) => <div>{title}</div>);

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Categories Component', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders TitleTypetwo with the correct title', () => {
    render(<Categories />);
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  test('renders all categories with correct text', () => {
    render(<Categories />);
    categories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  test('applies the correct CSS class based on category name length', () => {
    render(<Categories />);
    
    categories.forEach(category => {
      const categoryElement = screen.getByText(category);
      if (category.length > 10) {
        expect(categoryElement).toHaveClass('long-category');
      } else {
        expect(categoryElement).toHaveClass('category');
      }
    });
  });

  test('navigates to the correct URL when a category is clicked', () => {
    render(<Categories />);

    categories.forEach(category => {
      const categoryElement = screen.getByText(category);
      fireEvent.click(categoryElement);
      expect(mockNavigate).toHaveBeenCalledWith('/categories/' + category);
    });
  });
});