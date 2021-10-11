import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitForm}) {
    super(popupSelector)
    this._submitForm = submitForm
    this._formList = this._popup.querySelector('.popup__form')
    this._inputList = Array.from(this._formList.querySelectorAll('.popup__text'))
  }

  //получение данных полей
  _getInputValues() {
    const formValues = {}
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value
    })
    return formValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._formList.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._submitForm(this._getInputValues())
      this.close()
    });
  }

  close() {
    super.close()
    this._formList.reset()
  }
}
