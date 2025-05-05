import { render, screen, fireEvent } from '@testing-library/react';
import ModalContainer from './ModalContainer';

describe('ModalContainer Component', () => {

  const mockCloseModal = jest.fn()

  const renderModalContainer = () => {
    render(
      <ModalContainer openModal={true} closeModal={mockCloseModal}>
        <div>Modal Content</div>
      </ModalContainer>
    );
  }

  test('renders children correctly', () => {
    renderModalContainer()

    // Assert that the children are rendered
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('is visible when openModal is true', () => {
    renderModalContainer()

    // Assert that the modal container is visible
    const modalContainer = screen.getByTestId('modal-container');
    expect(modalContainer).toHaveStyle('visibility: visible');
  });

  test('is hidden when openModal is false', () => {
    render(
        <ModalContainer openModal={false} closeModal={() => {}}>
          <div>Modal Content</div>
        </ModalContainer>
      );

    // Assert that the modal container is hidden
    const modalContainer = screen.getByTestId('modal-container');
    expect(modalContainer).toHaveStyle('visibility: hidden');
  });

  test('closeModal is called when clicking on the close icon', () => {
    renderModalContainer()

    // Click the close icon
    const closeIcon = screen.getByTestId('close-icon');
    fireEvent.click(closeIcon);

    // Assert that closeModal was called
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  test('closeModal is called when clicking outside the modal content', () => {
    renderModalContainer()

    // Click outside the modal content
    const modalContainer = screen.getByTestId('modal-container');
    fireEvent.click(modalContainer);

    // Assert that closeModal was called
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  test('does not call closeModal when clicking inside the modal content', () => {
    const closeModal = jest.fn();

    render(
      <ModalContainer openModal={true} closeModal={closeModal}>
        <div>Modal Content</div>
      </ModalContainer>
    );

    // Click inside the modal content
    const modalContent = screen.getByText('Modal Content');
    fireEvent.click(modalContent);

    // Assert that closeModal was not called
    expect(closeModal).not.toHaveBeenCalled();
  });

  test('modal content scale changes based on openModal prop', () => {
    const { rerender } = render(
        <ModalContainer openModal={true} closeModal={() => {}}>
            <div>Modal Content</div>
        </ModalContainer>
    )

    const modalContent = screen.getByText('Modal Content').parentElement;
    expect(modalContent.style.scale).toBe('1.1');
    
    // when openModal is false
    rerender(
        <ModalContainer openModal={false} closeModal={() => {}}>
            <div>Modal Content</div>
        </ModalContainer>
    )

    expect(modalContent.style.scale).toBe('0');
  });

});