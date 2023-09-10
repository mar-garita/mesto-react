export default function PopupWithForm({ name, title, buttonText, isOpen, onClose, children, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} >
            <div className="popup__container">
                <form name={`${name}`} onSubmit={onSubmit} className="popup__form" noValidate>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button type="submit" aria-label="Сохранить" id="button-add-card"
                            className="button popup__save-button">{buttonText}
                    </button>
                </form>
                <button type="button" aria-label="Закрыть" id="close-add-popup-button"
                        className="button popup__close-button" onClick={onClose}/>
            </div>
        </div>
    )
}
