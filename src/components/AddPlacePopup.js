import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

export default function AddPlacePopup(props) {
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    setValues({}); // Была ошибка, связанная с тем, что для обнуления была передана строка, а не пустой объект
  }, [props.isOpen]); // Очищение полей при изменении стейта, отвечающего за появление модального окна

  function handleSubmit(event) {
    event.preventDefault(); 

    props.handleSubmit({ link: values.link, placeName: values.name });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="place-add"
      buttonText={props.isLoading ? "Создание..." : "Создать"}
      isOpened={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_place-name-text"
        onChange={handleChange}
        value={values.name || ""}
        id="place-name-input"
        type="text"
        placeholder="Название..."
        name="name"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__input-error place-name-input-error"></span>
      <input
        className="popup__input popup__input_image-link-text"
        onChange={handleChange}
        value={values.link || ""}
        id="url-input"
        type="url"
        placeholder="Ссылка на картинку..."
        name="link"
        required
      />
      <span className="popup__input-error url-input-error"></span>
    </PopupWithForm>
  );
}
