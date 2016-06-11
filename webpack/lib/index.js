const React = require('react');
const { render } = require('react-dom');
const MovieModel = require('./movie-model');
const EventEmitter = require('events');

const model = new MovieModel();
const emitter = new EventEmitter();

function saveButton(props) {
  const handleClick = () => {
    emitter.emit('save', props);
  };

  if (props.Poster) {
    return (
      <div className='card-content'>
        <button className='btn' onClick={ handleClick }>Save</button>
      </div>
    );
  }
  return '';
}

function deleteButton(props) {
  const handleClick = () => {
    emitter.emit('delete', props);
  };

  return (
    <a onClick={ handleClick } className='close'>{ '\u2715' }</a>
  );
}

function movieSearchBox(props) {
  return (
    <div className='card'>
      <div className='card-image'>
        <img src={ props.Poster }></img>
      </div>
      <div className='card-content'>
        <span className='card-title'>{ props.Title }</span>
        <p className='card-text'>{ props.Plot }</p>
      </div>
      { saveButton(props) }
    </div>
  );
}

function movieBox(props) {
  return (
    <div className='card store-movie' key={ props.imdbID }>
      { deleteButton(props) }
      <div className='card-image'>
        <img src={ props.Poster }></img>
      </div>
      <div className='card-content'>
        <span className='card-title'>{ props.Title }</span>
        <p className='card-text'>{ props.Plot }</p>
      </div>
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <div>
        <div className='row'>
          <MovieSearch/>
          <MovieStore/>
        </div>
      </div>
    );
  }
}

class MovieStore extends React.Component {
  constructor() {
    super();
    this.state = { movies: [] };
    this.saveListener((props) => {
      const movies = this.state.movies;
      movies.push(movieBox(props));
      this.setState({ movies });
    });
    this.deleteListener((props) => {
      const movies = this.state.movies;
      for (let i = 0; i < movies.length; i++) {
        if (movies[i].key === props.imdbID) {
          movies.splice(i, 1);
          break;
        }
      }
      this.setState({ movies });
    });
  }

  saveListener(callback) {
    emitter.on('save', callback);
  }

  deleteListener(callback) {
    emitter.on('delete', callback);
  }

  render() {
    return (
      <div className='col m8'>
        { this.state.movies }
      </div>
    );
  }
}

class MovieSearch extends React.Component {
  constructor() {
    super();
    this.state = { movie: { Title: 'Search movie', Plot: 'Above...' } };
    this.listenSearch((search) => {
      model.findMovie(search, (body) => {
        this.setState({ movie: body });
      });
    });
  }

  pressSearch(event) {
    if (event.keyCode === 13) {
      const value = event.target.value;
      emitter.emit('search', value);
    }
  }

  listenSearch(callback) {
    emitter.on('search', callback);
  }

  render() {
    return (
      <div className='col m4' id='side-bar'>
        <input id='search' placeholder='Search...' onKeyUp={this.pressSearch} />
        { movieSearchBox(this.state.movie) }
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
