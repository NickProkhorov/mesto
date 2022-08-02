
let popupNode = document.querySelector('.popup');
let editProfile = document.querySelector('.profile__edit-profile');
let popupNodeClose = document.querySelector('.popup__closed');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let popupForm = popupNode.querySelector('.popup__form');
let inputName = popupForm.querySelector('.popup__item_type_name');
let inputJob = popupForm.querySelector('.popup__item_type_job');


function setPopupInputValue() { 
    inputName.value = profileName.textContent.trim();
    inputJob.value = profileJob.textContent.trim();
} 

function setProfileDesc() {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    setProfileDesc();
    popupClose();
}

function popupOpen() {
    setPopupInputValue();
    popupNode.classList.add('popup_opened');
} 

function popupClose() {
    popupNode.classList.remove('popup_opened');
} 

editProfile.addEventListener ('click', popupOpen);
popupNodeClose.addEventListener ('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);
