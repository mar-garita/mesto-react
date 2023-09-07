import React from "react";

import editAvatarButton from '../images/edit_button.svg';
import Card from "./Card";

import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function Main ({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, cards }) {
    // Подписываемся на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main page__section">
            <section className="profile">
                <div className="profile__wrap">
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>
                    <div onClick={onEditAvatar} className="profile__overlay">
                        <div id="profile-avatar-icon" className="profile__icon" src={editAvatarButton}/>
                    </div>
                </div>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button onClick={onEditProfile} type="button" aria-label="Редактировать" id="profile-edit-button"
                                className="button profile__edit-button"/>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} type="button" aria-label="Добавить" id="add-card-button"
                        className="button profile__add-button"/>
            </section>

            <section className="cards">
                <ul id="cards-list" className="cards__list">
                    {cards.map(card => (
                        <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} />
                    ))}
                </ul>
            </section>
        </main>
    )
}
