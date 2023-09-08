import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();

        // Передаёт значения управляемого компонента инпут
        // во внешний обработчик (функция handleUpdateAvatar в App.jsx)
        onUpdateAvatar({
            link: avatarRef.current.value,
        });

        avatarRef.current.value = '';
    }

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="url" ref={avatarRef} name="link" id="input-avatar" className="popup__input" placeholder="Ссылка на аватар" required/>
            <span className="popup__error popup__input-avatar-error"/>
        </PopupWithForm>
    )
}
