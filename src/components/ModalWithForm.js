import Modal from "./Modal.js";

class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._modalInput = this._modalForm.querySelector(".modal__input");
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  _getInputValues() {
    inputList = [...this.popup.querySelectorAll('input')];
    inputValues = {};
    for (const input of inputList) {
      inputValues[input.name] = input.value;
    };
    return inputValues;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues);
      this.close();
    });
    super.setEventListeners();
  }
}

export default ModalWithForm;
