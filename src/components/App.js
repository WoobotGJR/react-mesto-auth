import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isRegistrationSuccessPopupOpen, setIsRegistrationSuccessPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({}); // Установка значения null приводит к ошибкам, описывать весь объект с занулёнными значениями не самый лучший способ, поэтому был передан пустой объект
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] =
    React.useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, initialCards]) => {
          console.log(`getUserInfo returned id - ${userInfo.data._id}`);
          setCards([...initialCards.data].reverse());
          setCurrentUser(userInfo.data)
        })
        .catch(err => console.log(`Initital cards or initial user data loading error - ${err}`))
      }
  }, [loggedIn]);

  const handleTokenCheck = () => {
    auth
      .checkToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch(console.log);
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        ); // Необходимо дополнительно разобраться с конструкцией коллбэков
      })
      .catch((err) => {
        console.log(`card like toggle error - ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteUserCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id)); // Если взять выражение после второй стрелочной функции в скобки, то произойдёт ошибка
      }) // Expected an assignment or function call and instead saw an expression
      .catch((err) => {
        console.log(`card delete error - ${err}`);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
    // console.log("avatar-edit-popup - opened", isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    // console.log("edit-popup - opened")
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
    // console.log("add-place-popup - opened")
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsRegistrationSuccessPopupOpen(false);
    setSelectedCard("");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser({ newName, newDescription }) {
    function makeRequest() {
      return api
        .setUserInfo({ username: newName, userInfo: newDescription })
        .then((res) => {
          setCurrentUser(res.data)
        });
    }

    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar({ newAvatar }) {
    function makeRequest() {
      return api
        .setUserAvatar({ avatar: newAvatar })
        .then((res) => {
          setCurrentUser(res.data)
        });
    }

    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit({ link, placeName }) {
    function makeRequest() {
      return api.addUserCard({ link: link, name: placeName }).then((card) => {
        setCards([card.data, ...cards]);
      });
    }

    handleSubmit(makeRequest);
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
    navigate("/signin", { replace: true });
  }

  function handleLogIn(email, password) {
    auth
      .signIn(email, password)
      .then((data) => {
        localStorage.setItem('email', email);
        setLoggedIn(true);

        auth.checkToken(data)
          .then((res) => {
            handleLogIn();
            navigate("/", { replace: true });
            console.log(`checkToken returned id - ${res.data._id}`);
          })
          .catch(console.log);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={currentUser.email} onLogOut={handleLogOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main} // Стоит обращать внимание на то, что передаётся в качестве элемента
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
              />
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Register
                setRegisterPopupState={setIsRegistrationSuccessPopupOpen}
                setIsRegistrationSuccess={setIsRegistrationSuccess}
              />
            }
          />
          <Route
            path="/signin"
            element={<Login handleLogIn={handleLogIn} />}
          ></Route>
          <Route path="*" element={<Navigate to="/signin" replace />}></Route>
        </Routes>
        <Footer />
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        handleSubmit={handleAddPlaceSubmit}
        isLoading={isLoading}
      />
      <PopupWithForm title="Вы уверены?" name="card-delete" buttonText="Да" />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpened={setSelectedCard}
      />
      <InfoTooltip
        name="tooltip"
        onClose={closeAllPopups}
        isOpened={isRegistrationSuccessPopupOpen}
        isRegistrationSuccess={isRegistrationSuccess}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
