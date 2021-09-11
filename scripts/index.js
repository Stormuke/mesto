//кнопки
const addBtn = document.querySelector('.profile__add-button')
const editBtn = document.querySelector('.profile__edit-button')
const closeBtn = document.querySelectorAll('.popup__button-close')
const handleCloseEditBtn = document.querySelector('.popup__button-close_form_edit')
const handleCloseAddBtn = document.querySelector('.popup__button-close_form_add')
const handleCloseFullScreenBtn = document.querySelector('.popup__button-close_form_fullscreen')

//формы
const popups = Array.from(document.querySelectorAll('.popup'))
const modalEditFormPopup = document.querySelector('.popup_form_edit')
const modalAddForm = document.querySelector('.popup_form_add')
const modalFullScreenForm = document.querySelector('.popup_form_fullscreen')
const editProfileForm = document.forms.edit_profile
const addMestoForm = document.forms.add_mesto

//инпуты форм
const namePopup = editProfileForm.elements.profile_name
const jobPopup = editProfileForm.elements.profile_job
const handleAddMestoName = addMestoForm.elements.mesto_title
const handleAddMestoLink = addMestoForm.elements.mesto_link

//профиль пользоватея
const profileNameContent = document.querySelector('.profile__title')
const profileJobContent = document.querySelector('.profile__subtitle')

//темплейт
const elementTemplate = document.querySelector('.element_template').content.querySelector('.element')
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
  }

//функция открытия попапов
const openPopup = (element) => {
  element.classList.add('popup_opened')
}

//функция добавления информации в инпуты при открытии формы редактирования профиля
const addInfoProfileForm = () => {
  namePopup.value = profileNameContent.textContent
  jobPopup.value = profileJobContent.textContent
}

//функция открытия карточки на полный экран
const fullScreenImage = (evt) => {
  const imagePopupFullScreen = document.querySelector('.popup__image')
  const textPopupFullScreen = document.querySelector('.popup__description')

  openPopup(modalFullScreenForm)
  imagePopupFullScreen.src = evt.target.closest('.element__image').src
  textPopupFullScreen.textContent = evt.target.closest('.element').textContent
  imagePopupFullScreen.alt = evt.target.closest('.element').textContent.trim()
  handleCloseFullScreenBtn.addEventListener('click', () => {
    closePopup(modalFullScreenForm)
  })
}

//функция сабмита формы добавления места
const submitPopupMesto = (evt) => {
  evt.preventDefault()
  createCards({
    name: handleAddMestoName.value,
    link: handleAddMestoLink.value
})

  addMestoForm.reset()
  closePopup(modalAddForm)
}

//функция подтверждения изменений в редактировнии профиля
const submitPopupProfile = (evt) => {
  evt.preventDefault();
  profileNameContent.textContent = namePopup.value
  profileJobContent.textContent = jobPopup.value
  closePopup(modalEditFormPopup)
}

//функция удаления карточек
const deleteCard = (evt) => {
  evt.target.closest('.element').remove();
};

//функция лайков
const addLike = (evt) => {
  evt.target.classList.toggle('element__like_active')
}

//возврат разметки карточки
const addCard = (element) => {
  const cardElement = elementTemplate.cloneNode(true)

  cardElement.querySelector('.element__title').textContent = element.name
  cardElement.querySelector('.element__image').src = element.link
  cardElement.querySelector('.element__image').alt = element.name
  cardElement.querySelector('.element__delete').addEventListener('click', deleteCard)
  cardElement.querySelector('.element__like').addEventListener('click', addLike)
  cardElement.querySelector('.element__image').addEventListener('click', fullScreenImage)
  return cardElement
}

//добавление карточек в контейнер
const createCards = (element) => {
  cardsContainer.prepend(addCard(element))
}

//создание карточек
initialCards.forEach((element) => {
  createCards(element)
})

//закрытие форм по оверлею
const closeFormOverlayClick = (evt) => {
  if (evt.target.classList.contains('popup')) {
   closePopup(evt.target)
  }
}

//закрытие форм по эскейпу
const closeFormEscapeClick = (evt) => {
  const keyEscape = evt.key
  if (keyEscape === 'Escape') {
    popups.forEach((element) => {
      closePopup(element)
    })
  }
}

//ивенты
modalEditFormPopup.addEventListener('submit', submitPopupProfile)
modalAddForm.addEventListener('submit', submitPopupMesto)
editBtn.addEventListener('click',() => {
  openPopup(modalEditFormPopup)
  addInfoProfileForm()
  enableValidation(validationFormConfig)
})

addBtn.addEventListener('click',() => {
  openPopup(modalAddForm)
  enableValidation(validationFormConfig)
})
handleCloseEditBtn.addEventListener('click', () => {
  closePopup(modalEditFormPopup)
})
handleCloseAddBtn.addEventListener('click', () => {
  closePopup(modalAddForm)
})
popups.forEach((element) => {
  element.addEventListener('mousedown', closeFormOverlayClick)
})
document.addEventListener('keydown', closeFormEscapeClick)
