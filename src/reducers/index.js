import { combineReducers } from 'redux';
import ProfileReducer from './ProfileReducer';
import ComposeMessagesReducer from './ComposeMessagesReducer';

export default combineReducers({
  profile : ProfileReducer,
  composeMessages: ComposeMessagesReducer,
});
