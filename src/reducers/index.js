import { combineReducers } from 'redux';
import ProfileReducer from './ProfileReducer';
import ComposeMessagesReducer from './ComposeMessagesReducer';
import InboxReducer from './InboxReducer';

export default combineReducers({
  profile : ProfileReducer,
  composeMessages: ComposeMessagesReducer,
  inbox: InboxReducer
});
