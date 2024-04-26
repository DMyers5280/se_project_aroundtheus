import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import Modal from "../scripts/Modal.js";
import ModalWithImage from "../scripts/ModalWithImage.js";
import ModalWithForm from "../scripts/ModalWithForm.js";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import "./index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Buttons and Other Dom Nodes

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector("#add-card-form");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const nameInput = profileEditModal.querySelector(".modal__input_type_title");
const jobInput = profileEditModal.querySelector(
  ".modal__input_type_description"
);
const profileEditForm = profileEditModal.querySelector("#edit-profile-form");
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");
const cardImageModal = document.querySelector("#card-image-modal");
const cardImageModalClose = cardImageModal.querySelector(".modal__close");
const cardImage = cardImageModal.querySelector(".card__modal_image");

// Functions

// Event Listeners and Actions

// profileEditButton.addEventListener("click", () => {
//   nameInput.value = profileTitle.textContent;
//   jobInput.value = profileSubtitle.textContent;
//   open(profileEditModal);
// });

// addNewCardButton.addEventListener("click", () => {
//   open(addCardModal);
// });
const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);

section.renderItems();
// initialCards.forEach((cardData) => section(cardData));

// Validation

const validationOptions = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(validationOptions, profileEditForm);
const addCardFormValidator = new FormValidator(validationOptions, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Card

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", () =>
    handleImageClick(cardData)
  );
  section.addItem(card.getView());
}

// Modal

const modal = new Modal({ modalSelector: ".modal" });

// Modal Image Popup

function handleImageClick(data) {
  const modalWithImage = new ModalWithImage("#card-image-modal");
  modalWithImage.setEventListeners();
  return modalWithImage.open(data);
}

cardImageModal.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal")) {
    close();
  }
});

// Modal Form Popup

const newCardModal = new ModalWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

addNewCardButton.addEventListener("click", () => {
  newCardModal.open();
});

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  e.target.reset();
  renderCard({ name, link }, cardListEl);
  newCardModal.close();
}

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

newCardModal.setEventListeners();

// --------------------------------------

const editFormModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

profileEditButton.addEventListener("click", () => {
  editFormModal.open();
});

function handleProfileEditSubmit(e) {
  e.preventDefault();
  userInfo.setUserInfo({
    name: nameInput.value,
    job: jobInput.value,
  });
  editFormModal.close();
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

editFormModal.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

// userInfo.setUserInfo({ name: "Steve Jobs", job: "Business Man" });
