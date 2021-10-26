import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  setEventListeners() {
    super.setEventListeners();
    const submitButton = this._popup.querySelector('.popup__submit')
    submitButton.addEventListener('click', (evt) => {
      evt.preventDefault()
      this._handleSubmitCallback();
    });
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }
}
