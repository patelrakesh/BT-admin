import React, { Fragment } from 'react';
import './App.css';
import './assets/base.css';
import './assets/style.css';
import Route from './config/route';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Provider store={store}>
        <Route />
        </Provider>
    );
  }
}

export default App;
