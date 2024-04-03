class Card {
  constructor(cardData, cardTemplate) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardTemplate = cardTemplate;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".card__like-button");
    const cardDeleteButton = this._element.querySelector(
      ".card__delete-button"
    );
    const cardImageEl = this._element.querySelector(".card__image");

    likeButton.addEventListener("click", () => this._handleLikeIcon);
    cardDeleteButton.addEventListener("click", () => this._handleDeleteCard);
    cardImageEl.addEventListener("click", () => this._handlePreviewPicture);

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    cardDeleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    cardImageEl.addEventListener("click", () => {
      this._element.querySelector(".card__image").src = this._link;
      this._element.querySelector(".card__image").alt = this._link;
      this._element.querySelector(".card__description-text").textContent =
        this._name;

      return this._element;
    });
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
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__description-text").textContent =
      this._name;
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
