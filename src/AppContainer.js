
import { createStackNavigator, createAppContainer } from 'react-navigation';

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

const AppNav = createStackNavigator({
  SignUp: {
    screen: screensViews.SignUp,
  },
  SignIn: {
    screen: screensViews.SignIn,
  },
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
  PhoneVerification: {
    screen: PhoneVerification,
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
  }
}, {
  initialRouteName: 'SignIn',
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

export default AppContainer = createAppContainer(AppNav);