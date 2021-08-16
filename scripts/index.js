let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__button-close');
let submitBtn = document.querySelector('.popup__submit');
let form = document.querySelector('.popup__form');
const titlePopup = document.form['popup-title'];
const subtitlePopup = document.form['popup-subtitle'];
const profileTitleContent = document.querySelector('.profile__title');
const profileSubtitleContent = document.querySelector('.profile__subtitle');

//функция открытия формы редактирования профиля
function openPopup() {
  titlePopup.value = profileTitleContent.textContent;
  subtitlePopup.value = profileSubtitleContent.textContent;
  popup.classList.add('popup_opened');
}

//функция закрытия формы редактирования профиля
function closePopup() {
  popup.classList.remove('popup_opened');
}

//функция подтверждения изменений в редактировнии
function submitPopup(evt) {
  evt.preventDefault();
  profileTitleContent.textContent = titlePopup.value;
  profileSubtitleContent.textContent = subtitlePopup.value;
  closePopup();
}

form.addEventListener('submit', submitPopup);
editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);


/*
document.addEventListener('keydown', function (event) {
  const key = event.key;
  if (key === 'Escape') {
    closePopup();
  }
});
*/
