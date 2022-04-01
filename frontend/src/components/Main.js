import Card from './Card.js';
import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (<main className="content page__content">
      <section className="profile content__profile">
        <div className="profile__avatar-container"
             onClick={props.onEditAvatar}>
          <img className="profile__avatar"
               src={currentUser.avatar}
               alt="Фото-аватар"/></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button type="button"
                  className="profile__edit-button"
                  aria-label="Кнопка редактирования профиля"
                  onClick={props.onEditProfile}>{}</button>
        </div>
        <button type="button"
                className="profile__add-button"
                aria-label="Кнопка добавления фотографий"
                onClick={props.onAddPlace}>{}</button>
      </section>
      <section className="elements-section content__elements-section"
               aria-label="Фоторамка">
        <ul className="elements">
          {props.cards.map(item => <Card key={item._id}
                                         card={item}
                                         onCardClick={props.onCardClick}
                                         onCardLike={() => props.onCardLike(item)}
                                         onCardDelete={() => props.onCardDelete(item)}/>)}
        </ul>
      </section>
    </main>)
}

export default Main