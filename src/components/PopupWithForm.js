import React from "react";
import { usePopupClose } from "../hooks/usePopupClose.js";

function PopupWithForm(props) {
  usePopupClose(props.isOpened, props.onClose);

  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpened ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_type_form">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          action="#"
          name={`${props.name}-popup-form`}
          onSubmit={props.onSubmit}
          // noValidate
        >
          {props.children}
          <button className="popup__submit-button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
