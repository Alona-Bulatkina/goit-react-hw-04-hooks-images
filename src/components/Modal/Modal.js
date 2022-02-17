import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay, Modal1 } from './Modal.style';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
});

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
    onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
      <ModalOverlay onClick={handleBackdropClick}>
        <Modal1>{children}</Modal1>
      </ModalOverlay>,
      modalRoot,
    );
  };

Modal.defaultProps = {
  children: null,
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
export default Modal;