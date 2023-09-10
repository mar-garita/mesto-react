import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, isLoading, onClose, onUpdateUser }) {
    // Подписка на контекст, чтобы подставить в форму текущие значения currentUser
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');

    // Эффект обновляет переменные состояния при изменении контекста currentUser и состояния isOpen
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах
    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    // Обработчик изменения инпута обновляет стейт name
    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    // Обработчик изменения инпута обновляет стейт description
    function handleChangeDescription(evt) {
        setAbout(evt.target.value);
    }

    function handleSubmit(evt) {
        // Запрещает браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаёт значения управляемых компонентов инпут
        // во внешний обработчик (функция handleUpdateUser в App.jsx)
        onUpdateUser({ name, about });
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            buttonText={!isLoading ? "Сохранить" : "Сохранение..."}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="name"
                id="input-name"
                className="popup__input"
                placeholder="Введите имя"
                required
                minLength="2"
                maxLength="40"
                value={name || ''}
                onChange={handleChangeName}
            />
            <span className="popup__error popup__input-name-error"/>
            <input
                type="text"
                name="about"
                id="input-about"
                className="popup__input"
                placeholder="Введите информацию"
                value={about || ''}
                required
                minLength="2"
                maxLength="40"
                onChange={handleChangeDescription} />
            <span className="popup__error popup__input-about-error"/>
        </PopupWithForm>
    )
}
