export default class API {
    constructor({baseUrl, headers}){
        this._url = baseUrl;
        this._headers = headers;
    }

    getAllPageData(){
        return Promise.all([this.getProfile(), this.getAllCards()])
    }

    getProfile(){
        return fetch(`${this._url}users/me`, {
                headers: this._headers
            })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    }
    
    editProfile(data){
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
              })
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    }

    updateProfileAvatar(data){
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
              })
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    }
    
    getAllCards(){
        return fetch(`${this._url}cards/`, {
            headers: this._headers,
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    }

    addNewCard({name, link}){
        return fetch(`${this._url}cards/`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({name, link})
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    }

    deleteCard(id){
        return fetch(`${this._url}cards/${id}/`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    }

    addLike(id){
        return fetch(`${this._url}cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    }

    deleteLike(id){
        return fetch(`${this._url}cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
    }
}