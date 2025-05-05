import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from './NotFound'; 

describe('NotFound Component', () => {
  test('renders the 404 message', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );

    // Check if the "404" heading is rendered
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('404');

    // Check if the "Opps, This Page Not Found" message is rendered
    const subheading = screen.getByRole('heading', { level: 3 });
    expect(subheading).toHaveTextContent('Opps, This Page Not Found');
  });

  test('renders the Go To Home link with correct attributes', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );

    // Check if the "Go To Home" link is rendered
    const link = screen.getByRole('link', { name: /Go To Home/i });
    expect(link).toBeInTheDocument();

    // Check if the link has the correct href attribute
    expect(link).toHaveAttribute('href', '/');
    
    // Check if the link has the correct class names
    expect(link).toHaveClass('btn btn-border');
  });
});