import Popup from '../components/Popup.js';
import { popupScaleImage, popupImageTitle } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super (popupSelector);
        this._popupScaleImage = popupScaleImage;
        this._popupImageTitle = popupImageTitle;
    }

    open(name, link){ 

        this._popupScaleImage.src = link;
        this._popupScaleImage.alt = name;
        this._popupImageTitle.textContent = name;

        super.open();
    }
}