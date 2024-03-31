class Card {
  constructor(cardData, cardTemplate) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardTemplate = cardTemplate;
  }

  _setEventListeners() {
    likeButton.addEventListener("click", () => this._handleLikeIcon);
    cardDeleteButton.addEventListener("click", () => this._handleDeleteCard);
    cardImageEl.addEventListener("click", () =>
      this._handlePreviewPicture(cardData)
    );
  }
  _handleLikeIcon() {}

  _handleDeleteCard() {}

  _handlePreviewPicture() {}

  _getTemplate() {
    return document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
  }
}
//   _setEventListeners() {
//     cardDeleteButton = this._cardElement
//       .querySelector(".card__delete-button")
//       .addEventListener("click", () => {
//         this._handleDeleteCard();
//       });

//     likeButton = this._cardElement
//       .querySelector(".card__like-button")
//       .addEventListener("click", () => {
//         this._handleLikeButton();
//       });
//   }

//   _handleLikeButton() {
//     this._cardElement
//       .querySelector("card__like-button")
//       .classList.toggle("card__like-button_active");
//   }

//   _handleDeleteCard() {
//     this._cardElement.remove();
//     this._cardElement = null;
//   }

//   getView() {
//     this._cardElement = document
//       .querySelector(this._cardSelector)
//       .querySelector(".card")
//       .cloneNode(true);

//     this._setEventListeners;
//   }
// }

export default Card;
