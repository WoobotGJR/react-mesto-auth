class Auth {
  constructor() {
    this._baseUrl = "http://localhost:3000";
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
  }

  signIn(email, password) {
    return this._request("/signin", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
    .then(data => { // https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#basics-client-setup
      if (data) {
        localStorage.setItem('jwt', data.token);
        return data.token;
      };
    })
  }

  checkToken(token) {
    return this._request("/users/me", {
      credentials: 'include',
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
