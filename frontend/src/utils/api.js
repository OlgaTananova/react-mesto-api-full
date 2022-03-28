/*** Класс Api для сетевых запросов ***/

class Api {
  constructor({baseURL, headers}) {
    this._URL = baseURL;
    this._headers = headers;
    this._jwt = localStorage.getItem('jwt');
  }

  _handleError(res, errorText) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${errorText}. Статус ошибки: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._URL + '/users/me', {
      method: 'GET', headers: this._headers,
    })
      .then((res) => {
        return this._handleError(res, 'Ошибка, не удалось загрузить данные пользователя');
      });
  }


  getInitialCards() {
    return fetch(this._URL + '/cards', {
      method: 'GET', headers: this._headers,
    })
      .then(res => {
        return this._handleError(res, 'Ошибка, не удалось загрузить карточки')
      });
  }

  editProfile({name, description}) {
    return fetch(this._URL + '/users/me', {
      method: 'PATCH', headers: this._headers, body: JSON.stringify({
        name: name, about: description
      })
    })
      .then(res => {
        return this._handleError(res, 'Ошибка, не удалось обновить профиль пользователя')
      });
  }

  updateUserAvatar(avatarLink) {
    return fetch(this._URL + '/users/me/avatar', {
      method: "PATCH", headers: this._headers, body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(res => {
        return this._handleError(res, 'Ошибка, не удалось обновить аватар пользователя')
      });
  }

  addNewCard({name, link}) {
    return fetch(this._URL + '/cards', {
      method: 'POST', headers: this._headers, body: JSON.stringify({
        name: name, link: link
      })
    })
      .then(res => {
        return this._handleError(res, 'Ошибка, не удалось добавить карточку')
      });
  }

  deleteCard(cardId) {
    return fetch(this._URL + '/cards/' + cardId, {
      method: 'DELETE', headers: this._headers,
    })
      .then(res => {
        return this._handleError(res, 'Ошибка, не удалось удалить карточку')
      });
  }

  likeCard(cardId) {
    return fetch(this._URL + '/cards/' + cardId + '/likes/', {
      method: 'PUT', headers: this._headers,
    })
      .then(res => {
        return this._handleError(res, 'Ошибка, не удалось поставить лайк карточке')
      });
  }

  dislikeCard(cardId) {
    return fetch(this._URL + '/cards/' + cardId + '/likes/', {
      method: 'DELETE', headers: this._headers,
    })
      .then(res => {
        return this._handleError(res, 'Ошибка, не удалось удалить лайк карточки')
      });
  }
}
//Экземпляр класса Api для сетевых запросов
export const api = new Api({
  baseURL: 'http://api.mestobyolga.nomoredomains.work',
  headers: {
    // "Authorization" : `Bearer ${this._jwt}`,
    'Content-Type': 'application/json'
  }
});
