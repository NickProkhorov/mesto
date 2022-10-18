const popups = document.querySelectorAll('.popup');

const popupEditprofile = document.querySelector('.popup_type_edit-account');
const profileFormEdit = popupEditprofile.querySelector('.popup__form');
const inputName = popupEditprofile.querySelector('.popup__item_type_name');
const inputJob = popupEditprofile.querySelector('.popup__item_type_job');
const btnOpenFormEdProfile = popupEditprofile.querySelector('.popup__button');

const popupImage = document.querySelector('.popup_type_image');
const popupScaleImage = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__image-title');

const profileEdit = document.querySelector('.profile__edit-profile');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const popupAddCardOpen = document.querySelector('.profile__add-element');

const popupAddcard = document.querySelector('.popup_type_addcard');
const formAddCard = popupAddcard.querySelector('.popup__form');
const cardInputTitle = popupAddcard.querySelector('.popup__item_type_place-name');
const cardInputLink = popupAddcard.querySelector('.popup__item_type_place-link');
const btnOpenFormAddCard = popupAddcard.querySelector('.popup__button');

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

function openedImagePopup(link, name) {
    popupScaleImage.src = link;
    popupImageTitle.textContent = name;
    popupScaleImage.alt = name;
    openPopup(popupImage);
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

function createCard(link, name) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    const cardElementTitle = cardElement.querySelector('.element__title');
    const cardElementImage = cardElement.querySelector('.element__image');
    const cardElementLike = cardElement.querySelector('.element__like');
    const cardElementRemove = cardElement.querySelector('.element__delete-element');

    cardElementImage.addEventListener('click', () => openedImagePopup(link, name));
    cardElementLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_type_active');
    });
    cardElementRemove.addEventListener('click', () => cardElement.remove());

    cardElementTitle.textContent = name;
    cardElementImage.src = link;
    cardElementImage.alt = name;

    return cardElement;
}

initialCards.forEach((item) => renderCard(cardContainer, item, 'before'));

function renderCard(container, data, position = 'before') {
    switch (position) {
        case 'before':
            container.prepend(createCard(data.link, data.name));
            break;
        default:
            break;
    }
}

popupAddcard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    renderCard(cardContainer, { link: cardInputLink.value, name: cardInputTitle.value, });
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










