let popup = document.querySelector(".popup");
let editBtn = document.querySelector(".profile__edit-button");
let closeBtn = document.querySelector(".popup__button-close");
let submitBtn = document.querySelector(".popup__submit");
let form = document.querySelector('.popup__container');

function popupOpen() {
  popup.classList.add("popup_opened");

  let profileTitleContent = document.querySelector('.profile__title').textContent;
  let profileSubtitleContent = document.querySelector('.profile__subtitle').textContent;
  document.querySelectorAll('.popup__text')[0].value = profileTitleContent;
  document.querySelectorAll('.popup__text')[1].value = profileSubtitleContent;
}

function popupClose() {
  popup.classList.remove("popup_opened");
}
editBtn.addEventListener("click", popupOpen);
closeBtn.addEventListener("click", popupClose);

document.addEventListener("keydown", function (event) {
  let key = event.key;
  if (key === "Escape") {
    popupClose();
  }
});

function popupSubmit(evt) {
  evt.preventDefault();
  let popupTitle = document.querySelectorAll('.popup__text')[0].value;
  let popupSubtitle = document.querySelectorAll('.popup__text')[1].value;
  document.querySelector('.profile__title').textContent = popupTitle;
  document.querySelector('.profile__subtitle').textContent = popupSubtitle;
}
submitBtn.addEventListener('click', popupSubmit);
