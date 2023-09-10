import React from "react";
import PopupWithForm from "./PopupWithForm";


export default function ConfirmationPopup({ isOpen, onClose, card, onCardDelete }) {

    function handleSubmit(evt) {
        evt.preventDefault();
        onCardDelete(card);
    }

    return (
        <PopupWithForm
            name="confirm-delete-card"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    )
}
