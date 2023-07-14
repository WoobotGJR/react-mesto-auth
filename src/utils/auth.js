class Auth {
  constructor() {
    this._baseUrl = "https://auth.nomoreparties.co";
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

  signUp(password, email) {
    return this._request("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
    // return fetch(`${this.BASE_URL}/signup`, { // фрагмент оставлен из за комментария
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     password: password,
    //     email: email,
    //   }),
    // }).then((response) => {
    //   return this._checkResponseStatus(response); // При использовании подобной проверки, в особенности, когда результат запроса используется или обрабатывается в другом компоненте, обязательно писать return
    // });
  }

  signIn(email, password) {
    return this._request("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
  }

  checkToken(token) {
    return this._request("/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const auth = new Auth();

export default auth;
