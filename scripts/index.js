//кнопки
const addBtn = document.querySelector('.profile__add-button')
const likeBtn = document.querySelectorAll('.element__like')
const editBtn = document.querySelector('.profile__edit-button')
const closeBtn = document.querySelectorAll('.popup__button-close')

//формы
const profileForm = document.querySelector('.popup__form')
const popup = document.querySelectorAll('.popup')
const cardElement = document.querySelector('.element')
const elementTemplate = document.querySelector('.element_template').content
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

//создание карточек
initialCards.forEach(function (element) {
  const cardElement = elementTemplate.cloneNode(true);
  cardElement.querySelector('.element__title').textContent = element.name;
  cardElement.querySelector('.element__image').src = element.link;

  cardsContainer.append(cardElement)
})

//функция закрытия формы добавления места
function submitPopupMesto(evt) {
  evt.preventDefault()
  closePopupMesto()
}

//ивенты
profileForm.addEventListener('submit', submitPopupProfile)
editBtn.addEventListener('click', openPopupProfile)
closeBtn[0].addEventListener('click', closePopupProfile)
addBtn.addEventListener('click', openPopupMesto)
closeBtn[1].addEventListener('click', closePopupMesto)


/*
document.addEventListener('keydown', function (event) {
  const key = event.key;
  if (key === 'Escape') {
    closePopup();
  }
});
*/
