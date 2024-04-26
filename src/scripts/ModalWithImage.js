import Modal from "./Modal.js";

class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._modalImage = this._modalElement.querySelector(".card__modal_image");
    this._cardCaption = this._modalElement.querySelector(
      ".card__image_modal_caption"
    );
  }

  open(data) {
    this._modalImage.src = data.link;
    this._modalImage.alt = data.name;
    this._cardCaption.textContent = data.name;

    super.open();
  }
}

export default ModalWithImage;
