import '../pages/index.css'

import {
  addBtn,
  editBtn,
  modalEditForm,
  modalAddForm,
  modalAvatarForm,
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
  modalDeleteForm,
  profileAvatarImage,
  avatarUpdateButton,
  editAvatarFormSelector
} from "../utils/constant.js";

import Card from "../componets/Card.js";
import FormValidator from "../componets/FormValidator.js";
import Section from "../componets/Section.js";
import PopupWithForm from "../componets/PopupWithForm.js";
import PopupWithImage from "../componets/PopupWithImage.js";
import UserInfo from "../componets/UserInfo.js";
import Api from "../componets/Api.js";
import PopupWithConfirm from "../componets/PopupWithConfirm.js";

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
const formValidatorAvatarForm = new FormValidator(validationFormConfig, editAvatarFormSelector)

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
const popupConfirmDelete = new PopupWithConfirm(modalDeleteForm)
popupConfirmDelete.setEventListeners()

//создание карточки
function newCard(item, res) {
  const card = new Card({
      data: item,
      user: res,
      handleClickImage: () => {
        popupImage.open(item.name, item.link)
      },
      handleDeleteCard: () => {
        popupConfirmDelete.setSubmitAction(() => {
          api.deleteCard(card)
            .then(() => {
              card.removeCard()
              popupConfirmDelete.close()
            })
        })
        popupConfirmDelete.open()
      }
    },
    templateSelector, api)
  return card.createCard()
}

//вставка карточек в разметку
api.getInitialCards()
  .then((res) => {
    const createCards = new Section({
        items: res,
        renderer: (item) => {
          api.getUserInfo()
            .then(res => {
              createCards.addItem(newCard(item, res))
            })
        }
      },
      cardsContainer
    )
    createCards.renderItem()
  })


//экземпляр формы смены аватара
const openModalAvatarEdit = new PopupWithForm({
  popupSelector: modalAvatarForm,
  submitForm: (item) => {
    api.updateAvatar(item)
      .then((res) => {
        profileAvatarImage.src = res.avatar
        openModalAvatarEdit.close()
      })
  }
})

openModalAvatarEdit.setEventListeners()

avatarUpdateButton.addEventListener('click', () => {
  formValidatorAvatarForm.resetValidation()
  openModalAvatarEdit.open()
})

//создание экземпляра добавления места
const openModalAddForm = new PopupWithForm({
  popupSelector: modalAddForm,
  submitForm: (item) => {
    api.postNewCard(item)
      .then((res) => {
        newCard(res, item)
      })
  }
})

openModalAddForm.setEventListeners()

//отрисовка карточек


//создание экземпляра редактирования профиля


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
formValidatorAvatarForm.enableValidation()

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

