import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef('');

    // Очищает поля ввода при открытии попапа
    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();

        // Передаёт значения управляемого компонента инпут
        // во внешний обработчик (функция handleUpdateAvatar в App.jsx)
        onUpdateAvatar({
            link: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            buttonText={!isLoading ? "Сохранить" : "Сохранение..."}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="url" ref={avatarRef} name="link" id="input-avatar" className="popup__input" placeholder="Ссылка на аватар" required/>
            <span className="popup__error popup__input-avatar-error"/>
        </PopupWithForm>
    )
}
