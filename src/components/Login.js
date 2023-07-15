import React from "react";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import { useForm } from "../hooks/useForm";

export default function Login(props) {
  const { values, handleChange } = useForm({});
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    auth
      .signIn(values.email, values.password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("email", values.email);
        props.handleLogInState();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="auth-field">
      <h1 className="auth-field__title">Авторизация</h1>
      <form className="auth-field__form" onSubmit={handleSubmit}>
        <input
          className="auth-field__input"
          id="auth-email-input"
          type="email"
          placeholder="Email"
          name="email"
          required
          minLength="2"
          maxLength="40"
          value={values.email || ""}
          onChange={handleChange}
        ></input>
        <input
          className="auth-field__input"
          id="auth-password-input"
          type="password"
          placeholder="Пароль"
          name="password"
          required
          minLength="2"
          maxLength="20"
          value={values.password || ""}
          onChange={handleChange}
        ></input>
        <button className="auth-field__submit-button">Войти</button>
      </form>
    </div>
  );
}
