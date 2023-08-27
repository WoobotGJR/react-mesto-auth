import React from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import { useForm } from "../hooks/useForm";

// на будущее, для props можно использовать деструктуризацию. Т.е. вместо props в фигурных скобках писать пропсы, которые сообщены компоненту
export default function Register(props) {
  const { values, handleChange } = useForm({});
  const style = {
    color: "#fff",
    textDecoration: "none",
  };

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    auth
      .signUp(values.password, values.email)
      .then((data) => {
        props.setIsRegistrationSuccess(true);
        navigate("/signin", { replace: true });
      })
      .catch((error) => {
        props.setIsRegistrationSuccess(false);
        console.log(error);
      })
      .finally(() => {
        props.setRegisterPopupState(true); // лучше поместить в блоке finally, чтобы не дублировать в then и catch.
      });
  }

  return (
    <div className="register-field">
      <h1 className="register-field__title">Регистрация</h1>
      <form className="register-field__form" onSubmit={handleSubmit}>
        <input
          className="register-field__input"
          id="register-email-input"
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
          className="register-field__input"
          id="register-password"
          type="password"
          placeholder="Пароль"
          name="password"
          required
          minLength="2"
          maxLength="20"
          value={values.password || ""}
          onChange={handleChange}
        ></input>
        <button className="register-field__submit-button">
          Зарегистрироваться
        </button>
      </form>
      <div className="register-field__redirect-link-container">
        <p>Уже зарегистрированы?</p>
        <Link
          to="/sign-in"
          style={style}
          className="register-field__redirect-link"
        >
          Войти
        </Link>
      </div>
    </div>
  );
}
