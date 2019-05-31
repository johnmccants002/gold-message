
import { createStackNavigator, createAppContainer } from 'react-navigation';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import InBox from './components/InBox';
import ComposeMessage from './components/ComposeMessage';
import InputNumber from './components/InputNumber';
import SelectRecipient from './components/SelectRecipient';
import MessageDeliveryStatus from './components/MessageDeliveryStatus';
import MessageConfirm from './components/MessageConfirm';
import PhoneVerification from './components/PhoneVerification';

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
  PhoneVerification: {
    screen: PhoneVerification,
  },
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