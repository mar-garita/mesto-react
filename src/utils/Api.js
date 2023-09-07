import {config} from "./config.js";

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

    // Обновляет информацию о пользователе
    createCard(value) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: value.title,
                link: value.link
            })
        },)
            .then(res => this._getResponseData(res))
    }

    // Обновляет информацию о пользователе
    deleteCard(card_id) {
        return fetch(`${this._baseUrl}/cards/${card_id}`, {
            method: 'DELETE',
            headers: this._headers
        },)
            .then(res => this._getResponseData(res))
    }

    // Добавляет лайк
    addLike(card_id) {
        return fetch(`${this._baseUrl}/cards/${card_id}/likes `, {
            method: 'PUT',
            headers: this._headers
        },)
            .then(res => this._getResponseData(res))
    }

    // Удаляет лайк
    deleteLike(card_id) {
        return fetch(`${this._baseUrl}/cards/${card_id}/likes `, {
            method: 'DELETE',
            headers: this._headers
        },)
            .then(res => {
                if (!res.ok) {
                    // если ошибка, отклоняет промис
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                return data;
            });
    }

    // Обновляет аватар пользователя
    updateAvatar(value) {
        return fetch(`${this._baseUrl}/users/me/avatar `, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: value.link,
            })
        },)
            .then(res => this._getResponseData(res))
    }
}


export const api = new Api(config);