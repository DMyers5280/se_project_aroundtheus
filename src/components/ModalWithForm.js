import Modal from "./Modal.js";

class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._modalInput = this._modalForm.querySelector(".modal__input");
    this._modalButton = this._modalElement.querySelector(".modal__button");
  }

  setButtonText(loading) {
    if (loading) {
      console.log("saving");
      this._modalButton.textContent = "SAVING...";
    }
    if (loading === false) {
      this._modalButton.textContent = "SAVE";
    }
  }

  // close() {
  //   super.close();
  // }

  _clearForm() {
    this._modalForm.reset();
  }

  _getInputValues() {
    const inputList = [...this._modalForm.querySelectorAll("input")];
    const inputValues = {};
    for (const input of inputList) {
      inputValues[input.name] = input.value;
    }
    return inputValues;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._clearForm();
      this.close();
    });
    super.setEventListeners();
  }
}

export default ModalWithForm;
