import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';


// Класовий компонент Modal
const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose(); // Закриваємо модальне вікно при натисканні кнопки Escape
      }
    };

    window.addEventListener('keydown', handleKeyDown); // Добавляємо обробник стану натискання клавіатури
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Видалення обробника стану натискання клавіатури
      document.body.style.overflow = 'visible';
    };
  }, [onClose]);


  // Обробнику при нитисканні на модальне вікно
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose(); // Закриваємо модальне вікно при натисканні на фон
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <Overlay onClick={handleBackdropClick}>
          <ModalWindow>
            <img src={largeImageURL} alt={tags} />
          </ModalWindow>
        </Overlay>
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

