//кнопки
export const addBtn = document.querySelector('.profile__add-button')
export const editBtn = document.querySelector('.profile__edit-button')

//формы и элементы
export const modalEditForm = document.querySelector('.popup_form_edit')
export const modalAddForm = document.querySelector('.popup_form_add')
export const modalFullScreenForm = document.querySelector('.popup_form_fullscreen')
export const profileFormSelector = document.forms["edit_profile"]
export const newMestoFormSelector = document.forms["add_mesto"]
export const imagePopupFullScreen = document.querySelector('.popup__image')
export const textPopupFullScreen = document.querySelector('.popup__description')
export const templateSelector = '.element__template'

//инпуты форм
export const namePopup = profileFormSelector.elements.profile_name
export const jobPopup = profileFormSelector.elements.profile_job

//профиль пользователя
export const profileNameSelector = '.profile__title'
export const profileJobSelector = '.profile__subtitle'

//контейнер карточек
export const cardsContainer = document.querySelector('.elements')

//массив карточек
export const initialCards = [
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
export const validationFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_visible'
}
