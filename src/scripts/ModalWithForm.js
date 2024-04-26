import Modal from "./Modal.js";

class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  setEventListeners(e) {
    this._modalElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    super.setEventListeners();
  }
}

export default ModalWithForm;
