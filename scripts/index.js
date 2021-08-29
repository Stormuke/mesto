//кнопки
const addBtn = document.querySelector('.profile__add-button')
const editBtn = document.querySelector('.profile__edit-button')
const closeBtn = document.querySelectorAll('.popup__button-close')

//формы
const editProfileForm = document.getElementsByName('edit_profile')
const addMestoForm = document.getElementsByName('add_mesto')
const popup = document.querySelectorAll('.popup')

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

//форма редактирования профиля
const namePopup = document.edit_profile['profile-name']
const jobPopup = document.edit_profile['profile-job']
const profileNameContent = document.querySelector('.profile__title')
const profileJobContent = document.querySelector('.profile__subtitle')

//функция добавления места
function openPopupMesto() {
  popup[1].classList.add('popup_opened')
}

//функция закрытия формы добавления места
function closePopupMesto() {
  popup[1].classList.remove('popup_opened')
}

//функция открытия формы редактирования профиля
function openPopupProfile() {
  namePopup.value = profileNameContent.textContent
  jobPopup.value = profileJobContent.textContent
  popup[0].classList.add('popup_opened');
}

//функция закрытия формы редактирования профиля
function closePopupProfile() {
  popup[0].classList.remove('popup_opened')
}

//функция подтверждения изменений в редактировнии
function submitPopupProfile(evt) {
  evt.preventDefault();
  profileNameContent.textContent = namePopup.value
  profileJobContent.textContent = jobPopup.value
  closePopupProfile();
}

//функция удаления карточек
const deleteCard = (event) => {
  event.target.closest('.element').remove();
};

//функция лайков
const addLike = (evt) => {
  evt.target.classList.toggle('element__like_active')
}

//функция открытия карточки на полный экран
const fullScreenImage = (evt) => {
  popup[2].classList.add('popup_opened')
  document.querySelector('.popup__image').src = evt.target.closest('.element__image').src
  document.querySelector('.popup__description').textContent = evt.target.closest('.element').textContent
}

function closePopupFullScreen() {
  popup[2].classList.remove('popup_opened')
}

//функция добавления карточек
const addCard = (element) => {
  const elementTemplate = document.querySelector('.element_template').content
  const cardsContainer = document.querySelector('.elements')

  const cardElement = elementTemplate.cloneNode(true)
  cardElement.querySelector('.element__title').textContent = element.name
  cardElement.querySelector('.element__image').src = element.link
  cardElement.querySelector('.element__delete').addEventListener('click', deleteCard)
  cardElement.querySelector('.element__like').addEventListener('click', addLike)
  cardElement.querySelector('.element__image').addEventListener('click', fullScreenImage)
  cardsContainer.prepend(cardElement)
}

//создание карточек
initialCards.forEach((element) => {
  addCard(element)
})

//функция закрытия формы добавления места
function submitPopupMesto(evt) {
  evt.preventDefault()
  addCard({
    name: document.getElementsByName('add-mesto_title')[0].value,
    link: document.getElementsByName('add-mesto_link')[0].value
})

  addMestoForm[0].reset();
  closePopupMesto()
}

//ивенты
editProfileForm[0].addEventListener('submit', submitPopupProfile)
addMestoForm[0].addEventListener('submit', submitPopupMesto)
editBtn.addEventListener('click', openPopupProfile)
addBtn.addEventListener('click', openPopupMesto)
closeBtn[0].addEventListener('click', closePopupProfile)
closeBtn[1].addEventListener('click', closePopupMesto)
closeBtn[2].addEventListener('click', closePopupFullScreen)


/*
document.addEventListener('keydown', function (event) {
  const key = event.key;
  if (key === 'Escape') {
    closePopup();
  }
});
*/
