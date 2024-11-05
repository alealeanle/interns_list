import ModalFade from '@commons/ModalFade';
import s from './Modal.module.scss';

const Modal = ({ children, isOpen, closeModal }) => {
  const handleCloseModal = () => {
    closeModal(false);
  };

  const contentClick = e => {
    e.stopPropagation();
  };

  return (
    <ModalFade isOpen={isOpen}>
      <div className={s.modal} onClick={handleCloseModal}>
        <div className={s.modalContent} onClick={contentClick}>
          {children}
        </div>
      </div>
    </ModalFade>
  );
};

export default Modal;
