import React, { Component } from 'react';
import { Provider } from 'react-redux';

import AppContainer from './AppContainer';
import store from './store'
import { anonAuthentication } from './actions/profile';

export default class App extends Component {
  
  componentDidMount() {
    store.dispatch(anonAuthentication())
  }

  render() {
    return (
			<Provider store={store}>
          <AppContainer />
			</Provider>
    );
  }
}
