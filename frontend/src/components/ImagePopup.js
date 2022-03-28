import {useEffect} from 'react';

function ImagePopup({card, onClose, isOpen}) {

  useEffect(()=>{
    if (!isOpen) return;
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return ()=>{
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen, onClose])


  function handleOverlayClose(e) {
    if (e.target === e.currentTarget && isOpen) {
      onClose();
    }
  }

  return (
    <div className={`popup popup_type_image-view ${card ? 'popup_opened' : ''}`}
         onClick={handleOverlayClose}>
      <div className="popup__container popup__container_type_image-view">
        <button type="button" onClick={onClose}
                className="popup__close-button popup__close-button_type_image-view"
                aria-label="Кнопка закрытия модального окна просмотра фотографий">{}</button>
        <figure className="popup__image-container">
          <img src={card? card.link : ''}
               alt={card? card.name : ''}
               className="popup__image"/>
          <figcaption className="popup__image-caption">{card? card.name : ''}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;