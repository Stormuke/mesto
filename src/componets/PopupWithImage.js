import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupText) {
    super(popupSelector);
    this._popupImage = popupImage
    this._popupText = popupText
  }

  open(name, link) {
    this._popupImage.src = link
    this._popupImage.alt = name
    this._popupText.textContent = name

    super.open()
  }
}



