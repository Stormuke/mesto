let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__button-close');
function openPopup() {
  popup.classList.add('popup_opened');
}
editBtn.addEventListener('click', openPopup);
function closePopup() {
  popup.classList.remove('popup_opened');
}
closeBtn.addEventListener('click', closePopup);
