
import { createStackNavigator, createAppContainer } from 'react-navigation';
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

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
  
  if (prevScene
    && prevScene.route.routeName === 'Inbox'
    && nextScene.route.routeName === 'ComposeMessage') {
    return fromBottom();
  } else if (prevScene
    && prevScene.route.routeName === 'ComposeMessage'
    && nextScene.route.routeName === 'ComposeMessageRecipient') {
    return fromBottom();
  }
  return fromRight();
}

const AppNav = createStackNavigator(
{
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
  },
  SelectMultipleMessages: {
    screen: SelectMultipleMessages
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
  transitionConfig: (nav) => handleCustomTransition(nav)
},);

export default AppContainer = createAppContainer(AppNav);