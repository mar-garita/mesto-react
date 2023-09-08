import React from "react";

import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";

import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


export default function App() {
    // Переменные состояния, отвечающие за видимость попапов с формой
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    // Переменная состояния, отвечает за видимость попапа с картинкой
    const [selectedCard, setSelectedCard] = React.useState(null);

    // Переменная состояния, отвечающая за информацию о пользователе
    const [currentUser, setCurrentUser] = React.useState('');

    // Переменная состояния, отвечающая за карточки
    const [cards, setCards] = React.useState([]);

    // Хук useEffect вызывает колбэк (получающий с сервера данные о всех карточках)
    // после того, как компонент Main будет смонтирован
    React.useEffect(() => {
        api.getInitialCards()
            .then(data => {
                setCards(data)
            })
            .catch(err => console.log(err));
    }, [])

    // Пропс, который закрывает все попапы
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    }

    // Хук useEffect вызывает колбэк (получающий с сервера данные пользователя)
    // после того, как компонент App будет смонтирован
    React.useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }, [])


    //------------------ Обработчики событий, открывающие попапы ---------------------//

    // Попапы с формой
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    // Попап с картинкой
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    //------------------------------- Обработчик событий -----------------------------------//


    // Лайк/дизлайк
    function handleCardLike(card) {
        // Проверка, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(card => card._id === currentUser._id);

        // Отправка запроса в API и получение обновлённых данных карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then(newCard => {
                console.log(cards)
                setCards(state => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.error(err));
    }

    // Обновление профиля пользователя
    function handleUpdateUser(newUserData) {
        // newUserData – объект вида {name: 'userName', about: 'userDescription'}
        api.updateProfile(newUserData)
            .then(data => {
                setCurrentUser(data)
            })
            .catch(err => console.error(err));
    }

    // Обновление аватара пользователя
    function handleUpdateAvatar(newAvatar) {
        // newUserData – объект вида {avatar: 'https://pictures.com'}
        api.updateAvatar(newAvatar)
            .then(data => {
                setCurrentUser(data)
            })
            .catch(err => console.error(err));
    }


    return (
        // «Внедряем» данные из contexts с помощью провайдера контекста
        <CurrentUserContext.Provider value={currentUser}>
            {/* Поддерево, в котором будет доступен контекст */}

            <div className="App">
                <div className="page">
                    <Header />
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        cards={cards}
                    />
                    <Footer />
                </div>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />


                <PopupWithForm
                    name="add-card"
                    title="Новое место"
                    buttonText="Создать"
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                >
                    <input type="text" name="title" id="input-title" className="popup__input" placeholder="Название" required minLength="2" maxLength="30"/>
                    <span className="popup__error popup__input-title-error"/>
                    <input type="url" name="link" id="input-link" className="popup__input" placeholder="Ссылка на картинку" required/>
                    <span className="popup__error popup__input-link-error"/>
                </PopupWithForm>

                <PopupWithForm
                    name="confirm-delete-card"
                    title="Вы уверены?"
                    onClose={closeAllPopups}
                >
                </PopupWithForm>

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    )
}
