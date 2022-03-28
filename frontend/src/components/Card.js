import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => (i._id === currentUser._id));

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleConfirmDelete() {
    props.onCardDelete(props.card);
  }

  return ((<li className="element">
      <img className="element__image"
           onClick={handleClick}
           src={props.card.link}
           alt={`Фото: ${props.card.name}`}/>
      <div className="element__description">
        <h2 className="element__caption">{props.card.name}</h2>
        <div className="element__like-section">
          <button type="button"
                  onClick={props.onCardLike}
                  className={`element__like-button ${isLiked && 'element__like-button_active'}`}
                  aria-label="Кнопка лайка фотографии">{}</button>
          <span className="element__likes-qty">{props.card.likes.length}</span>
        </div>
      </div>
      <button type="button"
              onClick={handleConfirmDelete}
              className={`element__trash-button${isOwn ? '' : '_inactive'}`}
              aria-label="Кнопка удаления фотографии">{}</button>
    </li>))
}

export default Card;