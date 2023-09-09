import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

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
        onAddPlace({
            name: name,
            link: link
        });

        setName('');
        setLink('');
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="text" value={name} onChange={handleChangeName} name="title" id="input-title" className="popup__input" placeholder="Название" required minLength="2" maxLength="30"/>
            <span className="popup__error popup__input-title-error"/>
            <input type="url" value={link} onChange={handleChangeLink} name="link" id="input-link" className="popup__input" placeholder="Ссылка на картинку" required/>
            <span className="popup__error popup__input-link-error"/>
        </PopupWithForm>
    )
}
