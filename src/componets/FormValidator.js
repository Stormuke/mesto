export default class FormValidator {
  constructor(config, formElement) {
    this._config = config
    this._formElement = formElement
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector)
  }

  //метод показа текста ошибки
  _showErrorText = (inputElement) => {
    this._errorMessage = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(this._config.inputErrorClass)
    this._errorMessage.textContent = inputElement.validationMessage
    this._errorMessage.classList.add(this._config.errorClass)
  }

  //метод скрытия текста ошибки
  _hideErrorText = (inputElement) => {
    this._errorMessage = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(this._config.inputErrorClass)
    this._errorMessage.textContent = ''
    this._errorMessage.classList.remove(this._config.errorClass)
  }

  //метод отключающий кнопку
  disableSubmitButton() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass)
    this._buttonElement.setAttribute('disabled', true)
  }

  //метод включения кнопки
  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass)
    this._buttonElement.removeAttribute('disabled')
  }

  //метод переключающий состояния поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showErrorText(inputElement)
    } else {
      this._hideErrorText(inputElement)
    }
  }

  //метод проверяющий заполнение полей
  _hasEmptyInputValue() {
    return this._inputList.every((inputElement) => {
      return inputElement.value.length === 0
    })
  }

  //метод проверяющий валидность полей
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  //функция переключения состояния кнопки
  _toggleButtonSubmitState() {
    if (this._hasInvalidInput() || this._hasEmptyInputValue()) {
      this.disableSubmitButton()
    } else {
      this._enableSubmitButton()
    }
  }

  //метод навешивающий слушателей на поля
  _addEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonSubmitState()
      })
    })
  }

  resetValidation() {
    this._toggleButtonSubmitState();

    this._inputList.forEach((input) => {
      this._hideErrorText(input)
    })
  }

  //включение валидации
  enableValidation() {
    this._addEventListeners()
  }
}
