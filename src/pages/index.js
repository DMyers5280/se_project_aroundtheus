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
import { profileEditButton } from "../utils/constants.js";
import { addCardForm } from "../utils/constants.js";
import { profileEditForm } from "../utils/constants.js";
import { addNewCardButton } from "../utils/constants.js";
import { profilePictureButton } from "../utils/constants.js";
import { profilePictureForm } from "../utils/constants.js";
import { saveButton } from "../utils/constants.js";

// Buttons and Other Dom Nodes

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
const profilePictureValidator = new FormValidator(
  validationOptions,
  profilePictureForm
);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
profilePictureValidator.enableValidation();

// Card

function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    toggleLike
  );
  section.addItem(card.getView());
}

function toggleLike(card) {
  if (card.isLiked) {
    api
      .removeLikesReq(card.id)
      .then(() => {
        card.handleLikeIcon(false);
      })
      .catch((err) => console.error(err));
  } else {
    api
      .addLikesReq(card.id)
      .then(() => {
        card.handleLikeIcon(true);
      })
      .catch((err) => console.error(err));
  }
}

function handleDeleteClick(card) {
  confirmationModal.open();
  confirmationModal.setSubmitAction(() => {
    api
      .deleteCardReq(card.id)
      .then(() => {
        confirmationModal.close();
        card.remove();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
const confirmationModal = new ConfirmationModal("#delete-confirmation-modal");
confirmationModal.setEventListeners();

// Modal Image Popup

const modalWithImage = new ModalWithImage("#card-image-modal");

function handleImageClick(data) {
  modalWithImage.open(data);
}

modalWithImage.setEventListeners();

// Modal Form Popup

const addCardModal = new ModalWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

function handleAddCardFormSubmit(data) {
  const name = data.name;
  const link = data.link;
  addCardModal.setButtonText(true);
  api
    .newCardReq(name, link)
    .then((result) => {
      addCardModal.setButtonText(false);
      const { name, link } = result;
      renderCard(result);
      addCardModal.close();
      addCardFormValidator.disableButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      saveButton.textContent = "SAVE";
    });
}
addCardModal.setEventListeners();

// Card Delete Modal Popup

function handleCardDeleteClick(card) {
  confirmationModal.open(card);
}

// --------------------------------------

const profileEditModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

profileEditButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  profileEditForm.querySelector(".modal__input_type_title").value = name;
  profileEditForm.querySelector(".modal__input_type_description").value = about;
  editFormValidator.toggleButtonState();
  profileEditModal.open();
});

function handleProfileEditSubmit(data) {
  profileEditModal.setButtonText(true);
  api
    .uploadProfileReq(data)
    .then((result) => {
      profileEditModal.setButtonText(false);
      userInfo.setUserInfo(result);
      profileEditModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      saveButton.textContent = "SAVE";
    });
}

profileEditModal.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
  avatarSelector: ".profile__image",
});

// Profile Picture Modal

const profilePictureModal = new ModalWithForm(
  "#profile-picture-modal",
  handleProfilePictureSubmit
);

profilePictureModal.setEventListeners();

profilePictureButton.addEventListener("click", () => {
  profilePictureModal.open();
});

function handleProfilePictureSubmit(data) {
  profilePictureModal.setButtonText(true);
  api
    .profilePictureReq(data.link)
    .then((result) => {
      profilePictureModal.setButtonText(false);
      userInfo.setAvatar(result);
      profilePictureModal.close();
      profilePictureValidator.disableButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      saveButton.textContent = "SAVE";
    });
}

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
    userInfo.setAvatar(result);
    userInfo.setUserInfo(result);
  })
  .catch((err) => {
    console.error(err);
  });
