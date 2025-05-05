//---   CSS ----------------------------------------------------
import "./ModalContainer.css";
//---   React Icons ----------------------------------------------------
import { RiCloseCircleFill } from "react-icons/ri";

const ModalContainer = ({children, closeModal, openModal}) => {
  return (
    <div className="modal-container"
      style={{ visibility: openModal ? "visible" : "hidden" }}
      onClick={() => closeModal()}
      data-testid='modal-container'
    >
      <div className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ scale: openModal ? "1.1" : "0" }}
      >
        <RiCloseCircleFill className="close-icon" 
          onClick={() => closeModal()}
          data-testid='close-icon'
        />

        {children}

      </div>
    </div>
  );
};

export default ModalContainer;