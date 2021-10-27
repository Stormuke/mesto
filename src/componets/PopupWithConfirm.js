import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  setEventListeners() {
    super.setEventListeners();
    const formWithConfirm = this._popup.querySelector('.popup__form')
    formWithConfirm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmitCallback();
    });
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }
}
