import './index.css';

import { initialCards, cardContainer, profileName, profileJob ,profileEdit, popupAddCardOpen, cardTemplate, cardInputTitle, cardInputLink} from '../utils/constants.js';
import { profileFormValidator, cardFormValidator } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

const profileUserdefault = {};
profileUserdefault.name = profileName;
profileUserdefault.about = profileJob;

const user = new UserInfo(profileUserdefault);

const cardList = new Section({items: initialCards, renderer:(item) => {
    cardList.addItem(createCard(item)); }
}, cardContainer);

cardList.renderItems();

const popupImg = new PopupWithImage('.popup_type_image');

popupImg.setEventListeners();

const popupCardForm = new PopupWithForm({
    popupSelector: '.popup_type_addcard', 
    handleFormSubmit: (formData) => {
        cardList.addItem(createCard(formData));
        cardFormValidator.deactivateButtonState();
    }
});

popupCardForm.setEventListeners();

const popupProfileForm = new PopupWithForm({
    popupSelector: '.popup_type_edit-account',
    handleFormSubmit: (formData) => {
        user.setUserInfo(formData);
    }
});

popupProfileForm.setEventListeners();

function handleCardOpen (name, link) {
    popupImg.open(name, link);
}

function createCard(item) {
    const card = new Card(item, cardTemplate, handleCardOpen);
    const cardElement = card.generateCard();
    return cardElement;
}

popupAddCardOpen.addEventListener('click', function () {
    cardFormValidator.resetFormErrors();
    popupCardForm.open();
});

profileEdit.addEventListener('click', function () {
    profileFormValidator.deactivateButtonState();
    profileFormValidator.resetFormErrors();
    const thisUser = user.getUserInfo();
    popupProfileForm.setInputValues(thisUser);
    popupProfileForm.open();
});