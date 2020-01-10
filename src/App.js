import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/main';

class App extends Component {
  state = {
    userId: null,
    temp: 1,
  }

  onClick = () => {
    console.log(this.state.userId);
  }

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
