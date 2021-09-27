import Card from "./Card.js";
//кнопки
const addBtn = document.querySelector('.profile__add-button')
const editBtn = document.querySelector('.profile__edit-button')

//формы и элементы
const popups = Array.from(document.querySelectorAll('.popup'))
const modalEditFormPopup = document.querySelector('.popup_form_edit')
const modalAddForm = document.querySelector('.popup_form_add')
const modalFullScreenForm = document.querySelector('.popup_form_fullscreen')
const editProfileForm = document.forms.edit_profile
const addMestoForm = document.forms.add_mesto
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

//темплейт
//const elementTemplate = document.querySelector('.element_template').content.querySelector('.element')
const cardsContainer = document.querySelector('.elements')

//массивы
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

//функция закрытия попапов
const closePopup = (element) => {
  element.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeFormEscapeClick)
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
const fullScreenImage = (evt) => {
  openPopup(modalFullScreenForm)
  imagePopupFullScreen.src = evt.target.closest('.element__image').src
  textPopupFullScreen.textContent = evt.target.closest('.element').textContent
  imagePopupFullScreen.alt = evt.target.closest('.element').textContent.trim()
}

//функция сабмита формы добавления места
const submitPopupMesto = (evt) => {
  evt.preventDefault()
  const newData = {
    name: handleAddMestoName.value,
    link: handleAddMestoLink.value
}
  const card = new Card(newData)
  const newPostElement = card.createCard()
  cardsContainer.prepend(newPostElement)

  addMestoForm.reset()
  closePopup(modalAddForm)
}

//функция подтверждения изменений в редактировании профиля
const submitPopupProfile = (evt) => {
  evt.preventDefault();
  profileNameContent.textContent = namePopup.value
  profileJobContent.textContent = jobPopup.value
  closePopup(modalEditFormPopup)
}

/*
const addCard = (element) => {
  const cardElement = elementTemplate.cloneNode(true)
  const cardImage = cardElement.querySelector('.element__image')

  cardElement.querySelector('.element__title').textContent = element.name
  cardImage.src = element.link
  cardImage.alt = element.name
  cardElement.querySelector('.element__delete').addEventListener('click', deleteCard)
  cardElement.querySelector('.element__like').addEventListener('click', addLike)
  cardImage.addEventListener('click', fullScreenImage)
  return cardElement
}


//добавление карточек в контейнер

const createCards = () => {
  cardsContainer.prepend(cardElement)
}

//создание карточек


 */

initialCards.forEach((item) => {
  const card = new Card(item)
  const cardElement = card.createCard()

  cardsContainer.prepend(cardElement)
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

//вызов валидации форм
enableValidation(validationFormConfig)

//открытие формы добавления места
const openModalAddForm = () => {
  const submitBtn = modalAddForm.querySelector('.popup__submit')

  submitBtn.setAttribute('disabled', true)
  submitBtn.classList.add('popup__submit_disabled')
  openPopup(modalAddForm)
}

//открытие формы редактирования профиля
const openModalEditForm = () => {
  addInfoProfileForm()
  openPopup(modalEditFormPopup)
}

//ивенты
modalEditFormPopup.addEventListener('submit', submitPopupProfile)
modalAddForm.addEventListener('submit', submitPopupMesto)
editBtn.addEventListener('click',openModalEditForm)
addBtn.addEventListener('click', openModalAddForm)
