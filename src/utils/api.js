class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(
      this._checkResponseStatus
    ); // при такой записи ответ от сервера будет записываться в аргументы функции _checkResponseStatus
  }

  getInitialCards() {
    return this._request("/cards", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  }

  getUserInfo() {
    return this._request("/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  }

  setUserInfo({ username, userInfo }) {
    return this._request("/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        name: username,
        about: userInfo,
      }),
    });
  }

  setUserAvatar({ avatar }) {
    return this._request("/users/me/avatar", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  addUserCard({ link, name }) {
    return this._request("/cards", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        link: link,
        name: name,
      }),
    });
  }

  deleteUserCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  }

  changeLikeCardStatus(cardId, likeState) {
    if (likeState) {
      return this._request(`/cards/${cardId}/likes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
    } else {
      return this._request(`/cards/${cardId}/likes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
    }
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
const api = new Api({
  baseUrl: "http://localhost:3000",
});

export default api;
