import { fireEvent, render, screen } from "@testing-library/react";
import Slider from "./Slider";
import useScroll from "../../hooks/useScroll";

// Mock the `useScroll` hook
jest.mock('../../Hooks/useScroll');

describe('Slider Compoenent', () => {
  
  const renderSlider = () => {
    render(
      <Slider>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Slider>
    )
  }
  const mockHandleScroll = jest.fn();

  beforeEach(() => {
    useScroll.mockReturnValue({
      handleScroll: mockHandleScroll,
      counter: 0,
      translate: '10px',
      nextButtonDisabled: false,
    });

  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Slider component with default props', () => {
    useScroll.mockReturnValueOnce({translate: '0px'});
    renderSlider()
    // Check if the slider is rendered
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveClass('slider container');
    expect(slider).not.toHaveClass('modal-slider')

    // Check if the content wrapper is rendered
    const contentWrapper = screen.getByRole('content-wrapper');
    expect(contentWrapper).toBeInTheDocument();
    expect(contentWrapper).not.toBeEmptyDOMElement()
    expect(contentWrapper.children).toHaveLength(2);
    expect(contentWrapper.style.transform).toEqual('translate(0px)')
    
    
    expect(contentWrapper).toHaveTextContent('Slide 1');
    expect(contentWrapper).toHaveTextContent('Slide 2')
    // Check if both buttons are rendered
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  test('calls handleScroll when the left button is clicked', () => {
    useScroll.mockReturnValueOnce({
      handleScroll: mockHandleScroll,
      counter: 1,
    });

    renderSlider()
    const leftButton = screen.getAllByRole('button')[0];
    fireEvent.click(leftButton);

    // Ensure that handleScroll is called with 'left'
    expect(mockHandleScroll).toHaveBeenCalledWith('left');
  });

  test('calls handleScroll when the right button is clicked', () => {

    renderSlider()
    const contentWrapper = screen.getByRole('content-wrapper');
    expect(contentWrapper).toHaveStyle('transform: translate(10px)')

    const leftButton = screen.getAllByRole('button')[0];
    expect(leftButton).toBeDisabled()
    
    const rightButton = screen.getAllByRole('button')[1];
    expect(rightButton).not.toBeDisabled()
    fireEvent.click(rightButton);
    expect(mockHandleScroll).toHaveBeenCalledWith('right');
  });

  test('disables the left button when counter is 0', () => {
    renderSlider()
    const leftButton = screen.getAllByRole('button')[0];
    expect(leftButton).toBeDisabled();

    fireEvent.click(leftButton)
    expect(mockHandleScroll).not.toHaveBeenCalled()
  });

  test('disables the right button when nextButtonDisabled Condition is true', () => {
    useScroll.mockReturnValue({nextButtonDisabled: true,});

    renderSlider()
    const rightButton = screen.getAllByRole('button')[1];
    expect(rightButton).toBeDisabled();
    fireEvent.click(rightButton)

    expect(mockHandleScroll).not.toHaveBeenCalled()
  });

  test('applies the correct slider size class', () => {
    render(
      <Slider sliderSize="modal-slider">
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Slider>
    );

    const slider = screen.getByRole('slider');
    expect(slider).toHaveClass('modal-slider');
    expect(slider).not.toHaveClass('slider container');
  });

})