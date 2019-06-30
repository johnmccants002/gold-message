import {
    CLEAR_ERROR,
    REFRESHING_INBOX,
    INBOX_REFRESHED,
    REFRESHING_INBOX_ERROR,
    SELECTED_USER_GOLD_MESSAGES_LOADING,
    SELECTED_USER,
    SELECTED_USER_GOLD_MESSAGES,
    SENT_GOLD_MESSAGES_LOADING,
    SENT_GOLD_MESSAGES_ERROR,
    SENT_GOLD_MESSAGES_RECEIVED,
} from '../actions/types';
  
  const INITIAL_STATE = {
      loading: false,
      items: [],
      error: undefined,
      selectedUser: undefined,
      selectedUserGoldMessages: undefined,
  };
  
  export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action
    
    switch (type) {
      case CLEAR_ERROR:
        return { ...state, error : undefined }
      case SENT_GOLD_MESSAGES_LOADING:
      case SELECTED_USER_GOLD_MESSAGES_LOADING:
      case REFRESHING_INBOX:
        return { ...state, error : undefined, loading: true}
      case INBOX_REFRESHED:
        return { ...state, items: payload, error : undefined, loading: false }
      case SENT_GOLD_MESSAGES_RECEIVED:
        return { ...state, sentGoldMessages: payload, error : payload, loading: false }
      case SENT_GOLD_MESSAGES_ERROR:
      case REFRESHING_INBOX_ERROR:
        return { ...state, error : payload, loading: false }
      case SELECTED_USER:
        return { ...state, selectedUser: payload }
      case SELECTED_USER_GOLD_MESSAGES:
        return { ...state, selectedUserGoldMessages: payload, loading: false }
      default:
        return state;
    }
  };
  
  