
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromLeft, zoomIn, zoomOut, fromTop, fromRight, fromBottom } from 'react-navigation-transitions'

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Inbox from './components/Inbox';
import ComposeMessage from './components/ComposeMessage';
import InputNumber from './components/InputNumber';
import ComposeMessageRecipient from './components/ComposeMessageRecipient';
import MessageDeliveryStatus from './components/MessageDeliveryStatus';
import MessageConfirm from './components/MessageConfirm';
import PhoneVerification from './components/PhoneVerification';
import InboxProfile from './components/InboxProfile';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import GoldMessagesSent from './components/GoldMessagesSent';
import SelectMultipleMessages from './components/SelectMultipleMessages';
import UserProfile from './components/UserProfile';

const screensViews = {
  SignIn,
  SignUp,
  Inbox,
  InputNumber,
  ComposeMessage,
  MessageDeliveryStatus,
  MessageConfirm,
  ComposeMessageRecipient,
};
const AuthStack = createStackNavigator({ 
  SignIn: {
    screen: screensViews.SignIn,
  },
  SignUp: {
    screen: screensViews.SignUp,
  },
  PhoneVerification: {
    screen: PhoneVerification,
  },
 });

const AppStack = createStackNavigator(
{
  
  Inbox: {
    screen: screensViews.Inbox,
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
  ComposeMessageRecipient: {
    screen: screensViews.ComposeMessageRecipient,
  },
  InboxProfile: {
    screen: InboxProfile,
  },
  Profile: {
    screen: Profile,
  },
  EditProfile: {
    screen: EditProfile,
  },
  GoldMessagesSent: {
    screen: GoldMessagesSent,
  },
  SelectMultipleMessages: {
    screen: SelectMultipleMessages
  },
  UserProfile: {
    screen: UserProfile
  }
});

export default AppContainer = createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  }, {
    initialRouteName: 'Auth',
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
    }
  },
));