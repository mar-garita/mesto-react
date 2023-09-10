import React from "react";

import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ConfirmationPopup from "./ConfirmationPopup";

import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


export default function App() {
    // ----------------------------- Переменные состояния ---------------------------- //

    // Отвечают за видимость попапов с формой
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);

    // Отвечает за видимость попапа с картинкой
    const [selectedCard, setSelectedCard] = React.useState(null);

    // Индикатор загрузки запросов для кнопки сабмита в попапах
    const [isLoadingAddPlace, setIsLoadingAddPlace] = React.useState(false);
    const [isLoadingEditAvatar, setIsLoadingEditAvatar] = React.useState(false);
    const [isLoadingEditProfile, setIsLoadingEditProfile] = React.useState(false);

    // Отвечает за информацию о пользователе
    const [currentUser, setCurrentUser] = React.useState({});

    // Отвечает за список карточек
    const [cards, setCards] = React.useState([]);
    // Отвечает за карточку, выбранную для удаления
    const [cardToDelete, setCardToDelete] = React.useState({});


    // useEffect вызывает колбэк (получающий с сервера данные пользователя и данные карточек)
    // после того, как компонент App будет смонтирован
    React.useEffect(() => {
        Promise.all([
            api.getInitialCards(),
            api.getUserInfo()
        ])
        .then(([cards, user]) => {
            setCards(cards);
            setCurrentUser(user);
        })
        .catch(err => console.log(err));
    }, [])

    //-------------------------------- Обработчики событий ---------------------------------- //

    // Открывают попапы с формой
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    // Открывает попап с картинкой
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    // Закрывает все попапы
    function closeAllPopups() {
        setIsConfirmationPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    }

    // Добавляет новую карточку
    function handleAddPlaceSubmit(newCard) {
        // включает индикатор загрузки
        setIsLoadingAddPlace(true);
        api.createCard(newCard)
            .then(newCardData => {
                setCards([newCardData, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.error(err))
            .finally(() => {
                // выключает индикатор загрузки
                setIsLoadingAddPlace(false);
            })
    }

    // Лайк/дизлайк
    function handleCardLike(card) {
        // Проверка, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(user => user._id === currentUser._id);

        // Отправка запроса в API и получение обновлённых данных карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then(newCard => {
                setCards(cards => cards.map(element => element._id === card._id ? newCard : element));
            })
            .catch(err => console.error(err));
    }

    // Открывает попап подтверждения при клике на иконку удаления карточки
    function handleDeleteCardClick(card) {
        setIsConfirmationPopupOpen(true);
        setCardToDelete(card);
    }

    // Удаляет карточку при нажатии на кнопку "Да" в попапе подтверждения
    function handleDeleteCard(card) {
        api.deleteCard(card._id)
            .then(() => {
                // Перезаписывает массив cards, в который добавляются все карточки кроме удаленной
                setCards(cards => cards.filter(element => element._id !== card._id));
                closeAllPopups();
            })
            .catch(err => console.error(err));
    }

    // Обновляет профиль пользователя
    function handleUpdateUser(newUserData) {
        setIsLoadingEditProfile(true);
        // newUserData – объект вида {name: 'userName', about: 'userDescription'}
        api.updateProfile(newUserData)
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => console.error(err))
            .finally(() => {
                setIsLoadingEditProfile(false);
            })
    }

    // Обновляет аватар пользователя
    function handleUpdateAvatar(newAvatar) {
        setIsLoadingEditAvatar(true);
        // newAvatar – объект вида {avatar: 'https://pictures.com'}
        api.updateAvatar(newAvatar)
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => console.error(err))
            .finally(() => {
                setIsLoadingEditAvatar(false);
            })
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
                        onCardDelete={handleDeleteCardClick}
                        cards={cards}
                    />
                    <Footer />
                </div>

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    isLoading={isLoadingEditProfile}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    isLoading={isLoadingEditAvatar}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    isLoading={isLoadingAddPlace}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <ConfirmationPopup
                    isOpen={isConfirmationPopupOpen}
                    onClose={closeAllPopups}
                    card={cardToDelete}
                    onCardDelete={handleDeleteCard}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    )
}
