import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
//кнопки
const addBtn = document.querySelector('.profile__add-button')
const editBtn = document.querySelector('.profile__edit-button')

//формы и элементы
const popups = Array.from(document.querySelectorAll('.popup'))
const modalEditFormPopup = document.querySelector('.popup_form_edit')
const modalAddForm = document.querySelector('.popup_form_add')
const modalFullScreenForm = document.querySelector('.popup_form_fullscreen')
const editProfileForm = document.forms["edit_profile"]
const addMestoForm = document.forms["add_mesto"]
const imagePopupFullScreen = document.querySelector('.popup__image')
const textPopupFullScreen = document.querySelector('.popup__description')

//инпуты форм
const namePopup = editProfileForm.elements.profile_name
const jobPopup = editProfileForm.elements.profile_job
const handleAddMestoName = addMestoForm.elements.mesto_title
const handleAddMestoLink = addMestoForm.elements.mesto_link

//профиль пользователя
const profileNameContent = document.querySelector('.profile__title')
const profileJobContent = document.querySelector('.profile__subtitle')

//контейнер карточек
const cardsContainer = document.querySelector('.elements')

//поиск темплейта карт
const getTemplateCard = document.querySelector('.element__template').content

//массив карточек
const initialCards = [
  {
    name: 'Вьетнам',
    link: 'https://images.unsplash.com/photo-1464809142576-df63ca4ed7f0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80'
  },
  {
    name: 'Италия',
    link: 'https://images.unsplash.com/photo-1629056948919-2ff26272117e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=80'
  },
  {
    name: 'Лондон',
    link: 'https://images.unsplash.com/photo-1628894278852-2830149670f3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80'
  },
  {
    name: 'Франция',
    link: 'https://images.unsplash.com/photo-1505205296326-2178af1b47bf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    name: 'Чикаго',
    link: 'https://images.unsplash.com/photo-1477414956199-7dafc86a4f1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1625592526284-350c652fe4a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80'
  }
];

//конфиг форм
const validationFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_visible'
}

//создание валидации для конкретной формы
const formValidatorEditForm = new FormValidator(validationFormConfig, editProfileForm)
const formValidatorAddForm = new FormValidator(validationFormConfig, addMestoForm)

//функция закрытия попапов
const closePopup = (element) => {
  document.removeEventListener('keydown', closeFormEscapeClick)
  element.classList.remove('popup_opened')
}

//функция открытия попапов
const openPopup = (element) => {
  element.classList.add('popup_opened')
  document.addEventListener('keydown', closeFormEscapeClick)
}

//функция добавления информации в инпуты при открытии формы редактирования профиля
const addInfoProfileForm = () => {
  namePopup.value = profileNameContent.textContent
  jobPopup.value = profileJobContent.textContent
}

//функция открытия карточки на полный экран
function handleClickImage(name, link) {
  imagePopupFullScreen.src = link
  imagePopupFullScreen.alt = name
  textPopupFullScreen.textContent = name
  openPopup(modalFullScreenForm)
}

//функция создания карточки
function createCard(element) {
  const card = new Card(element, handleClickImage, getTemplateCard)
  return card.createCard()
}


//функция сабмита формы добавления места
const submitPopupMesto = (evt) => {
  evt.preventDefault()
  const newData = {
    name: handleAddMestoName.value,
    link: handleAddMestoLink.value
}

  cardsContainer.prepend(createCard(newData))
  closePopup(modalAddForm)
}

//функция подтверждения изменений в редактировании профиля
const submitPopupProfile = (evt) => {
  evt.preventDefault();
  profileNameContent.textContent = namePopup.value
  profileJobContent.textContent = jobPopup.value
  closePopup(modalEditFormPopup)
}

//создание карточек из массива
initialCards.forEach((item) => {
  cardsContainer.prepend(createCard(item))
})


//закрытие форм по эскейпу
const closeFormEscapeClick = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')

    closePopup(popupOpened)
  }
}

//закрытие форм по оверлею и по крестику
popups.forEach((element) => {
  element.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(element)
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(element)
    }
  })
})

//открытие формы добавления места
const openModalAddForm = () => {
  formValidatorAddForm.disableSubmitButton()
  addMestoForm.reset()
  openPopup(modalAddForm)
}

//открытие формы редактирования профиля
const openModalEditForm = () => {
  openPopup(modalEditFormPopup)
  editProfileForm.reset()
  addInfoProfileForm()
}

//вызов валидации форм
formValidatorAddForm.enableValidation()
formValidatorEditForm.enableValidation()

//ивенты
modalEditFormPopup.addEventListener('submit', submitPopupProfile)
modalAddForm.addEventListener('submit', submitPopupMesto)
editBtn.addEventListener('click',openModalEditForm)
addBtn.addEventListener('click', openModalAddForm)
