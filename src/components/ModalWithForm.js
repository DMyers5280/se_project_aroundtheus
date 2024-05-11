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



  setEventListeners() {
    this._modalForm.addEventListener("submit", this._handleFormSubmit);
    super.setEventListeners();
  }
}

export default ModalWithForm;
