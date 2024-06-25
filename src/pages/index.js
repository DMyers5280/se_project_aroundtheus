import ConfirmationModal from "../components/ConfirmationModal.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Modal from "../components/Modal.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Api from "../components/Api.js";
import { _ } from "core-js/";

// Buttons and Other Dom Nodes

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector("#add-card-form");
const profileEditForm = profileEditModal.querySelector("#edit-profile-form");
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");

const section = new Section({ renderer: renderCard }, ".cards__list");

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
  const card = new Card(
    cardData,
    "#card-template",
    () => handleImageClick(cardData),
    () => {
      handleDeleteClick(card);
    },
    () => {
      toggleLike(card);
    }
  );
  section.addItem(card.getView());
}

function toggleLike(card) {
  if (card.isLiked) {
    api
      .removeLikesReq(card.id)
      .then(() => {
        card.handleLikeIcon();
      })
      .catch((err) => console.error(err));
  } else {
    api
      .addLikesReq(card.id)
      .then(() => {
        card.handleLikeIcon();
      })
      .catch((err) => console.error(err));
  }
}

function handleDeleteClick(card) {
  confirmationModal.open();
  confirmationModal.setSubmitAction(() => {
    console.log(card);
    api.deleteCardReq(card._id).then(() => {
      card.remove();
    });
  });
}

const confirmationModal = new ConfirmationModal("#delete-confirmation-modal");
confirmationModal.setEventListeners();

//function handleImageClick(cardData) {}
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
  const name = data.name;
  const link = data.link;
  api
    .newCardReq(name, link)
    .then((result) => {
      const { name, link } = result;
      renderCard({ name, link });
      newCardModal.close();
    })
    .catch((err) => {
      console.error(err);
    });
}
newCardModal.setEventListeners();

// Card Delete Modal Popup

function handleCardDeleteClick(card) {
  confirmationModal.open(card);
}

// --------------------------------------

const editFormModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

profileEditButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  profileEditForm.querySelector(".modal__input_type_title").value = name;
  profileEditForm.querySelector(".modal__input_type_description").value = about;
  editFormValidator.toggleButtonState();
  editFormModal.open();
});

function handleProfileEditSubmit(data) {
  api.uploadProfileReq().then((result) => {
    userInfo.setUserInfo(result);
    editFormModal.close();
  });
}

editFormModal.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
});

// API Request

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "07909f6e-76be-4aa7-8439-3e97a34a8c13",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    section.renderItems(result);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .userInfoReq()
  .then((result) => {
    userInfo.setUserInfo(result);
  })
  .catch((err) => {
    console.error(err);
  });

// card likes do not stay after page is refreshed
