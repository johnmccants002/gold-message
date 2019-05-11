/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';


import { createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from 'react-native-firebase'

// Screens
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import InBox from './components/InBox';
import ComposeMessage from './components/ComposeMessage';
import InputNumber from './components/InputNumber';
import SelectRecipient from './components/SelectRecipient';
import MessageDeliveryStatus from './components/MessageDeliveryStatus';
import MessageConfirm from './components/MessageConfirm';

const App = () => <AppContainer />;

export default App;

firebase.auth()
  .signInAnonymously()
  .then(credential => {
    if (credential) {
      console.log('default app user ->', credential.user.toJSON());
    }
  }).catch(e => {
    console.log('e', e)
  });

const screensViews = {
  SignIn,
  SignUp,
  InBox,
  InputNumber,
  ComposeMessage,
  MessageDeliveryStatus,
  MessageConfirm,
  SelectRecipient,
};

const AppNav = createStackNavigator({
  SignUp: {
    screen: screensViews.SignUp,
  },
  SignIn: {
    screen: screensViews.SignIn,
  },
  InBox: {
    screen: screensViews.InBox,
  },
  InputNumber: {
    screen: screensViews.InputNumber,
  },
  ComposeMessage: {
    screen: screensViews.ComposeMessage,
  },
  MessageDeliveryStatus: {
    screen: screensViews.MessageDeliveryStatus,
  },
  MessageConfirm: {
    screen: screensViews.MessageConfirm,
  },
  SelectRecipient: {
    screen: screensViews.SelectRecipient,
  },
}, {
  initialRouteName: 'SignUp',
  defaultNavigationOptions: {
    headerLeft: null,
    headerStyle: {
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      shadowRadius: 0,
      borderBottomWidth: 0,
      elevation: 0,
      height: 0,
    },
  },
});


const AppContainer = createAppContainer(AppNav);
