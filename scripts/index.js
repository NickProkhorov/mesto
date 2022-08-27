
const page = document.querySelector('.page');

const popupEditprofile = document.querySelector('.popup_type_edit-account');
const editProfileForm = popupEditprofile.querySelector('.popup__form');
const inputName = popupEditprofile.querySelector('.popup__item_type_name');
const inputJob = popupEditprofile.querySelector('.popup__item_type_job');
const closeProfileForm = popupEditprofile.querySelector('.popup__closed');

const popupImage = document.querySelector('.popup_type_image');
const popupScaleImage = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
const closePopupImage = popupImage.querySelector('.popup__closed');


const editProfile = document.querySelector('.profile__edit-profile');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const openPopupAddCard = document.querySelector('.profile__add-element');

const popupAddcard = document.querySelector('.popup_type_addcard');
const createCardForm = popupAddcard.querySelector('.popup__form');
const cardInputTitle = popupAddcard.querySelector('.popup__item_type_place-name');
const cardInputLink = popupAddcard.querySelector('.popup__item_type_place-link');
const closeCardForm = popupAddcard.querySelector('.popup__closed');

const cardContainer = document.querySelector('.elements');

const cardTemplate = document.querySelector('#card-template').content;

const cardElementTitle = document.querySelector('.element__title');
const cardElementLink = document.querySelector('.element__image');

const initialCards = [
    {
      name: 'Побережье Италии',
      link: './images/italy.jpg'
    },
    {
      name: 'Побережье Турции',
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
    
function setPopupInputValue() { 
    inputName.value = profileName.textContent.trim();
    inputJob.value = profileJob.textContent.trim();
} 

function setProfileDesc() {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
}

function popupOpen(modal) {
    modal.classList.add('popup_opened');
} 

function popupClose(modal) {
    modal.classList.remove('popup_opened');
} 

function openedImagePopup(link, name) {
    popupScaleImage.src = link;
    popupImageTitle.textContent = name;

    popupOpen(popupImage);
}

function clearInputCard(){
    cardInputTitle.value = '';
    cardInputLink.value = '';
}

function createCard(link, name) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  
    const cardElementTitle = cardElement.querySelector('.element__title');
    const cardElementLink = cardElement.querySelector('.element__image');
    const cardElementLike = cardElement.querySelector('.element__like');
    const cardElementRemove = cardElement.querySelector('.element__delete-element');

    cardElementLink.addEventListener('click', ()=> openedImagePopup(link, name));
    cardElementLike.addEventListener('click', function(evt){
        evt.target.classList.toggle('element__like_type_active');
    });
    cardElementRemove.addEventListener('click', ()=>cardElement.remove());

    cardElementTitle.textContent = name;
    cardElementLink.src = link;
    cardElementLink.alt = name;

    return cardElement;
}

initialCards.forEach((item) => renderCard(cardContainer, item, 'after'));

function renderCard ( container, data, position = 'before') {
    switch(position){
    case 'before':
        container.prepend(createCard(data.link, data.name));
    break;
    case 'after':
        container.append(createCard(data.link, data.name));
    break;
    default:
    break;
    }    
  }

popupAddcard.addEventListener('submit', function(evt){
    evt.preventDefault();
    renderCard(cardContainer, { link: cardInputLink.value, name: cardInputTitle.value, }, 'before');
    popupClose(popupAddcard);
});


editProfile.addEventListener('click', function(){
    setPopupInputValue();
    popupOpen(popupEditprofile);    
});

openPopupAddCard.addEventListener('click', function(){
    clearInputCard();
    popupOpen(popupAddcard);
});

editProfileForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    setProfileDesc();
    popupClose(popupEditprofile);
});

closeProfileForm.addEventListener('click', function(){
    popupClose(popupEditprofile);
});

closeCardForm.addEventListener('click', function(){
    popupClose(popupAddcard);
    
});

closePopupImage.addEventListener('click', function(){
    popupClose(popupImage);
});





