import React from "react";

export default function Card({card, onCardClick}) {
    const handleCardClick = () => {
        onCardClick(card);
    }

    return (
        <li id="cards-item" className="cards__item">
            <button type="button" aria-label="Удалить карточку" className="button cards__btn-delete"/>
            <img src={card.link} alt={card.name} id="cards-image" className="cards__image" onClick={handleCardClick}/>
            <div className="cards__info">
                <h2 id="cards-title" className="cards__title">{card.name}</h2>
                <div className="cards__wrp-like">
                    <button type="button" aria-label="Нравится" id="cards-link" className="cards__btn-like"/>
                    <p id="cards-like" className="cards__like">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}
