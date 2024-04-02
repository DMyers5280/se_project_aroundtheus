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

  _getCardTemplate() {
    return document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getCardTemplate();
    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__description").textContent = this._name;
    this._setEventListeners();
  }
}

export default Card;
