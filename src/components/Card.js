export default class Card {
    constructor( { data, userId, handleCardClick, handleLikeClick, handleDeleteCardClick }, templateSelector) {
        this._likes = data.likes;
        this._id = data._id;
        this._name = data.name;
        this._link = data.link;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._templateSelector = templateSelector;
       
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        
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

               
        if (this._ownerId !== this._userId) {
            this._cardElementRemove.classList.add('element__delete-element_type_hide');
        }

        this._setEventListeners();
        this.setLikes(this._likes);

        return this._element;
    }

    isLiked() {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId)
        return userHasLikedCard;
    }

    setLikes(newLikes) {
        this._likes = newLikes;
        const cardElementLikeCounter = this._element.querySelector('.element__like-counter');
        cardElementLikeCounter.textContent = this._likes.length;
        
        if (this.isLiked()) {
            this._handleAddLike();
        } else {
            this._handleDeleteLike();
        }
    }

    _handleAddLike(){
        this._cardElementLike.classList.add('element__like_type_active');
    }

    _handleDeleteLike(){
        this._cardElementLike.classList.remove('element__like_type_active');
    }

    removeCardElement(){
        this._element.remove();
        this._element = null;
    }

    _hideDeleteBtn(){
        this._cardElementRemove.classList.add('element__delete-element_type_hide');
        this._cardElementRemove.disabled = true;
    }
   
    _setEventListeners(){
        this._cardElementImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
        this._cardElementRemove.addEventListener('click', () => this._handleDeleteCardClick(this._id));
        this._cardElementLike.addEventListener('click', () => this._handleLikeClick(this._id)); 
    }
}