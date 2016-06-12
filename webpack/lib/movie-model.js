const MovieService = require('./movie-service');

class Movie {
  constructor() {
    this.movieApi = new MovieService();
  }

  findMovie(title, callback) {
    return this.movieApi.getSearch(title, callback);
  }

  createMovie(movie) {
    return this.movieApi.postMovie(movie);
  }

  allMovies(callback) {
    return this.movieApi.getMovies(callback);
  }

  deleteMovie(movie) {
    return this.movieApi.deleteMovie(movie);
  }
}

module.exports = Movie;
