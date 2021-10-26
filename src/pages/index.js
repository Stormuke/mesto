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

//экземпляр класса апи
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: '49cf51ee-b559-465c-b78a-86fb26662a6f',
    'Content-Type': 'application/json'
  }
})

//изначальная отрисовка данных пользователя
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
const popupConfirmDelete = new PopupWithConfirm(modalDeleteForm)

//создание экземпляра профиля
const addInfoProfileForm = new UserInfo({
  userName: profileNameSelector,
  userInfo: profileJobSelector
})

//экземпляр формы редактирования профиля
const openModalEditForm = new PopupWithForm({
  popupSelector: modalEditForm,
  submitForm: (item) => {
    openModalEditForm.isLoading(true)
    api.patchUserInfo(item)
      .then((res) => {
        addInfoProfileForm.setUserInfo(res)
      })
      .catch(err => console.log(`Ошибка обновления пользовательских данных: ${err}`))
      .finally(() => {
        openModalEditForm.isLoading(false)
      })
  }
})

//экземпляр формы смены аватара
const openModalAvatarEdit = new PopupWithForm({
  popupSelector: modalAvatarForm,
  submitForm: (item) => {
    openModalAvatarEdit.isLoading(true)
    api.updateAvatar(item)
      .then((res) => {
        profileAvatarImage.src = res.avatar
        openModalAvatarEdit.close()
      })
      .catch(err => console.log(`Ошибка обновления аватара: ${err}`))
      .finally(() => {
        openModalAvatarEdit.isLoading(false)
      })
  }
})

//создание экземпляра добавления места
const openModalAddForm = new PopupWithForm({
  popupSelector: modalAddForm,
  submitForm: (item) => {
    openModalAddForm.isLoading(true)
    api.postNewCard(item)
      .then((res) => {
        createCards.addItem(newCard(res))
      })
      .then(err => console.log(`Ошибка создания карточки: ${err}`))
      .finally(() => {
        openModalAddForm.isLoading(false)
      })
  }
})

//создание экземпляра попапа картинки на весь экран
const popupImage = new PopupWithImage(
  modalFullScreenForm,
  imagePopupFullScreen,
  textPopupFullScreen)

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
  api.getUserInfo()
    .then((res) => {
      jobPopup.value = res.about
      namePopup.value = res.name
    })
    .catch(err => console.log(`Ошибка получения данных профиля: ${err}`))

  openModalEditForm.open()
}

//открытие формы добавление места
const openModalAddPopup = () => {
  formValidatorAddForm.resetValidation()
  openModalAddForm.open()
}

//навешивание лиснеров на попап
openModalAddForm.setEventListeners()
openModalEditForm.setEventListeners()
openModalAvatarEdit.setEventListeners()
popupImage.setEventListeners()
popupConfirmDelete.setEventListeners()

//ивенты
editBtn.addEventListener('click', openModalEditPopup)
addBtn.addEventListener('click', openModalAddPopup)
avatarUpdateButton.addEventListener('click', () => {
  formValidatorAvatarForm.resetValidation()
  openModalAvatarEdit.open()
})

//вызов валидации форм
formValidatorAddForm.enableValidation()
formValidatorEditForm.enableValidation()
formValidatorAvatarForm.enableValidation()
