export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
    }

    open(){
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    setEventListeners(){
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._handleMousedownClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") { this.close(); }
    }

    _handleMousedownClose = (evt) => {
        if (evt.target.classList.contains('popup_opened')) { this.close(this._popup); }
        if (evt.target.classList.contains('popup__closed')) { this.close(this._popup); }
    }
}