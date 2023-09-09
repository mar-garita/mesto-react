export default function ImagePopup({ card, onClose }) {
    return (
        <div id="view-image-popup" className={`popup popup-img ${card ? 'popup_opened' : ''}`}>
            <div className="popup-img__container">
                <figure className="popup-img__wrap">
                    <img src={card ? card.link : ""} alt={card ? card.name : ""} className="popup-img__image"/>
                    <figcaption className="popup-img__caption">{card ? card.name : ""}</figcaption>
                </figure>
                <button type="button" aria-label="Закрыть" id="close-popup-img" className="button popup__close-button" onClick={onClose}/>
            </div>
        </div>
    )
}
