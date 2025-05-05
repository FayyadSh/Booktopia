import { render, screen, fireEvent } from '@testing-library/react';
import DescriptionBox from './DescriptionBox';

describe('DescriptionBox Component', () => {
    const mockSetShowDescriptoin = jest.fn();
    const descriptionMock = {
        title: 'Sample Title',
        description: 'Sample Description'
    };

    beforeEach(() => {
        jest.clearAllMocks(); // Reset mock counts before each test
    });

    test('does not apply "long-title" class when title length is 30 characters or less', () => {
        render(<DescriptionBox setShowDescription={mockSetShowDescriptoin} description={descriptionMock} />);
        
        const titleElement = screen.getByText(/sample title/i);
        expect(titleElement).not.toHaveClass('long-title');
    });

    test('calls setShowDescription(false) when close icon is clicked', () => {
        render(<DescriptionBox setShowDescription={mockSetShowDescriptoin} description={descriptionMock} />);
        
        const closeIcon = screen.getByRole('icon');     
        // Simulate a click event on the close icon
        fireEvent.click(closeIcon);
        expect(closeIcon).toHaveClass('close-icon')
        
        // Check if setShowDescription was called with false
        expect(mockSetShowDescriptoin).toHaveBeenCalledWith(false);
        expect(mockSetShowDescriptoin).toHaveBeenCalledTimes(1);
    });

  test('renders with provided title and description', () => {
    render(<DescriptionBox setShowDescription={mockSetShowDescriptoin} description={descriptionMock} />);
    
    const titleElement = screen.getByText(/Sample Title/i);
    const descriptionElement = screen.getByText(/sample description/i);
    const closeIcon = screen.getByRole('icon');

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(closeIcon).toBeInTheDocument();
    expect(closeIcon).toHaveClass('close-icon')
  })

  test('applies long-title class when title length is greater than 30 characters', () => {
    const longTitleDescription = {
      title: 'This is a very long title that exceeds thirty characters',
      description: 'This is a description for a long title.',
    };

    render(<DescriptionBox setShowDescription={mockSetShowDescriptoin} description={longTitleDescription} />);

    const titleElement = screen.getByText(/This is a very long title that exceeds thirty characters/i);
    expect(titleElement).toHaveClass('long-title');
  });

  test('renders correctly when description prop is null or undefined', () => {
    render(<DescriptionBox setShowDescription={() => {}} description={null} />);

    expect(screen.queryByText('h1')).not.toBeInTheDocument();
    expect(screen.queryByText('p')).not.toBeInTheDocument();
});

});