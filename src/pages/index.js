import '../pages/index.css'

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
  validationFormConfig,
  modalDeleteForm
} from "../utils/constant.js";

import Card from "../componets/Card.js";
import FormValidator from "../componets/FormValidator.js";
import Section from "../componets/Section.js";
import PopupWithForm from "../componets/PopupWithForm.js";
import PopupWithImage from "../componets/PopupWithImage.js";
import UserInfo from "../componets/UserInfo.js";
import Api from "../componets/Api.js";


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: '49cf51ee-b559-465c-b78a-86fb26662a6f',
    'Content-Type': 'application/json'
  }
})

api.getUserInfo()
  .then((res) => {
    document.querySelector(profileNameSelector).textContent = res.name
    document.querySelector(profileJobSelector).textContent = res.about
    document.querySelector(".profile__avatar").src = res.avatar
  })

//создание валидации для конкретной формы
const formValidatorEditForm = new FormValidator(validationFormConfig, profileFormSelector)
const formValidatorAddForm = new FormValidator(validationFormConfig, newMestoFormSelector)

//создание экземпляра профиля
const addInfoProfileForm = new UserInfo({
  userName: profileNameSelector,
  userInfo: profileJobSelector
})

const openModalEditForm = new PopupWithForm({
  popupSelector: modalEditForm,
  submitForm: (item) => {
    api.patchUserInfo(item)
      .then((res) => {
        addInfoProfileForm.setUserInfo(res)
      })
  }
})

//создание экземпляра попапа картинки на весь экран
const popupImage = new PopupWithImage(
  modalFullScreenForm,
  imagePopupFullScreen,
  textPopupFullScreen)

popupImage.setEventListeners()

//создание карточки из массива
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


//вставка карточек в разметку
api.getInitialCards()
  .then((res) => {
    const createCards = new Section({
        items: res,
        renderer: (item) => {
          createCards.addItem(createCard(item))
        }
      },
      cardsContainer
    )
    createCards.renderItem()
  })


//отрисовка карточек
api.getInitialCards()
  .then(res => console.log(res))

//создание экземпляра добавления места
const openModalAddForm = new PopupWithForm({
  popupSelector: modalAddForm,
  submitForm: (item) => {
    api.postNewCard(item)
      .then((res) => {
        createCard(res)
      })
  }
})

openModalAddForm.setEventListeners()


//создание экземпляра редактирования профиля

api.getUserInfo()
  .then(res => console.log(res))

openModalEditForm.setEventListeners()

//открытие формы редактирования профиля
const openModalEditPopup = () => {
  api.getUserInfo()
    .then((res) => {
      jobPopup.value = res.about
      namePopup.value = res.name
    })

  openModalEditForm.open()
}

//открытие формы добавление места
const openModalAddPopup = () => {
  formValidatorAddForm.resetValidation()
  openModalAddForm.open()
}

//ивенты
editBtn.addEventListener('click', openModalEditPopup)
addBtn.addEventListener('click', openModalAddPopup)

//вызов валидации форм
formValidatorAddForm.enableValidation()
formValidatorEditForm.enableValidation()


const openModalDeleteForm = new PopupWithForm({
  popupSelector: modalDeleteForm,
  submitForm: ((item) => {
    api.deleteCard(item)
      .then(res => {

      })
  })
})

const openModalDeletePopup = () => {
  openModalDeleteForm.open()
}
openModalDeleteForm.setEventListeners()

