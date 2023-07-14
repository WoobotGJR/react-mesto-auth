import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup(props) {
  usePopupClose(props.card.link, props.onClose);

  return (
    <div
      className={`popup popup_type_place-popup ${
        props.card ? "popup_opened" : ""
      }`}
    >
      <div className="popup__image-container">
        <img
          className="popup__image"
          src={props.card ? props.card.link : null}
          alt={props.card ? props.card.name : null}
        />
        <h2 className="popup__image-subtitle">
          {props.card ? props.card.name : null}
        </h2>
        <button
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
