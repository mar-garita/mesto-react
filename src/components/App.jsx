import React from 'react';

import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

export default function App() {
    // Переменные состояния, отвечающие за видимость попапов с формой
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    // Переменная состояния, отвечает за видимость попапа с картинкой
    const [selectedCard, setSelectedCard] = React.useState(null);

    // Пропс, который закрывает все попапы
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    }


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

    //------------------ Обработчик событий (открывает попап с картинкой) ---------------------//

    function handleCardClick(card) {
        setSelectedCard(card);
    }


    return (
        <div className="App">
            <div className="page">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
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
    )
}
