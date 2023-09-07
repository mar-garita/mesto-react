import React from "react";

import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
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
            .catch(err => {
                console.log(err);
            });
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
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    //------------------ Обработчики событий (открывают попапы с формами) ---------------------//

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    //------------------------------- Обработчик событий -----------------------------------//

    // Открывает попап с картинкой
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    // Лайк/дизлайк
    function handleCardLike(card) {
        // Проверка, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(card => card._id === currentUser._id);

        // Отправка запроса в API и получение обновлённых данных карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then(newCard => {
                console.log(cards)
                setCards(state => state.map((c) => c._id === card._id ? newCard : c));
        });
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

                <PopupWithForm
                    name="edit-profile"
                    title="Редактировать профиль"
                    buttonText="Сохранить"
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                >
                    <input type="text" name="name" id="input-name" className="popup__input" placeholder="Введите имя" required minLength="2" maxLength="40"/>
                    <span className="popup__error popup__input-name-error"/>
                    <input type="text" name="about" id="input-about" className="popup__input" placeholder="Введите информацию" required minLength="2" maxLength="40"/>
                    <span className="popup__error popup__input-about-error"/>
                </PopupWithForm>

                <PopupWithForm
                    name="edit-avatar"
                    title="Обновить аватар"
                    buttonText="Сохранить"
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                >
                    <input type="url" name="link" id="input-avatar" className="popup__input" placeholder="Ссылка на аватар" required/>
                    <span className="popup__error popup__input-avatar-error"/>
                </PopupWithForm>

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
