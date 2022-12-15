import FormValidator from '../components/FormValidator.js';
const italyImage = new URL('../images/italy.jpg', import.meta.url);
const tyrkeyImage = new URL('../images/tyrkey.jpg', import.meta.url);
const kazanImage = new URL('../images/kazan.jpg', import.meta.url);
const kazanskiisoborImage = new URL('../images/kazanskii-sobor.jpg', import.meta.url);
const krasnayapolyanaIMage = new URL('../images/krasnaya-polyana.jpg', import.meta.url);
const siberiaImage = new URL ('../images/siberia.jpg', import.meta.url);

export const objSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_type_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__input-error_active'
  };

export const apiConfig = {
  baseUrl:'https://mesto.nomoreparties.co/v1/cohort-54/',
  headers:{
    authorization: 'b198e5bd-009b-4a6a-95c9-40c8f779925a',
    "Content-Type": 'application/json'
  }   
}

export const popupEditprofile = document.querySelector('.popup_type_edit-account');
export const inputName = popupEditprofile.querySelector('.popup__item_type_name');
export const inputJob = popupEditprofile.querySelector('.popup__item_type_job');
export const popupImage = document.querySelector('.popup_type_image');

export const popupScaleImage = document.querySelector('.popup__image');
export const popupImageTitle = document.querySelector('.popup__image-title');

export const profileEdit = document.querySelector('.profile__edit-profile');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');
export const profileAvatar = document.querySelector('.profile__avatar');

export const popupAddCardOpen = document.querySelector('.profile__add-element');
export const popupAddcard = document.querySelector('.popup_type_addcard');
export const cardInputTitle = popupAddcard.querySelector('.popup__item_type_place-name');
export const cardInputLink = popupAddcard.querySelector('.popup__item_type_place-link');

export const popupUpdateAvatar = document.querySelector('.popup_type_avatar');

export const cardContainer = document.querySelector('.elements');
export const cardTemplate = document.querySelector('#card-template').content;

export const cardElementLink = document.querySelector('.element__image');

export const profileFormEdit = popupEditprofile.querySelector('.popup__form');
export const formAddCard = popupAddcard.querySelector('.popup__form');
export const formUpdateAvatar = popupUpdateAvatar.querySelector('.popup__form');


export const profileFormValidator = new FormValidator(objSettings, profileFormEdit);
export const cardFormValidator = new FormValidator(objSettings, formAddCard);
export const profileFormUpdAvaValidator = new FormValidator(objSettings, formUpdateAvatar);