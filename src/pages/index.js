import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Modal from "../components/Modal.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Api from "../../Api.js";

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

const profileEditForm = profileEditModal.querySelector("#edit-profile-form");
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");


const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);

section.renderItems();

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

// Modal Image Popup

const modalWithImage = new ModalWithImage("#card-image-modal");

function handleImageClick(data) {
  modalWithImage.open(data);
}

modalWithImage.setEventListeners();

// Modal Form Popup

const newCardModal = new ModalWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

addNewCardButton.addEventListener("click", () => {
  newCardModal.open();
});

function handleAddCardFormSubmit(data) {
  const name = data.title;
  const link = data.url;
  renderCard({ name, link }, cardListEl);
  newCardModal.close();
}
newCardModal.setEventListeners();

// --------------------------------------

const editFormModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);



profileEditButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  profileEditForm.querySelector(".modal__input_type_title").value = name;
  profileEditForm.querySelector(".modal__input_type_description").value = job;
  editFormValidator.toggleButtonState();
  editFormModal.open();
});

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo({
    name: data.title,
    job: data.subtitle,
  });
  editFormModal.close();
}

editFormModal.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

// userInfo.setUserInfo({ name: "Steve Jobs", job: "Business Man" });

// API Request 

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6b54c1bd-a8ee-4fc9-a89b-051d7f33f592",
    "Content-Type": "application/json"
  }
});

api.getInitialCards()
   .then((result) => {
     console.log(JSON.stringify(result));
   })
   .catch((err) => {
     console.error(err); 
   });