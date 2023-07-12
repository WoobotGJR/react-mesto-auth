class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this.headers,
      method: "GET", // метод по умолчанию, однако для наглядности указан
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this.headers,
      method: "GET",
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  setUserInfo({ username, userInfo }) {
    return fetch(this._baseUrl + "/users/me", {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        name: username,
        about: userInfo,
      }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  setUserAvatar({ avatar }) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  addUserCard({ link, name }) {
    return fetch(this._baseUrl + "/cards", {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        link: link,
        name: name,
      }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  deleteUserCard(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      headers: this.headers,
      method: "DELETE",
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  changeLikeCardStatus(cardId, likeState) {
    if (likeState) {
      return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
        headers: this.headers,
        method: "PUT",
      }).then((res) => {
        return this._checkResponseStatus(res);
      });
    } else {
      return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
        headers: this.headers,
        method: "DELETE",
      }).then((res) => {
        return this._checkResponseStatus(res);
      });
    }
  }

  // setLike(cardId) {
  //     return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
  //         headers: this.headers,
  //         method: "PUT"
  //     })
  //     .then(res => {return this._checkResponseStatus(res)})
  // }

  // deleteLike(cardId) {
  //     return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
  //         headers: this.headers,
  //         method: "DELETE"
  //     })
  //     .then(res => {return this._checkResponseStatus(res)})
  // }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "5543044c-fd15-4f3f-9950-66b2e3519db9",
    "Content-Type": "application/json",
  },
});

export default api;
