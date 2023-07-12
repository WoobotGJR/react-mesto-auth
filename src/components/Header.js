// import { Children } from "react";
import { NavLink, useLocation } from "react-router-dom";
import siteLogo from "../images/header-logo.svg";

function Header(props) {
  const location = useLocation();

  const style = {
    color: "#fff",
    textDecoration: "unset",
  };

  const exitButtonStyle = {
    color: "rgba(169, 169, 169, 1)",
    textDecoration: "unset",
    lineWeight: "400",
  };

  return (
    <header className="header">
      <img className="header__logo" src={siteLogo} alt="Логотип сайта" />
      {location.pathname === "/sign-up" && (
        <div className="header__container">
          <NavLink className="header__navigation" style={style} to="/sign-in">
            Войти
          </NavLink>
        </div>
      )}
      {location.pathname === "/sign-in" && (
        <div className="header__container">
          <NavLink className="header__navigation" style={style} to="/sign-up">
            Регистрация
          </NavLink>
        </div>
      )}
      {location.pathname === "/" && (
        <div className="header__container">
          <div className="header__user-email">
            {localStorage.getItem("email")}
          </div>
          <NavLink
            className="header__navigation"
            style={exitButtonStyle}
            to="/sign-in"
            onClick={props.onLogOut}
          >
            Выйти
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
