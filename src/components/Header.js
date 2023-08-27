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
      {location.pathname === "/signup" && (
        <div className="header__container">
          <NavLink className="header__navigation" style={style} to="/signin">
            Войти
          </NavLink>
        </div>
      )}
      {location.pathname === "/signin" && (
        <div className="header__container">
          <NavLink className="header__navigation" style={style} to="/signup">
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
            to="/signin"
            onClick={props.onLogOut}
          >
            Выйти
          </NavLink>
        </div>
      )}
    </header>
  );
}

// если не пользоваться location.path, то можно сделать подобный функционал другим способом

// {
/* <Route exact path="/">
<div className="header__wrapper">
  <p className="header__user">{email}</p>
  <button className="header__logout" onClick={handleSignOut}>
    Выйти
  </button>
</div>
</Route>
<Route path="/signup">
<Link className="header__auth-link" to="signin">
  Войти
</Link>
</Route>
<Route path="/signin">
<Link className="header__auth-link" to="signup">
  Регистрация
</Link>
</Route> */
// }

export default Header;
