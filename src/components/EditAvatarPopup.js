import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    // Очищать поля форм нужно при открытии, а не при сабмите, иначе, в случае ошибки на сервере, форма останется открытой, но ее поля уже будут очищены и пользователь не сможет повторить попытку отправки данных.
    inputRef.current.value = ""; // Для очистки поля ввода нужно использовать '' а не null. Поля ввода имеют строковый тип данных.
  }, [props.isOpen, inputRef]);

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateAvatar({
      newAvatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-edit"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpened={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_avatar-link-text"
        ref={inputRef || ""}
        id="avatar-link-input"
        type="url"
        placeholder="Ссылка на картинку..."
        name="avatar"
        required
      />
      <span className="popup__input-error avatar-link-input-error"></span>
    </PopupWithForm>
  );
}
