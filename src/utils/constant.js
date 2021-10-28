//кнопки
export const addBtn = document.querySelector('.profile__add-button')
export const editBtn = document.querySelector('.profile__edit-button')

//формы и элементы
export const modalEditForm = document.querySelector('.popup_form_edit')
export const modalAddForm = document.querySelector('.popup_form_add')
export const modalDeleteForm = document.querySelector('.popup_form_delete')
export const modalAvatarForm = document.querySelector('.popup_form_avatar')
export const modalFullScreenForm = document.querySelector('.popup_form_fullscreen')
export const profileFormSelector = document.forms["edit_profile"]
export const newMestoFormSelector = document.forms["add_mesto"]
export const editAvatarFormSelector = document.forms["edit_avatar"]
export const imagePopupFullScreen = document.querySelector('.popup__image')
export const textPopupFullScreen = document.querySelector('.popup__description')
export const templateSelector = '.element__template'

//инпуты форм
export const inputName = profileFormSelector.elements.profile_name
export const inputAbout = profileFormSelector.elements.profile_job

//профиль пользователя
export const profileNameSelector = '.profile__title'
export const profileJobSelector = '.profile__subtitle'
export const profileAvatarImage = '.profile__avatar'
export const avatarUpdateButton = document.querySelector('.profile__edit-avatar')

//контейнер карточек
export const cardsContainer = document.querySelector('.elements')

//конфиг форм
export const validationFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_visible'
}
