export class Card {
    constructor(data, templateSelector, openPopup) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
       
        this._popupScaleImage = document.querySelector('.popup__image');
        this._popupImageTitle = document.querySelector('.popup__image-title');
        this._popupImage = document.querySelector('.popup_type_image');
        
        this._openPopup = openPopup;
    }
    
    _getTemplate() {
        const cardElement = this._templateSelector.querySelector('.element').cloneNode(true);
        return cardElement;
    }
    createCard(){
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
    }

    _likeCardElement(){
        this._cardElementLike.classList.toggle('element__like_type_active');
    }
    
    _openedImagePopup(){
        this._popupScaleImage.src = this._link;
        this._popupScaleImage.alt = this._name;
        this._popupImageTitle.textContent = this._name
        this._openPopup(this._popupImage);
    }

    _setEventListeners(){
        this._cardElementImage.addEventListener('click', () => this._openedImagePopup()); // открыть popup
        this._cardElementRemove.addEventListener('click', () => this._removeCardElement()); // событие на кнопку "удалить карточку"
        this._cardElementLike.addEventListener('click', () => this._likeCardElement());//событие на like-элемент
    }
}