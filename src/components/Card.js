export default class Card {
    constructor(data, templateSelector, openPopup) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
       
        this._handleOpenImgPopup = openPopup;
    }
    
    _getTemplate() {
        const cardElement = this._templateSelector.querySelector('.element').cloneNode(true);
        return cardElement;
    }
    generateCard(){
        this._element = this._getTemplate();

        this._cardElementTitle = this._element.querySelector('.element__title');
        this._cardElementTitle.textContent = this._name;
        this._cardElementImage = this._element.querySelector('.element__image');
        this._cardElementImage.src = this._link;
        this._cardElementImage.alt = this._name;
        this._cardElementLike = this._element.querySelector('.element__like');
        this._cardElementRemove = this._element.querySelector('.element__delete-element');

        this._setEventListeners();
        
        return this._element;
    }

    _removeCardElement(){
        this._element.remove();
        this._element = null;
    }

    _likeCardElement(){
        this._cardElementLike.classList.toggle('element__like_type_active');
    }
   
    _setEventListeners(){
        this._cardElementImage.addEventListener('click', () => this._handleOpenImgPopup(this._name, this._link));
        this._cardElementRemove.addEventListener('click', () => this._removeCardElement());
        this._cardElementLike.addEventListener('click', () => this._likeCardElement());
    }
}