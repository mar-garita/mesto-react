import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike }) {
    // Подписываемся на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    // isOwner определяет является ли текущий пользователь владельцем текущей карточки
    const isOwner = card.owner._id === currentUser._id;

    // isLiked определяет есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Класс для кнопки лайка
    const cardLikeButtonClassName = (
        // если кнопка активная, то добавляется активный класс
        `cards__btn-like ${isLiked && 'cards__btn-like_active'}`
    );

    const handleCardClick = () => {
        onCardClick(card);
    }

    const handleCardLike = () => {
        onCardLike(card)
    }

    const handleDeleteClick = () => {

    }

    return (
        <li id="cards-item" className="cards__item">
            {/*Если пользователь создатель карточки, то на ней отображается кнопка удаления*/}
            {isOwner && <button type="button" aria-label="Удалить карточку" className="button cards__btn-delete" onClick={handleDeleteClick} />}
            <img src={card.link} alt={card.name} id="cards-image" className="cards__image" onClick={handleCardClick}/>
            <div className="cards__info">
                <h2 id="cards-title" className="cards__title">{card.name}</h2>
                <div className="cards__wrp-like">
                    <button type="button" aria-label="Нравится" id="cards-link" className={cardLikeButtonClassName} onClick={handleCardLike} />
                    <p id="cards-like" className="cards__like">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}
