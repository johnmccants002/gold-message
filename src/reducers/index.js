import { combineReducers } from 'redux';
import ProfileReducer from './ProfileReducer';
import MessagesReducer from './MessagesReducer';

export default combineReducers({
  profile : ProfileReducer,
  messages: MessagesReducer,
});
