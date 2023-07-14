import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

export default function EditProfilePopup(props) {
  const { values, handleChange, setValues } = useForm({});
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      activity: currentUser.about,
    });
  }, [currentUser, props.isOpen]); // При открытии модального окна могут остаться в полях формы несохраненные данные, которые могли остаться с прошлого открытия формы. Правильным поведением является подставлять данные в поля формы не только при изменении данных пользователя, но и при открытии модального окна, т.е. по изменению флага isOpen.

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateUser({
      newName: values.name,
      newDescription: values.activity,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-edit"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
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
        onChange={handleChange}
        value={values.name || ""} // данные в стейте могут не прогрузиться и в полях ввода значения undefined
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
        onChange={handleChange}
        value={values.activity || ""} // данные в стейте могут не прогрузиться и в полях ввода значения undefined
      />
      <span className="popup__input-error activity-input-error"></span>
    </PopupWithForm>
  );
}
