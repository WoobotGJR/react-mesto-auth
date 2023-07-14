import successImage from "../images/SuccessImage.png";
import failImage from "../images/FailImage.png";
import { usePopupClose } from "../hooks/usePopupClose";

export default function InfoTooltip(props) {
  usePopupClose(props.isOpened, props.onClose);

  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpened ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_type_edit">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__registration-status-image"
          alt={
            props.isRegistrationSuccess
              ? "Изображение успешной регистрации"
              : "Изображение провалившейся регистрации"
          }
          src={props.isRegistrationSuccess ? successImage : failImage}
        ></img>
        <h2 className="popup__title" style={{ textAlign: "center" }}>
          {props.isRegistrationSuccess
            ? "Вы успешно зарегистрировались"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}
