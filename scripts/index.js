let popup = document.querySelector(".popup");
let editBtn = document.querySelector(".profile__edit-button");
let closeBtn = document.querySelector(".popup__button-close");
let submitBtn = document.querySelector(".popup__submit");
let form = document.querySelector(".popup__container");

function popupOpen() {
  popup.classList.add("popup_opened");

  const profileTitleContent =
    document.querySelector(".profile__title").textContent;
  const profileSubtitleContent =
    document.querySelector(".profile__subtitle").textContent;
  document.form["popup-title"].value = profileTitleContent;
  document.form["popup-subtitle"].value = profileSubtitleContent;
}

function popupClose() {
  popup.classList.remove("popup_opened");
}
editBtn.addEventListener("click", popupOpen);
closeBtn.addEventListener("click", popupClose);

document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (key === "Escape") {
    popupClose();
  }
});

function popupSubmit(evt) {
  evt.preventDefault();
  const popupTitle = document.form["popup-title"].value;
  const popupSubtitle = document.form["popup-subtitle"].value;
  document.querySelector(".profile__title").textContent = popupTitle;
  document.querySelector(".profile__subtitle").textContent = popupSubtitle;
  popupClose();
}
form.addEventListener("submit", popupSubmit);
