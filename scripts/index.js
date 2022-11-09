import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { objSettings } from './constants.js'
import { initialCards } from './initialCards.js'

const popups = document.querySelectorAll('.popup');

const popupEditprofile = document.querySelector('.popup_type_edit-account');
const inputName = popupEditprofile.querySelector('.popup__item_type_name');
const inputJob = popupEditprofile.querySelector('.popup__item_type_job');
const popupImage = document.querySelector('.popup_type_image');

const profileEdit = document.querySelector('.profile__edit-profile');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const popupAddCardOpen = document.querySelector('.profile__add-element');
const popupAddcard = document.querySelector('.popup_type_addcard');
const cardInputTitle = popupAddcard.querySelector('.popup__item_type_place-name');
const cardInputLink = popupAddcard.querySelector('.popup__item_type_place-link');

const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

const cardElementLink = document.querySelector('.element__image');

const profileFormEdit = popupEditprofile.querySelector('.popup__form');
const formAddCard = popupAddcard.querySelector('.popup__form');

const profileFormValidator = new FormValidator(objSettings, profileFormEdit);
const cardFormValidator = new FormValidator(objSettings, formAddCard);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

function setPopupInputValue() {
    inputName.value = profileName.textContent.trim();
    inputJob.value = profileJob.textContent.trim();
}

function setProfileDesc() {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
}

function openPopup(modal) {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', handleEsc);
}

function handleEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

function closePopup(modal) {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEsc);
}

function createCard(data, Template, action, nodeElement) {
   const card = new Card(data, Template, action, nodeElement);
   return card.generateCard();
}

initialCards.forEach((item) => {
    cardContainer.append(createCard(item, cardTemplate, openPopup, popupImage));
});

popupAddcard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    cardContainer.prepend(createCard({name: cardInputTitle.value, link: cardInputLink.value }, cardTemplate, openPopup, popupImage));
    closePopup(popupAddcard);
    formAddCard.reset();
    cardFormValidator.deactivateButtonState();
});

profileEdit.addEventListener('click', function () {
    setPopupInputValue();
    profileFormValidator.deactivateButtonState();
    profileFormValidator.resetFormErrors();
    openPopup(popupEditprofile);
});

popupAddCardOpen.addEventListener('click', function () {
    cardFormValidator.resetFormErrors();
    openPopup(popupAddcard);
});

profileFormEdit.addEventListener('submit', function (evt) {
    evt.preventDefault();
    setProfileDesc();
    closePopup(popupEditprofile);
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', function (evt) {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__closed')) {
            closePopup(popup);
        }
    });
});