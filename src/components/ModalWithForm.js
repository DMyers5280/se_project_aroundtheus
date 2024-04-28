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

  _handleFormSubmit(data) {
    data.preventDefault();
  }

  // handleAddCardFormSubmit(data) {
  //   const name = cardTitleInput.value;
  //   const link = cardUrlInput.value;
  //   data.target.reset();
  //   renderCard({ name, link }, cardListEl);
  //   this.close();
  // }

  // handleProfileEditSubmit() {
  //   userInfo.setUserInfo({
  //     name: nameInput.value,
  //     job: jobInput.value,
  //   });
  //   this.close();
  // }

  setEventListeners() {
    this._modalForm.addEventListener("submit", this._handleFormSubmit);
    super.setEventListeners();
  }
}

export default ModalWithForm;
