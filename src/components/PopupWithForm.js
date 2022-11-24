import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector);

        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__item');

        this._handleFormSubmit = handleFormSubmit;
    }
   
    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues()); 
        this.close();
        });
    }

    close(){
        this._form.reset();
        super.close();
    }

    _getInputValues(){
               
        this._formValues = {};
        this._inputList.forEach(input => { 
        this._formValues[input.name] = input.value;
        });
        
        return this._formValues;
    }
}