class Api {
    constructor(initialCards) {
        this._initialCards = initialCards;
    }
  
    getInitialCards() {
      return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
        headers: {
            authorization: "5d5b0339-df8c-4455-808c-d553a778a802"
        }
      })
      .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
    }
    
  
  }

  export default Api;
  
  
