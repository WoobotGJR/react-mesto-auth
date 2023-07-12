class Auth {
  constructor() {
    this.BASE_URL = "https://auth.nomoreparties.co";
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  signUp(password, email) {
    return fetch(`${this.BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((response) => {
      return this._checkResponseStatus(response); // При использовании подобной проверки, в особенности, когда результат запроса используется или обрабатывается в другом компоненте, обязательно писать return
    });
  }

  signIn(email, password) {
    return fetch(`${this.BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((response) => {
      return this._checkResponseStatus(response);
    });
  }

  checkToken(token) {
    return fetch(`${this.BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      return this._checkResponseStatus(response);
    });
  }
}

const auth = new Auth();

export default auth;
