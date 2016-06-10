const React = require('react');
const { render } = require('react-dom');
const MovieModel = require('./movie-model');
const EventEmitter = require('events');

const model = new MovieModel();
const emitter = new EventEmitter();

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
    this.listenSearch((search) => {
      let content;
      model.findMovie(search, (body) => {
        content = body;
        console.log(content);
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
    emitter.on('search', callback.bind(this));
  }

  render() {
    return (
      <input id='search' placeholder='Search...' onKeyUp={this.pressSearch} />
    );
  }
}

render(<App/>, document.getElementById('app'));
