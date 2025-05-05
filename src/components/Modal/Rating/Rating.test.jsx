import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import Rating from './Rating'; // Adjust the path as needed

describe('Rating Component', () => {

    const getStarElements = () => screen.getAllByTestId('rating-star');

    test('renders 5 empty stars when rating is 0', () => {
        render(<Rating rating={0} />);
        const stars = getStarElements()
        expect(stars).toHaveLength(5);
        stars.forEach(star => {
            expect(star).toHaveClass('BsStar');
        });

    });

    test('renders 5 stars filled when rating is 1', () => {
        render(<Rating rating={1} />);
        const stars = getStarElements()
        expect(stars).toHaveLength(5);
        for (let i = 0; i < 5; i++) {
            expect(stars[i]).toHaveClass('BsStarFill');
        }
    });

    test('renders a combination of filled and half stars when rating is 0.5', () => {
        render(<Rating rating={0.5} />);
        const stars = getStarElements()
        expect(stars).toHaveLength(5);
        expect(stars[0]).toHaveClass('BsStarFill');
        expect(stars[1]).toHaveClass('BsStarFill');
        expect(stars[2]).toHaveClass('BsStarHalf');
        for (let i = 3; i < 5; i++) {
            expect(stars[i]).toHaveClass('BsStar');
        }
    })


    test('renders 5 empty stars when rating is 0', () => {
        screen.debug()
        render(<Rating rating={0} />);
        const stars = getStarElements();
        expect(stars).toHaveLength(5);
        stars.forEach(star => expect(star).toHaveClass('BsStar'));
    });

    test('renders 1 full star and 4 empty stars when rating is 0.2', () => {
        render(<Rating rating={0.2} />);
        const stars = getStarElements();
        expect(stars).toHaveLength(5);
        expect(stars[0]).toHaveClass('BsStarFill');
        for (let i = 1; i < 5; i++) {
            expect(stars[i]).toHaveClass('BsStar');
        }
    });

    test('renders 2 full stars and 3 empty stars when rating is 0.4', () => {
        render(<Rating rating={0.4} />);
        const stars = getStarElements();
        expect(stars).toHaveLength(5);
        expect(stars[0]).toHaveClass('BsStarFill');
        expect(stars[1]).toHaveClass('BsStarFill');
        for (let i = 2; i < 5; i++) {
            expect(stars[i]).toHaveClass('BsStar');
        }
    });

    test('renders 2 full stars and 1 half star when rating is 0.5', () => {
        render(<Rating rating={0.5} />);
        const stars = getStarElements();
        expect(stars).toHaveLength(5);
        expect(stars[0]).toHaveClass('BsStarFill');
        expect(stars[1]).toHaveClass('BsStarFill');
        expect(stars[2]).toHaveClass('BsStarHalf');
        for (let i = 3; i < 5; i++) {
            expect(stars[i]).toHaveClass('BsStar');
        }
    });

    test('renders 3 full stars and 1 half star and 1 empty star when rating is 0.7', () => {
        render(<Rating rating={0.7} />);
        const stars = getStarElements();
        expect(stars).toHaveLength(5);
        expect(stars[0]).toHaveClass('BsStarFill');
        expect(stars[1]).toHaveClass('BsStarFill');
        expect(stars[2]).toHaveClass('BsStarFill');
        expect(stars[3]).toHaveClass('BsStarHalf');
        expect(stars[4]).toHaveClass('BsStar');
    });

    test('renders 4 full stars and 1 half star when rating is 0.9', () => {
        render(<Rating rating={0.9} />);
        const stars = getStarElements();
        expect(stars).toHaveLength(5);
        expect(stars[0]).toHaveClass('BsStarFill');
        expect(stars[1]).toHaveClass('BsStarFill');
        expect(stars[2]).toHaveClass('BsStarFill');
        expect(stars[3]).toHaveClass('BsStarFill');
        expect(stars[4]).toHaveClass('BsStarHalf');
    });

    test('renders 5 full stars when rating is 1', () => {
        render(<Rating rating={1} />);
        const stars = getStarElements();
        expect(stars).toHaveLength(5);
        stars.forEach(star => expect(star).toHaveClass('BsStarFill'));
    });

    test('handles out of range values gracefully', () => {
        render(<Rating rating={-0.1} />);
        const stars = getStarElements();
        expect(stars).toHaveLength(5);
        stars.forEach(star => expect(star).toHaveClass('BsStar'));

        render(<Rating rating={1.5} />);
        const starsHigh = getStarElements();
        // starsHigh.forEach(star => expect(star).toHaveClass('BsStarFill'));
    });
});