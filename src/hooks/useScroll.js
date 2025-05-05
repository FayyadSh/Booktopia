// ------------ React ----------------
import { useState } from "react";

/**
 * Custom hook for managing horizontal scrolling/sliding functionality
 * @param {React.RefObject} contentWrapper - Reference to the container element containing scrollable content
 * @returns {Object} - Object containing scroll control functions and state values
 */
export function useScroll(contentWrapper) {
    // ------------ Slider States ----------------
    const [counter, setCounter] = useState(0); // Tracks current slide position
    
    // ------------ Get The Width For Each Element ----------------
    const lastElement = contentWrapper?.current?.children[contentWrapper?.current?.children?.length - 1];
    const elementWidth = lastElement?.getBoundingClientRect()?.width; // Width of last element
    const rightOfLastElement = lastElement?.getBoundingClientRect()?.right; // Right edge position of last element
    const rightOfSliderContainer = contentWrapper?.current?.parentElement?.getBoundingClientRect()?.right; // Right edge of container

    /**
     * Determines if the slider should display one element per slide
     * Returns true if element width is greater than 300px
     */
    const isSingleElementSlider = elementWidth > 300;

    // ------------ Next Button Disable Condition ----------------
    const nextButtonDisabled = isSingleElementSlider
        ? counter === contentWrapper?.current?.children?.length - 1 // Disabled if at last slide in single element mode
        : rightOfLastElement < rightOfSliderContainer + 100 && counter !== 0; // Disabled when content fits in container

    // ------------ Define Translate Value For Animation ----------------
    const translate = isSingleElementSlider
        ? `${-counter * 100}vw` // Full viewport width translation for single element
        : `${-counter * 30}vw`; // Partial translation for multiple elements

    /**
     * Handles scroll/slide navigation
     * @param {string} dir - Direction to scroll ('right' or left)
     */
    const handleScroll = (dir) => {
        if (dir === 'right') {
            setCounter(prev => prev + 1); // Move to next slide
        } else {
            setCounter(prev => prev - 1); // Move to previous slide
        }
    };

    return {
        handleScroll,       // Function to control scrolling
        counter,           // Current slide position
        translate,         // CSS transform value for sliding animation
        nextButtonDisabled // Boolean indicating if next button should be disabled
    };
}

export default useScroll;