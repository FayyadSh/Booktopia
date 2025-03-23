import { fireEvent, render ,screen } from "@testing-library/react";
import Hero from "./Hero";
import { BrowserRouter as Router } from "react-router-dom";
import { heroContent } from '../../data/data';

describe('', () => {

  beforeEach(() => {
    render(<Hero />, {wrapper: Router})
  })

  test('Should Show 4 Images In Hero Section', async () => {
    const heroImages = screen.getAllByRole('img')
    expect(heroImages).toHaveLength(4)
  });

  test('renders hero shape image with correct src and alt', () => {
    const heroShapeImage = screen.getByAltText('hero shape');

    expect(heroShapeImage).toBeInTheDocument();
    expect(heroShapeImage).toHaveClass('hero-shape');
    expect(heroShapeImage).toHaveAttribute('src', expect.stringContaining('header-shape.svg'));
  });

  test("renders hero title", () => {
  
    // Check if the hero titles have the correct class
    const heroTitles = screen.getAllByRole("heading", { level: 1 });
    heroTitles.forEach((title) => {
      expect(title).toHaveClass("hero-title");
      expect(title).toHaveTextContent(title.textContent)
    });

  });

  test("renders link with correct attributes", () => {
    
    const learnMoreLinks = screen.getAllByRole("link", { name: /learn more/i });
    expect(learnMoreLinks.length).toBe(heroContent.length);

    learnMoreLinks.forEach((link) => {
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass('btn btn-border');
      expect(link).toHaveAttribute('href', '/');
    });
  });
  
  test("images inside the slider have the correct alt text and css class", () => {
    const images = screen.getAllByAltText("hero image");

    images.forEach((image,index) => {
      expect(image).toHaveAttribute("alt", "hero image");
      expect(image).toHaveAttribute("src", heroContent[index].image);
      expect(image).toHaveClass("hero-image");
    });

  });

  test('renders correctly at different screen sizes', () => {
    // Simulate mobile size
    window.innerWidth = 320;  

    const heroSection = screen.getByRole('banner');
    expect(heroSection).toHaveClass("hero");

    window.innerWidth = 1024;  
    // Simulate tablet/desktop size
    fireEvent(window, new Event('resize'));
    expect(heroSection).toBeInTheDocument();
  });

});