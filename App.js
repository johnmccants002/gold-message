/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';


import { createStackNavigator, createAppContainer } from 'react-navigation';

// Screens
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import InBox from './screens/InBox';
import ComposeMessage from './screens/ComposeMessage';
import InputNumber from './screens/InputNumber';
import SelectRecipient from './screens/SelectRecipient';
import MessageDeliveryStatus from './screens/MessageDeliveryStatus';
import MessageConfirm from './screens/MessageConfirm';

const App = () => <AppContainer />;

export default App;

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
