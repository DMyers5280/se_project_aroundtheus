class FormValidator {
  constructor(options, formEl) {
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;

    this._formEl = formEl;
  }

  _showInputError(inputEl, validationMessage) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _toggleButtonState() {
    if (hasInvalidInput(this._inputEls)) {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = true;
      return;
    }
    this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = false;
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return showInputError(this._formEl, inputEl, options);
    }
    hideInputError(this._formEl, inputEl, options);
  }

  _setEventListeners() {
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
