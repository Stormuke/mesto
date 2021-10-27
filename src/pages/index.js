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

//экземпляр класса апи
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: '49cf51ee-b559-465c-b78a-86fb26662a6f',
    'Content-Type': 'application/json'
  }
})

//создание экземпляра валидации для конкретной формы
const formValidatorEditForm = new FormValidator(validationFormConfig, profileFormSelector)
const formValidatorAddForm = new FormValidator(validationFormConfig, newMestoFormSelector)
const formValidatorAvatarForm = new FormValidator(validationFormConfig, editAvatarFormSelector)
const popupConfirmDelete = new PopupWithConfirm(modalDeleteForm)


//изначальная отрисовка данных пользователя
api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res)
    userInfo.setUserAvatar(res)
  })

//создание экземпляра профиля
const userInfo = new UserInfo({
  userName: profileNameSelector,
  userInfo: profileJobSelector,
  userAvatar: profileAvatarImage
})

//экземпляр формы редактирования профиля
const userInfoEdit = new PopupWithForm({
  popupSelector: modalEditForm,
  submitForm: (item) => {
    userInfoEdit.isLoading(true)
    api.patchUserInfo(item)
      .then((res) => {
        userInfo.setUserInfo(res)
        userInfoEdit.close()
      })
      .catch(err => console.log(`Ошибка обновления пользовательских данных: ${err}`))
      .finally(() => {
        userInfoEdit.isLoading(false)
      })
  }
})

//экземпляр формы смены аватара
const userAvatar = new PopupWithForm({
  popupSelector: modalAvatarForm,
  submitForm: (item) => {
    userAvatar.isLoading(true)
    api.updateAvatar(item)
      .then((res) => {
        userInfo.setUserAvatar(res)
        userAvatar.close()
      })
      .catch(err => console.log(`Ошибка обновления аватара: ${err}`))
      .finally(() => {
        userAvatar.isLoading(false)
      })
  }
})

//создание экземпляра добавления места
const newMesto = new PopupWithForm({
  popupSelector: modalAddForm,
  submitForm: (item) => {
    newMesto.isLoading(true)
    api.postNewCard(item)
      .then((res) => {
        createCards.addItem(newCard(res))
        newMesto.close()
      })
      .then(err => console.log(`Ошибка создания карточки: ${err}`))
      .finally(() => {
        newMesto.isLoading(false)
      })
  }
})

//создание экземпляра попапа картинки на весь экран
const popupImage = new PopupWithImage(
  modalFullScreenForm,
  imagePopupFullScreen,
  textPopupFullScreen)

//создание карточки
function newCard(item) {
  const card = new Card({
      data: item,
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
            .catch(err => console.log(`Ошибка удаления карточки: ${err}`))
        })
        popupConfirmDelete.open()
      }
    },
    templateSelector, api)
  return card.createCard()
}

//вставка карточек в разметку
const createCards = new Section({
    renderer: (item) => {
      createCards.addItem(newCard(item))
    }
  },
  cardsContainer, api
)

//отрисовка карточек
createCards.renderItem()

//открытие формы редактирования профиля
const openModalEditPopup = () => {
  userInfo.getUserInfo()
  userInfoEdit.open()
}

//открытие формы добавление места
const openModalAddPopup = () => {
  formValidatorAddForm.resetValidation()
  newMesto.open()
}

//навешивание лиснеров на попап
newMesto.setEventListeners()
userInfoEdit.setEventListeners()
userAvatar.setEventListeners()
popupImage.setEventListeners()
popupConfirmDelete.setEventListeners()

//ивенты
editBtn.addEventListener('click', openModalEditPopup)
addBtn.addEventListener('click', openModalAddPopup)
avatarUpdateButton.addEventListener('click', () => {
  formValidatorAvatarForm.resetValidation()
  userAvatar.open()
})

//вызов валидации форм
formValidatorAddForm.enableValidation()
formValidatorEditForm.enableValidation()
formValidatorAvatarForm.enableValidation()
