const request = require('request');

class MovieApi {
  constructor() {
    this.rootUrl = 'http://localhost:5000';
  }

  url(path) {
    return this.rootUrl.concat(path);
  }

  getSearch(query, success) {
    request(this.url('/search?query=').concat(query), (error, response, body) => {
      if (!error && response.statusCode === 200) {
        success(body);
      }
    });
  }
}

module.exports = MovieApi;
