import './index.css';

import { apiConfig, cardContainer, profileName, profileJob, profileAvatar, profileEdit, popupAddCardOpen, cardTemplate} from '../utils/constants.js';
import { profileFormValidator, cardFormValidator, profileFormUpdAvaValidator } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import API from '../components/API.js';


const profileUserdefault = {}; 
profileUserdefault.name = profileName;
profileUserdefault.about = profileJob;

let userId;
const user = new UserInfo(profileUserdefault);
const api = new API(apiConfig);

const popupImg = new PopupWithImage('.popup_type_image');
popupImg.setEventListeners();

const popupCardForm = new PopupWithForm({
    popupSelector: '.popup_type_addcard', 
    handleFormSubmit: (formData) => {
        popupCardForm.renderLoading(true);
        api.addNewCard(formData)
            .then((newCard) => {
                cardList.addItem(createCard(newCard));
                popupCardForm.close();
            })
            .catch((error) => {
                console.log(`Ошибка при добавлении карточки: ${error}`);
            })
            .finally(() => { popupCardForm.renderLoading(false); })
        }
});

popupCardForm.setEventListeners();

const popupProfileForm = new PopupWithForm({
    popupSelector: '.popup_type_edit-account',
    handleFormSubmit: (formData) => {
        popupProfileForm.renderLoading(true);
        api.editProfile(formData)
            .then((formData) => {
                user.setUserInfo(formData);
                popupProfileForm.close();
            })
            .catch((error) => {
                console.log(`Ошибка при обновлении профайла: ${error}`);
            })
            .finally(() => { popupProfileForm.renderLoading(false); })
    }
});
popupProfileForm.setEventListeners();

const popupUpdateAvatar = new PopupWithForm({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (formData) => {
        popupUpdateAvatar.renderLoading(true);
        api.updateProfileAvatar(formData)
            .then((formData) => {
                user.setUserInfo(formData);
                popupUpdateAvatar.close();
            })
            .catch((error) => {
                console.log(`Ошибка при обновлении аватара: ${error}`);
            })
            .finally(() => { popupUpdateAvatar.renderLoading(false); })
    }
});
popupUpdateAvatar.setEventListeners();

const popupDeleteCard = new PopupWithConfirmation({
    popupSelector: '.popup_type_confirmation'}
);
popupDeleteCard.setEventListeners();

api.getAllPageData()
    .then((res) => {
        const [profileData, allCards ] = res
        user.setUserInfo(profileData);
        userId = profileData._id;

        cardList.renderItems(allCards);
    })
    .then(() => {
        profileFormValidator.enableValidation();
        cardFormValidator.enableValidation();
        profileFormUpdAvaValidator.enableValidation();
    })
    .catch((error) => {
        console.log(`Ошибка при загрузке исходных данных: ${error}`);
    })

const cardList = new Section({renderer:(item) => {
    cardList.addItem(createCard(item)); }
}, cardContainer);

function handleCardOpen (name, link) {
    popupImg.open(name, link);
}

function createCard(item) {
    const card = new Card( 
        {   data: item,
            userId,
            handleCardClick: (name, link) => { 
                handleCardOpen(name, link);
            },

            handleLikeClick: (idCard) => {
                if(card.isLiked()){
                    api.deleteLike(idCard)
                    .then((res) => {
                        card.setLikes(res.likes);
                    })
                    .catch((error) => {
                        console.log(`Ошибка при удалении лайка: ${error}`);
                    })

                } else {
                    api.addLike(idCard)
                        .then((res) => {
                            card.setLikes(res.likes);
                        })
                        .catch((error) => {
                            console.log(`Ошибка при постановки лайка: ${error}`);
                        })
                }
            },

            handleDeleteCardClick: (id) => {
                popupDeleteCard.open();
                popupDeleteCard.changeSubmitHandler(() => {
                    api.deleteCard(id)
                        .then(() => {
                            card.removeCardElement();                            
                        })
                        .catch((error) => {
                            console.log(`Ошибка при удалении карточки: ${error}`);
                        })
                });           
            }
        }, 
        cardTemplate);

    const cardElement = card.generateCard();
    return cardElement;
}

popupAddCardOpen.addEventListener('click', function () {
    cardFormValidator.deactivateButtonState();
    cardFormValidator.resetFormErrors();
    popupCardForm.open();
});

profileAvatar.addEventListener('click', function () {
    cardFormValidator.resetFormErrors();
    popupUpdateAvatar.open();    
});

profileEdit.addEventListener('click', function () {
    profileFormValidator.deactivateButtonState();
    profileFormValidator.resetFormErrors();
    const thisUser = user.getUserInfo();
    popupProfileForm.setInputValues(thisUser);
    popupProfileForm.open();
});