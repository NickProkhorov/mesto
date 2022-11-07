import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popups = document.querySelectorAll('.popup');

const popupEditprofile = document.querySelector('.popup_type_edit-account');
const inputName = popupEditprofile.querySelector('.popup__item_type_name');
const inputJob = popupEditprofile.querySelector('.popup__item_type_job');
const btnOpenFormEdProfile = popupEditprofile.querySelector('.popup__button');

const popupImage = document.querySelector('.popup_type_image');

const profileEdit = document.querySelector('.profile__edit-profile');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const popupAddCardOpen = document.querySelector('.profile__add-element');

const popupAddcard = document.querySelector('.popup_type_addcard');
const cardInputTitle = popupAddcard.querySelector('.popup__item_type_place-name');
const cardInputLink = popupAddcard.querySelector('.popup__item_type_place-link');
const btnOpenFormAddCard = popupAddcard.querySelector('.popup__button');

const cardContainer = document.querySelector('.elements');

const cardTemplate = document.querySelector('#card-template').content;

const cardElementLink = document.querySelector('.element__image');

const initialCards = [
    {
        name: 'Италия',
        link: './images/italy.jpg'
    },
    {
        name: 'Турция',
        link: './images/tyrkey.jpg'
    },
    {
        name: 'Казанский Кремль',
        link: './images/kazan.jpg'
    },
    {
        name: 'Санкт-Петербург',
        link: './images/kazanskii-sobor.jpg'
    },
    {
        name: 'Красная Поляна',
        link: './images/krasnaya-polyana.jpg'
    },
    {
        name: 'Югорск',
        link: './images/siberia.jpg'
    }
];

const objSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__input-error_active'
  };

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

function clearErrors(modal) {
    const popupErrors = Array.from(modal.querySelectorAll('.popup__input-error'));
    const popupInputs = Array.from(modal.querySelectorAll('.popup__item'));
    popupErrors.forEach(function (item) {
        if (item.classList.contains('popup__input-error_active')) {
            item.classList.remove('popup__input-error_active');
            item.textContent = '';
        };
    });
    popupInputs.forEach(function (item) {
        if (item.classList.contains('popup__item_type_error')) {
            item.classList.remove('popup__item_type_error');
        };
    });
}

initialCards.forEach((item) => {
   const card = new Card(item, cardTemplate, openPopup);
   cardContainer.append(card.createCard());
     
});

popupAddcard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const card = new Card({name: cardInputTitle.value, link: cardInputLink.value }, cardTemplate);
    cardContainer.prepend(card.createCard());
    closePopup(popupAddcard);
    formAddCard.reset();
    btnOpenFormAddCard.disabled = true;
    btnOpenFormAddCard.classList.add('popup__button_inactive');
});

profileEdit.addEventListener('click', function () {
    setPopupInputValue();
    btnOpenFormEdProfile.disabled = true;
    btnOpenFormEdProfile.classList.add('popup__button_inactive');
    clearErrors(popupEditprofile);
    openPopup(popupEditprofile);
});

popupAddCardOpen.addEventListener('click', function () {
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












