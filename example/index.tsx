import * as React from 'react';
import * as ReactDOM from 'react-dom';

const render = () => {
  const { App } = require('./App'); // tslint:disable-line
  ReactDOM.render(<App />, document.getElementById('root'));
};

render();

if (module.hot) {
  module.hot.accept('./App', render);
}
