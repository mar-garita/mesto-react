import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, isLoading, onClose, onAddPlace }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    // Очищает поля ввода при открытии попапа
    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    // Обработчик изменения инпута обновляет стейт name
    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    // Обработчик изменения инпута обновляет стейт link
    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        // Запрещает браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаёт значения управляемых компонентов инпут
        // во внешний обработчик (функция handleAddPlaceSubmit в App.jsx)
        onAddPlace({ name, link });
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            buttonText={!isLoading ? "Создать" : "Сохранение..."}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="title"
                id="input-title"
                className="popup__input"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
                value={name}
                onChange={handleChangeName}
            />
            <span className="popup__error popup__input-title-error"/>
            <input
                type="url"
                name="link"
                id="input-link"
                className="popup__input"
                placeholder="Ссылка на картинку"
                required
                value={link}
                onChange={handleChangeLink}
            />
            <span className="popup__error popup__input-link-error"/>
        </PopupWithForm>
    )
}
