import { apiConfig } from "./apiConfig.js";

class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }

    // Проверяет ответ от сервера и преобразует его из json
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    // Получает информацию о пользователе
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => this._getResponseData(res))
    }

    // Загружает карточки с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => this._getResponseData(res))
    }

    // Обновляет информацию о пользователе
    updateProfile(value) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: value.name,
                about: value.about
            })
        },)
            .then(res => this._getResponseData(res))
    }

    // Обновляет аватар пользователя
    updateAvatar(value) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: value.link,
            })
        },)
            .then(res => this._getResponseData(res))
    }

    // Создает новую карточку
    createCard(value) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: value.name,
                link: value.link
            })
        },)
            .then(res => this._getResponseData(res))
    }

    // Удаляет карточку
    deleteCard(card_id) {
        return fetch(`${this._baseUrl}/cards/${card_id}`, {
            method: 'DELETE',
            headers: this._headers
        },)
            .then(res => this._getResponseData(res))
    }

    // Добавляет/удаляет лайк
    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: `${!isLiked ? 'DELETE' : 'PUT'}`,
            headers: this._headers,
        })
            .then(res => this._getResponseData(res))
    }
}


export const api = new Api(apiConfig);
