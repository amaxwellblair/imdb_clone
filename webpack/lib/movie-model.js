const MovieService = require('./movie-service');

class Movie {
  constructor() {
    this.movieApi = new MovieService();
  }

  findMovie(title, callback) {
    return this.movieApi.getSearch(title, callback);
  }
}

module.exports = Movie;
