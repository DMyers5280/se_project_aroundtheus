import { data } from "autoprefixer";

class Api {
    constructor(initialCards) {
        this._initialCards = initialCards;
    }
  
    getInitialCards() {
      return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
        headers: {
            authorization: "6b54c1bd-a8ee-4fc9-a89b-051d7f33f592"
        }
      })
      .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then(data => {
        return data;
      });
    }
    userInfoReq() {
      return fetch("https://around-api.en.tripleten-services.com/v1/users", {
        method: "GET",
        headers: {
          authorization: "6b54c1bd-a8ee-4fc9-a89b-051d7f33f592"
        }
        
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then(data => {
        return data;
      });
  }

  // uploadProfileReq() {
  //   return fetch("https://around-api.en.tripleten-services.com/v1/users/me/avatar", {
  //     method: "PATCH",
  //     headers: {
  //       authorization: "6b54c1bd-a8ee-4fc9-a89b-051d7f33f592",
  //     }
  //     // body: JSON.stringify({
  //     //   url: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/users/avatar.jpg"
  //     // })
  //   })
  //   .then(res => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Error: ${res.status}`);
  //   })
  //   .then(data => {
  //     return data;
  //   });
  // }
}
  export default Api;
  
  
