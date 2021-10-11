import {
  addBtn,
  editBtn,
  modalEditForm,
  modalAddForm,
  modalFullScreenForm,
  profileFormSelector,
  newMestoFormSelector,
  imagePopupFullScreen,
  textPopupFullScreen,
  templateSelector,
  namePopup,
  jobPopup,
  profileNameSelector,
  profileJobSelector,
  cardsContainer,
  initialCards,
  validationFormConfig
} from "../utils/constant.js";

import Card from "../componets/Card.js";
import FormValidator from "../componets/FormValidator.js";
import Section from "../componets/Section.js";
import PopupWithForm from "../componets/PopupWithForm.js";
import PopupWithImage from "../componets/PopupWithImage.js";
import UserInfo from "../componets/UserInfo.js";


//создание валидации для конкретной формы
const formValidatorEditForm = new FormValidator(validationFormConfig, profileFormSelector)
const formValidatorAddForm = new FormValidator(validationFormConfig, newMestoFormSelector)


const addInfoProfileForm = new UserInfo({
  userName: profileNameSelector,
  userInfo: profileJobSelector
});

const popupImage = new PopupWithImage(
  modalFullScreenForm,
  imagePopupFullScreen,
  textPopupFullScreen)

popupImage.setEventListeners()

function createCard(item) {
  const card = new Card({
      data: item,
      handleClickImage: () => {
        popupImage.open(item.name, item.link)
      },
    },
    templateSelector);
  return card.createCard();
}


const defaultCards = new Section({
    items: initialCards,
    renderer: (item) => {
      defaultCards.addItem(createCard(item))
    }
  },
  cardsContainer
)

defaultCards.renderItem()

//создание экземпляра добавления места
const openModalAddForm = new PopupWithForm({
  popupSelector: modalAddForm,
  submitForm: (item) => {
    defaultCards.addItem(createCard(item))
  }
})

openModalAddForm.setEventListeners()

//открытие формы добавление места
const openModalAddPopup = () => {
  formValidatorAddForm.resetValidation()
  openModalAddForm.open()
}

//создание экземпляра редактирования профиля
const openModalEditForm = new PopupWithForm({
  popupSelector: modalEditForm,
  submitForm: (item) => {
    addInfoProfileForm.setUserInfo(item)
  }
})

openModalEditForm.setEventListeners()

//открытие формы редактирования профиля
const openModalEditPopup = () => {
  jobPopup.value = addInfoProfileForm.getUserInfo().userInfo
  namePopup.value = addInfoProfileForm.getUserInfo().userName
  openModalEditForm.open()
}


//ивенты
editBtn.addEventListener('click', openModalEditPopup)
addBtn.addEventListener('click', openModalAddPopup)

//вызов валидации форм
formValidatorAddForm.enableValidation()
formValidatorEditForm.enableValidation()
