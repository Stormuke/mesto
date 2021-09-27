//функция показа текста ошибки
const showErrorText = (inputElement, errorMessage, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass)
  errorMessage.classList.add(errorClass)
  errorMessage.textContent = inputElement.validationMessage
}

//функция скрытия текста ошибки
const hideErrorText = (inputElement, errorMessage, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass)
  errorMessage.classList.remove(errorClass)
  errorMessage.textContent = ''
}

//функция отключения кнопки
const disableSubmitButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass)
  submitButton.setAttribute('disabled', true);
}

//функция включения кнопки
const enableSubmitButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass)
  submitButton.removeAttribute('disabled')
}

//функция проверки валидности
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`)
  if (!inputElement.validity.valid) {
    showErrorText(inputElement, errorMessage, inputErrorClass, errorClass)
  } else {
    hideErrorText(inputElement, errorMessage, inputErrorClass, errorClass)
  }
}

//функция проверки инпутов на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

//функция проверки пустых инпутов
const hasEmptyInputValue = (inputList) => {
  return inputList.every((inputElement) => {
    return inputElement.value.lenght === 0
  })
}

//функция переключения состояния кнопки
const toggleButtonSubmitState = (inputList, inactiveButtonClass, submitButton) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(submitButton, inactiveButtonClass)
  } else {
    enableSubmitButton(submitButton, inactiveButtonClass)
  }
}

//функция навешивания слушателей и вызов изначального состояния кнопки(вкл/выкл) в зависимости от валидности формы
const addEventListeners = (formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault()
  })

  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  const submitButton = formElement.querySelector(submitButtonSelector)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass)
      toggleButtonSubmitState(inputList, inactiveButtonClass, submitButton)
    })
  })
  toggleButtonSubmitState(inputList, inactiveButtonClass, submitButton)
}

//функция включения валидации
const enableValidation = (cfg) => {
  const formList = Array.from(document.querySelectorAll(cfg.formSelector))
  formList.forEach((formElement) => {
    addEventListeners(
      formElement,
      cfg.inputSelector,
      cfg.inputErrorClass,
      cfg.errorClass,
      cfg.submitButtonSelector,
      cfg.inactiveButtonClass)
  })

}
