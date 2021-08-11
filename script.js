let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-button');
function openPopup() {
  popup.classList.add('popup_opened');
}
editBtn.addEventListener('click', openPopup);
