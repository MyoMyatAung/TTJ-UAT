import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  containerStyle?: React.CSSProperties;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, containerStyle }) => {
  // If the modal isn't open, we don't render anything.
  if (!isOpen) {
    return null;
  }

  // If modalRoot is not found, don't render the modal.
  if (!modalRoot) {
    return null;
  }

  // Use createPortal to render the modal content into the modal-root div.
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-container" style={containerStyle}>
        {children}
      </div>
    </div>,
    modalRoot // This is where the modal content is rendered
  );
};

export default Modal;