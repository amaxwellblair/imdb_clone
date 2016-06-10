const React = require('react');
const { render } = require('react-dom');
const MovieModel = require('./movie-model');
const EventEmitter = require('events');

const model = new MovieModel();
const emitter = new EventEmitter();

function movieBox(props) {
  return (
    <div className='card'>
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
        <MovieSearch/>
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
      <div>
        <div className='row'>
          <div className='col m4' id='side-bar'>
            <input id='search' placeholder='Search...' onKeyUp={this.pressSearch} />
            { movieBox(this.state.movie) }
          </div>
        </div>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
