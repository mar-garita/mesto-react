import React from "react";

import editAvatarButton from '../images/edit_button.svg';
import {api} from '../utils/Api.js';
import Card from "./Card";


export default function Main ({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) {
    // Переменные состояния, отвечающие за информацию о пользователе
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');

    // Переменная состояния, отвечающая за карточки
    const [cards, setCards] = React.useState([]);

    // Хук useEffect вызывает колбэк (получающий с сервера данные пользователя)
    // после того, как компонент Main будет смонтирован
    React.useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    // Хук useEffect вызывает колбэк (получающий с сервера данные о всех карточках)
    // после того, как компонент Main будет смонтирован
    React.useEffect(() => {
        api.getInitialCards()
            .then(data => {
                setCards(data)
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    return (
        <main className="main page__section">
            <section className="profile">
                <div className="profile__wrap">
                    <img src={userAvatar} alt="Аватар" className="profile__avatar"/>
                    <div onClick={onEditAvatar} className="profile__overlay">
                        <div id="profile-avatar-icon" className="profile__icon" src={editAvatarButton}/>
                    </div>
                </div>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__title">{userName}</h1>
                        <button onClick={onEditProfile} type="button" aria-label="Редактировать" id="profile-edit-button"
                                className="button profile__edit-button"/>
                    </div>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button onClick={onAddPlace} type="button" aria-label="Добавить" id="add-card-button"
                        className="button profile__add-button"/>
            </section>

            <section className="cards">
                <ul id="cards-list" className="cards__list">
                    {cards.map(card => (
                        <Card key={card._id} card={card} onCardClick={onCardClick}/>
                    ))}
                </ul>
            </section>
        </main>
    )
}
