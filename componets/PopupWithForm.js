import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitForm}) {
    super(popupSelector);
    this._submitForm = submitForm
    this._formList = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__text')
    this._formValues = {}
    this._inputList.forEach(input => this._formValues[input.name] = input.value)
    return this._formValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._formList.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._submitForm(this._getInputValues())
      this._formList.reset()
      this.close()
    });
  }

  close() {
    super.close()
    this._formList.reset()
  }
}
