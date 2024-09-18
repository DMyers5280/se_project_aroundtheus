export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModalElement = document.querySelector(
  "#profile-edit-modal"
);
export const addCardModalElement = document.querySelector("#add-card-modal");
export const addCardForm = addCardModalElement.querySelector("#add-card-form");
export const profileEditForm =
  profileEditModalElement.querySelector("#edit-profile-form");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const profilePictureButton = document.querySelector(
  ".profile__picture-button"
);
export const profilePictureForm = document.querySelector(
  "#profile-picture-form"
);
export const saveButton = document.querySelector(".modal__button");
export const validationOptions = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
