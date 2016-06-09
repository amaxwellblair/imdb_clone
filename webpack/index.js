const React = require('react');
const { render } = require('react-dom');

class App extends React.Component {
  render() {
    return (
      <p>Hello World</p>
    );
  }
}

render(<App/>, document.getElementById('app'));
