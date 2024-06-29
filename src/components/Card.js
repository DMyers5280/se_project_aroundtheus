class Card {
  constructor(
    cardData,
    cardTemplate,
    handleImageClick,
    handleDeleteCard,
    toggleLike
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    console.log(cardData);
    this.id = cardData._id;
    this._cardTemplate = cardTemplate;
    this._handleImageClick = handleImageClick;
    this.isLiked = cardData.isLiked || false;
    this.handleLikeIcon = this.handleLikeIcon.bind(this);
    this._handleDeleteCard = handleDeleteCard;
    this._toggleLike = toggleLike;
  }

  _setEventListeners() {
    this.likeButton.addEventListener("click", () => {
      this._toggleLike(this);
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });
    this._cardImageEl.addEventListener("click", () =>
      this._handleImageClick({ name: this._name, link: this._link })
    );
  }

  handleLikeIcon(isLiked) {
    this.isLiked = isLiked;
    this.renderLikes();
  }

  renderLikes() {
    if (this.isLiked) {
      this.likeButton.classList.add("card__like-button_active");
    } else {
      this.likeButton.classList.remove("card__like-button_active");
    }
  }

  remove() {
    this._element.remove();
    this._element = null;
  }

  _getCardTemplate() {
    return document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getCardTemplate();
    this.cardTemplate = this._element.querySelector(".card");
    this.likeButton = this._element.querySelector(".card__like-button");
    this._cardDeleteButton = this._element.querySelector(
      ".card__delete-button"
    );
    this._cardImageEl = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__description-text");

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    this.renderLikes();

    return this._element;
  }
}

export default Card;
