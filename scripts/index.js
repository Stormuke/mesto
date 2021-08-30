//кнопки
const addBtn = document.querySelector('.profile__add-button')
const editBtn = document.querySelector('.profile__edit-button')
const closeBtn = document.querySelectorAll('.popup__button-close')

//формы
const editForm = document.querySelector('.popup_edit-form')
const addForm = document.querySelector('.popup_add-form')
const openFullScreenForm = document.querySelector('.popup_fullscreen-form')

//инпуты форм
const namePopup = document.edit_profile['profile-name']
const jobPopup = document.edit_profile['profile-job']
const handleAddMestoName = document.add_mesto['add-mesto_title']
const handleAddMestoLink = document.add_mesto['add-mesto_link']

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

//функция открытия формы редактирования профиля
const openPopupProfile = () => {
  namePopup.value = profileNameContent.textContent
  jobPopup.value = profileJobContent.textContent
  editForm.classList.add('popup_opened');
}

//функция закрытия формы редактирования профиля
const closePopupProfile = () => {
  editForm.classList.remove('popup_opened')
}

//функция открытия формы добавления места
const openPopupMesto = () => {
  addForm.classList.add('popup_opened')
}

//функция закрытия формы добавления места
const closePopupMesto = () => {
  addForm.classList.remove('popup_opened')
}

//функция открытия карточки на полный экран
const fullScreenImage = (evt) => {
  openFullScreenForm.classList.add('popup_opened')
  document.querySelector('.popup__image').src = evt.target.closest('.element__image').src
  document.querySelector('.popup__description').textContent = evt.target.closest('.element').textContent
  document.querySelector('.popup__image').alt = evt.target.closest('.element').textContent.trim()
}

//функция закрытия карточки на полный экран
const closePopupFullScreen = () => {
  openFullScreenForm.classList.remove('popup_opened')
}

//функция закрытия формы добавления места
function submitPopupMesto(evt) {
  evt.preventDefault()
  createCards({
    name: handleAddMestoName.value,
    link: handleAddMestoLink.value
})

  document.add_mesto.reset()
  closePopupMesto()
}

//функция подтверждения изменений в редактировнии профиля
const submitPopupProfile = (evt) => {
  evt.preventDefault();
  profileNameContent.textContent = namePopup.value
  profileJobContent.textContent = jobPopup.value
  closePopupProfile();
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

//ивенты
editForm.addEventListener('submit', submitPopupProfile)
addForm.addEventListener('submit', submitPopupMesto)
editBtn.addEventListener('click', openPopupProfile)
addBtn.addEventListener('click', openPopupMesto)
closeBtn.forEach((element) => {
  element.addEventListener('click', () =>{
    document.querySelectorAll('.popup').forEach((element) => {
      element.classList.remove('popup_opened')})
  })
})


/*
document.addEventListener('keydown', function (event) {
  const key = event.key;
  if (key === 'Escape') {
    closePopup();
  }
});
*/
