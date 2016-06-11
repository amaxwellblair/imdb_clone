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

  postMovie(movie) {
    request({
      url: this.url('/api/v1/movie'),
      method: 'POST',
      json: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: movie,
    });
  }

  getMovies(callback) {
    request(this.url('/api/v1/movies'), (error, response, body) => {
      const movies = [];
      const cleanBody = JSON.parse(body);
      if (response.statusCode === 200) {
        for (let i = 0; i < cleanBody.length; i++) {
          movies.push(cleanBody[i]);
        }
      }
      callback(movies);
    });
  }
}

module.exports = MovieApi;
