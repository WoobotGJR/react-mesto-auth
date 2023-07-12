import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); // При открытии модального окна могут остаться в полях формы несохраненные данные, которые могли остаться с прошлого открытия формы. Правильным поведением является подставлять данные в поля формы не только при изменении данных пользователя, но и при открытии модального окна, т.е. по изменению флага isOpen.

  function handleNameInput(event) {
    setName(event.target.value);
    // console.log(name)
  }

  function handleDescriptionInput(event) {
    setDescription(event.target.value);
    // console.log(description)
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateUser({ newName: name, newDescription: description });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-edit"
      buttonText="Сохранить"
      isOpened={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name-text"
        id="profile-name-input"
        type="text"
        placeholder="Введите своё имя..."
        name="name"
        required
        minLength="2"
        maxLength="40"
        onChange={handleNameInput}
        value={name || ""} // данные в стейте могут не прогрузиться и в полях ввода значения undefined
      />
      <span className="popup__input-error profile-name-input-error"></span>
      <input
        className="popup__input popup__input_activity-text"
        id="activity-input"
        type="text"
        placeholder="Введите свою должность..."
        name="activity"
        required
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionInput}
        value={description || ""} // данные в стейте могут не прогрузиться и в полях ввода значения undefined
      />
      <span className="popup__input-error activity-input-error"></span>
    </PopupWithForm>
  );
}
