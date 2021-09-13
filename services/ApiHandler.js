// service/index.js
const axios = require('axios');

class CardsApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.scryfall.com'
    });
  }

  getCardSearch = (name) => this.api.get(`/cards/search?q=${name}`);

}

module.exports = CardsApi;
