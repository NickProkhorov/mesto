import Popup from '../components/Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector);

        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._btnYes = this._form.querySelector('.popup__button');
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
            this.close();
        });
    }

    changeSubmitHandler(newSubmitHandler){
        this._handleFormSubmit = newSubmitHandler;
    }
}