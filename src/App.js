import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/main';

class App extends Component {
  state = {}

  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <Main/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
