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
    const inputList = [...this._modalForm.querySelectorAll('input')];
    const inputValues = {};
    for (const input of inputList) {
      inputValues[input.name] = input.value;
    };
    return inputValues;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}

export default ModalWithForm;
