import React from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/auth";

// на будущее, для props можно использовать деструктуризацию. Т.е. вместо props в фигурных скобках писать пропсы, которые сообщены компоненту
export default function Register(props) {
  const style = {
    color: "#fff",
    textDecoration: "none",
  };

  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    auth
      .signUp(formValue.password, formValue.email)
      .then((data) => {
        props.setIsRegistrationSuccess(true);
        props.setRegisterPopupState(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((error) => {
        props.setIsRegistrationSuccess(false);
        props.setRegisterPopupState(true);
        console.log(error);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });

    // console.log(formValue);
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
          value={formValue.email || ""}
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
          value={formValue.password || ""}
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
