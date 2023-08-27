import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(
    (id) => id === currentUser._id
  );
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
    console.log(props.card.owner, currentUser._id);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      {isOwn && (
        <button
          className="element__delete-button"
          onClick={handleCardDelete}
        ></button>
      )}
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="element__bottom-panel">
        <h2 className="element__subtitle">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <div className="element__like-counter">{props.card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;
