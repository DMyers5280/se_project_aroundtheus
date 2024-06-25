import { data } from "autoprefixer";

class Api {
  constructor(initialCards) {
    this._initialCards = initialCards;
  }

  handleServerResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error: ${response.status}`);
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "07909f6e-76be-4aa7-8439-3e97a34a8c13",
      },
    }).then(this.handleServerResponse);
  }

  userInfoReq() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "GET",
      headers: {
        authorization: "07909f6e-76be-4aa7-8439-3e97a34a8c13",
      },
    }).then(this.handleServerResponse);
  }

  uploadProfileReq() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "07909f6e-76be-4aa7-8439-3e97a34a8c13",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Max",
        about: "Tutor",
      }),
    }).then(this.handleServerResponse);
  }

  newCardReq(name, link) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "07909f6e-76be-4aa7-8439-3e97a34a8c13",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this.handleServerResponse);
  }

  deleteCardReq(_id) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${_id}`,
      {
        method: "DELETE",
        headers: {
          authorization: "07909f6e-76be-4aa7-8439-3e97a34a8c13",
          "Content-Type": "application/json",
        },
      }
    ).then(this.handleServerResponse);
  }

  addLikesReq(id) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${_id}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: "07909f6e-76be-4aa7-8439-3e97a34a8c13",
          "Content-Type": "application/json",
        },
      }
    ).then(this.handleServerResponse);
  }

  removeLikesReq(id) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${_id}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: "07909f6e-76be-4aa7-8439-3e97a34a8c13",
          "Content-Type": "application/json",
        },
      }
    ).then(this.handleServerResponse);
  }
}
export default Api;
