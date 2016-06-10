const request = require('request');

class MovieApi {
  constructor() {
    this.rootUrl = 'http://localhost:5000';
  }

  url(path) {
    return this.rootUrl.concat(path);
  }

  getSearch(query, callback) {
    request(this.url('/search?query=').concat(query), (error, response, body) => {
      const cleanBody = JSON.parse(body);
      if (!cleanBody.Error && response.statusCode === 200) {
        callback(cleanBody);
      } else {
        callback({ Title: 'Nothing was found', Plot: '...' });
      }
    });
  }
}

module.exports = MovieApi;
