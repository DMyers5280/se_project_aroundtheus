import Modal from "./Modal";

class ConfirmationModal extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._deleteConfirmation = this._modalElement.querySelector(
      "#delete-confirmation-modal"
    );
  }

  setSubmitAction(action) {
    this._handleConfirmation = action;
  }

  setEventListeners() {
    this._modalElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirmation();
    });

    super.setEventListeners();
  }
}

export default ConfirmationModal;
