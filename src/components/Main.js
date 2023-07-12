import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Фото профиля"
          />
          <button
            className="profile__avatar-overlay"
            type="button"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info-grid">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__activity">{currentUser.about}</p>
          <button
            className="profile__edit-button"
            type="button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => {
          return (
            <Card
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              key={card._id}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
